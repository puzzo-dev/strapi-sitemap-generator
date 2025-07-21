import React, { useMemo } from 'react';
import { TeamMember } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberProjectsSectionProps {
    member: TeamMember;
    isLoading?: boolean;
    pageContent?: PageContent;
}

const TeamMemberProjectsSection: React.FC<TeamMemberProjectsSectionProps> = ({ 
    member, 
    isLoading = false, 
    pageContent 
}) => {
    // Get projects section from page content
    const projectsSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title === 'Key Projects');
    
    // Get team members from page content settings
    const teamMembers = useMemo(() => {
        return pageContent?.sections?.[0]?.settings?.teamMembers || [];
    }, [pageContent]);

    // Get current member from page content if not provided
    const currentMember = useMemo(() => {
        if (member) return member as TeamMember;
        return teamMembers[0] as TeamMember;
    }, [member, teamMembers]);

    if (isLoading || !currentMember || !currentMember.projects) {
        return null;
    }

    // Handle both array and object with items property
    const projects = Array.isArray(currentMember.projects) 
        ? currentMember.projects 
        : currentMember.projects.items || [];

    if (projects.length === 0) {
        return null;
    }

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6">
                {projectsSection?.title || projectsSection?.settings?.teamMemberContent?.projects?.title || "Key Projects"}
            </h2>
            <div className="space-y-6">
                {projects.map((project, index) => (
                    <Card key={index} className="border-l-4 border-blue-500">
                        <CardContent className="pl-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                {project.description}
                            </p>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                {project.subtitle || project.year}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TeamMemberProjectsSection;