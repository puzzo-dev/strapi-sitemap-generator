import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { BlogCategory } from '@/lib/types/content';
import type { PageContent } from '@/lib/types/core';
import type { AdSlide } from '@/lib/types/ads';
import { Card, CardContent } from '@/components/ui/card';
import DynamicAdCarousel from '@/components/ui/DynamicAdCarousel';
import { useAds } from '@/hooks/useAds';
import { trackAdAnalytics } from '@/lib/strapi';

interface BlogSidebarSectionProps {
    categories: BlogCategory[];
    category: string;
    setCategory: (value: string) => void;
    allTags: { tag: string; count: number }[];
    tag: string;
    setTag: (value: string) => void;
    categoryCounts: Map<string, number>;
    pageContent: PageContent;
    // Optional props for ad customization
    customAds?: AdSlide[];
    adConfig?: {
        autoSlideInterval?: number;
        showNavigation?: boolean;
        showIndicators?: boolean;
        maxAds?: number;
    };
    userContext?: {
        userType?: string;
        industry?: string;
        interests?: string[];
    };
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
    customAds,
    adConfig = {},
    userContext
}) => {
    const { t } = useTranslation();

    // Use the new ads hook to fetch from Strapi
    const {
        data: strapiAds,
        isLoading: adsLoading,
        error: adsError
    } = useAds({
        position: 'blog_sidebar',
        targetAudience: userContext?.interests || ['general', 'business-owners', 'developers'],
        maxAds: adConfig.maxAds || 3,
        enabled: !customAds // Only fetch from Strapi if no custom ads provided
    });

    // Use custom ads if provided, otherwise use Strapi ads
    const displayAds = customAds || strapiAds || [];

    const handleAdClick = async (ad: AdSlide) => {
        console.log('Blog sidebar ad clicked:', ad.title);

        // Track analytics to Strapi
        try {
            await trackAdAnalytics({
                adId: String(ad.id),
                action: 'click'
            });
        } catch (error) {
            console.warn('Failed to track ad click:', error);
        }
    };

    const handleAdView = async (ad: AdSlide) => {
        console.log('Blog sidebar ad viewed:', ad.title);

        // Track analytics to Strapi
        try {
            await trackAdAnalytics({
                adId: String(ad.id),
                action: 'view'
            });
        } catch (error) {
            console.warn('Failed to track ad view:', error);
        }
    };

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

            {/* Dynamic Ads Section */}
            {adsLoading ? (
                <Card className="shadow-md">
                    <CardContent className="p-0">
                        <Skeleton className="h-40 w-full rounded-t-lg" />
                        <div className="p-4 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </CardContent>
                </Card>
            ) : displayAds.length > 0 ? (
                <DynamicAdCarousel
                    ads={displayAds}
                    config={{
                        autoSlideInterval: 4000,
                        showNavigation: true,
                        showIndicators: true,
                        ...adConfig
                    }}
                    onAdClick={handleAdClick}
                    onAdView={handleAdView}
                />
            ) : (
                /* Fallback static ad display */
                <Card className="shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Featured Services</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100">ERP Solutions</h4>
                                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">Streamline your business operations</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                                    onClick={() => window.open('/services/custom-erp-solutions', '_blank')}
                                >
                                    {t('ui.learnMore') || 'Learn More'} <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                            </div>
                        </div>
                        {adsError && (
                            <p className="text-xs text-gray-500 mt-2">
                                Could not load dynamic ads from CMS
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BlogSidebarSection;