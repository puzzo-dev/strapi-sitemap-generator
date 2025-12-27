import React from 'react';
import { useParams } from 'wouter';
import { useServiceDetailBySlug, useSiteConfig } from '@/hooks/useContent';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { services } from '@/lib/data/services';

// Import section components
import {
  DynamicBlockRenderer,
  ServiceDetailErrorSection,
  ServiceDetailLoadingSection
} from '@/components/sections/serviceDetail';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();

  // Fetch service data from Strapi by slug (with fallback to local data)
  const { data: cmsServiceDetail, isLoading: isServiceLoading, error } = useServiceDetailBySlug(slug || '');
  const { data: siteConfig, isLoading: isSiteConfigLoading } = useSiteConfig();

  // Fallback to local service data if CMS unavailable
  const fallbackService = services.find(s => s.slug === slug);
  const serviceDetail = cmsServiceDetail || fallbackService;

  // Generate structured data
  const structuredData = generateOrganizationSchema();

  // Loading state
  if (isServiceLoading || isSiteConfigLoading) {
    return <ServiceDetailLoadingSection />;
  }

  // If no service data available at all, show error
  if (!serviceDetail) {
    return <ServiceDetailErrorSection />;
  }

  // Extract SEO data from service detail
  const seoData = serviceDetail.seo || {};
  const blocks = serviceDetail.block || [];
  const usingSiteConfigFallback = !siteConfig;

  return (
    <PageLayout
      title={seoData.metaTitle || serviceDetail.title}
      description={seoData.metaDescription || serviceDetail.description}
      canonicalUrl={`${siteConfig?.siteUrl || 'https://www.itechnologies.ng'}/services/${slug}`}
      ogImage={seoData.ogImage?.url}
      pageContent={serviceDetail}
      isLoading={false}
      structuredData={structuredData}
    >
      {/* Dynamic Block Renderer - Maps Strapi blocks to React components */}
      <DynamicBlockRenderer
        blocks={blocks}
        serviceData={serviceDetail}
        siteConfig={siteConfig || { siteUrl: 'https://www.itechnologies.ng' }}
      />
    </PageLayout>
  );
};

export default ServiceDetail;