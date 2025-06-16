import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { TeamMember, PageSection } from '@/lib/types';
import { defaultTeamMembers } from '@/lib/data';
import {
    fadeInUp,
    staggerChildren,
    scaleUp
} from '@/lib/animations';

const TeamSection: React.FC<PageSection & { teamMembers?: TeamMember[]; isTeamLoading: boolean }> = ({
    title,
    subtitle,
    settings,
    teamMembers,
    isTeamLoading
}) => {
    const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Function to ensure TeamMember type compatibility
    const normalizeTeamMember = (member: any): TeamMember => ({
        id: member.id,
        name: member.name,
        position: member.position,
        bio: member.bio || '',
        image: member.image,
        socialLinks: member.socialLinks
    });

    // Use either API team members or fallback data
    const displayTeamMembers = teamMembers?.length ? teamMembers.map(normalizeTeamMember) : defaultTeamMembers;

    return (
        <motion.section
            ref={teamRef}
            initial="initial"
            animate={teamInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className="content-section bg-white dark:bg-[#132f4c]"
        >
            <div className="container-custom">
                <motion.div
                    variants={fadeInUp()}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        <Users className="h-4 w-4 mr-2" />
                        {settings?.label || 'Our Team'}
                    </div>
                    <h2 className="section-title">
                        {title || 'Meet the Experts'}
                    </h2>
                    <p className="section-subtitle">
                        {subtitle ||
                            'Our team of dedicated professionals combines expertise, creativity, and passion to deliver exceptional results.'}
                    </p>
                </motion.div>

                {isTeamLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, index) => (
                            <div key={`team-skeleton-${index}`} className="card overflow-hidden">
                                <div className="h-72 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={staggerChildren(0.1)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {displayTeamMembers.slice(0, 4).map((member, index) => (
                            <motion.div
                                key={`team-member-${member.id}-${index}`}
                                variants={scaleUp(0.95, 0.5, index * 0.1)}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                className="card overflow-hidden group"
                            >
                                <div className="h-72 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                                    <p className="text-blue-600 dark:text-blue-400">{member.position}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <div className="mt-12 text-center">
                    <GradientButton
                        href={settings?.cta?.url || "/careers"}
                        variant="outline"
                        className='w-60 mx-auto'
                        endIcon={<ArrowRight />}
                    >
                        {settings?.cta?.text || "Join Our Team"}
                    </GradientButton>
                </div>
            </div>
        </motion.section>
    );
};

export default TeamSection;