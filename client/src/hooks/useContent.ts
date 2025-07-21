/**
 * Content Management Hooks
 * 
 * Refactored to use generic hooks and follow DRY principles.
 * These hooks provide a unified interface for fetching content from Strapi
 * with automatic fallback to local data when APIs are unavailable.
 */

import { UseQueryResult } from '@tanstack/react-query';
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
  BlogCategory
} from '@/lib/types';

import { 
  IQueryResult, 
  IListQueryResult, 
  IContentStatus 
} from '@/lib/abstractions';

import {
  useGenericItem,
  useGenericList,
  useGenericPageContent,
  useContentStatusAggregator,
  useCompositeContent
} from './useGenericContent';

import { createStrapiDataSources } from '@/lib/services/StrapiService';
import { createERPNextServices } from '@/lib/services/ERPNextService';
import { loggerService, cacheService } from '@/lib/services/UtilityServices';

import { 
  getUIText,
  UI_TEXT_FALLBACKS 
} from '@/lib/fallbacks';

// =============================================================================
// SERVICE INSTANCES (Singleton Pattern)
// =============================================================================

// Create service instances once and reuse them
const strapiServices = createStrapiDataSources(loggerService, cacheService);
const erpNextServices = createERPNextServices(loggerService);

// =============================================================================
// PAGE CONTENT HOOKS
// =============================================================================

/**
 * Get page content with Strapi integration and fallbacks
 * Refactored to use generic hook pattern
 */
export function usePageContent(slug: string): IQueryResult<PageContent> {
  return useGenericPageContent(
    slug,
    (slug: string) => strapiServices.pages.getBySlug(slug)
  );
}

/**
 * Get UI translations with fallbacks
 * Refactored to use generic hook pattern
 */
export function useUIContent(language: string = 'en'): IQueryResult<typeof UI_TEXT_FALLBACKS> {
  return useGenericItem(
    ['ui-content', language],
    () => strapiServices.service.getUITranslations(language),
    UI_TEXT_FALLBACKS,
    { staleTime: 15 * 60 * 1000, gcTime: 120 * 60 * 1000 }
  );
}

// =============================================================================
// CONTENT LIST HOOKS (Refactored with Generic Patterns)
// =============================================================================

/**
 * Get products with Strapi integration and fallbacks
 * Refactored to eliminate duplication
 */
export function useProducts(): IListQueryResult<ProductProps> {
  return useGenericList(
    ['products'],
    () => strapiServices.products.getAll(),
    'products'
  );
}

/**
 * Get services with Strapi integration and fallbacks
 * Refactored to eliminate duplication
 */
export function useServices(): IListQueryResult<ServiceProps> {
  return useGenericList(
    ['services'],
    () => strapiServices.services.getAll(),
    'services'
  );
}

/**
 * Get testimonials with Strapi integration and fallbacks
 */
export function useTestimonials(): IListQueryResult<TestimonialProps> {
  return useGenericList(
    ['testimonials'],
    () => strapiServices.testimonials.getAll(),
    'testimonials'
  );
}

/**
 * Get team members with Strapi integration and fallbacks
 */
export function useTeamMembers(): IListQueryResult<TeamMember> {
  return useGenericList(
    ['team-members'],
    () => strapiServices.team.getAll(),
    'team'
  );
}

/**
 * Get case studies with Strapi integration and fallbacks
 */
export function useCaseStudies(): IListQueryResult<CaseStudyProps> {
  return useGenericList(
    ['case-studies'],
    () => strapiServices.caseStudies.getAll(),
    'caseStudies'
  );
}

/**
 * Get industries with Strapi integration and fallbacks
 */
export function useIndustries(): UseQueryResult<IndustryProps[]> {
  return useQuery({
    queryKey: ['industries'],
    queryFn: async () => {
      try {
        const strapiIndustries = await getStrapiIndustries();
        return getContentList(strapiIndustries, 'industries');
      } catch (error) {
        console.error('Failed to fetch industries:', error);
        return getContentList(null, 'industries');
      }
    },
    staleTime: 20 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1
  });
}

/**
 * Get job listings with Strapi integration and fallbacks
 */
