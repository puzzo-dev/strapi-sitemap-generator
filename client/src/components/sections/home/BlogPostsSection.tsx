import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GradientButton from '@/components/ui/GradientButton';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import type { BlogPost } from '@/lib/types/content';
import type { PageContent } from '@/lib/types/core';

interface BlogPostsSectionProps {
  homePageContent: PageContent;
  blogPosts: BlogPost[];
  isLoading: boolean;
}

const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({ homePageContent, blogPosts, isLoading }) => {
  const { t } = useTranslation();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const marqueeRef = React.useRef<HTMLDivElement>(null);

  // Get blog section from homePageContent
  const blogSection = homePageContent?.sections?.find(s => s.type === 'blog');

  // Extract section content
  const title = blogSection?.title;
  const subtitle = blogSection?.subtitle;
  const badge = blogSection?.badge;
  const postsToShow = blogSection?.settings?.postsToShow || 5;

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

  // Marquee animation control
  useEffect(() => {
    if (marqueeRef.current) {
      const animation = marqueeRef.current.style.animationPlayState;
      marqueeRef.current.style.animationPlayState = isAutoPlaying ? 'running' : 'paused';
    }
  }, [isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/10 to-white dark:from-[#0a192f] dark:via-blue-950/20 dark:to-[#0a192f] relative overflow-hidden">
      {/* Subtle minimal background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/20"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/15"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500/10"></div>
        </div>
      </div>

      <div className="container-custom relative z-10 max-w-8xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
            <div className="h-px w-8 bg-blue-600 dark:bg-blue-400"></div>
            {badge || 'Latest News'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0047AB] dark:text-white mb-3 leading-tight">
            {title}
          </h2>
        </div>

        {/* News Marquee - Accenture Style (Horizontal Scrolling) */}
        <div className="relative overflow-hidden">
          {isLoading ? (
            // Loading placeholder
            <div className="flex gap-8 py-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-6 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-64"></div>
                </div>
              ))}
            </div>
          ) : postsToDisplay && postsToDisplay.length > 0 ? (
            <>
              {/* Horizontal marquee scrolling right to left */}
              <div className="relative py-4">
                <div
                  ref={marqueeRef}
                  className="flex gap-8 news-marquee"
                  style={{ animationPlayState: isAutoPlaying ? 'running' : 'paused' }}
                >
                  {/* Duplicate items for seamless loop */}
                  {[...postsToDisplay, ...postsToDisplay].map((post, index) => (
                    <Link
                      key={`${post.id}-${index}`}
                      href={`/blog/${post.slug}`}
                      className="flex-shrink-0"
                    >
                      <div className="group w-[400px] p-4 cursor-pointer hover:opacity-80 transition-opacity">
                        {/* Date - Above title */}
                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                          {formatDate(post.publishedAt || new Date().toISOString())}
                        </div>

                        {/* Title - Middle */}
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt - Below title */}
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.blogIntro}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Controls & View All Button - Bottom */}
              <div className="flex items-center justify-between mt-6 gap-4 px-1">
                {/* View All Button - Left */}
                {settings?.primaryButton && typeof settings.primaryButton === 'object' && 'title' in settings.primaryButton && 'href' in settings.primaryButton && (
                  <div className="flex-shrink-0">
                    <GradientButton
                      href={typeof settings.primaryButton.href === 'string' ? settings.primaryButton.href : '/'}
                      size="sm"
                    >
                      <span className="inline-flex items-center gap-2">
                        {settings.primaryButton.title}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </GradientButton>
                  </div>
                )}

                {/* Pause/Play Button - Right */}
                <button
                  onClick={toggleAutoPlay}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                  aria-label={isAutoPlaying ? "Pause" : "Play"}
                >
                  {isAutoPlaying ? (
                    <Pause className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </>
          ) : (
            // No posts fallback
            <div className="text-center py-12">
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
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .news-marquee {
            animation: marquee 40s linear infinite;
          }
          
          .news-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </section>
  );
};

export default BlogPostsSection;
