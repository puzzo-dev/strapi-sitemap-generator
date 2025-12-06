import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import AppLink from '@/components/ui/AppLink';
import { TeamSectionProps } from '@/lib/types/content';
import { defaultTeamMembers, defaultHeroProps } from '@/lib/data/';
import {
    fadeInUp,
    staggerChildren,
    scaleUp
} from '@/lib/animations';

const TeamSection: React.FC<TeamSectionProps> = ({
    title,
    subtitle,
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
            className="py-16 md:py-24 bg-white dark:bg-[#132f4c]"
        >
            <div className="container mx-auto px-4 max-w-8xl">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    {/* Section Label */}
                    {(settings?.label || settings?.badge) && (
                        <motion.div
                            variants={fadeInUp()}
                            className="mb-6"
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                                {settings?.badge || settings?.label || "👥 Our Team"}
                            </div>
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h2
                        variants={fadeInUp()}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-6"
                    >
                        {title || "Meet Our Team"}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp(0.2)}
                        className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        {subtitle || "Our team combines technical expertise with creative thinking to deliver exceptional results for our clients."}
                    </motion.p>
                </div>

                {/* Team Grid - 4 cards per line and fully clickable */}
                <motion.div
                    variants={staggerChildren(0.1)}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16"
                >
                    {members.slice(0, 8).map((member, index) => (
                        <motion.div
                            key={member.id}
                            variants={scaleUp()}
                            className="group relative"
                        >
                            <AppLink
                                href={`/team/${member.slug || member.id}`}
                                className="block h-full"
                            >
                                <Card className="h-full cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                                    {/* Member Image */}
                                    <div className="relative overflow-hidden aspect-square">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Member Info */}
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 text-xs">
                                                {member.position}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-2">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </CardContent>

                                    {/* View Profile Button */}
                                    <CardFooter className="p-4 pt-0">
                                        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium text-xs transition-colors duration-200">
                                            View All
                                            <ArrowRight className="w-3 h-3" />
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
                        className="text-center max-w-xs mx-auto"
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

export default TeamSection;