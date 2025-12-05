import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, Shield } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { PageSection } from '@/lib/types/core';
import {
    staggerChildren,
    slideIn
} from '@/lib/animations';
import { defaultHeroProps } from '@/lib/data/hero';

interface MissionVisionSectionProps extends PageSection {
    isPageLoading?: boolean;
}

const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
    title,
    subtitle,
    settings,
    isPageLoading
}) => {
    const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Show loading state
    if (isPageLoading) {
        return (
            <section className="py-24 bg-gradient-to-b from-white to-blue-50/60 dark:from-[#132f4c] dark:to-[#0a192f]">
                <div className="container-custom max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-6 animate-pulse">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Don't render if no settings are available
    if (!settings) {
        return null;
    }

    return (
        <motion.section
            ref={missionRef}
            initial="initial"
            animate={missionInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className="content-section bg-white dark:bg-[#132f4c] relative overflow-hidden"
        >
            {/* Tech-inspired background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
                <Database className="absolute top-10 right-10 h-32 w-32 text-blue-400 dark:text-blue-600" />
                <Cloud className="absolute bottom-10 left-10 h-36 w-36 text-indigo-400 dark:text-indigo-600" />
                <Shield className="absolute top-1/2 right-1/4 h-24 w-24 text-cyan-400 dark:text-cyan-600" />
            </div>

            <div className="container-custom relative z-10 max-w-7xl">
                <motion.div
                    variants={slideIn('left')}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-blue-900 dark:text-blue-200">
                        {title}
                    </h2>
                    <p className="section-subtitle">
                        {subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={slideIn('left')}
                        className="relative"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/50 h-[500px]">
                            <img
                                src={settings?.image ||
                                    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                                alt="I-VARSE Team"
                                className="object-cover w-full h-full"
                            />

                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-700/50 z-0"></div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 border border-blue-200 dark:border-blue-700/50 rounded-lg rotate-12 z-0"></div>
                    </motion.div>

                    <motion.div
                        variants={slideIn('right')}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                                {settings?.missionLabel}
                            </div>
                            <h2 className="heading-md text-blue-900 dark:text-blue-200">
                                {settings?.missionTitle}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {settings?.missionText}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                                {settings?.visionLabel || "🌍 Our Vision"}
                            </div>
                            <h2 className="heading-md text-blue-900 dark:text-blue-200">
                                {settings?.visionTitle}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {settings?.visionText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default MissionVisionSection;