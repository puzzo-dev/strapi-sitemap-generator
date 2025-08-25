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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {projectsSection?.title || projectsSection?.settings?.teamMemberContent?.projects?.title || "Key Projects"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium whitespace-nowrap ml-2">
                                    {project.subtitle || project.year}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TeamMemberProjectsSection;