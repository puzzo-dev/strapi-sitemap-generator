import { AdSlide } from '@/lib/types/ads';

export class AdManager {
    private static instance: AdManager;
    private adSlides: AdSlide[] = [];
    private currentContext: AdContext = {};

    static getInstance(): AdManager {
        if (!AdManager.instance) {
            AdManager.instance = new AdManager();
        }
        return AdManager.instance;
    }

    // Set ads dynamically
    setAds(ads: AdSlide[]): void {
        this.adSlides = ads;
    }

    // Add ads to existing collection
    addAds(ads: AdSlide[]): void {
        this.adSlides = [...this.adSlides, ...ads];
    }

    // Remove ads by ID
    removeAds(adIds: string[]): void {
        this.adSlides = this.adSlides.filter(ad => !adIds.includes(String(ad.id)));
    }

    // Get filtered ads based on context
    getAds(filters?: AdFilters): AdSlide[] {
        let filteredAds = [...this.adSlides];

        // Filter by date range
        const now = new Date();
        filteredAds = filteredAds.filter(ad => {
            if (ad.startDate && ad.startDate > now) return false;
            if (ad.endDate && ad.endDate < now) return false;
            return true;
        });

        // Filter by target audience
        if (filters?.targetAudience) {
            filteredAds = filteredAds.filter(ad =>
                !ad.targetAudience ||
                ad.targetAudience.some(audience =>
                    filters.targetAudience?.includes(audience)
                )
            );
        }

        // Filter by priority and max count
        if (filters?.maxAds) {
            filteredAds = filteredAds
                .sort((a, b) => (a.priority || 999) - (b.priority || 999))
                .slice(0, filters.maxAds);
        }

        return filteredAds;
    }

    // Set current context for personalized ads
    setContext(context: AdContext): void {
        this.currentContext = { ...this.currentContext, ...context };
    }

    // Track ad interactions
    trackAdClick(ad: AdSlide): void {
        if (ad.clickTrackingId) {
            // Implement your analytics tracking here
            console.log(`Ad clicked: ${ad.clickTrackingId}`, ad);

            // Example: Send to analytics service
            // analytics.track('ad_click', {
            //   ad_id: ad.id,
            //   tracking_id: ad.clickTrackingId,
            //   title: ad.title,
            //   position: 'blog_sidebar'
            // });
        }
    }

    trackAdView(ad: AdSlide): void {
        if (ad.clickTrackingId) {
            console.log(`Ad viewed: ${ad.clickTrackingId}`, ad);

            // Example: Send to analytics service
            // analytics.track('ad_view', {
            //   ad_id: ad.id,
            //   tracking_id: ad.clickTrackingId,
            //   title: ad.title,
            //   position: 'blog_sidebar'
            // });
        }
    }
}

interface AdContext {
    userType?: string;
    location?: string;
    industry?: string;
    previouslyViewed?: string[];
    sessionDuration?: number;
}

interface AdFilters {
    targetAudience?: string[];
    maxAds?: number;
    excludeIds?: string[];
}

// Singleton instance
export const adManager = AdManager.getInstance();
