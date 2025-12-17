import React from 'react';
import { useParams } from 'wouter';
import { useProjectDetailBySlug, useSiteConfig } from '@/hooks/useContent';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { products } from '@/lib/data/solutions';

// Import section components from solution folder
import {
  DynamicBlockRenderer,
  ProductDetailErrorSection,
  ProductDetailLoadingSection
} from '@/components/sections/solution';

const SolutionDetail: React.FC = () => {
  const { slug } = useParams();

  // Fetch solution data from Strapi by slug (with fallback to local data)
  const { data: cmsSolutionDetail, isLoading: isSolutionLoading, error } = useProjectDetailBySlug(slug || '');
  const { data: siteConfig, isLoading: isSiteConfigLoading } = useSiteConfig();

  // Fallback to local solution data if CMS unavailable
  const fallbackSolution = products.find(s => s.slug === slug);
  const solutionDetail = cmsSolutionDetail || fallbackSolution;

  // Generate structured data
  const structuredData = generateOrganizationSchema();

  // Loading state
  if (isSolutionLoading || isSiteConfigLoading) {
    return <ProductDetailLoadingSection />;
  }

  // If no solution data available at all, show error
  if (!solutionDetail) {
    return <ProductDetailErrorSection pageContent={undefined} />;
  }

  // Extract SEO data from solution detail
  const seoData = solutionDetail.seo || {};
  const blocks = solutionDetail.block || [];

  return (
    <PageLayout
      title={seoData.metaTitle || solutionDetail.title}
      description={seoData.metaDescription || solutionDetail.description}
      canonicalUrl={`${siteConfig?.siteUrl || 'https://www.itechnologies.ng'}/solutions/${slug}`}
      ogImage={seoData.ogImage?.url}
      pageContent={solutionDetail}
      isLoading={false}
      structuredData={structuredData}
    >
      {/* Dynamic Block Renderer - Maps Strapi blocks to React components */}
      <DynamicBlockRenderer
        blocks={blocks}
        projectData={solutionDetail}
        siteConfig={siteConfig || { siteUrl: 'https://www.itechnologies.ng' }}
      />
    </PageLayout>
  );
};

export default SolutionDetail;