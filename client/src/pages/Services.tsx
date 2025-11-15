import React, { useMemo } from 'react';
import { usePageContent } from '@/hooks/useContent';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { servicesPageContent as localServicesPageContent } from '@/lib/data/pages';
import { services as fallbackServices } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types/content';
import MetaTags from '@/components/seo/MetaTags';

// Import section components
import {
  ServicesHeroSection,
  ServicesGridSection,
  ProcessSection,
  ServicesCaseStudiesSection,
  ServicesTestimonialsSection,
  ServicesCTASection
} from '@/components/sections/services';

const Services: React.FC = () => {
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Use fallback data temporarily until Strapi is configured
  const isServicesLoading = false;
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('services');

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localServicesPageContent;

  // Use fallback services data
  const displayServices = fallbackServices;

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

  // SEO metadata
  const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
  const pageDescription = generateSeoDescription(displayPageContent.metaDescription);

  // Generate structured data for services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "I-Varse Technologies Services",
    "description": pageDescription,
    "provider": {
      "@type": "Organization",
      "name": "I-Varse Technologies",
      "url": "https://itechnologies.ng"
    },
    "serviceType": "Technology Services",
    "areaServed": "Nigeria"
  };

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={[
          'professional services',
          'digital solutions',
          'technology services',
          'business solutions',
          'I-Varse Technologies',
          'Nigeria tech company'
        ]}
        canonicalUrl="https://itechnologies.ng/services"
        ogImage="https://itechnologies.ng/og-services.jpg"
        ogUrl="https://itechnologies.ng/services"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <ServicesHeroSection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Services Grid Section */}
      <ServicesGridSection
        services={displayServices}
        isLoading={isServicesLoading}
      />

      {/* Process Section */}
      <ProcessSection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Case Studies Section */}
      <ServicesCaseStudiesSection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Testimonials Section */}
      <ServicesTestimonialsSection
        testimonials={displayTestimonials}
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* CTA Section */}
      <ServicesCTASection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />
    </>
  );
};

export default Services;
