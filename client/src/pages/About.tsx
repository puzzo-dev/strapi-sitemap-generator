import React from 'react';
import { usePageContent } from '@/hooks/useStrapiContent';
// import { useERPNextTeamMembers } from '@/hooks/useERPNextContent';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { aboutPageContent as localAboutPageContent } from '@/lib/data/pages';
import { industries } from '@/lib/data/industries';
import { defaultTeamMembers } from '@/lib/data/team';
import { findSection } from '@/lib/utils/section-helpers';

// Import section components
import {
  AboutHero,
  MissionVisionSection,
  CoreValuesSection,
  TeamSection,
  AboutCTA
} from '@/components/sections/about';
import IndustriesSection from '@/components/sections/home/IndustriesSection';

const About: React.FC = () => {
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Fetch page content from Strapi or use local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('about');

  // Temporarily use fallback team data until ERPNext is configured
  const teamMembers = defaultTeamMembers;
  const isTeamLoading = false;

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localAboutPageContent;

  // Generate SEO metadata
  const pageTitle = generateSeoTitle(displayPageContent.metaTitle);
  const pageDescription = generateSeoDescription(displayPageContent.metaDescription);
  const structuredData = generateOrganizationSchema();

  // Extract sections using unified helper
  const heroSection = findSection(displayPageContent, 'hero') || { id: 0 };
  const missionSection = displayPageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('Mission')) || { id: 0 };
  const featuresSection = findSection(displayPageContent, 'features') || { id: 0 };
  const teamSection = findSection(displayPageContent, 'team') || { id: 0 };
  const industriesSection = findSection(displayPageContent, 'industries') || { id: 0 };
  const ctaSection = findSection(displayPageContent, 'cta') || { id: 0 };

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://itechnologies.ng/about"
        ogImage="https://itechnologies.ng/about-og-image.jpg"
        ogUrl="https://itechnologies.ng/about"
        ogType="website"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <AboutHero
        {...heroSection}
        isPageLoading={isPageLoading}
      />

      {/* Mission & Vision Section */}
      <MissionVisionSection
        {...missionSection}
        isPageLoading={isPageLoading}
      />

      {/* Core Values Section */}
      <CoreValuesSection
        {...featuresSection}
        isPageLoading={isPageLoading}
      />

      {/* Team Section */}
      <TeamSection
        {...teamSection}
        teamMembers={teamMembers}
        isTeamLoading={isTeamLoading}
      />

      {/* Industries Section */}
      <IndustriesSection
        homePageContent={displayPageContent}
        industries={industries}
        isLoading={isPageLoading}
      />

      {/* Call to Action Section */}
      <AboutCTA
        {...ctaSection}
        isPageLoading={isPageLoading}
      />
    </>
  );
};
export default About;