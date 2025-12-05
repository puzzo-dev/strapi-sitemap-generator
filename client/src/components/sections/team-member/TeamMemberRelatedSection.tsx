import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLink from '@/components/ui/AppLink';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { TeamMember } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';
import { defaultTeamMembers } from '@/lib/data/team';

interface TeamMemberRelatedSectionProps {
    isLoading?: boolean;
    pageContent?: PageContent;
}

const TeamMemberRelatedSection: React.FC<TeamMemberRelatedSectionProps> = ({ 
    isLoading = false, 
    pageContent 
}) => {
    // Get related section from page content
    const relatedSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title === 'Related Team Members');
    
    // Get team members from page content settings
    const teamMembers = useMemo(() => {
        return pageContent?.sections?.[0]?.settings?.teamMembers || [];
    }, [pageContent]);

    // Get related members from page content settings or fallback
    const relatedMembers = useMemo(() => {
        // Get related members from the related section settings
        const relatedTeamMembers = relatedSection?.settings?.teamMembers || [];
        const maxDisplay = relatedSection?.settings?.maxDisplay || 3;
        
        // If no specific related members defined, try team members from page content
        if (relatedTeamMembers.length === 0 && teamMembers.length > 0) {
            return teamMembers.slice(0, maxDisplay);
        }
        
        // Final fallback to default team members if no data available
        if (relatedTeamMembers.length === 0 && teamMembers.length === 0) {
            return defaultTeamMembers.slice(0, maxDisplay);
        }
        
        return relatedTeamMembers.slice(0, maxDisplay);
    }, [relatedSection, teamMembers]);

    // Only show loading if actually loading, not when there's no data
    if (isLoading) {
        return (
            <section className="py-16 bg-gray-50 dark:bg-[#0a1929]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="animate-pulse space-y-8">
                        <div className="text-center space-y-4">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="py-16 bg-gray-50 dark:bg-[#0a1929]"
        >
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    variants={fadeInUp(20, 0.6)}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                        {relatedSection?.title || "Related Team Members"}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {relatedSection?.subtitle || "Meet other talented professionals on our team"}
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerChildren(0.1)}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    {relatedMembers.map((member: TeamMember, index: number) => (
                        <motion.div key={member.id || index} variants={fadeInUp(20, 0.6)}>
                            <Card className="h-full border-blue-100 dark:border-blue-900/40 hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                        />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                            {member.position}
                                        </p>
                                        <AppLink
                                            href={`/team/${member.slug}`}
                                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                                        >
                                            View Profile
                                            <ArrowRight className="w-4 h-4" />
                                        </AppLink>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeInUp(20, 0.6)}
                    className="text-center"
                >
                    <Button asChild size="lg">
                        <AppLink href="/team">
                            {relatedSection?.settings?.relatedLabel || "View All Team Members"}
                        </AppLink>
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TeamMemberRelatedSection;