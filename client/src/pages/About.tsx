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
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('about-us');

  // Temporarily use fallback team data until ERPNext is configured
  const teamMembers = defaultTeamMembers;
  const isTeamLoading = false;

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localAboutPageContent;

  // Structured data
  const structuredData = generateOrganizationSchema();

  // Extract sections using unified helper with proper fallbacks to local data
  const heroSection = findSection(displayPageContent, 'hero') || findSection(localAboutPageContent, 'hero');
  const missionSection = displayPageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('Mission'))
    || localAboutPageContent.sections.find(s => s.type === 'custom' && s.title?.includes('Mission'));
  const featuresSection = findSection(displayPageContent, 'features') || findSection(localAboutPageContent, 'features');
  const teamSection = findSection(displayPageContent, 'team') || findSection(localAboutPageContent, 'team');
  const industriesSection = findSection(displayPageContent, 'industries') || findSection(localAboutPageContent, 'industries');
  const ctaSection = findSection(displayPageContent, 'cta') || findSection(localAboutPageContent, 'cta');

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl="https://itechnologies.ng/about-us"
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
        id={heroSection?.id || 0}
        title={heroSection?.title}
        subtitle={heroSection?.subtitle}
        settings={heroSection?.settings}
        isPageLoading={isPageLoading}
      />

      {/* Mission & Vision Section */}
      <MissionVisionSection
        id={missionSection?.id || 0}
        title={missionSection?.title}
        subtitle={missionSection?.subtitle}
        content={missionSection?.content}
        settings={missionSection?.settings}
        isPageLoading={isPageLoading}
      />

      {/* Core Values Section */}
      <CoreValuesSection
        id={featuresSection?.id || 0}
        title={featuresSection?.title}
        subtitle={featuresSection?.subtitle}
        content={featuresSection?.content}
        settings={featuresSection?.settings}
        isPageLoading={isPageLoading}
      />

      {/* Industries Section */}
      <IndustriesSection
        homePageContent={displayPageContent}
        industries={industries}
        isLoading={isPageLoading}
      />

      {/* Team Section */}
      <TeamSection
        id={teamSection?.id || 0}
        title={teamSection?.title}
        subtitle={teamSection?.subtitle}
        settings={teamSection?.settings}
        teamMembers={teamMembers}
        isTeamLoading={isTeamLoading}
      />

      {/* Call to Action Section */}
      <AboutCTA
        id={ctaSection?.id || 0}
        title={ctaSection?.title}
        subtitle={ctaSection?.subtitle}
        content={ctaSection?.content}
        settings={ctaSection?.settings}
        isPageLoading={isPageLoading}
      />
    </PageLayout>
  );
};
export default About;