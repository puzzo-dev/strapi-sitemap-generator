import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { usePageContent } from '@/hooks/useContent';
import { useCareersPageState } from '@/hooks/useCareersPageState';
// import { useERPNextJobListings } from '@/hooks/useERPNextContent';
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
  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const benefitsSection = displayPageContent?.sections?.find(s => s.type === 'custom') || { id: 0 };
  const jobsSection = displayPageContent?.sections?.find(s => s.type === 'jobs') || { id: 0 };

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl="https://itechnologies.ng/careers"
      ogImage="https://itechnologies.ng/careers-og-image.jpg"
      ogType="website"
      twitterCard="summary_large_image"
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
      animationType="fade"
    >
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
    </PageLayout>
  );
};

export default Careers;