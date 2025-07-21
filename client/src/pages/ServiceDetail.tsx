import React, { useMemo } from 'react';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { useServiceById, useSiteConfig, usePageContent } from '@/hooks/useStrapiContent';
import MetaTags from '@/components/seo/MetaTags';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { serviceDetailPageContent as localServiceDetailPageContent } from '@/lib/data/pages';
import { defaultSiteConfig, services as localServices } from '@/lib/data/';
import { PageContent } from '@/lib/types/core';
import { ServiceProps } from '@/lib/types/content';

// Import section components
import {
  ServiceDetailHeroSection,
  ServiceDetailDescriptionSection,
  ServiceDetailBenefitsSection,
  ServiceDetailProcessSection,
  ServiceDetailCaseStudiesSection,
  ServiceDetailFAQSection,
  ServiceDetailCTASection,
  ServiceDetailErrorSection
} from '@/components/sections/serviceDetail';

// Transform service data to match component expectations
const transformServiceForComponents = (service: ServiceProps) => {
  if (!service) return null;

  return {
    ...service,
    // Transform benefits from PageSection to string array
    benefits: service.benefits?.items?.map(item => item.title) || [
      "Improved operational efficiency",
      "Cost optimization and reduced overhead",
      "Enhanced security and compliance",
      "Scalable solutions for business growth",
      "Competitive advantage in your market",
      "Expert support and maintenance"
    ],
    // Transform case studies from PageSection to array
    casestudies: service.casestudies?.items?.map(item => ({
      title: item.title,
      description: item.description,
      result: item.description // Using description as result for now
    })) || [],
    // Transform FAQs from PageSection to array
    faqs: service.faqs?.items?.map(item => ({
      question: item.title,
      answer: item.description
    })) || []
  };
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Fetch page content from Strapi or use fallback
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('service-detail');
  const displayPageContent = pageContent || localServiceDetailPageContent;

  // Find service by slug from local services
  const matchedService = useMemo(() => {
    return localServices.find((service: ServiceProps) => service.slug === slug);
  }, [slug]);

  // Fetch service data from Strapi or use matched local service
  const { data: service, isLoading: isServiceLoading, error } = useServiceById(matchedService?.id || 0);
  const { data: siteConfig } = useSiteConfig();

  // Use service data from Strapi or fallback to matched local service
  const rawService = service || matchedService;
  const displaySiteConfig = siteConfig || defaultSiteConfig;

  // Transform service data for components
  const displayService = useMemo(() => {
    if (!rawService) return null;
    return transformServiceForComponents(rawService) as any;
  }, [rawService]);

  // Generate structured data
  const structuredData = generateOrganizationSchema();

  // Prepare SEO metadata
  const pageTitle = generateSeoTitle(displayService?.title ? `${displayService.title} - I-VARSE Technologies` : 'Service Details - I-VARSE Technologies');
  const pageDescription = generateSeoDescription(displayService?.description || 'Learn more about our comprehensive services and how they can benefit your business');

  // Render error state or service not found
  if (error || !displayService) {
    return <ServiceDetailErrorSection pageContent={displayPageContent} />;
  }

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`${displaySiteConfig.siteUrl}/services/${slug}`}
        ogImage={displayService.image || `${displaySiteConfig.siteUrl}/og-service.jpg`}
        ogUrl={`${displaySiteConfig.siteUrl}/services/${slug}`}
        ogType="website"
        twitterCard="summary_large_image"
        keywords={[
          displayService.title,
          'digital solutions',
          'technology services',
          'I-VARSE Technologies',
          'web development',
          'mobile apps',
          'cloud solutions'
        ]}
        alternateLanguages={[
          { lang: 'en', url: `${displaySiteConfig.siteUrl}/services/${slug}` },
          { lang: 'yo', url: `${displaySiteConfig.siteUrl}/yo/services/${slug}` },
          { lang: 'ig', url: `${displaySiteConfig.siteUrl}/ig/services/${slug}` },
          { lang: 'ha', url: `${displaySiteConfig.siteUrl}/ha/services/${slug}` },
          { lang: 'fr', url: `${displaySiteConfig.siteUrl}/fr/services/${slug}` },
          { lang: 'es', url: `${displaySiteConfig.siteUrl}/es/services/${slug}` },
          { lang: 'sw', url: `${displaySiteConfig.siteUrl}/sw/services/${slug}` }
        ]}
        structuredData={structuredData}
      />

        {/* Hero Section */}
      <ServiceDetailHeroSection 
        service={displayService as any}
      />

      {/* Description Section */}
      <ServiceDetailDescriptionSection 
        service={displayService as any}
      />

        {/* Benefits Section */}
      <ServiceDetailBenefitsSection 
        service={displayService as any}
      />

      {/* Process Section */}
      <ServiceDetailProcessSection 
        service={displayService as any}
      />

      {/* Case Studies Section */}
      <ServiceDetailCaseStudiesSection 
        service={displayService as any}
      />

      {/* FAQ Section */}
      <ServiceDetailFAQSection 
        service={displayService as any}
      />

        {/* CTA Section */}
      <ServiceDetailCTASection 
        service={displayService as any}
        siteConfig={displaySiteConfig}
      />
    </>
  );
};

export default ServiceDetail;