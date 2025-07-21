import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { BlogCategory } from '@/lib/types/content';
import type { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';

interface BlogSidebarSectionProps {
    categories: BlogCategory[];
    category: string;
    setCategory: (value: string) => void;
    allTags: { tag: string; count: number }[];
    tag: string;
    setTag: (value: string) => void;
    categoryCounts: Map<string, number>;
    pageContent: PageContent;
}

const BlogSidebarSection: React.FC<BlogSidebarSectionProps> = ({
    categories,
    category,
    setCategory,
    allTags,
    tag,
    setTag,
    categoryCounts,
    pageContent,
}) => {
    const { t } = useTranslation();

    // Get sidebar sections from page content
    const categoriesSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title?.toLowerCase().includes('category'));
    const topicsSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title?.toLowerCase().includes('tag'));

    return (
        <div className="md:w-1/4 space-y-8">
            {/* Categories */}
            <Card className="p-6 shadow-md">
                <CardContent>
                    <h3 className="text-xl font-bold mb-4">{categoriesSection?.title || t('ui.categories')}</h3>
                    <Separator className="mb-4" />
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
                                        {categoryCounts.get(cat.slug) || 0}
                                    </span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Tags */}
            <Card className="p-6 shadow-md">
                <CardContent>
                    <h3 className="text-xl font-bold mb-4">{topicsSection?.title || t('ui.popularTags')}</h3>
                    <Separator className="mb-4" />
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(({ tag: tagName, count }) => (
                            <Badge
                                key={tagName}
                                variant={tag === tagName ? 'default' : 'outline'}
                                className="cursor-pointer hover:bg-primary/80"
                                onClick={() => setTag(tag === tagName ? 'all' : tagName)}
                            >
                                {tagName}
                                <span className="ml-1 text-xs">
                                    {count}
                                </span>
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="p-6 shadow-md">
                <CardContent>
                    <h3 className="text-xl font-bold mb-4">{t('ui.subscribe')}</h3>
                    <Separator className="mb-4" />
                    <p className="text-muted-foreground mb-4">{t('ui.subscribeText')}</p>
                    <NewsletterForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogSidebarSection;