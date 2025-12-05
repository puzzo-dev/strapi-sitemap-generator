import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import AppLink from '@/components/ui/AppLink';
import { TeamMember, PageSection } from '@/lib/types';
import { defaultTeamMembers } from '@/lib/data/';
import {
    fadeInUp,
    staggerChildren,
    scaleUp,
    gridItemAnimation
} from '@/lib/animations';

interface TeamGridProps extends PageSection {
    teamMembers?: TeamMember[];
    isTeamLoading: boolean;
}

const TeamGrid: React.FC<TeamGridProps> = ({
    title,
    subtitle,
    content,
    settings,
    teamMembers,
    isTeamLoading
}) => {
    const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Function to ensure we have team members to display
    const displayTeamMembers = () => {
        if (isTeamLoading) {
            return defaultTeamMembers;
        }
        return teamMembers && teamMembers.length > 0 ? teamMembers : defaultTeamMembers;
    };

    const members = displayTeamMembers();

    return (
        <motion.section
            ref={teamRef}
            initial="initial"
            animate={teamInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className="py-16 md:py-24 bg-white dark:bg-[#132f4c] overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-hidden max-w-7xl">
                <div className="max-w-7xl mx-auto text-center mb-16 px-4 sm:px-8">
                    {/* Section Label */}
                    {settings?.label && (
                        <motion.div
                            variants={fadeInUp()}
                            className="mb-6"
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                                👥 {settings.label}
                            </div>
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h2
                        variants={fadeInUp()}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-6"
                    >
                        {title || "Our Team Members"}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp(0.2)}
                        className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        {subtitle || "Meet the dedicated professionals who make I-Varse Technologies a leader in digital innovation."}
                    </motion.p>

                    {/* Content */}
                    {content && (
                        <motion.p
                            variants={fadeInUp(0.3)}
                            className="text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed"
                        >
                            {content}
                        </motion.p>
                    )}
                </div>

                {/* Team Grid - Enhanced responsive layout */}
                <motion.div
                    variants={staggerChildren(0.1)}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-7xl mx-auto px-2 sm:px-4 overflow-hidden"
                >
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            variants={scaleUp()}
                            className="group relative"
                        >
                            <AppLink
                                href={`/team/${member.slug}`}
                                className="block h-full"
                            >
                                <Card className="h-full cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden bg-white/80 dark:bg-[#132f4c]/80 backdrop-blur-sm border-0 shadow-lg">
                                    {/* Member Image */}
                                    <div className="relative overflow-hidden aspect-square">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                            style={{
                                                imageRendering: 'crisp-edges'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg" />
                                    </div>

                                    {/* Member Info */}
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                {member.name}
                                            </h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <p className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                                                    {member.position}
                                                </p>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                                {member.bio}
                                            </p>
                                            
                                            {/* Skills/Expertise Tags */}
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {member.role && (
                                                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                                                        {member.role.split(' ')[0]}
                                                    </span>
                                                )}
                                                <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                                                    {member.location?.split(',')[0] || 'Remote'}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    {/* Enhanced Footer with Social Links */}
                                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium text-xs transition-colors duration-200">
                                            View Profile
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                                        </div>
                                        
                                        {/* Social Links Preview */}
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {member.socialLinks?.slice(0, 2).map((social) => (
                                                <div key={social.id} className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </AppLink>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                {settings?.cta && (
                    <motion.div
                        variants={fadeInUp()}
                        className="text-center"
                    >
                        <GradientButton href={settings.cta.url} size="lg" endIcon={<ArrowRight />}>
                            {settings.cta.text}
                        </GradientButton>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default TeamGrid; 