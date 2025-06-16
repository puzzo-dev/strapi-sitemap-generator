import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import BlogPostCard from '@/components/ui/BlogPostCard';
import type { BlogPost, PageSection } from '@/lib/types';
import { gridItemAnimation } from '@/lib/animations';

interface BlogPostsSectionProps {
    filteredPosts: BlogPost[];
    isLoadingPosts: boolean;
    postsError: any;
    blogSection?: PageSection;
    onClearFilters: () => void;
}

const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({
    filteredPosts,
    isLoadingPosts,
    postsError,
    blogSection,
    onClearFilters,
}) => {
    const { t } = useTranslation();

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
            {/* Error Message */}
            {postsError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-8 text-red-700 dark:text-red-400">
                    <p>{t('blog.errorMessage')}</p>
                    <Button onClick={() => window.location.reload()} className="mt-2">
                        {t('blog.retry')}
                    </Button>
                </div>
            )}

            {/* Filter Results Summary */}
            {!isLoadingPosts && !postsError && (
                <div className="mb-6">
                    <p className="text-muted-foreground">
                        {filteredPosts.length === 0
                            ? t('blog.noResults')
                            : t('blog.showingResults', { count: filteredPosts.length })}
                    </p>
                </div>
            )}

            {/* Featured Posts */}
            {!isLoadingPosts && !postsError && filteredPosts.some(post => post.featured) && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">{t('blog.featuredPosts')}</h2>
                    <motion.div
                        variants={gridItemAnimation(0)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {filteredPosts
                            .filter(post => post.featured)
                            .slice(0, blogSection?.settings?.showFeaturedOnly ? 2 : 2)
                            .map(post => (
                                <BlogPostCard key={post.slug} {...post} />
                            ))}
                    </motion.div>
                </div>
            )}

            {/* All Posts */}
            <h2 className="text-xl font-bold mb-6">{blogSection?.title || t('blog.latestPosts')}</h2>
            {isLoadingPosts ? (
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
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                            <p className="text-xl text-muted-foreground mb-4">{t('blog.noPosts')}</p>
                            <Button onClick={onClearFilters}>
                                {t('blog.clearFilters')}
                            </Button>
                        </div>
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
                                    <BlogPostCard key={post.slug} {...post} />
                                ))}
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default BlogPostsSection;