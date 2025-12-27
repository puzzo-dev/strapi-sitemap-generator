/**
 * Content Management Hooks
 *
 * These hooks provide a unified interface for fetching content from Strapi
 * with automatic fallback to local data when APIs are unavailable.
 */

import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/components/context/LanguageContext';
import {
  PageContent,
  ProductProps,
  ServiceProps,
  TestimonialProps,
  TeamMember,
  CaseStudyProps,
  IndustryProps,
  JobListing,
  ClientLogo,
  FAQItem,
  BlogPost,
  BlogCategory,
  NavItem,
  SocialLink,
  FooterColumn,
  SiteConfig,
  FooterProps,
  BlogComment
} from '@/lib/types';

import { strapiService } from '@/lib/services/StrapiService';
import {
  checkERPNextHealth,
  getERPNextBlogCategories,
  getERPNextBlogPost,
  getERPNextBlogPosts,
  getERPNextBlogComments,
  getERPNextJobListings,
  getERPNextJobListing
} from '@/lib/erpnext';
import { loggerService, cacheService } from '@/lib/services/UtilityServices';

import {
  getUIText,
  UI_TEXT_FALLBACKS
} from '@/lib/fallbacks';

// =============================================================================
// SERVICE INSTANCES (Singleton Pattern)
// =============================================================================

// =============================================================================
// UI TEXT HOOKS
// =============================================================================

export function useUIText(
  fallbackKey: string,
  fallbackCategory: keyof typeof UI_TEXT_FALLBACKS = 'buttons'
) {
  return (strapiText?: string) => getUIText(strapiText, fallbackKey, fallbackCategory);
}

// =============================================================================
// PAGE CONTENT HOOKS
// =============================================================================

export function usePageContent(slug: string): UseQueryResult<PageContent | null> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['page-content', slug, currentLanguage],
    queryFn: async () => {
      try {
        return await strapiService.getPageBySlug(slug);
      } catch (error) {
        loggerService.warn(`Failed to fetch page content for slug ${slug}, will use fallback data in component`, error as Error);
        return null;
      }
    },
    retry: false,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

// =============================================================================
// CONTENT LIST HOOKS
// =============================================================================

export function useProducts(): UseQueryResult<ProductProps[]> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['products', currentLanguage],
    queryFn: () => strapiService.getProducts(),
  });
}

export function useServices(): UseQueryResult<ServiceProps[]> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['services', currentLanguage],
    queryFn: () => strapiService.getServices(),
  });
}

export function useTestimonials(): UseQueryResult<TestimonialProps[]> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['testimonials', currentLanguage],
    queryFn: () => strapiService.getTestimonials(),
  });
}

export function useTeamMembers(): UseQueryResult<TeamMember[]> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['team-members', currentLanguage],
    queryFn: () => strapiService.getTeam(),
  });
}

export function useCaseStudies(): UseQueryResult<CaseStudyProps[]> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['case-studies', currentLanguage],
    queryFn: () => strapiService.getCaseStudies(),
  });
}

export function useIndustries(): UseQueryResult<IndustryProps[]> {
  const { currentLanguage } = useLanguage();
  return useQuery({
    queryKey: ['industries', currentLanguage],
    queryFn: () => strapiService.getIndustries(),
  });
}

export function useJobListings(): UseQueryResult<JobListing[]> {
  return useQuery({
    queryKey: ['job-listings'],
    queryFn: () => getERPNextJobListings(),
  });
}

export function useClientLogos(): UseQueryResult<ClientLogo[]> {
  return useQuery({
    queryKey: ['client-logos'],
    queryFn: () => strapiService.getClientLogos(),
  });
}

export function useFAQItems(): UseQueryResult<FAQItem[]> {
  return useQuery({
    queryKey: ['faq-items'],
    queryFn: () => strapiService.getFaqs(),
  });
}

// =============================================================================
// BLOG HOOKS (ERPNext Integration)
// =============================================================================

export function useBlogPosts(): UseQueryResult<BlogPost[]> {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => getERPNextBlogPosts(),
    retry: 2,
  });
}

export function useBlogPost(slug: string): UseQueryResult<BlogPost | null> {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getERPNextBlogPost(slug),
    retry: 2,
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export function useBlogCategories(): UseQueryResult<BlogCategory[]> {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => getERPNextBlogCategories(),
    staleTime: 20 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
    retry: 1
  });
}

// =============================================================================
// SYSTEM HEALTH HOOKS
// =============================================================================

export function useERPNextHealth() {
  return useQuery({
    queryKey: ['erpnext-health'],
    queryFn: checkERPNextHealth,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });
}

// =============================================================================
// NAVIGATION & LAYOUT HOOKS
// =============================================================================

// DEPRECATED: Use useGlobalLayout() instead
// These hooks are no longer used as navigation data comes from global layout endpoint
/*
export function useNavigation() {
  throw new Error('useNavigation() is deprecated. Use useGlobalLayout() instead.');
}

export function useSocialLinks() {
  throw new Error('useSocialLinks() is deprecated. Use useGlobalLayout() instead.');
}
*/