export function useJobListings(): UseQueryResult<JobListing[]> {
  return useQuery({
    queryKey: ['job-listings'],
    queryFn: async () => {
      try {
        const strapiJobs = await getStrapiJobListings();
        return getContentList(strapiJobs, 'jobs');
      } catch (error) {
        console.error('Failed to fetch job listings:', error);
        return getContentList(null, 'jobs');
      }
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1
  });
}

/**
 * Get client logos with Strapi integration and fallbacks
 */
export function useClientLogos(): UseQueryResult<ClientLogo[]> {
  return useQuery({
    queryKey: ['client-logos'],
    queryFn: async () => {
      try {
        const strapiClients = await getStrapiClientLogos();
        return getContentList(strapiClients, 'clients');
      } catch (error) {
        console.error('Failed to fetch client logos:', error);
        return getContentList(null, 'clients');
      }
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
    retry: 1
  });
}

/**
 * Get FAQ items with Strapi integration and fallbacks
 */
export function useFAQItems(): UseQueryResult<FAQItem[]> {
  return useQuery({
    queryKey: ['faq-items'],
    queryFn: async () => {
      try {
        const strapiFAQs = await getStrapiFAQItems();
        return getContentList(strapiFAQs, 'faqs');
      } catch (error) {
        console.error('Failed to fetch FAQ items:', error);
        return getContentList(null, 'faqs');
      }
    },
    staleTime: 20 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1
  });
}

// =============================================================================
// BLOG HOOKS (ERPNext Integration - Refactored)
// =============================================================================

/**
 * Get blog posts from ERPNext with fallbacks
 */
export function useBlogPosts(): IListQueryResult<BlogPost> {
  return useGenericList(
    ['blog-posts'],
    () => erpNextServices.blog.getAllPosts(),
    'blogs',
    { retry: 2 }
  );
}

/**
 * Get single blog post from ERPNext with fallbacks
 */
export function useBlogPost(slug: string): IQueryResult<BlogPost | null> {
  return useGenericItem(
    ['blog-post', slug],
    () => erpNextServices.blog.getPost(slug),
    null,
    { 
      retry: 2, 
      enabled: !!slug,
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000
    }
  );
}

/**
 * Get blog categories from ERPNext with fallbacks
 */
export function useBlogCategories(): UseQueryResult<BlogCategory[]> {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      try {
        return await getERPNextBlogCategories();
      } catch (error) {
        console.error('Failed to fetch blog categories from ERPNext:', error);
        return [];
      }
    },
    staleTime: 20 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
    retry: 1
  });
}

// =============================================================================
// SYSTEM HEALTH HOOKS
// =============================================================================

/**
 * Check ERPNext system health
 */
export function useERPNextHealth() {
  return useQuery({
    queryKey: ['erpnext-health'],
    queryFn: checkERPNextHealth,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false
  });
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Get UI text with fallback support
 */
export function useUIText(key: string, category: keyof typeof UI_TEXT_FALLBACKS = 'buttons') {
  const { data: uiContent } = useUIContent();
  
  return (strapiText?: string) => {
    if (strapiText) return strapiText;
    
    const categoryData = uiContent?.[category] as any;
    return categoryData?.[key] || key;
  };
}

/**
 * Comprehensive content status hook
 * Refactored to use generic status aggregator
 */
export function useContentStatus(): IContentStatus {
  const products = useProducts();
  const services = useServices();
  const blogs = useBlogPosts();
  const testimonials = useTestimonials();
  const team = useTeamMembers();
  const erpHealth = useERPNextHealth();

  return useContentStatusAggregator([
    { key: 'products', query: products },
    { key: 'services', query: services },
    { key: 'blogs', query: blogs },
    { key: 'testimonials', query: testimonials },
    { key: 'team', query: team },
    { key: 'erpnext', query: erpHealth }
  ]);
}

/**
 * Composite content hook for dashboard/admin views
 * DRY principle: Load multiple content types efficiently
 */
export function useAllContent() {
  return useCompositeContent({
    products: {
      queryKey: ['products'],
      fetcher: () => strapiServices.products.getAll(),
      contentType: 'products'
    },
    services: {
      queryKey: ['services'],
      fetcher: () => strapiServices.services.getAll(),
      contentType: 'services'
    },
    blogs: {
      queryKey: ['blog-posts'],
      fetcher: () => erpNextServices.blog.getAllPosts(),
      contentType: 'blogs'
    },
    testimonials: {
      queryKey: ['testimonials'],
      fetcher: () => strapiServices.testimonials.getAll(),
      contentType: 'testimonials'
    },
    team: {
      queryKey: ['team-members'],
      fetcher: () => strapiServices.team.getAll(),
      contentType: 'team'
    }
  });
}
