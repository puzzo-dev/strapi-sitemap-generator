import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';

// Import section components
import BlogHeroSection from '@/components/sections/blog/BlogHeroSection';
import BlogFiltersSection from '@/components/sections/blog/BlogFiltersSection';
import BlogPostsSection from '@/components/sections/blog/BlogPostsSection';
import BlogSidebarSection from '@/components/sections/blog/BlogSidebarSection';
import BlogCTASection from '@/components/sections/blog/BlogCTASection';

// Import hooks and data
import { usePageContent } from '@/hooks/useContent';
import { blogPageContent as localBlogPageContent } from '@/lib/data/pages';
import { blogPosts as localBlogPosts, blogCategories as localBlogCategories } from '@/lib/data/blog';

const BlogPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [tag, setTag] = useState('all');

    // Fetch page content from Strapi or use local data
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('blog');
    const displayPageContent = pageContent || localBlogPageContent;

    // Get blog posts from page content settings with fallback to local data
    const blogPosts = useMemo(() => {
        const blogSection = displayPageContent?.sections?.find(s => s.type === 'blog');
        const posts = blogSection?.settings?.featured || [];
        // If no posts from Strapi, use local fallback
        return posts.length > 0 ? posts : localBlogPosts;
    }, [displayPageContent]);

    // Get blog categories from page content settings with fallback to local data
    const blogCategories = useMemo(() => {
        const blogSection = displayPageContent?.sections?.find(s => s.type === 'blog');
        const categories = blogSection?.settings?.categories || [];
        // If no categories from Strapi, use local fallback
        return categories.length > 0 ? categories : localBlogCategories;
    }, [displayPageContent]);

    // Generate structured data
    const structuredData = generateOrganizationSchema();

    // Get sections with fallbacks (memoized to prevent re-computation)
    const heroSection = useMemo(() =>
        displayPageContent?.sections?.find(s => s.type === 'hero'),
        [displayPageContent]
    );
    const blogSection = useMemo(() =>
        displayPageContent?.sections?.find(s => s.type === 'blog'),
        [displayPageContent]
    );

    // Get unique tags with counts
    const allTags = useMemo(() => {
        const tagCounts = new Map<string, number>();
        blogPosts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach((tag: string) => {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                });
            }
        });
        return Array.from(tagCounts.entries()).map(([tag, count]) => ({ tag, count }));
    }, [blogPosts]);

    // Get category counts
    const categoryCounts = useMemo(() => {
        const counts = new Map<string, number>();
        blogPosts.forEach(post => {
            if (post.blogCategories) {
                post.blogCategories.forEach((cat: any) => {
                    counts.set(cat.slug, (counts.get(cat.slug) || 0) + 1);
                });
            }
        });
        return counts;
    }, [blogPosts]);

    // Clear all filters (memoized to prevent function recreation)
    const handleClearFilters = useCallback(() => {
        setSearch('');
        setCategory('all');
        setTag('all');
    }, []);

    return (
        <PageLayout
            title={displayPageContent.metaTitle}
            description={displayPageContent.metaDescription}
            canonicalUrl="https://itechnologies.ng/blog"
            ogImage="https://itechnologies.ng/blog-og-image.jpg"
            ogType="website"
            twitterCard="summary_large_image"
            pageContent={displayPageContent}
            isLoading={isPageLoading}
            structuredData={structuredData}
            animationType="fade"
        >
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col">
                {/* Hero Section */}
                <BlogHeroSection
                    heroSection={heroSection}
                    pageContent={displayPageContent}
                    search={search}
                    setSearch={setSearch}
                />

                {/* Main Content */}
                <div className="container-custom max-w-8xl mx-auto py-3 md:py-12 flex-grow md:px-9">
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
                                categories={blogCategories}
                                allTags={allTags}
                            />

                            {/* Blog Posts */}
                            <BlogPostsSection
                                blogPosts={blogPosts}
                                isLoading={isPageLoading}
                                pageContent={displayPageContent}
                                search={search}
                                category={category}
                                tag={tag}
                                onClearFilters={handleClearFilters}
                            />

                            {/* CTA Section */}
                            <BlogCTASection pageContent={displayPageContent} />
                        </div>

                        {/* Sidebar */}
                        <BlogSidebarSection
                            categories={blogCategories}
                            category={category}
                            setCategory={setCategory}
                            allTags={allTags}
                            tag={tag}
                            setTag={setTag}
                            categoryCounts={categoryCounts}
                            pageContent={displayPageContent}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default BlogPage;