import React from 'react';
import { usePageContent, useTeamMembers } from '@/hooks/useStrapiContent';

// Import section components
import {
  AboutHero,
  MissionVisionSection,
  CoreValuesSection,
  TeamSection,
  AboutCTA
} from '@/components/sections/about';

const About: React.FC = () => {
  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('about');

  // Fetch team members from Strapi
  const { data: teamMembers, isLoading: isTeamLoading } = useTeamMembers();

  // Extract sections
  const heroSection = pageContent?.sections?.find(s => s.type === 'hero') || { id: 0 };
  const missionSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('Mission')) || { id: 0 };
  const featuresSection = pageContent?.sections?.find(s => s.type === 'features') || { id: 0 };
  const teamSection = pageContent?.sections?.find(s => s.type === 'team') || { id: 0 };
  const ctaSection = pageContent?.sections?.find(s => s.type === 'cta') || { id: 0 };

  return (
    <>
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

      {/* Call to Action Section */}
      <AboutCTA
        {...ctaSection}
        isPageLoading={isPageLoading}
      />
    </>
  );
};
export default About;