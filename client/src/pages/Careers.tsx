import React from 'react';
import { usePageContent, useJobListings } from '@/hooks/useStrapiContent';
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

  // Fetch page content from Strapi or use local data
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('careers');

  // Fetch job listings from ERPNext (as requested)
  const { data: jobListings, isLoading: isJobsLoading } = useJobListings();

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
                benefits={benefitsSection?.settings?.items || []}
                isLoading={isPageLoading}
                pageContent={displayPageContent}
            />

      {/* Open Positions Section - Using ERPNext data as requested */}
      <OpenPositionsSection
        jobListings={jobListings || []}
        isLoading={isJobsLoading}
        pageContent={displayPageContent}
      />

            {/* CTA Section */}
            <CareersCTASection
              pageContent={displayPageContent}
              isLoading={isJobsLoading}
            />
        </>
    );
};

export default Careers;