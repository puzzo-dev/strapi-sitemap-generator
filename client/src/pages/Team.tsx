import React from 'react';
import { usePageContent } from '@/hooks/useContent';
// import { useERPNextTeamMembers } from '@/hooks/useERPNextContent';
import { defaultTeamMembers } from '@/lib/data/team';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { teamPageContent as localTeamPageContent } from '@/lib/data/pages';
import { PageContent } from '@/lib/types/core';

// Import section components
import {
  TeamHero,
  TeamGrid,
  TeamCTA
} from '@/components/sections/team';

const Team: React.FC = () => {
  // Fetch page content from Strapi or use local data
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('team');

  // Use fallback team data (temporarily until ERPNext is configured)
  const teamMembers = defaultTeamMembers;
  const isTeamLoading = false;

  // Use local page content if Strapi data is not available
  const displayPageContent = pageContent || localTeamPageContent;

  const structuredData = generateOrganizationSchema();

  // Extract sections with fallback to local data
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero')
    || localTeamPageContent.sections.find(s => s.type === 'hero');
  const teamSection = displayPageContent?.sections?.find(s => s.type === 'team')
    || localTeamPageContent.sections.find(s => s.type === 'team');
  const ctaSection = displayPageContent?.sections?.find(s => s.type === 'cta')
    || localTeamPageContent.sections.find(s => s.type === 'cta');

  return (
    <PageLayout
      title={displayPageContent.metaTitle}
      description={displayPageContent.metaDescription}
      canonicalUrl="https://itechnologies.ng/team"
      ogImage="https://itechnologies.ng/team-og-image.jpg"
      pageContent={displayPageContent}
      isLoading={isPageLoading}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <TeamHero
        id={heroSection?.id || 0}
        title={heroSection?.title}
        subtitle={heroSection?.subtitle}
        content={heroSection?.content}
        settings={heroSection?.settings}
        isPageLoading={isPageLoading}
      />

      {/* Team Grid Section */}
      <TeamGrid id={teamSection?.id || 0} title={teamSection?.title}
        subtitle={teamSection?.subtitle}
        content={teamSection?.content}
        settings={teamSection?.settings}
        teamMembers={teamMembers}
        isTeamLoading={isTeamLoading}
      />

      {/* Call to Action Section */}
      <TeamCTA
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

export default Team; 