import React, { useState, useMemo } from 'react';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlogPostBySlug, useBlogComments, useBlogPosts, useSiteConfig } from '@/hooks/useStrapiContent';
import { submitBlogComment } from '@/lib/strapi';
import { generateDummyBlogPost } from '@/lib/blogUtils';
import { defaultSiteConfig, blogPosts as localBlogPosts } from '@/lib/data/';
import { blogPageContent as localBlogPageContent } from '@/lib/data/pages';
import type { BlogPost } from '@/lib/types/content';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateArticleSchema } from '@/components/seo/StructuredData';

// Import section components
import {
  BlogPostHeroSection,
  BlogPostContentSection,
  BlogPostCommentsSection,
  BlogPostSidebarSection,
  BlogPostLoadingSection,
  BlogPostErrorSection,
  BlogPostDummySection,
} from '@/components/sections/blogPost';

// Comment form schema
import type { CommentFormValues } from '@/lib/types';

const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  comment: z.string().min(5, { message: 'Comment must be at least 5 characters' })
});

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [commentTab, setCommentTab] = useState<string>('read'); // 'read' or 'write'
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Fetch blog post data from Strapi or fallback to local data
  const { data: post, isLoading: isPostLoading, error: postError } = useBlogPostBySlug(slug || '');
  const { data: siteConfig } = useSiteConfig();

  // Use blog post data from Strapi or fallback to local data
  const displayPost = post || localBlogPosts.find(p => p.slug === slug);
  const displaySiteConfig = siteConfig || defaultSiteConfig;

  // Fetch comments and transform them to match the expected Comment type
  const { data: blogComments = [], isLoading: isLoadingComments } = useBlogComments(displayPost?.name || '');
  const comments = blogComments.map(comment => ({
    ...comment,
    id: String(comment.id)
  }));

  // Fetch related posts - based on the same category or tags
  const { data: allPosts = [] } = useBlogPosts();

  // Create mutation for submitting comments
  const commentMutation = useMutation({
    mutationFn: (data: CommentFormValues) => {
      if (!displayPost?.name) throw new Error('Post ID not available');
      return submitBlogComment(displayPost.name, data);
    },
    onSuccess: () => {
      // Invalidate the comments query to refetch with the new comment
      queryClient.invalidateQueries({ queryKey: ['blog-comments', displayPost?.name] });
      form.reset();
      setCommentTab('read'); // Switch back to reading comments after submission
    }
  });

  // Comment form
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: ''
    }
  });

  // Find related posts based on category and tags
  const relatedPosts = useMemo(() => {
    if (!displayPost) return [];

    return allPosts
      .filter(p =>
        p.name !== displayPost.name && (
          p.blogCategories?.some(cat => 
            displayPost.blogCategories?.some(displayCat => displayCat.id === cat.id)
          ) ||
          (p.tags && displayPost.tags && p.tags.some(tag => displayPost.tags?.includes(tag)))
        )
      )
      .slice(0, 3); // Limit to 3 related posts
  }, [displayPost, allPosts]);

  // Handle comment form submission
  const onSubmitComment = (data: CommentFormValues) => {
    commentMutation.mutate(data);
  };

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayPost?.title,
        text: displayPost?.blogIntro,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .catch(err => console.error('Error copying to clipboard:', err));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Generate structured data
  const structuredData = useMemo(() => {
    if (!displayPost) return undefined;
    return generateArticleSchema({
      headline: displayPost.title || '',
      description: displayPost.blogIntro || '',
      image: displayPost.metaImage || '',
      authorName: displayPost.authorDetails?.fullName || displayPost.author || 'I-VARSE Team',
      publishDate: displayPost.publishedDate || new Date().toISOString(),
      modifiedDate: displayPost.publishedDate || new Date().toISOString(),
      url: `${displaySiteConfig.siteUrl}/blog/${displayPost.slug || ''}`
    });
  }, [displayPost, displaySiteConfig.siteUrl]);

  // Prepare SEO metadata
  const pageTitle = generateSeoTitle(displayPost?.metaTitle || displayPost?.title || 'Blog Post');
  const pageDescription = generateSeoDescription(displayPost?.metaDescription || displayPost?.blogIntro || 'Read our latest blog post');

  // Render loading state
  if (isPostLoading) {
    return <BlogPostLoadingSection />;
  }

  // Render error state or dummy content
  if (postError || !displayPost) {
    // If the API returns an error but we have a slug, show dummy content
    if (slug) {
      // Create a dummy post for display using the utility function
      const dummyPost = generateDummyBlogPost(slug);

      // Use the dummy post instead of showing an error
      return (
        <BlogPostDummySection
          post={dummyPost}
        />
      );
    }

    // If no slug is provided, show error state
    return <BlogPostErrorSection slug={slug || ''} />;
  }

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`${displaySiteConfig.siteUrl}/blog/${displayPost.slug || ''}`}
        ogImage={displayPost.metaImage || `${displaySiteConfig.siteUrl}/og-blog.jpg`}
        ogUrl={`${displaySiteConfig.siteUrl}/blog/${displayPost.slug || ''}`}
        ogType="article"
        twitterCard="summary_large_image"
        keywords={[
          displayPost.blogCategories?.[0]?.name || 'General',
          ...(displayPost.tags || []),
          'I-VARSE Technologies',
          'blog',
          'technology insights'
        ]}
        alternateLanguages={[
          { lang: 'en', url: `${displaySiteConfig.siteUrl}/blog/${displayPost.slug || ''}` },
          { lang: 'yo', url: `${displaySiteConfig.siteUrl}/yo/blog/${displayPost.slug || ''}` },
          { lang: 'ig', url: `${displaySiteConfig.siteUrl}/ig/blog/${displayPost.slug || ''}` },
          { lang: 'ha', url: `${displaySiteConfig.siteUrl}/ha/blog/${displayPost.slug || ''}` },
          { lang: 'fr', url: `${displaySiteConfig.siteUrl}/fr/blog/${displayPost.slug || ''}` },
          { lang: 'es', url: `${displaySiteConfig.siteUrl}/es/blog/${displayPost.slug || ''}` },
          { lang: 'sw', url: `${displaySiteConfig.siteUrl}/sw/blog/${displayPost.slug || ''}` }
        ]}
        structuredData={structuredData}
      />

      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16">
        {/* Hero Section */}
        <BlogPostHeroSection post={displayPost} />

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              {/* Post Content */}
              <BlogPostContentSection post={displayPost} onShare={handleShare} />

              {/* Comments Section */}
              <BlogPostCommentsSection
                comments={comments}
                isLoadingComments={isLoadingComments}
                commentTab={commentTab}
                setCommentTab={setCommentTab}
                onSubmitComment={onSubmitComment}
                commentMutation={commentMutation}
                form={form}
              />
            </div>

            {/* Sidebar */}
            <BlogPostSidebarSection post={displayPost} relatedPosts={relatedPosts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;