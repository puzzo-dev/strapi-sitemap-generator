import React, {useMemo} from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import BlogPostCard from '@/components/ui/BlogPostCard';
import type { BlogPost } from '@/lib/types';
import type { PageContent } from '@/lib/types/core';
import { gridItemAnimation } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPostsSectionProps {
    blogPosts: BlogPost[];
    isLoading: boolean;
    pageContent: PageContent;
    search: string;
    category: string;
    tag: string;
    onClearFilters: () => void;
}

const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({
    blogPosts,
    isLoading,
    pageContent,
    search,
    category,
    tag,
    onClearFilters,
}) => {
    const { t } = useTranslation();

    // Get blog section from page content
    const blogSection = pageContent?.sections?.find(s => s.type === 'blog');

    // Filter posts by search, category, and tag
    const filteredPosts = useMemo(() => {
        let filtered = blogPosts;

        // Filter by search
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchLower) ||
                post.blogIntro.toLowerCase().includes(searchLower) ||
                post.content.toLowerCase().includes(searchLower)
            );
        }

        // Filter by category
        if (category !== 'all') {
            filtered = filtered.filter(post =>
                post.blogCategories?.some((cat: any) => cat.slug === category)
            );
        }

        // Filter by tag
        if (tag !== 'all') {
            filtered = filtered.filter(post =>
                post.tags?.includes(tag)
            );
        }

        return filtered;
    }, [blogPosts, search, category, tag]);

    // Render skeletons
    const renderSkeletons = () => (
        <>
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className="flex flex-col h-full rounded-xl shadow-lg bg-white dark:bg-slate-800 overflow-hidden">
                    <Skeleton className="h-36 md:h-32 w-full" />
                    <div className="p-4 md:p-5">
                        <div className="flex space-x-2 mb-2">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-3 rounded-full ml-1.5" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-4 w-3/4 mb-1.5" />
                        <Skeleton className="h-2.5 w-full mb-1" />
                        <Skeleton className="h-2.5 w-3/4 mb-2.5" />
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            <Skeleton className="h-5 w-14 rounded-full" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-5 w-8 rounded-full" />
                        </div>
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                            <div className="flex items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-3 w-16 ml-2" />
                            </div>
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <div>
            {/* Filter Results Summary */}
            {!isLoading && (
                <div className="mb-6">
                    <p className="text-muted-foreground">
                        {filteredPosts.length === 0
                            ? t('ui.noResults')
                            : t('ui.showingResults', { count: filteredPosts.length })}
                    </p>
                </div>
            )}

            {/* Featured Posts */}
            {!isLoading && filteredPosts.some(post => post.featured) && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-200">{t('ui.featuredPosts')}</h2>
                    <motion.div
                        variants={gridItemAnimation(0)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {filteredPosts
                            .filter(post => post.featured)
                            .slice(0, blogSection?.settings?.showFeaturedOnly ? 2 : 2)
                            .map(post => (
                                <BlogPostCard key={post.slug} item={post} />
                            ))}
                    </motion.div>
                </div>
            )}

            {/* All Posts */}
            <h2 className="text-xl font-bold mb-6">{blogSection?.title || "Latest Articles"}</h2>
            {isLoading ? (
                <div
                    className={`grid grid-cols-1 md:grid-cols-${blogSection?.settings?.columns === 3 ? '3' : '2'
                        } gap-${blogSection?.settings?.gap === 'small' ? '2' :
                            blogSection?.settings?.gap === 'large' ? '6' : '4'
                        }`}
                >
                    {renderSkeletons()}
                </div>
            ) : (
                <>
                    {filteredPosts.length === 0 ? (
                        <Card className="p-8 shadow-md text-center">
                            <CardContent>
                                <p className="text-xl text-muted-foreground mb-4">{t('ui.noPosts')}</p>
                                <Button onClick={onClearFilters}>
                                    {t('ui.clearFilters')}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <motion.div
                            variants={gridItemAnimation(0)}
                            className={`grid grid-cols-1 md:grid-cols-${blogSection?.settings?.columns === 3 ? '3' : '2'
                                } gap-${blogSection?.settings?.gap === 'small' ? '2' :
                                    blogSection?.settings?.gap === 'large' ? '6' : '4'
                                }`}
                        >
                            {filteredPosts
                                .slice(0, blogSection?.settings?.postsToShow || 9)
                                .map(post => (
                                    <BlogPostCard key={post.slug} item={post} />
                                ))}
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default BlogPostsSection;
