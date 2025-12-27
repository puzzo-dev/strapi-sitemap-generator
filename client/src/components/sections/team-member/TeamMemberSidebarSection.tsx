import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamMember } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';
import { TeamMemberSidebarSectionProps } from '@/lib/types/components';

const TeamMemberSidebarSection: React.FC<TeamMemberSidebarSectionProps> = ({ 
    member, 
    isLoading = false, 
    pageContent 
}) => {
    // Get sidebar section from page content
    const sidebarSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title?.toLowerCase().includes('sidebar'));
    
    // Get team members from page content settings
    const teamMembers = useMemo(() => {
        return pageContent?.sections?.[0]?.settings?.teamMembers || [];
    }, [pageContent]);

    // Get current member from page content if not provided
    const currentMember = useMemo(() => {
        if (member) return member as TeamMember;
        return teamMembers[0] as TeamMember;
    }, [member, teamMembers]);

    // Get sidebar content from section settings
    const sidebarContent = sidebarSection?.settings?.teamMemberContent?.sidebar || {};

    if (isLoading || !currentMember) {
        return (
            <div className="lg:col-span-4 space-y-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                </div>
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:col-span-4 space-y-6">
            {/* Expertise - Remove this section since TeamMember doesn't have expertise property */}
            
            {/* Quick Info */}
            <Card className="border-blue-100 dark:border-blue-900/40">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {sidebarContent.quickInfo?.title || "Quick Info"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {currentMember.position && (
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {sidebarContent.quickInfo?.positionLabel || "Position"}
                            </p>
                            <p className="text-gray-900 dark:text-white font-medium">{currentMember.position}</p>
                        </div>
                    )}
                    
                    {currentMember.role && currentMember.role !== currentMember.position && (
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {sidebarContent.quickInfo?.roleLabel || "Role"}
                            </p>
                            <p className="text-gray-900 dark:text-white font-medium">{currentMember.role}</p>
                        </div>
                    )}
                    
                    {currentMember.location && (
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {sidebarContent.quickInfo?.locationLabel || "Location"}
                            </p>
                            <p className="text-gray-900 dark:text-white font-medium">{currentMember.location}</p>
                        </div>
                    )}
                    
                    {currentMember.joinDate && (
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {sidebarContent.quickInfo?.joinDateLabel || "Joined"}
                            </p>
                            <p className="text-gray-900 dark:text-white font-medium">{currentMember.joinDate}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Contact Quick Actions */}
            <Card className="border-blue-100 dark:border-blue-900/40">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {sidebarContent.contact?.title || "Contact"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {currentMember.email && (
                        <a 
                            href={`mailto:${currentMember.email}`}
                            className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            {sidebarContent.contact?.emailText || "Send Email"}
                        </a>
                    )}
                    
                    {currentMember.phone && (
                        <a 
                            href={`tel:${currentMember.phone}`}
                            className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            {sidebarContent.contact?.phoneText || "Call Now"}
                        </a>
                    )}
                    
                    {currentMember.socialLinks?.find(link => link.platform === 'linkedin')?.href && (
                        <a 
                            href={currentMember.socialLinks.find(link => link.platform === 'linkedin')?.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            {sidebarContent.contact?.linkedinText || "View LinkedIn"}
                        </a>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TeamMemberSidebarSection;