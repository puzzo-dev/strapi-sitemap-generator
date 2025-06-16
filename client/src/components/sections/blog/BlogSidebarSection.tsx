import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { BlogCategory, PageSection } from '@/lib/types';

interface BlogSidebarSectionProps {
    categories: BlogCategory[];
    isLoadingCategories: boolean;
    category: string;
    setCategory: (value: string) => void;
    allTags: string[];
    isLoadingPosts: boolean;
    tag: string;
    setTag: (value: string) => void;
    categoriesSection?: PageSection;
    topicsSection?: PageSection;
}

const BlogSidebarSection: React.FC<BlogSidebarSectionProps> = ({
    categories,
    isLoadingCategories,
    category,
    setCategory,
    allTags,
    isLoadingPosts,
    tag,
    setTag,
    categoriesSection,
    topicsSection,
}) => {
    const { t } = useTranslation();

    return (
        <div className="md:w-1/4 space-y-8">
            {/* Categories */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{categoriesSection?.title || t('blog.categories')}</h3>
                <Separator className="mb-4" />
                {isLoadingCategories ? (
                    <div className="space-y-2">
                        {Array(5).fill(0).map((_, index) => (
                            <Skeleton key={index} className="h-6 w-full" />
                        ))}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {categories.map(cat => (
                            <li key={cat.slug}>
                                <Button
                                    variant={category === cat.slug ? 'default' : 'ghost'}
                                    className="w-full justify-start"
                                    onClick={() => setCategory(category === cat.slug ? 'all' : cat.slug)}
                                >
                                    {cat.title}
                                    <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                                        {(categoriesSection?.settings?.items?.find((item: any) => item.slug === cat.slug)?.count) || 0}
                                    </span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{topicsSection?.title || t('blog.popularTags')}</h3>
                <Separator className="mb-4" />
                {isLoadingPosts ? (
                    <div className="flex flex-wrap gap-2">
                        {Array(10).fill(0).map((_, index) => (
                            <Skeleton key={index} className="h-8 w-16" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(t => (
                            <Badge
                                key={t}
                                variant={tag === t ? 'default' : 'outline'}
                                className="cursor-pointer hover:bg-primary/80"
                                onClick={() => setTag(tag === t ? 'all' : t)}
                            >
                                {t}
                                <span className="ml-1 text-xs">
                                    {(topicsSection?.settings?.items?.find((item: any) => item.tag === t)?.count) || 0}
                                </span>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{t('blog.subscribe')}</h3>
                <Separator className="mb-4" />
                <p className="text-muted-foreground mb-4">{t('blog.subscribeText')}</p>
                <NewsletterForm />
            </div>
        </div>
    );
};

export default BlogSidebarSection;