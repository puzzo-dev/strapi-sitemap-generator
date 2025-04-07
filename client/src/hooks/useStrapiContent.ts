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
  getServices,
  getTestimonials,
  getClientLogos,
  getJobListings,
  getJobById,
  getBenefits
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
  Benefit
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
 * This hook fetches multiple hero headers and content from Strapi
 */
export function useDynamicHeroContent() {
  const { data: pageContent, isLoading, error } = usePageContent('home');
  
  // Extract all hero sections if they exist, otherwise return a default entry
  const heroContents = useMemo(() => {
    if (!pageContent || !pageContent.sections) {
      return [{ 
        title: 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES',
        subtitle: 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
      }];
    }
    
    // Get all hero sections from the CMS
    // First, find all hero sections
    const primaryHeroSections = pageContent.sections.filter(section => 
      section.type === 'hero'
    );
    
    // Then try to find any additional sections that might have hero content variants
    // This checks for sections that might be tagged differently but contain hero content
    const additionalHeroSections = pageContent.sections.filter(section => 
      section.settings?.isHeroVariant === true || 
      section.title?.includes('Hero') ||
      section.settings?.displayAsHero === true
    );
    
    // Combine all hero sections
    const allHeroSections = [...primaryHeroSections, ...additionalHeroSections];
    
    // If no hero sections are found, return the default
    if (allHeroSections.length === 0) {
      return [{ 
        title: 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES',
        subtitle: 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
      }];
    }
    
    // Map the hero sections to the format we need
    return allHeroSections.map(section => ({
      title: section.title || 'INNOVATIVE DIGITAL SOLUTIONS',
      subtitle: section.subtitle || 'Elevate your business with our cutting-edge digital solutions.',
      settings: section.settings || {},
    }));
  }, [pageContent]);

  return {
    heroContents,
    isLoading,
    error
  };
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