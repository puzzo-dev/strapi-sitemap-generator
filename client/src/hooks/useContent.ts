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
    queryFn: () => strapiService.getPageBySlug(slug),
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

export function useNavigation() {
  const { currentLanguage } = useLanguage();
  return useQuery<NavItem[]>({
    queryKey: ['navigation', currentLanguage],
    queryFn: async () => {
      try {
        const { getNavItems } = await import('@/lib/strapi');
        const strapiNavItems = await getNavItems();
        if (strapiNavItems && strapiNavItems.length > 0) {
          return strapiNavItems;
        }
      } catch (error) {
        console.error('Failed to fetch navigation from Strapi:', error);
      }
      const { navItems } = await import('@/lib/data/config');
      return navItems;
    },
    staleTime: 20 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export function useSocialLinks() {
  return useQuery<SocialLink[]>({
    queryKey: ['social-links'],
    queryFn: async () => {
      try {
        const { getSocialLinks } = await import('@/lib/strapi');
        return await getSocialLinks();
      } catch (error) {
        console.error('Failed to fetch social links:', error);
        const { socialLinks } = await import('@/lib/data/config');
        return socialLinks;
      }
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
  });
}

export function useFooterColumns() {
  return useQuery<FooterColumn[]>({
    queryKey: ['footer-columns'],
    queryFn: async () => {
      try {
        const { getFooterColumns } = await import('@/lib/strapi');
        return await getFooterColumns();
      } catch (error) {
        console.error('Failed to fetch footer columns:', error);
        return [];
      }
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
  });
}

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

export function useFooter() {
  return useQuery<FooterProps>({
    queryKey: ['footer'],
    queryFn: async () => {
      try {
        const { getFooter } = await import('@/lib/strapi');
        return await getFooter();
      } catch (error) {
        console.error('Failed to fetch footer:', error);
        const { footerData } = await import('@/lib/data/footer');
        return footerData;
      }
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
  });
}

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

export function useServiceById(id: number) {
  return useQuery<ServiceProps | undefined>({
    queryKey: ['services', id],
    queryFn: async () => {
      try {
        const { getServiceById } = await import('@/lib/strapi');
        return await getServiceById(id);
      } catch (error) {
        console.error(`Failed to fetch service ${id}:`, error);
        const { services } = await import('@/lib/data/services');
        return services.find(s => s.id === id);
      }
    },
    enabled: id !== undefined && id !== null && id > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useProductById(id: number) {
  return useQuery<ProductProps | undefined>({
    queryKey: ['products', id],
    queryFn: async () => {
      try {
        const { getProductById } = await import('@/lib/strapi');
        return await getProductById(id);
      } catch (error) {
        console.error(`Failed to fetch product ${id}:`, error);
        const { products } = await import('@/lib/data/products');
        return products.find(p => p.id === id);
      }
    },
    enabled: id !== undefined && id !== null && id > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
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
