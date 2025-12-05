import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp } from '@/lib/animations';
import { PageContent } from '@/lib/types/core';
import { TeamMember } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberCTASectionProps {
    member: TeamMember;
    isLoading?: boolean;
    pageContent?: PageContent;
}

const TeamMemberCTASection: React.FC<TeamMemberCTASectionProps> = ({ 
    member,
    isLoading = false, 
    pageContent 
}) => {
    // Get CTA section from page content
    const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');
    
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
            <section className="content-section bg-white dark:bg-[#132f4c]">
                <div className="container-custom max-w-7xl">
                    <Card className="p-8 md:p-12 gradient-bg shadow-lg text-center">
                        <CardContent>
                            <div className="animate-pulse text-center space-y-6">
                                <div className="h-8 bg-white/20 rounded w-1/3 mx-auto"></div>
                                <div className="h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
                                <div className="space-x-4">
                                    <div className="inline-block h-12 bg-white/20 rounded w-32"></div>
                                    <div className="inline-block h-12 bg-white/20 rounded w-32"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="content-section bg-white dark:bg-[#132f4c]"
        >
            <div className="container-custom max-w-7xl">
                <motion.div
                    variants={fadeInUp(20, 0.6)}
                >
                    <Card className="p-8 md:p-12 gradient-bg shadow-lg text-center">
                        <CardContent>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                {ctaSection?.title || ctaSection?.settings?.teamMemberContent?.cta?.title || "Ready to Work With Our Team?"}
                            </h2>
                            <p className="text-white/90 max-w-3xl mx-auto mb-8">
                                {ctaSection?.content || ctaSection?.settings?.teamMemberContent?.cta?.description || 
                                 `Contact us today to discuss how our experts can help you achieve your business goals.`}
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                <GradientButton 
                                    href={ctaSection?.settings?.primaryButton?.href || "/contact"} 
                                    variant="light" 
                                    className="border border-white/20"
                                >
                                    {ctaSection?.settings?.primaryButton?.children || "Get in Touch"}
                                </GradientButton>
                                <GradientButton 
                                    href={ctaSection?.settings?.secondaryButton?.href || "/services"} 
                                    variant="light" 
                                    className="border border-white/20"
                                >
                                    {ctaSection?.settings?.secondaryButton?.children || "Explore Our Services"}
                                </GradientButton>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TeamMemberCTASection;