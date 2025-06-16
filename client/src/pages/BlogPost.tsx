import React, { useState, useMemo } from 'react';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlogPostBySlug, useBlogComments, useBlogPosts } from '@/hooks/useStrapiContent';
import { submitBlogComment } from '@/lib/strapi';
import { generateDummyBlogPost } from '@/lib/blogUtils';
import type { BlogPost } from '@/lib/types';

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
const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  comment: z.string().min(5, { message: 'Comment must be at least 5 characters' })
});

type CommentFormValues = z.infer<typeof commentSchema>;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [commentTab, setCommentTab] = useState<string>('read'); // 'read' or 'write'

  // Fetch blog post
  const { data: post, isLoading: isLoadingPost, error: postError } = useBlogPostBySlug(slug);

  // Fetch comments and transform them to match the expected Comment type
  const { data: blogComments = [], isLoading: isLoadingComments } = useBlogComments(post?.name || '');
  const comments = blogComments.map(comment => ({
    ...comment,
    id: String(comment.id)
  }));

  // Fetch related posts - based on the same category or tags
  const { data: allPosts = [] } = useBlogPosts();

  // Create mutation for submitting comments
  const commentMutation = useMutation({
    mutationFn: (data: CommentFormValues) => {
      if (!post?.name) throw new Error('Post ID not available');
      return submitBlogComment(post.name, data);
    },
    onSuccess: () => {
      // Invalidate the comments query to refetch with the new comment
      queryClient.invalidateQueries({ queryKey: ['blog-comments', post?.name] });
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
    if (!post) return [];

    return allPosts
      .filter(p =>
        p.name !== post.name && (
          p.blogCategory === post.blogCategory ||
          (p.tags && post.tags && p.tags.some(tag => post.tags?.includes(tag)))
        )
      )
      .slice(0, 3); // Limit to 3 related posts
  }, [post, allPosts]);

  // Handle comment form submission
  const onSubmitComment = (data: CommentFormValues) => {
    commentMutation.mutate(data);
  };

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.blogIntro,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying to clipboard:', err));
    }
  };

  // Dummy blog post data for when Strapi/ERPNext isn't available
  const getDummyBlogPost = (slug: string): BlogPost => {
    const currentDate = new Date();
    const daysAgo = Math.floor(Math.random() * 4) + 2;
    const publishDate = new Date(currentDate.setDate(currentDate.getDate() - daysAgo));

    return {
      name: slug,
      slug: slug,
      title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      published: true,
      featured: false,
      blogCategory: "Technology",
      blogIntro: "This post explores important concepts and latest developments in the technology landscape, providing valuable insights for businesses and professionals.",
      content: `
        <h2>Introduction</h2>
        <p>In today's rapidly evolving technological landscape, staying informed about the latest trends and developments is crucial for businesses and professionals alike.</p>
        
        <h2>Key Concepts</h2>
        <p>Understanding the fundamentals is essential for making informed decisions about technology adoption and implementation.</p>
        
        <h2>Practical Applications</h2>
        <p>Let's explore how these concepts can be applied in real-world business scenarios.</p>
        
        <h2>Conclusion</h2>
        <p>By staying informed about the latest developments and implementing strategic solutions, organizations can unlock new opportunities for growth and innovation.</p>
      `,
      publishedDate: publishDate.toISOString(),
      readTime: Math.floor(Math.random() * 10) + 5,
      tags: ["technology", "innovation", "digital transformation"],
      metaImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1470",
      authorDetails: {
        fullName: "Technical Author",
        bio: "Technology specialist with expertise in digital transformation.",
        userImage: "https://randomuser.me/api/portraits/people/1.jpg"
      }
    };
  };

  // Render loading state
  if (isLoadingPost) {
    return <BlogPostLoadingSection />;
  }

  // Render error state or dummy content
  if (postError || !post) {
    // If the API returns an error but we have a slug, show dummy content
    if (slug) {
      // Create a dummy post for display using the utility function
      const dummyPost = generateDummyBlogPost(slug);

      // Use the dummy post instead of showing an error
      return (
        <BlogPostDummySection
          post={dummyPost}
          onShare={handleShare}
          commentTab={commentTab}
          setCommentTab={setCommentTab}
        />
      );
    }

    // If no slug is provided, show error state
    return <BlogPostErrorSection slug={slug} />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16">
      {/* Hero Section */}
      <BlogPostHeroSection post={post} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* Post Content */}
            <BlogPostContentSection post={post} onShare={handleShare} />

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
          <BlogPostSidebarSection post={post} relatedPosts={relatedPosts} />
        </div>
      </div>
    </div>
  );
};
export default BlogPostPage;