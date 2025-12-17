import React, { useMemo } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { usePageContent } from '@/hooks/useContent';
import { servicesPageContent as localServicesPageContent } from '@/lib/data/pages';
import { services as fallbackServices } from '@/lib/data';
import { testimonials } from '@/lib/data/testimonials';
import { ServiceProps, TestimonialProps } from '@/lib/types/content';

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
  // Use fallback data temporarily until Strapi is configured
  const isServicesLoading = false;
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('services');

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localServicesPageContent;

  // Use fallback services data
  const displayServices = fallbackServices;

  // Get testimonials from page content with fallback to direct import
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
    // Fallback to direct import if extraction fails
    return testimonials;
  }, [testimonialsSection]);

  // Generate structured data for services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "I-Varse Technologies Services",
    "description": displayPageContent.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "I-Varse Technologies",
      "url": "https://itechnologies.ng"
    },
    "serviceType": "Technology Services",
    "areaServed": "Nigeria"
  };

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
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
      ogType="website"
      twitterCard="summary_large_image"
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
      animationType="fade"
    >
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
    </PageLayout>
  );
};

export default Services;
