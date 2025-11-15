/**
 * Content Management Hooks
 * 
 * Refactored to use generic hooks and follow DRY principles.
 * These hooks provide a unified interface for fetching content from Strapi
 * with automatic fallback to local data when APIs are unavailable.
 */

import { UseQueryResult, useQuery } from '@tanstack/react-query';
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
} from '@/hooks/useGenericContent';

import { createStrapiDataSources } from '@/lib/services/StrapiService';
import { createERPNextServices } from '@/lib/services/ERPNextService';
import { checkERPNextHealth } from '@/lib/erpnext';
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
export function useIndustries(): IListQueryResult<IndustryProps> {
  return useGenericList(
    ['industries'],
    () => strapiServices.industries.getAll(),
    'industries'
  );
}

/**
 * Get job listings with Strapi integration and fallbacks
 */
export function useJobListings(): IListQueryResult<JobListing> {
  return useGenericList(
    ['job-listings'],
    () => strapiServices.jobs.getAll(),
    'jobs'
  );
}

/**
 * Get client logos with Strapi integration and fallbacks
 */
export function useClientLogos(): IListQueryResult<ClientLogo> {
  return useGenericList(
    ['client-logos'],
    () => strapiServices.clientLogos.getAll(),
    'clients'
  );
}

/**
 * Get FAQ items with Strapi integration and fallbacks
 */
export function useFAQItems(): IListQueryResult<FAQItem> {
  return useGenericList(
    ['faq-items'],
    () => strapiServices.faqs.getAll(),
    'faqs'
  );
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
      // TODO: Implement ERPNext blog categories endpoint
      // For now, return empty array as placeholder
      return [];
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

// =============================================================================
// NAVIGATION & LAYOUT HOOKS (from useStrapiContent.ts)
// =============================================================================

/**
 * Custom hook to fetch navigation menu items
 */
export function useNavigation() {
  return useQuery<NavItem[]>({
    queryKey: ['navigation'],
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

/**
 * Custom hook to fetch social media links
 */
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

/**
 * Custom hook to fetch footer columns
 */
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

/**
 * Custom hook to fetch site configuration
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

/**
 * Custom hook to fetch footer data
 */
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
// BLOG HOOKS (Extended from useStrapiContent.ts)
// =============================================================================

/**
 * Custom hook to fetch blog posts with parameters
 */
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
        const { getBlogPosts } = await import('@/lib/strapi');
        return await getBlogPosts(params || {});
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

/**
 * Custom hook to fetch a blog post by slug
 */
export function useBlogPostBySlug(slug: string) {
  return useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      try {
        const { getBlogPostBySlug } = await import('@/lib/strapi');
        return await getBlogPostBySlug(slug);
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

/**
 * Custom hook to fetch blog comments for a post
 */
export function useBlogComments(postId: string) {
  return useQuery<BlogComment[]>({
    queryKey: ['blog-comments', postId],
    queryFn: async () => {
      try {
        const { getBlogComments } = await import('@/lib/strapi');
        return await getBlogComments(postId);
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
 * Custom hook to fetch a single service by ID
 */
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

/**
 * Custom hook to fetch a single product by ID
 */
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

/**
 * Custom hook to fetch job by ID
 */
export function useJobById(id: number) {
  return useQuery<JobListing | undefined>({
    queryKey: ['job-listings', id],
    queryFn: async () => {
      try {
        const { getJobById } = await import('@/lib/strapi');
        return await getJobById(id);
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
