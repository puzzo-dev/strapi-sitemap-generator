import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CircuitBoard, Cpu, Code, LayoutGrid, Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent } from '@/lib/types/core';
import {
    fadeInUp,
    staggerChildren,
    floatingShapeAnimation
} from '@/lib/animations';

interface CareersHeroSectionProps {
    pageContent?: PageContent | null;
    isLoading?: boolean;
}

const CareersHeroSection: React.FC<CareersHeroSectionProps> = ({
    pageContent,
    isLoading = false
}) => {
    const [heroRef, heroInView] = useInView({ triggerOnce: true });

    // Get hero section from page content
    const heroSection = pageContent?.sections?.find(s => s.type === 'hero');

    // If no page content or hero section, don't render anything
    if (!pageContent || !heroSection) {
        return null;
    }

    const title = heroSection.title;
    const subtitle = heroSection.subtitle;
    const primaryButton = heroSection.settings?.primaryButton;
    const secondaryButton = heroSection.settings?.secondaryButton;
    const backgroundColor = heroSection.backgroundColor;

    return (
        <motion.section
            ref={heroRef}
            initial="initial"
            animate={heroInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className={`relative overflow-hidden ${backgroundColor || 'bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]'} py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section`}
        >
            {/* Tech-inspired background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Animated gradient orbs */}
                <motion.div
                    variants={floatingShapeAnimation(0, 1)}
                    className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40"
                />
                <motion.div
                    variants={floatingShapeAnimation(0.5, 1.2)}
                    className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30"
                />

                {/* Tech pattern */}
                <Users className="absolute top-20 left-20 h-40 w-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4 animate-float" />
                <CircuitBoard className="absolute bottom-20 right-20 h-32 w-32 text-indigo-200/20 dark:text-indigo-700/20 transform rotate-12 animate-pulse-slower" />
                <Cpu className="absolute top-32 right-32 h-24 w-24 text-cyan-200/20 dark:text-cyan-700/20 animate-pulse-light" />
                <LayoutGrid className="absolute bottom-32 left-32 h-28 w-28 text-purple-200/15 dark:text-purple-700/15 animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Content */}
            <motion.div variants={fadeInUp()} className="container-custom relative z-10 max-w-8xl">
                <div className="text-center max-w-4xl mx-auto">
                    {isLoading ? (
                        <>
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse w-36 h-8"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 w-3/4 mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6 mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-4/6 mx-auto animate-pulse"></div>
                        </>
                    ) : (
                        <>
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                {/*  */}
                                {heroSection.settings?.badge || "Join Our Team"}
                            </div>

                            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                {title && (
                                    (() => {
                                        const words = title.split(' ');
                                        const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                                        const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : title;

                                        return (
                                            <>
                                                <span className="text-blue-800 dark:text-blue-200">{regularWords}</span>{' '}
                                                <span className="gradient-text">
                                                    {highlightedWords}
                                                </span>
                                            </>
                                        );
                                    })()
                                )}
                            </h1>

                            <p className="text-xl text-blue-700 dark:text-blue-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                {subtitle || heroSection.settings?.defaultSubtitle}
                            </p>

                            <motion.div
                                className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
                                style={{ animationDelay: '0.6s' }}
                            >
                                {primaryButton && (
                                    <GradientButton
                                        href={primaryButton.href}
                                        variant={primaryButton.variant as any}
                                        endIcon={primaryButton.endIcon === 'ChevronRight' ? <ChevronRight /> : undefined}
                                    >
                                        {primaryButton.children || primaryButton.title}
                                    </GradientButton>
                                )}

                                {secondaryButton && (
                                    <GradientButton
                                        href={secondaryButton.href}
                                        variant={secondaryButton.variant as any}
                                    >
                                        {secondaryButton.children || secondaryButton.title}
                                    </GradientButton>
                                )}
                            </motion.div>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.section>
    );
};

export default CareersHeroSection;