import React, { useMemo } from 'react';
import { usePageContent } from '@/hooks/useStrapiContent';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { industriesPageContent as localIndustriesPageContent } from '@/lib/data/pages';
import { IndustryProps, TestimonialProps } from '@/lib/types/content';
import MetaTags from '@/components/seo/MetaTags';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { defaultSiteConfig } from '@/lib/data/config';

// Import section components
import {
  IndustriesHeroSection,
  IndustriesGridSection,
  IndustriesSolutionsSection,
  IndustriesTestimonialsSection,
  IndustriesCTASection
} from '@/components/sections/industries';

const Industries: React.FC = () => {
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Fetch page content from Strapi with fallback to local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('industries');

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localIndustriesPageContent;

  // Always get industries from the industries section's settings.featured
  const displayIndustries = useMemo((): IndustryProps[] => {
    const industriesSection = displayPageContent.sections?.find(s => s.type === 'industries');
    const featuredIndustries = industriesSection?.settings?.featured;
    if (featuredIndustries && Array.isArray(featuredIndustries)) {
      return featuredIndustries as IndustryProps[];
    }
    return [];
  }, [displayPageContent]);

  // Get testimonials from page content
  const testimonialsSection = displayPageContent.sections?.find(s => s.type === 'testimonials');
  const displayTestimonials = useMemo((): TestimonialProps[] => {
    if (testimonialsSection?.settings?.featured) {
      const featured = testimonialsSection.settings.featured;
      if (Array.isArray(featured) && featured.length > 0) {
        return featured as TestimonialProps[];
      } else if (typeof featured === 'object' && featured !== null && !Array.isArray(featured)) {
        return [featured as TestimonialProps];
      }
    }
    return [];
  }, [testimonialsSection]);

  // Generate SEO metadata
  const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
  const pageDescription = generateSeoDescription(displayPageContent.metaDescription);
  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const industriesSection = displayPageContent?.sections?.find(s => s.type === 'industries') || { id: 0 };
  const solutionsSection = displayPageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('Solutions')) || { id: 0 };
  const testimonialsSectionData = displayPageContent?.sections?.find(s => s.type === 'testimonials') || { id: 0 };
  const ctaSection = displayPageContent?.sections?.find(s => s.type === 'cta') || { id: 0 };

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`${defaultSiteConfig.siteUrl}/industries`}
        ogImage={`${defaultSiteConfig.siteUrl}/src/assets/images/IMG_2257.JPG`}
        ogUrl={`${defaultSiteConfig.siteUrl}/industries`}
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <IndustriesHeroSection
        {...heroSection}
        isLoading={isPageLoading}
      />

      {/* Industries Grid Section */}
      <IndustriesGridSection
        {...industriesSection}
        industries={displayIndustries}
        isLoading={isPageLoading}
      />

      {/* Solutions Section */}
      <IndustriesSolutionsSection
        {...solutionsSection}
        isLoading={isPageLoading}
      />

      {/* Testimonials Section */}
      <IndustriesTestimonialsSection
        {...testimonialsSectionData}
        testimonials={displayTestimonials}
        isLoading={isPageLoading}
      />

      {/* CTA Section */}
      <IndustriesCTASection
        {...ctaSection}
        isLoading={isPageLoading}
      />
    </>
  );
};

export default Industries; 