// DEPRECATED: Use useGlobalLayout() instead
// These hooks are no longer used as footer data comes from global layout endpoint
/*
export function useFooterColumns() {
  throw new Error('useFooterColumns() is deprecated. Use useGlobalLayout() instead.');
}

export function useFooter() {
  throw new Error('useFooter() is deprecated. Use useGlobalLayout() instead.');
}
*/

export function useSiteConfig() {
  return useQuery<SiteConfig>({
    queryKey: ['site-config'],
    queryFn: async () => {
      try {
        const { getSiteConfig } = await import('@/lib/strapi');
        return await getSiteConfig();
      } catch (error) {
        console.error('Failed to fetch site config:', error);
        const { defaultSiteConfig } = await import('@/lib/data/config');
        return defaultSiteConfig;
      }
    },
    staleTime: 20 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

// DEPRECATED: Use useGlobalLayout() instead
/*
export function useFooter() {
  throw new Error('useFooter() is deprecated. Use useGlobalLayout() instead.');
}
*/

// =============================================================================
// BLOG HOOKS (Extended)
// =============================================================================

export function useBlogPostsWithParams(params?: {
  limit?: number;
  category?: string;
  featured?: boolean;
  tag?: string;
  author?: string;
  status?: 'draft' | 'published' | 'archived';
}) {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts', params],
    queryFn: async () => {
      try {
        return await getERPNextBlogPosts();
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        const { blogPosts } = await import('@/lib/data/blog');
        return blogPosts;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useBlogPostBySlug(slug: string) {
  return useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      try {
        return await getERPNextBlogPost(slug);
      } catch (error) {
        console.error(`Failed to fetch blog post ${slug}:`, error);
        const { blogPosts } = await import('@/lib/data/blog');
        return blogPosts.find(post => post.slug === slug) || null;
      }
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useBlogComments(postId: string) {
  return useQuery<BlogComment[]>({
    queryKey: ['blog-comments', postId],
    queryFn: async () => {
      try {
        return await getERPNextBlogComments(postId);
      } catch (error) {
        console.error(`Failed to fetch comments for post ${postId}:`, error);
        return [];
      }
    },
    enabled: !!postId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

// =============================================================================
// ITEM-SPECIFIC HOOKS (Extended)
// =============================================================================

/**
 * @deprecated Use useServiceDetailBySlug instead - uses new v5 endpoint with block structure
 * Keeping for backwards compatibility during migration
 */
export function useServiceBySlug(slug: string) {
  return useServiceDetailBySlug(slug);
}

export function useJobById(id: number) {
  return useQuery<JobListing | undefined>({
    queryKey: ['job-listings', id],
    queryFn: async () => {
      try {
        const job = await getERPNextJobListing(String(id));
        return job || undefined;
      } catch (error) {
        console.error(`Failed to fetch job ${id}:`, error);
        const { jobListings } = await import('@/lib/data/jobs');
        return jobListings.find(j => j.id === id);
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

// =============================================================================
// NEW STRAPI v5 ENDPOINT HOOKS
// =============================================================================

/**
 * Hook for fetching global layout data (header/footer) from Strapi
 * Uses /api/global single type endpoint with pre-populated middleware
 */
export function useGlobalLayout() {
  return useQuery({
    queryKey: ['global-layout'],
    queryFn: async () => {
      try {
        const { getGlobalLayout } = await import('@/lib/strapi');
        return await getGlobalLayout();
      } catch (error) {
        loggerService.error('Failed to fetch global layout:', error as Error);
        return null;
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour - layout changes infrequently
    gcTime: 120 * 60 * 1000,
  });
}

/**
 * Hook for fetching service detail by slug from Strapi
 * Uses /api/services/:slug endpoint with pre-populated middleware
 * Returns block-based dynamic content structure
 */
export function useServiceDetailBySlug(slug: string) {
  return useQuery({
    queryKey: ['service-detail', slug],
    queryFn: async () => {
      try {
        const { getServiceDetailBySlug } = await import('@/lib/strapi');
        return await getServiceDetailBySlug(slug);
      } catch (error) {
        loggerService.error(`Failed to fetch service detail for slug ${slug}:`, error as Error);
        return null;
      }
    },
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

/**
 * Hook for fetching project/solution detail by slug from Strapi
 * Uses /api/projects/:slug endpoint with pre-populated middleware
 * Returns block-based dynamic content structure
 */
export function useProjectDetailBySlug(slug: string) {
  return useQuery({
    queryKey: ['project-detail', slug],
    queryFn: async () => {
      try {
        const { getProjectDetailBySlug } = await import('@/lib/strapi');
        return await getProjectDetailBySlug(slug);
      } catch (error) {
        loggerService.error(`Failed to fetch project detail for slug ${slug}:`, error as Error);
        return null;
      }
    },
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
