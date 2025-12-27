import { useQuery } from '@tanstack/react-query';
import { getAdsFromStrapi } from '@/lib/strapi';
import { blogSidebarAds } from '@/lib/data/ads';
import type { AdSlide } from '@/lib/types/ads';

interface UseAdsOptions {
    position?: string;
    targetAudience?: string[];
    maxAds?: number;
    enabled?: boolean;
}

export const useAds = (options: UseAdsOptions = {}) => {
    const {
        position = 'blog_sidebar',
        targetAudience = ['general'],
        maxAds = 3,
        enabled = true
    } = options;

    return useQuery({
        queryKey: ['ads', position, targetAudience, maxAds],
        queryFn: async (): Promise<AdSlide[]> => {
            try {
                // Try to fetch from Strapi first
                const strapiAds = await getAdsFromStrapi({
                    position,
                    targetAudience,
                    maxAds
                });

                if (strapiAds && strapiAds.length > 0) {
                    console.log('Loaded ads from Strapi:', strapiAds);
                    return strapiAds;
                }

                // Fallback to static data if no Strapi ads
                console.log('No Strapi ads found, using static data');
                return blogSidebarAds.slice(0, maxAds);
            } catch (error) {
                console.warn('Failed to fetch ads from Strapi, using fallback data:', error);
                // Return static ads as fallback
                return blogSidebarAds.slice(0, maxAds);
            }
        },
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
        retry: 1,
        refetchOnWindowFocus: false
    });
};

export default useAds;
