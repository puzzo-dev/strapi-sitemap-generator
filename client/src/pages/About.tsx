import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { usePageContent } from '@/hooks/useContent';
// import { useERPNextTeamMembers } from '@/hooks/useERPNextContent';
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
  // Fetch page content from Strapi or use local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('about');

  // Temporarily use fallback team data until ERPNext is configured
  const teamMembers = defaultTeamMembers;
  const isTeamLoading = false;

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localAboutPageContent;

  // Structured data
  const structuredData = generateOrganizationSchema();

  // Extract sections using unified helper
  const heroSection = findSection(displayPageContent, 'hero') || { id: 0 };
  const missionSection = displayPageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('Mission')) || { id: 0 };
  const featuresSection = findSection(displayPageContent, 'features') || { id: 0 };
  const teamSection = findSection(displayPageContent, 'team') || { id: 0 };
  const industriesSection = findSection(displayPageContent, 'industries') || { id: 0 };
  const ctaSection = findSection(displayPageContent, 'cta') || { id: 0 };

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl="https://itechnologies.ng/about"
      ogImage="https://itechnologies.ng/about-og-image.jpg"
      ogType="website"
      twitterCard="summary_large_image"
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
      animationType="fade"
    >
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
    </PageLayout>
  );
};
export default About;