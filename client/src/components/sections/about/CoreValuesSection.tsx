import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, CircuitBoard, Code } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { PageSection } from '@/lib/types';
import {
    fadeInUp,
    staggerChildren,
    gridItemAnimation
} from '@/lib/animations';

const CoreValuesSection: React.FC<PageSection & { isPageLoading: boolean }> = ({
    title,
    subtitle,
    settings,
    isPageLoading
}) => {
    const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const defaultValues = [
        {
            id: 1,
            title: "Innovation",
            description: "We constantly push boundaries and explore new technologies to deliver forward-thinking solutions that keep our clients ahead of the curve.",
            icon: "lightning"
        },
        {
            id: 2,
            title: "Excellence",
            description: "We are committed to delivering the highest quality in everything we do, with meticulous attention to detail and a passion for perfection.",
            icon: "shield"
        },
        {
            id: 3,
            title: "Collaboration",
            description: "We believe in the power of teamwork, both within our organization and with our clients, fostering relationships built on trust and mutual success.",
            icon: "users"
        }
    ];

    return (
        <motion.section
            ref={valuesRef}
            initial="initial"
            animate={valuesInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className="content-section bg-gray-50 dark:bg-[#0a1929] relative overflow-hidden"
        >
            {/* Tech-inspired background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
                <Sparkles className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 animate-float" />
                <CircuitBoard className="absolute right-10 bottom-10 h-48 w-48 text-indigo-400 dark:text-indigo-600 animate-pulse-slower" />
                <Code className="absolute top-1/3 right-1/4 h-32 w-32 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
            </div>

            <div className="container-custom relative z-10">
                {isPageLoading ? (
                    <>
                        <div className="text-center mb-16">
                            <div className="inline-block w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 animate-pulse"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[...Array(3)].map((_, index) => (
                                <div key={`values-skeleton-${index}`} className="card p-8">
                                    <div className="h-14 w-14 rounded-xl bg-gray-200 dark:bg-gray-700 mb-6 animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2 animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <motion.div
                            variants={fadeInUp()}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                                <Award className="h-4 w-4 mr-2" />
                                {settings?.label || 'Our Core Values'}
                            </div>
                            <h2 className="section-title">
                                {title || 'What Drives Us'}
                            </h2>
                            <p className="section-subtitle">
                                {subtitle || 'These principles guide our decisions and define who we are as a company.'}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerChildren(0.1)}
                            className="grid grid-cols-1 md:grid-cols-3 gap-10"
                        >
                            {((settings?.featured && settings.featured.length > 0) ?
                                settings.featured :
                                defaultValues
                            ).map((value: any, index: number) => (
                                <motion.div
                                    key={`core-value-${value.id || index}-${index}`}
                                    variants={gridItemAnimation(index)}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="card p-8"
                                >
                                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-blue-400 to-blue-600 shadow-blue-200 dark:shadow-blue-900/20' :
                                        index === 1 ? 'from-indigo-400 to-indigo-600 shadow-indigo-200 dark:shadow-indigo-900/20' :
                                            'from-cyan-400 to-cyan-600 shadow-cyan-200 dark:shadow-cyan-900/20'
                                        } flex items-center justify-center text-white mb-6 shadow-lg`}>
                                        {index === 0 ? (
                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        ) : index === 1 ? (
                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </motion.section>
    );
};

export default CoreValuesSection;