import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe, Database, Cloud, Shield } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { PageSection } from '@/lib/types';
import {
    staggerChildren,
    slideIn
} from '@/lib/animations';

const MissionVisionSection: React.FC<PageSection & { isPageLoading: boolean }> = ({
    title,
    subtitle,
    settings,
    isPageLoading
}) => {
    const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.2 });

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

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {isPageLoading ? (
                        <>
                            <div className="relative h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <div className="w-36 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-36 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
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
                                    <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                                        <Target className="h-4 w-4 mr-2" />
                                        {settings?.missionLabel || 'Our Mission'}
                                    </div>
                                    <h2 className="heading-md text-gray-800 dark:text-white">
                                        {settings?.missionTitle || 'Empowering Businesses Through Technology'}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {settings?.missionText ||
                                            'At I-VARSE, our mission is to empower businesses through innovative technology solutions that drive growth and efficiency. We strive to be the trusted partner that helps organizations navigate their digital transformation journey with confidence.'}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                        <Globe className="h-4 w-4 mr-2" />
                                        {settings?.visionLabel || 'Our Vision'}
                                    </div>
                                    <h2 className="heading-md text-gray-800 dark:text-white">
                                        {settings?.visionTitle || 'Shaping the Digital Future'}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {settings?.visionText ||
                                            'We envision a world where every business, regardless of size, has access to cutting-edge technology that enhances their capabilities and expands their reach. We aim to be the catalysts for meaningful digital transformation across industries and borders.'}
                                    </p>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default MissionVisionSection;