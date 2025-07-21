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
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    variants={floatingShapeAnimation()}
                    className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatingShapeAnimation(2)}
                    className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200/20 dark:bg-indigo-800/20 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatingShapeAnimation(1.5)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-2xl"
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Overline */}
                    {settings?.overline && (
                        <motion.div
                            variants={fadeInUp()}
                            className="mb-6"
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                                <span className="text-lg mr-2">👥</span>
                                {settings.overline}
                            </div>
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                        variants={fadeInUp()}
                        className="heading-xl mb-6"
                    >
                        {title ? (
                            (() => {
                                const words = title.split(' ');
                                const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                                const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : title;

                                return (
                                    <>
                                        {regularWords}{' '}
                                        <span className="gradient-text">
                                            {highlightedWords}
                                        </span>
                                    </>
                                );
                            })()
                        ) : (
                            <>
                                Meet Our <span className="gradient-text">Expert Team</span>
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp(0.2)}
                        className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
                    >
                        {content}
                    </motion.p>

                    {/* Content */}
                    {/* {content && (
                        <motion.p
                            variants={fadeInUp(0.3)}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
                        >
                            {content}
                        </motion.p>
                    )} */}

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp(0.4)}
                        className="flex flex-wrap justify-center gap-4"
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
                </div>
            </div>
        </motion.section>
    );
};

export default TeamHero; 