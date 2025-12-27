// Updated BlogSidebarSection with Dynamic Ads Integration

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import DynamicAdCarousel from '@/components/ui/DynamicAdCarousel';
import { adManager } from '@/lib/services/adManager';
import { AdSlide } from '@/lib/types/ads';
import { sampleAdSlides } from '@/examples/dynamicAdsExamples';
import type { BlogCategory } from '@/lib/types/content';
import type { PageContent } from '@/lib/types/core';

interface BlogSidebarSectionProps {
    categories: BlogCategory[];
    category: string;
    setCategory: (value: string) => void;
    allTags: { tag: string; count: number }[];
    tag: string;
    setTag: (value: string) => void;
    categoryCounts: Map<string, number>;
    pageContent: PageContent;
    // New props for dynamic ads
    customAds?: AdSlide[];
    adConfig?: {
        autoSlideInterval?: number;
        showNavigation?: boolean;
        showIndicators?: boolean;
        maxAds?: number;
    };
    onAdClick?: (ad: AdSlide) => void;
    userContext?: {
        userType?: string;
        industry?: string;
        location?: string;
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
    onAdClick,
    userContext
}) => {
    const { t } = useTranslation();
    const [dynamicAds, setDynamicAds] = useState<AdSlide[]>([]);
    const [adsLoading, setAdsLoading] = useState(true);

    // Load dynamic ads based on context
    useEffect(() => {
        const loadDynamicAds = async () => {
            setAdsLoading(true);

            try {
                // Set user context for personalized ads
                if (userContext) {
                    adManager.setContext(userContext);
                }

                // Use custom ads if provided, otherwise load default ads
                const adsToUse = customAds || await loadContextualAds();

                adManager.setAds(adsToUse);

                // Get filtered ads
                const filteredAds = adManager.getAds({
                    targetAudience: userContext?.interests || ['general'],
                    maxAds: adConfig.maxAds || 3
                });

                setDynamicAds(filteredAds);
            } catch (error) {
                console.error('Failed to load ads:', error);
                // Fallback to sample ads
                setDynamicAds(sampleAdSlides.slice(0, 3));
            } finally {
                setAdsLoading(false);
            }
        };

        loadDynamicAds();
    }, [customAds, userContext, adConfig.maxAds]);

    const loadContextualAds = async (): Promise<AdSlide[]> => {
        // This could be an API call in a real implementation
        // For now, return sample ads with some contextual logic

        let contextAds = [...sampleAdSlides];

        // Add context-specific ads based on current blog category
        if (category === 'technology') {
            contextAds = contextAds.filter(ad =>
                ad.targetAudience?.includes('developers') ||
                ad.targetAudience?.includes('it-professionals')
            );
        } else if (category === 'business') {
            contextAds = contextAds.filter(ad =>
                ad.targetAudience?.includes('business-owners') ||
                ad.targetAudience?.includes('managers')
            );
        }

        return contextAds;
    };

    const handleAdClick = (ad: AdSlide) => {
        // Call custom handler if provided
        onAdClick?.(ad);

        // Default tracking
        console.log('Blog sidebar ad clicked:', ad.title);
    };

    const handleAdView = (ad: AdSlide) => {
        console.log('Blog sidebar ad viewed:', ad.title);
    };

    // Get sidebar sections from page content
    const categoriesSection = pageContent?.sections?.find(s =>
        s.type === 'custom' && s.title?.toLowerCase().includes('category')
    );
    const topicsSection = pageContent?.sections?.find(s =>
        s.type === 'custom' && s.title?.toLowerCase().includes('tag')
    );

    return (
        <div className="md:w-1/4 space-y-8">
            {/* Categories */}
            <Card className="p-6 shadow-md">
                <CardContent>
                    <h3 className="text-xl font-bold mb-4">
                        {categoriesSection?.title || t('ui.categories')}
                    </h3>
                    <Separator className="mb-4" />
                    <ul className="space-y-2">
                        {categories.map(cat => (
                            <li key={cat.id}>
                                <button
                                    onClick={() => setCategory(cat.slug)}
                                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${category === cat.slug
                                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    <span>{cat.name}</span>
                                    <Badge variant="secondary" className="text-xs">
                                        {categoryCounts.get(cat.slug) || 0}
                                    </Badge>
                                </button>
                            </li>
                        ))}
                    </ul>
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
            ) : (
                <DynamicAdCarousel
                    ads={dynamicAds}
                    config={{
                        autoSlideInterval: 4000,
                        showNavigation: true,
                        showIndicators: true,
                        ...adConfig
                    }}
                    onAdClick={handleAdClick}
                    onAdView={handleAdView}
                />
            )}

            {/* Popular Tags */}
            <Card className="p-6 shadow-md">
                <CardContent>
                    <h3 className="text-xl font-bold mb-4">
                        {topicsSection?.title || t('ui.popularTopics')}
                    </h3>
                    <Separator className="mb-4" />
                    <div className="flex flex-wrap gap-2">
                        {allTags.slice(0, 10).map(({ tag: tagName, count }) => (
                            <Badge
                                key={tagName}
                                variant={tag === tagName ? "default" : "outline"}
                                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50"
                                onClick={() => setTag(tag === tagName ? '' : tagName)}
                            >
                                {tagName} ({count})
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogSidebarSection;
