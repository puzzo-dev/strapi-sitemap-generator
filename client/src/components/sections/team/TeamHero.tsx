import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { PageSection } from '@/lib/types/core';
import {
    fadeInUp,
    staggerChildren,
    floatingShapeAnimation
} from '@/lib/animations';

interface TeamHeroProps extends PageSection {
    isPageLoading: boolean;
}

const TeamHero: React.FC<TeamHeroProps> = ({
    title,
    subtitle,
    content,
    settings,
    isPageLoading
}) => {
    const [heroRef, heroInView] = useInView({ triggerOnce: true });

    return (
        <motion.section
            ref={heroRef}
            initial="initial"
            animate={heroInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
        >
            {/* Background decoration */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-8xl">
                <motion.div
                    variants={staggerChildren(0.2)}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Overline */}
                    {settings?.overline && (
                        <motion.div
                            variants={fadeInUp()}
                            className="mb-6"
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                                👥 {settings.overline}
                            </div>
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                        variants={fadeInUp(0.3)}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
                        style={{
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                        }}
                    >
                        {title ? (
                            <>
                                <span className="text-blue-800 dark:text-blue-200">{title.split(' ').slice(0, -1).join(' ')}</span>{' '}
                                <span className="gradient-text">
                                    {title.split(' ').slice(-1).join(' ')}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-blue-800 dark:text-blue-200">Meet Our Expert</span>{' '}
                                <span className="gradient-text">Team</span>
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <motion.p
                            variants={fadeInUp(0.4)}
                            className="text-xl text-gray-600 dark:text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    {/* Description */}
                    {content && (
                        <motion.div
                            variants={fadeInUp(0.5)}
                            className="text-lg text-gray-700 dark:text-blue-50 leading-relaxed max-w-2xl mx-auto"
                        >
                            {content}
                        </motion.div>
                    )}

                    {/* Team Stats */}
                    <motion.div
                        variants={fadeInUp(0.6)}
                        className="flex flex-wrap justify-center gap-8 mt-12"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-blue-200 mb-2">
                                25+
                            </div>
                            <div className="text-gray-600 dark:text-blue-200 text-sm font-medium">
                                Team Members
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-blue-200 mb-2">
                                10+
                            </div>
                            <div className="text-gray-600 dark:text-blue-200 text-sm font-medium">
                                Years Experience
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-blue-200 mb-2">
                                100+
                            </div>
                            <div className="text-gray-600 dark:text-blue-200 text-sm font-medium">
                                Projects Delivered
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    {(settings?.primaryButton || settings?.secondaryButton) && (
                        <motion.div
                            variants={fadeInUp(0.7)}
                            className="flex flex-wrap justify-center gap-4 mt-8"
                        >
                            {settings?.primaryButton && (
                                <GradientButton href={settings.primaryButton.href} size="lg" endIcon={<ArrowRight />}>
                                    {settings.primaryButton.children || settings.primaryButton.title}
                                </GradientButton>
                            )}
                            {settings?.secondaryButton && (
                                <GradientButton href={settings.secondaryButton.href} variant="outline" size="lg">
                                    {settings.secondaryButton.children || settings.secondaryButton.title}
                                </GradientButton>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

                {/* Animated particles */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
        </motion.section>
    );
};

export default TeamHero; 