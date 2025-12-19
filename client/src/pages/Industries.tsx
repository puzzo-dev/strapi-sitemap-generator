import React, { useMemo } from 'react';
import { usePageContent } from '@/hooks/useContent';
import { industriesPageContent as localIndustriesPageContent } from '@/lib/data/pages';
import { industries } from '@/lib/data/industries';
import { IndustryProps } from '@/lib/types/content';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { defaultSiteConfig } from '@/lib/data/config';

// Import section components
import {
  IndustriesHeroSection,
  IndustriesGridSection,
  IndustriesSolutionsSection,
  IndustriesCTASection,
  IndustriesContentSection
} from '@/components/sections/industries';

const Industries: React.FC = () => {
  // Fetch page content from Strapi with fallback to local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('industries');

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localIndustriesPageContent;

  // Always get industries from the industries section's settings.featured
  const displayIndustries = useMemo((): IndustryProps[] => {
    const industriesSection = displayPageContent.sections?.find(s => s.type === 'industries');
    const featuredIndustries = industriesSection?.settings?.featured;
    if (featuredIndustries && Array.isArray(featuredIndustries) && featuredIndustries.length > 0) {
      return featuredIndustries as IndustryProps[];
    }
    // Fallback to direct import if extraction fails
    return industries;
  }, [displayPageContent]);

  // Generate SEO metadata
  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const contentSection = displayPageContent?.sections?.find(s => s.type === 'custom' && s.id === 2) || { id: 0 };
  const industriesSection = displayPageContent?.sections?.find(s => s.type === 'industries') || { id: 0 };
  const solutionsSection = displayPageContent?.sections?.find(s => s.type === 'custom' && s.id === 4) || { id: 0 };
  const ctaSection = displayPageContent?.sections?.find(s => s.type === 'cta') || { id: 0 };

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl={`${defaultSiteConfig.siteUrl}/industries`}
      ogImage={`${defaultSiteConfig.siteUrl}/src/assets/images/IMG_2257.JPG`}
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <IndustriesHeroSection
        {...heroSection}
        isLoading={isPageLoading}
      />

      {/* Content Section */}
      <IndustriesContentSection
        pageContent={displayPageContent}
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

      {/* CTA Section */}
      <IndustriesCTASection
        {...ctaSection}
        isLoading={isPageLoading}
      />
    </PageLayout>
  );
};

export default Industries; 