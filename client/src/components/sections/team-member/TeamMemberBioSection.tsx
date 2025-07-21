import React, { useMemo } from 'react';
import { TeamMember } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';

interface TeamMemberBioSectionProps {
  member: TeamMember;
  isLoading?: boolean;
  pageContent?: PageContent;
}

const TeamMemberBioSection: React.FC<TeamMemberBioSectionProps> = ({ 
  member, 
  isLoading = false, 
  pageContent 
}) => {
  // Get bio section from page content
  const bioSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title === 'About');
  
  // Get team members from page content settings
  const teamMembers = useMemo(() => {
    return pageContent?.sections?.[0]?.settings?.teamMembers || [];
  }, [pageContent]);

  // Get current member from page content if not provided
  const currentMember = useMemo(() => {
    if (member) return member as TeamMember;
    return teamMembers[0] as TeamMember;
  }, [member, teamMembers]);

  if (isLoading || !currentMember) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6">
        {bioSection?.title || bioSection?.settings?.teamMemberContent?.bio?.title || "About"}
      </h2>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {bioSection?.content || currentMember.bio}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberBioSection;