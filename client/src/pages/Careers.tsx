import React from 'react';
import { usePageContent } from '@/hooks/useStrapiContent';
import { useCareersPageState } from '@/hooks/useCareersPageState';
// import { useERPNextJobListings } from '@/hooks/useERPNextContent';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { careersPageContent as localCareersPageContent } from '@/lib/data/pages';
import { PageContent } from '@/lib/types/core';

// Import section components
import {
  CareersHeroSection,
  BenefitsSection,
  OpenPositionsSection,
  WhyJoinUsSection,
  CareersCTASection
} from '@/components/sections/careers';

const Careers: React.FC = () => {
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Use enhanced careers page state hook
  const {
    jobListings: jobListingsData,
    isJobsLoading,
    showExpressionForm: isFormVisible,
    showExpressionFormAction,
    hideExpressionForm,
    markFormAsSubmitted,
    resetFormState
  } = useCareersPageState();

  // Fetch page content from Strapi or use local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('careers');

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localCareersPageContent;

  // Generate SEO metadata
  const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
  const pageDescription = generateSeoDescription(displayPageContent.metaDescription);
  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const benefitsSection = displayPageContent?.sections?.find(s => s.type === 'custom') || { id: 0 };
  const jobsSection = displayPageContent?.sections?.find(s => s.type === 'jobs') || { id: 0 };

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://itechnologies.ng/careers"
        ogImage="https://itechnologies.ng/careers-og-image.jpg"
        ogUrl="https://itechnologies.ng/careers"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <CareersHeroSection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
      />

      {/* Benefits Section */}
      <BenefitsSection
        benefits={(benefitsSection?.settings?.items || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon || 'Award' // Provide default icon if missing
        }))}
        isLoading={isPageLoading}
        pageContent={displayPageContent}
      />

      {/* Open Positions Section - Using fallback data temporarily */}
      <OpenPositionsSection
        jobListings={jobListingsData || []}
        isLoading={isJobsLoading}
        pageContent={displayPageContent}
      />

      {/* CTA Section */}
      <CareersCTASection
        pageContent={displayPageContent}
        isLoading={isPageLoading}
        showExpressionForm={isFormVisible}
        onShowExpressionForm={showExpressionFormAction}
        onHideExpressionForm={hideExpressionForm}
      />
    </>
  );
};

export default Careers;