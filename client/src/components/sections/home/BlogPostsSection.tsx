import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import BlogCard from '@/components/ui/BlogCard';
import { ArrowRight, BookOpen, Sparkles, Code, CircuitBoard } from 'lucide-react';
import type { BlogPost } from '@/lib/types/content';
import type { PageContent } from '@/lib/types/core';

// Loading placeholder for blog cards
const BlogCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-4/6"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    </div>
  </div>
);

// Background decoration component
const BackgroundDecoration = () => (
  <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none overflow-hidden">
    <Sparkles className="absolute left-10 top-20 h-48 w-48 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-slower" />
    <Code className="absolute right-10 bottom-10 h-56 w-56 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
    <CircuitBoard className="absolute left-1/4 top-1/3 h-40 w-40 text-purple-400 dark:text-purple-600 opacity-25 animate-pulse-slower transform rotate-12" />
    
    {/* Decorative grid */}
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-500/20 dark:bg-blue-400/10 animate-pulse-light"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  </div>
);

interface BlogPostsSectionProps {
  homePageContent: PageContent;
  blogPosts: BlogPost[];
  isLoading: boolean;
}

const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({ homePageContent, blogPosts, isLoading }) => {
  const { t } = useTranslation();

  // Get blog section from homePageContent
  const blogSection = homePageContent?.sections?.find(s => s.type === 'blog');

  // Extract section content
  const title = blogSection?.title;
  const subtitle = blogSection?.subtitle;
  const badge = blogSection?.badge;
  const postsToShow = blogSection?.settings?.postsToShow || 3;

  const settings = blogSection?.settings || {};

  // Get blog posts to display
  const postsToDisplay = useMemo(() => {
    const availablePosts = blogPosts || [];

    // If we have featured posts in section settings, use those
    if (settings && 'featured' in settings && Array.isArray(settings.featured)) {
      // Filter only BlogPost types from the featured array
      const blogPostsOnly = settings.featured.filter((item): item is BlogPost => 
        'slug' in item && 'blogCategories' in item && 'blogIntro' in item
      );
      return blogPostsOnly.slice(0, postsToShow);
    }

    // Otherwise use featured posts from available posts
    const featuredPosts = availablePosts.filter(post => post.featured);
    return featuredPosts.slice(0, postsToShow);
  }, [blogPosts, settings, postsToShow]);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] relative overflow-hidden">
      <BackgroundDecoration />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
            {badge}
          </div>
          <h2 className="heading-md text-blue-900 dark:text-blue-200 mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Loading placeholders
            Array(3).fill(0).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : postsToDisplay && postsToDisplay.length > 0 ? (
            postsToDisplay.map((post, index) => (
              <motion.div
                key={post.id || `post-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <BlogCard
                  item={post}
                  isReversed={index % 2 !== 0}
                />
              </motion.div>
            ))
          ) : (
            // No posts fallback
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No blog posts available
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Blog posts will be displayed here once they are available.
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {postsToDisplay && postsToDisplay.length > 0 && settings?.primaryButton && typeof settings.primaryButton === 'object' && 'title' in settings.primaryButton && 'href' in settings.primaryButton && (
          <div className="text-center">
            <GradientButton
              href={typeof settings.primaryButton.href === 'string' ? settings.primaryButton.href : undefined}
              className="px-8 w-64 mx-auto"
              endIcon={<ArrowRight />}
            >
              {settings.primaryButton.title}
            </GradientButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsSection;