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
  const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const teamSection = displayPageContent?.sections?.find(s => s.type === 'team') || { id: 0 };
  const ctaSection = displayPageContent?.sections?.find(s => s.type === 'cta') || { id: 0 };

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
        {...heroSection}
        isPageLoading={isPageLoading}
      />

      {/* Team Grid Section */}
      <TeamGrid
        {...teamSection}
        teamMembers={teamMembers}
        isTeamLoading={isTeamLoading}
      />

      {/* Call to Action Section */}
      <TeamCTA
        {...ctaSection}
        isPageLoading={isPageLoading}
      />
    </PageLayout>
  );
};

export default Team; 