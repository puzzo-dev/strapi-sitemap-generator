// Example: How to use Dynamic Ads in your Blog component

import React, { useEffect, useState } from 'react';
import DynamicAdCarousel from '@/components/ui/DynamicAdCarousel';
import { adManager } from '@/lib/services/adManager';
import { AdSlide } from '@/lib/types/ads';
import {
    sampleAdSlides,
    campaignAds,
    industrySpecificAds,
    performanceAds
} from '@/examples/dynamicAdsExamples';

const BlogWithDynamicAds: React.FC = () => {
    const [blogAds, setBlogAds] = useState<AdSlide[]>([]);

    useEffect(() => {
        // Method 1: Load ads based on user context
        const loadContextualAds = async () => {
            // Set user context for personalized ads
            adManager.setContext({
                userType: 'business-owner', // Could come from user profile
                location: 'nigeria',
                industry: 'healthcare', // Could be detected from blog content
                previouslyViewed: ['erp-solutions', 'cloud-services']
            });

            // Start with base ads
            let ads = [...sampleAdSlides];

            // Add campaign ads if active
            const activeCampaigns = campaignAds.filter(ad => {
                const now = new Date();
                return (!ad.startDate || ad.startDate <= now) &&
                    (!ad.endDate || ad.endDate >= now);
            });
            ads = [...ads, ...activeCampaigns];

            // Add industry-specific ads
            const industryAds = industrySpecificAds.healthcare || [];
            ads = [...ads, ...industryAds];

            // Add high-performing ads
            ads = [...ads, ...performanceAds];

            // Set ads in manager
            adManager.setAds(ads);

            // Get filtered ads (max 3 for sidebar)
            const filteredAds = adManager.getAds({
                targetAudience: ['business-owners', 'managers'],
                maxAds: 3
            });

            setBlogAds(filteredAds);
        };

        loadContextualAds();
    }, []);

    // Method 2: Load ads from API
    const loadAdsFromAPI = async () => {
        try {
            // Example API call
            const response = await fetch('/api/ads/blog-sidebar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    context: 'blog',
                    position: 'sidebar',
                    userSegment: 'business-owners',
                    maxAds: 5
                })
            });

            const apiAds = await response.json();
            setBlogAds(apiAds);
        } catch (error) {
            console.error('Failed to load ads from API:', error);
            // Fallback to static ads
            setBlogAds(sampleAdSlides.slice(0, 3));
        }
    };

    // Method 3: Real-time ad updates
    useEffect(() => {
        // Listen for real-time ad updates (e.g., via WebSocket)
        const handleAdUpdate = (event: CustomEvent) => {
            const { action, ads } = event.detail;

            switch (action) {
                case 'add':
                    adManager.addAds(ads);
                    break;
                case 'remove':
                    adManager.removeAds(ads.map((ad: AdSlide) => ad.id));
                    break;
                case 'replace':
                    adManager.setAds(ads);
                    break;
            }

            // Refresh displayed ads
            const updatedAds = adManager.getAds({ maxAds: 3 });
            setBlogAds(updatedAds);
        };

        window.addEventListener('adUpdate', handleAdUpdate as EventListener);
        return () => window.removeEventListener('adUpdate', handleAdUpdate as EventListener);
    }, []);

    const handleAdClick = (ad: AdSlide) => {
        console.log('Ad clicked:', ad.title);
        // Additional tracking or analytics here
    };

    const handleAdView = (ad: AdSlide) => {
        console.log('Ad viewed:', ad.title);
        // Track impressions
    };

    return (
        <div className="blog-container">
            {/* Your blog content */}
            <div className="blog-main">
                {/* Blog posts go here */}
            </div>

            {/* Sidebar with dynamic ads */}
            <div className="blog-sidebar">
                <DynamicAdCarousel
                    ads={blogAds}
                    config={{
                        autoSlideInterval: 5000,
                        showNavigation: true,
                        showIndicators: true,
                        maxAds: 3
                    }}
                    onAdClick={handleAdClick}
                    onAdView={handleAdView}
                />

                {/* Other sidebar content */}
            </div>
        </div>
    );
};

// Method 4: Hook for easy ad management
export const useAds = (context: string, maxAds: number = 3) => {
    const [ads, setAds] = useState<AdSlide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAds = async () => {
            setLoading(true);

            try {
                // Load from API or static data
                const contextAds = await getAdsForContext(context);
                adManager.setAds(contextAds);

                const filteredAds = adManager.getAds({ maxAds });
                setAds(filteredAds);
            } catch (error) {
                console.error('Failed to load ads:', error);
                setAds(sampleAdSlides.slice(0, maxAds));
            } finally {
                setLoading(false);
            }
        };

        loadAds();
    }, [context, maxAds]);

    return { ads, loading, refreshAds: () => setAds(adManager.getAds({ maxAds })) };
};

// Helper function to get ads for specific contexts
const getAdsForContext = async (context: string): Promise<AdSlide[]> => {
    switch (context) {
        case 'blog':
            return [...sampleAdSlides, ...performanceAds];
        case 'homepage':
            return [...campaignAds, ...sampleAdSlides];
        case 'product-page':
            return sampleAdSlides.filter(ad => ad.targetAudience?.includes('developers'));
        default:
            return sampleAdSlides;
    }
};

export default BlogWithDynamicAds;
