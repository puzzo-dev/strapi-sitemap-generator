import { useQuery } from '@tanstack/react-query';
import {
  getNavItems,
  getSocialLinks,
  getFooterColumns,
  getSiteConfig,
  getPageContent,
  getTeamMembers,
  getProducts,
  getServices,
  getTestimonials
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
  TestimonialProps
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
 * Custom hook to fetch testimonials
 */
export function useTestimonials() {
  return useQuery<TestimonialProps[]>({
    queryKey: ['testimonials'],
    queryFn: getTestimonials
  });
}