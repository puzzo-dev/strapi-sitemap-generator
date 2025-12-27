import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Cpu, Code, LayoutGrid } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { AboutHeroProps } from '@/lib/types/content';
import {
    fadeInUp,
    staggerChildren,
    floatingShapeAnimation
} from '@/lib/animations';
import { LoadingSkeletons } from '@/components/ui/LoadingSkeleton';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { getThemeColors } from '@/lib/utils/theme-helpers';
import { cn } from '@/lib/utils/index';
import { defaultHeroProps } from '@/lib/data/hero';

const AboutHero: React.FC<AboutHeroProps> = ({
    title,
    subtitle,
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
            className={cn(
                "relative overflow-hidden py-16 md:pt-24 md:pb-16 hero-section",
                getThemeColors('background', 'gradient')
            )}
        >
            {/* Use unified background decoration */}
            <BackgroundDecoration variant="default" />

            {/* Content */}
            <motion.div variants={fadeInUp()} className="container-custom relative z-10 max-w-8xl">
                <div className="text-center max-w-4xl mx-auto">
                    {isPageLoading ? (
                        <div className="space-y-6">
                            <LoadingSkeletons.Base className="w-36 h-8 mx-auto rounded-full" />
                            <LoadingSkeletons.Base className="h-12 w-3/4 mx-auto rounded-lg" />
                            <LoadingSkeletons.Text lines={3} className="space-y-2" />
                        </div>
                    ) : (
                        <>
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                {/*  */}
                                {settings?.badge || settings?.overline || defaultHeroProps.badge}
                            </div>

                            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                {(() => {
                                    const displayTitle = title || 'About I-Varse Technologies';
                                    const words = displayTitle.split(' ');
                                    const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                                    const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : displayTitle;

                                    return (
                                        <>
                                            <span className="text-blue-800 dark:text-blue-200">{regularWords}</span>{' '}
                                            <span className="gradient-text">
                                                {highlightedWords}
                                            </span>
                                        </>
                                    );
                                })()}
                            </h1>

                            <p className={cn(
                                "text-xl mb-8 animate-fade-in-up",
                                getThemeColors('text', 'muted')
                            )} style={{ animationDelay: '0.4s' }}>
                                {subtitle ||
                                    'Founded with a vision to revolutionize digital solutions, I-VARSE has been at the forefront of technology innovation since its inception. We combine technical expertise with creative thinking to deliver exceptional results.'}
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.section>
    );
};

export default AboutHero;