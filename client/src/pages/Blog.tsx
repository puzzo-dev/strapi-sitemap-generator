import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';

// Import section components
import BlogHeroSection from '@/components/sections/blog/BlogHeroSection';
import BlogFiltersSection from '@/components/sections/blog/BlogFiltersSection';
import BlogPostsSection from '@/components/sections/blog/BlogPostsSection';
import BlogSidebarSection from '@/components/sections/blog/BlogSidebarSection';
import BlogCTASection from '@/components/sections/blog/BlogCTASection';

// Import hooks and data
import { usePageContent } from '@/hooks/useStrapiContent';
import { blogPageContent as localBlogPageContent } from '@/lib/data/pages';

const BlogPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [tag, setTag] = useState('all');

    // SEO optimization helpers
    const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

    // Fetch page content from Strapi or use local data
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('blog');
    const displayPageContent = pageContent || localBlogPageContent;

    // Get blog posts from page content settings
    const blogPosts = useMemo(() => {
        const blogSection = displayPageContent?.sections?.find(s => s.type === 'blog');
        return blogSection?.settings?.featured || [];
    }, [displayPageContent]);

    // Get blog categories from page content settings
    const blogCategories = useMemo(() => {
        const blogSection = displayPageContent?.sections?.find(s => s.type === 'blog');
        return blogSection?.settings?.categories || [];
    }, [displayPageContent]);

    // Generate structured data
    const structuredData = generateOrganizationSchema();

    // Prepare SEO metadata
    const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
    const pageDescription = generateSeoDescription(displayPageContent.metaDescription);

    // Get sections with fallbacks
    const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero');
    const blogSection = displayPageContent?.sections?.find(s => s.type === 'blog');

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

    // Clear all filters
    const handleClearFilters = () => {
        setSearch('');
        setCategory('all');
        setTag('all');
    };

    return (
        <>
            {/* SEO Metadata */}
            <MetaTags
                title={pageTitle}
                description={pageDescription}
                canonicalUrl="https://itechnologies.ng/blog"
                ogImage="https://itechnologies.ng/blog-og-image.jpg"
                ogUrl="https://itechnologies.ng/blog"
                ogType="website"
                twitterCard="summary_large_image"
                structuredData={structuredData}
            />

            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col">
                {/* Hero Section */}
                <BlogHeroSection
                    heroSection={heroSection}
                    pageContent={displayPageContent}
                    search={search}
                    setSearch={setSearch}
                />

                {/* Main Content */}
                <div className="container-custom mx-auto py-3 md:py-12 flex-grow md:px-9">
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
        </>
    );
};

export default BlogPage;