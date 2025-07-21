import React, { useMemo } from 'react';
import { useRoute } from 'wouter';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { usePageContent } from '@/hooks/useStrapiContent';
import { teamMemberDetailPageContent as localTeamMemberDetailPageContent } from '@/lib/data/pages';
import { TeamMember } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';
import MetaTags from '@/components/seo/MetaTags';

// Import section components
import {
  TeamMemberHeroSection,
  TeamMemberBioSection,
  TeamMemberProjectsSection,
  TeamMemberSidebarSection,
  TeamMemberRelatedSection,
  TeamMemberCTASection,
  TeamMemberNotFoundSection,
  TeamMemberLoadingSection
} from '@/components/sections/team-member';

const TeamMemberPage: React.FC = () => {
  const [, params] = useRoute('/team/:slug');
  const memberSlug = params?.slug;
  const { generateSeoTitle, generateSeoDescription, getCanonicalUrl, getOgImage, siteConfig } = useSeoHelpers();

  // Fetch page content from Strapi or use fallback
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('team-member-detail');
  const displayPageContent = pageContent || localTeamMemberDetailPageContent;

  // Get team members from page content settings ONLY
  const teamMembers = useMemo(() => {
    return displayPageContent?.sections?.[0]?.settings?.teamMembers || [];
  }, [displayPageContent]);

  // Find team member by slug from page content team members
  const member = useMemo(() => {
    return teamMembers.find((member: TeamMember) => member.slug === memberSlug);
  }, [memberSlug, teamMembers]);

  // SEO metadata
  const pageTitle = useMemo(() => {
    if (!member) return `Team Member Not Found | ${siteConfig.siteName}`;
    return generateSeoTitle(`${member.name} - ${member.role || member.position} | Our Team`);
  }, [member, generateSeoTitle, siteConfig.siteName]);

  const pageDescription = useMemo(() => {
    if (!member) return 'The requested team member could not be found.';
    return generateSeoDescription(
      `Meet ${member.name}, ${member.role || member.position} at ${siteConfig.siteName}. ${member.bio ? member.bio.substring(0, 150) + '...' : ''}`
    );
  }, [member, generateSeoDescription, siteConfig.siteName]);

  // Generate structured data for team member
  const structuredData = useMemo(() => {
    if (!member) return undefined;

    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role || member.position,
      "worksFor": {
        "@type": "Organization",
        "name": siteConfig.siteName,
        "url": siteConfig.siteUrl
      },
      "email": member.email,
      "telephone": member.phone,
      "image": member.image,
      "url": getCanonicalUrl(`/team/${member.slug}`),
      "sameAs": member.socialLinks?.map((s: any) => s.href).filter(Boolean) || []
    };
  }, [member, siteConfig, getCanonicalUrl]);

  // Show loading state
  if (!memberSlug) {
    return (
      <>
        <MetaTags
          title={`Loading Team Member | ${siteConfig.siteName}`}
          description="Loading team member information..."
          canonicalUrl={getCanonicalUrl(`/team/${memberSlug}`)}
        />
        <TeamMemberLoadingSection />
      </>
    );
  }

  // Handle not found case
  if (!member) {
    return (
      <>
        <MetaTags
          title={`Team Member Not Found | ${siteConfig.siteName}`}
          description="The requested team member could not be found."
          canonicalUrl={getCanonicalUrl(`/team/${memberSlug}`)}
        />
        <TeamMemberNotFoundSection />
      </>
    );
  }

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={[
          'team member',
          member?.name || '',
          member.role || member.position || '',
          siteConfig.siteName,
          'team',
          'staff'
        ]}
        canonicalUrl={getCanonicalUrl(`/team/${member.slug}`)}
        ogImage={getOgImage(member.image, '/og-team.jpg')}
        ogUrl={getCanonicalUrl(`/team/${member.slug}`)}
        ogType="profile"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />

      <main>
        {/* Hero Section */}
        <TeamMemberHeroSection
          member={member}
          isLoading={isPageLoading}
          pageContent={displayPageContent}
        />

        {/* Main Content */}
        <section className="content-section bg-white dark:bg-[#132f4c]">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main content */}
              <div className="lg:col-span-8">
                {/* Bio Section */}
                <TeamMemberBioSection
                  member={member}
                  isLoading={isPageLoading}
                  pageContent={displayPageContent}
                />

                {/* Projects Section */}
                <TeamMemberProjectsSection
                  member={member}
                  isLoading={isPageLoading}
                  pageContent={displayPageContent}
                />
              </div>

              {/* Sidebar */}
              <TeamMemberSidebarSection
                member={member}
                isLoading={isPageLoading}
                pageContent={displayPageContent}
              />
            </div>
          </div>
        </section>

        {/* Related Team Members Section */}
        <TeamMemberRelatedSection
          isLoading={isPageLoading}
          pageContent={displayPageContent}
        />

        {/* CTA Section */}
        <TeamMemberCTASection
          member={member}
          isLoading={isPageLoading}
          pageContent={displayPageContent}
        />
      </main>
    </>
  );
};

export default TeamMemberPage;