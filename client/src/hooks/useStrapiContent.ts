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
  getClientLogos,
  getJobListings,
  getJobById,
  getBenefits,
  getBlogPosts,
  getBlogPostBySlug,
  getBlogCategories,
  getFooter,
  getBlogComments,
  getHeroSlides,
  getHeroContent
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
  FAQPageContent
} from '@/lib/types';

/**
 * Custom hook to fetch navigation menu items
 */
export function useNavigation() {
  return useQuery<NavItem[]>({
    queryKey: ['navigation'],
    queryFn: getNavItems
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
    queryFn: () => getPageContent(slug)
  });
}

/**
 * Custom hook to fetch dynamic hero content
 * This hook fetches hero slides directly from Strapi
 /**
 * Custom hook to fetch dynamic hero content
 */
// export function useDynamicHeroContent() {
//   return useQuery<HeroSlide>({
//     queryKey: ['hero-content'],
//     queryFn: async () => {
//       try {
//         const { getHeroSlides } = await import('@/lib/strapi');
//         const slides = await getHeroSlides();

//         // Select one slide - you can implement different selection strategies:
//         // 1. Random selection
//         const randomIndex = Math.floor(Math.random() * slides.length);
//         return slides[randomIndex];
//       } catch (error) {
//         console.error('Error loading hero slides:', error);
//         const { defaultHeroProps } = require('@/lib/data');
//         // Return just one default hero prop
//         return Array.isArray(defaultHeroProps) 
//           ? defaultHeroProps[Math.floor(Math.random() * defaultHeroProps.length)] 
//           : defaultHeroProps;
//       }
//     }
//   });
// }

/**
 * Custom hook to fetch complete hero content
 * This hook fetches the full hero content including slides, services, and products
 */
export function useHeroContent() {
  return useQuery<HeroProps>({
    queryKey: ['hero-complete-content'],
    queryFn: async () => {
      const { getHeroContent } = await import('@/lib/strapi');
      return getHeroContent();
    }
  });
}

/**
 * Custom hook to fetch team members
 */
export function useTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ['team-members'],
    queryFn: getTeamMembers
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
 * Custom hook to fetch client logos
 */
export function useClientLogos() {
  return useQuery<ClientLogo[]>({
    queryKey: ['client-logos'],
    queryFn: getClientLogos
  });
}

/**
 * Custom hook to fetch job listings
 */
export function useJobListings() {
  return useQuery<JobListing[]>({
    queryKey: ['job-listings'],
    queryFn: getJobListings
  });
}

/**
 * Custom hook to fetch job by ID
 */
export function useJobById(id: number) {
  return useQuery<JobListing | undefined>({
    queryKey: ['job-listings', id],
    queryFn: () => getJobById(id),
    enabled: !!id
  });
}

/**
 * Custom hook to fetch benefits
 */
export function useBenefits() {
  return useQuery<Benefit[]>({
    queryKey: ['benefits'],
    queryFn: getBenefits
  });
}

/**
 * Custom hook to fetch blog posts
 */
export function useBlogPosts(params?: {
  limit?: number;
  category?: string;
  featured?: boolean;
  tag?: string;
}) {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts', params],
    queryFn: () => getBlogPosts(params || {}),
  });
}

/**
 * Custom hook to fetch a blog post by slug
 */
export function useBlogPostBySlug(slug: string) {
  return useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug, // Only run the query if a slug is provided
  });
}

/**
 * Custom hook to fetch blog categories
 */
export function useBlogCategories() {
  return useQuery<BlogCategory[]>({
    queryKey: ['blog-categories'],
    queryFn: getBlogCategories,
  });
}

/**
 * Custom hook to fetch blog comments for a post
 */
/**
 * Custom hook to fetch blog comments for a post
 */
export function useBlogComments(postId: string) {
  return useQuery<BlogComment[]>({
    queryKey: ['blog-comments', postId],
    queryFn: () => getBlogComments(postId),
    enabled: !!postId, // Only run the query if a postId is provided
  });
}

/**
 * Custom hook to fetch footer data
 */
export function useFooter() {
  return useQuery<FooterProps>({
    queryKey: ['footer'],
    queryFn: getFooter
  });
}