import React, { useMemo } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Briefcase, Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLink from '@/components/ui/AppLink';
import { TeamMember } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';

interface TeamMemberHeroSectionProps {
    member: TeamMember;
    isLoading?: boolean;
    pageContent?: PageContent;
}

const TeamMemberHeroSection: React.FC<TeamMemberHeroSectionProps> = ({ 
    member, 
    isLoading = false, 
    pageContent 
}) => {
    // Get hero section from page content
    const heroSection = pageContent?.sections?.find(s => s.type === 'hero');
    
    // Get team members from page content settings
    const teamMembers = useMemo(() => {
        return pageContent?.sections?.[0]?.settings?.teamMembers || [];
    }, [pageContent]);

    // Get current member from page content if not provided
    const currentMember = useMemo(() => {
        if (member) return member as TeamMember;
        // If no member provided, try to get from URL or default to first member
        // This is a fallback for when the component is used standalone
        return teamMembers[0] as TeamMember;
    }, [member, teamMembers]);

    if (isLoading || !currentMember) {
        return (
            <section className={`relative overflow-hidden ${heroSection?.backgroundColor || 'bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]'} py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section`}>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8"></div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                                <div className="lg:col-span-1">
                                    <div className="w-full h-96 lg:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                                </div>
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    return (
        <section className={`relative overflow-hidden ${heroSection?.backgroundColor || 'bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]'} py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section`}>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200/20 dark:bg-indigo-800/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Badge */}
                    {heroSection?.badge && (
                        <div className="mb-6">
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                                <span className="text-lg mr-2">{heroSection.badge}</span>
                                Team Member
                            </div>
                        </div>
                    )}

                    {/* Back Button */}
                    <div className="mb-8">
                        <AppLink href="/team" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                            <ArrowLeft className="w-4 h-4" />
                            {heroSection?.settings?.teamMemberContent?.hero?.backButton || "Back to Team"}
                        </AppLink>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        {/* Member Image */}
                        <div className="lg:col-span-1">
                            <div className="relative">
                                <img
                                    src={currentMember.image}
                                    alt={currentMember.name}
                                    className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                            </div>
                        </div>

                        {/* Member Info */}
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                {/* Title and Subtitle from page content */}
                                <div>
                                    <h1 className="heading-xl mb-4 leading-tight">
                                        {heroSection?.title || (currentMember.name ? (
                                            (() => {
                                                const words = currentMember.name.split(' ');
                                                let highlightedWords = '';
                                                let regularWords = '';

                                                if (words.length >= 3) {
                                                    // 3+ words: highlight last 2 words
                                                    highlightedWords = words.slice(-2).join(' ');
                                                    regularWords = words.slice(0, -2).join(' ');
                                                } else if (words.length === 2) {
                                                    // 2 words: highlight only the last word
                                                    highlightedWords = words[1];
                                                    regularWords = words[0];
                                                } else {
                                                    // 1 word: no highlighting
                                                    regularWords = words[0];
                                                }

                                                return (
                                                    <>
                                                        {regularWords}{' '}
                                                        {highlightedWords && (
                                                            <span className="gradient-text">
                                                                {highlightedWords}
                                                            </span>
                                                        )}
                                                    </>
                                                );
                                            })()
                                        ) : (
                                            <>
                                                Meet Our <span className="gradient-text">Team Member</span>
                                            </>
                                        ))}
                                    </h1>
                                    <p className="text-2xl md:text-3xl text-blue-800 dark:text-blue-200 font-semibold mb-2">
                                        {heroSection?.subtitle || currentMember.position}
                                    </p>
                                    {currentMember.role && currentMember.role !== currentMember.position && (
                                        <p className="text-lg text-gray-600 dark:text-gray-300">
                                            {currentMember.role}
                                        </p>
                                    )}
                                </div>

                                {/* Description from page content or member */}
                                {(heroSection?.content || currentMember.description) && (
                                    <div>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {heroSection?.content || currentMember.description}
                                        </p>
                                    </div>
                                )}

                                {/* Contact Information */}
                                <div className="flex flex-wrap gap-4">
                                    {currentMember.email && (
                                        <Button asChild variant="secondary" size="sm">
                                            <a href={`mailto:${currentMember.email}`}>
                                                <Mail className="w-4 h-4 mr-2" />
                                                Email
                                            </a>
                                        </Button>
                                    )}
                                    {currentMember.phone && (
                                        <Button asChild variant="secondary" size="sm">
                                            <a href={`tel:${currentMember.phone}`}>
                                                <Phone className="w-4 h-4 mr-2" />
                                                Call Us
                                            </a>
                                        </Button>
                                    )}
                                    {currentMember.socialLinks?.find(link => link.platform === 'linkedin')?.href && (
                                        <Button asChild size="sm">
                                            <a
                                                href={currentMember.socialLinks.find(link => link.platform === 'linkedin')?.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin className="w-4 h-4 mr-2" />
                                                LinkedIn
                                            </a>
                                        </Button>
                                    )}
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    {currentMember.location && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                                Location
                                            </h3>
                                            <p className="text-gray-900 dark:text-white">
                                                {currentMember.location}
                                            </p>
                                        </div>
                                    )}
                                    {currentMember.joinDate && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                                Joined
                                            </h3>
                                            <p className="text-gray-900 dark:text-white">
                                                {currentMember.joinDate}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamMemberHeroSection;