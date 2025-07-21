import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getNavItems,
  getSocialLinks,
  getFooterColumns,
  getSiteConfig,
  getPageContent,
  getTeamMembers,
  getProducts,
  getProductById,
  getServices,
  getServiceById,
  getTestimonials,
  getJobListings,
  getJobById,
  getBlogPosts,
  getBlogPostBySlug,
  getBlogCategories,
  getFooter,
  getBlogComments,
  getFAQItems,
} from '@/lib/strapi';
import {
  NavItem,
  SocialLink,
  FooterColumn,
  SiteConfig,
  PageContent,
  TeamMember,
  ProductProps,
  ServiceProps,
  TestimonialProps,
  ClientLogo,
  JobListing,
  Benefit,
  BlogPost,
  BlogCategory,
  BlogComment,
  FooterProps,
  HeroSlide,
  HeroProps,
  FAQPageContent,
  PageSection,
  FAQItem
} from '@/lib/types';

/**
 * Custom hook to fetch navigation menu items
 */
export function useNavigation() {
  return useQuery<NavItem[]>({
    queryKey: ['navigation'],
    queryFn: async () => {
      try {
        // Try to get from Strapi first
        const strapiNavItems = await getNavItems();

        // If Strapi returns data, use it
        if (strapiNavItems && strapiNavItems.length > 0) {
          return strapiNavItems;
        }
      } catch (error) {
        // If Strapi fails, continue to fallback
      }

      // If no Strapi data, fall back to local data
      const { navItems } = await import('@/lib/data/config');
      return navItems;
    }
  });
}

/**
 * Custom hook to fetch social media links
 */
export function useSocialLinks() {
  return useQuery<SocialLink[]>({
    queryKey: ['social-links'],
    queryFn: getSocialLinks
  });
}

/**
 * Custom hook to fetch footer columns
 */
export function useFooterColumns() {
  return useQuery<FooterColumn[]>({
    queryKey: ['footer-columns'],
    queryFn: getFooterColumns
  });
}

/**
 * Custom hook to fetch site configuration
 */
export function useSiteConfig() {
  return useQuery<SiteConfig>({
    queryKey: ['site-config'],
    queryFn: getSiteConfig
  });
}

/**
 * Custom hook to fetch page content by slug
 */
export function usePageContent(slug: string) {
  return useQuery<PageContent | null>({
    queryKey: ['page-content', slug],
    queryFn: async () => {
      // Try to get from Strapi first
      const strapiContent = await getPageContent(slug);

      // If Strapi returns data, use it
      if (strapiContent) {
        return strapiContent;
      }

      // If no Strapi data, fall back to local data based on slug
      const {
        contactPageContent,
        careersPageContent,
        teamPageContent,
        homePageContent,
        aboutPageContent,
        servicesPageContent,
        blogPageContent,
        productsPageContent,
        serviceDetailPageContent,
        faqPageContent
      } = await import('@/lib/data/');

      switch (slug) {
        case 'contact':
          return contactPageContent;
        case 'careers':
          return careersPageContent;
        case 'team':
          return teamPageContent;
        case 'home':
          return homePageContent;
        case 'about':
          return aboutPageContent;
        case 'services':
          return servicesPageContent;
        case 'blog':
          return blogPageContent;
        case 'products':
          return productsPageContent;
        case 'service-detail':
          return serviceDetailPageContent;
        case 'faq':
          return faqPageContent;
        default:
          return null;
      }
    }
  });
}

/**
 * Custom hook to fetch team members
 */
export function useTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ['team-members'],
    queryFn: getTeamMembers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Custom hook to fetch products
 */
export function useProducts() {
  return useQuery<ProductProps[]>({
    queryKey: ['products'],
    queryFn: getProducts
  });
}

/**
 * Custom hook to fetch services
 */
export function useServices() {
  return useQuery<ServiceProps[]>({
    queryKey: ['services'],
    queryFn: getServices
  });
}

/**
 * Custom hook to fetch a single service by ID
 */
export function useServiceById(id: number) {
  return useQuery<ServiceProps | undefined>({
    queryKey: ['services', id],
    queryFn: () => getServiceById(id),
    enabled: id !== undefined && id !== null && id > 0
  });
}

/**
 * Custom hook to fetch a single product by ID
 */
export function useProductById(id: number) {
  return useQuery<ProductProps | undefined>({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: id !== undefined && id !== null && id > 0
  });
}

/**
 * Custom hook to fetch testimonials
 */
export function useTestimonials() {
  return useQuery<TestimonialProps[]>({
    queryKey: ['testimonials'],
    queryFn: getTestimonials
  });
}

/**
 * Custom hook to fetch job listings with ERPNext integration
 */
export function useJobListings() {
  return useQuery<JobListing[]>({
    queryKey: ['job-listings'],
    queryFn: getJobListings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch job by ID with ERPNext integration
 */
export function useJobById(id: number) {
  return useQuery<JobListing | undefined>({
    queryKey: ['job-listings', id],
    queryFn: () => getJobById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch blog posts with ERPNext integration
 */
export function useBlogPosts(params?: {
  limit?: number;
  category?: string;
  featured?: boolean;
  tag?: string;
  author?: string;
  status?: 'draft' | 'published' | 'archived';
}) {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts', params],
    queryFn: () => getBlogPosts(params || {}),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch a blog post by slug with ERPNext integration
 */
export function useBlogPostBySlug(slug: string) {
  return useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch blog categories with ERPNext integration
 */
export function useBlogCategories() {
  return useQuery<BlogCategory[]>({
    queryKey: ['blog-categories'],
    queryFn: getBlogCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch blog comments for a post with ERPNext integration
 */
export function useBlogComments(postId: string) {
  return useQuery<BlogComment[]>({
    queryKey: ['blog-comments', postId],
    queryFn: () => getBlogComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch FAQ items with ERPNext integration
 */
export function useFAQItems() {
  return useQuery<FAQItem[]>({
    queryKey: ['faq-items'],
    queryFn: getFAQItems,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
}

/**
 * Custom hook to fetch footer data with ERPNext integration
 */
export function useFooter() {
  return useQuery<FooterProps>({
    queryKey: ['footer'],
    queryFn: getFooter,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
}