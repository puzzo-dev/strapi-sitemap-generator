import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  useBlogPosts,
  useBlogCategories,
  usePageContent,
} from '@/hooks/useStrapiContent';
import type { BlogPost, BlogCategory, PageContent, PageSection } from '@/lib/types';
import {
  blogPosts as fallbackPosts,
  blogCategories as fallbackCategories,
  blogPageContent as fallbackPageContent,
} from '@/lib/data';

// Import section components
import BlogHeroSection from '@/components/sections/blog/BlogHeroSection';
import BlogFiltersSection from '@/components/sections/blog/BlogFiltersSection';
import BlogPostsSection from '@/components/sections/blog/BlogPostsSection';
import BlogSidebarSection from '@/components/sections/blog/BlogSidebarSection';
import BlogCTASection from '@/components/sections/blog/BlogCTASection';

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [tag, setTag] = useState('all');

  // Fetch blog posts with filters
  const {
    data: posts = fallbackPosts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useBlogPosts({
    category: category === 'all' ? undefined : category,
    tag: tag === 'all' ? undefined : tag,
  });

  // Fetch categories
  const {
    data: categories = fallbackCategories,
    isLoading: isLoadingCategories,
  } = useBlogCategories();

  // Fetch page content
  const { data: pageContent = fallbackPageContent } = usePageContent('blog');

  // Get sections with fallbacks
  const heroSection = pageContent?.sections?.find((section: PageSection) => section.type === 'hero') || 
    fallbackPageContent.sections.find(s => s.type === 'hero');
  
  const blogSection = pageContent?.sections?.find((section: PageSection) => section.type === 'blog') || 
    fallbackPageContent.sections.find(s => s.type === 'blog');
  
  const ctaSection = pageContent?.sections?.find((section: PageSection) => section.type === 'cta') || 
    fallbackPageContent.sections.find(s => s.type === 'cta');
  
  const categoriesSection = pageContent?.sections?.find(
    (section: PageSection) => section.type === 'custom' && section.title === 'Browse by Category'
  ) || fallbackPageContent.sections.find(s => s.type === 'custom' && s.title === 'Browse by Category');
  
  const topicsSection = pageContent?.sections?.find(
    (section: PageSection) => section.type === 'custom' && section.title === 'Popular Topics'
  ) || fallbackPageContent.sections.find(s => s.type === 'custom' && s.title === 'Popular Topics');

  // Get unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts by search
  const filteredPosts = useMemo(() => {
    if (!search) return posts;
    const searchLower = search.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchLower) ||
      post.blogIntro.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower)
    );
  }, [posts, search]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setCategory('all');
    setTag('all');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col">
      {/* Hero Section */}
      <BlogHeroSection
        heroSection={heroSection}
        pageContent={pageContent}
        search={search}
        setSearch={setSearch}
      />

      {/* Main Content */}
      <div className="container mx-auto p-3 md:py-12 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-4/5">
            {/* Search and Filter */}
            <BlogFiltersSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              tag={tag}
              setTag={setTag}
              categories={categories}
              allTags={allTags}
            />

            {/* Blog Posts */}
            <BlogPostsSection
              filteredPosts={filteredPosts}
              isLoadingPosts={isLoadingPosts}
              postsError={postsError}
              blogSection={blogSection}
              onClearFilters={handleClearFilters}
            />

            {/* CTA Section */}
            <BlogCTASection ctaSection={ctaSection} />
          </div>

          {/* Sidebar */}
          <BlogSidebarSection
            categories={categories}
            isLoadingCategories={isLoadingCategories}
            category={category}
            setCategory={setCategory}
            allTags={allTags}
            isLoadingPosts={isLoadingPosts}
            tag={tag}
            setTag={setTag}
            categoriesSection={categoriesSection}
            topicsSection={topicsSection}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;