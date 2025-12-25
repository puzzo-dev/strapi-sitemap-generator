import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiFileText, FiBookOpen } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BlogHeroSectionProps } from '@/lib/types';
import {
    fadeInUp,
    staggerChildren,
    scaleUp,
} from '@/lib/animations';
import { defaultHeroProps } from '@/lib/data/hero';

const BlogHeroSection: React.FC<BlogHeroSectionProps> = ({
    heroSection,
    pageContent,
    search,
    setSearch,
}) => {
    const { t } = useTranslation();

    return (
        <motion.section
            initial="initial"
            animate="animate"
            className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    variants={scaleUp(0.8, 1.5, 0.2)}
                    className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40"
                />
                <motion.div
                    variants={scaleUp(0.8, 1.8, 0.5)}
                    className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30"
                />
                <motion.div
                    variants={scaleUp(0.8, 2, 0.8)}
                    className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30"
                />

                {/* Animated Icons */}
                <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                        animate={{
                            opacity: 0.3,
                            y: 0,
                            rotate: 12,
                            transition: { duration: 0.8, delay: 0.3 },
                        }}
                        className="absolute right-0 top-0"
                    >
                        <motion.div
                            animate={{
                                y: [0, -15, 0, 10, 0],
                                rotate: [12, 15, 10, 13, 12],
                                transition: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
                            }}
                        >
                            <FiFileText className="h-64 w-64 text-blue-800" />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                        animate={{
                            opacity: 0.3,
                            y: 0,
                            rotate: -12,
                            transition: { duration: 0.8, delay: 0.5 },
                        }}
                        className="absolute left-10 bottom-10"
                    >
                        <motion.div
                            animate={{
                                y: [0, 10, 0, -15, 0],
                                rotate: [-12, -9, -14, -10, -12],
                                transition: { repeat: Infinity, duration: 12, ease: 'easeInOut' },
                            }}
                        >
                            <FiBookOpen className="h-48 w-48 text-indigo-700" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Animated Line */}
                <motion.div
                    initial={{ opacity: 0, top: '100%' }}
                    animate={{
                        opacity: [0, 0.6, 0.1],
                        top: ['100%', '0%', '0%'],
                        transition: { duration: 3, repeat: Infinity, repeatDelay: 5 },
                    }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => {
                        const randomLeft = (i * 6.67) % 100;
                        const randomScale = 0.5 + (i % 5) * 0.1;
                        const randomDuration = 8 + (i % 5) * 1;
                        const randomDelay = (i % 5) * 1;
                        return (
                            <motion.div
                                key={`snowfall-particle-${i}`}
                                className="absolute h-1 w-1 rounded-full bg-blue-500/50 dark:bg-blue-400/50"
                                initial={{ y: -20, opacity: 0, scale: randomScale }}
                                animate={{
                                    y: '120%',
                                    opacity: [0, 0.8, 0.5, 0],
                                    transition: { duration: randomDuration, delay: randomDelay, repeat: Infinity, ease: 'linear' },
                                }}
                                style={{ left: `${randomLeft}%` }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="container-custom mx-auto px-4 relative z-10 max-w-8xl">
                <motion.div
                    variants={staggerChildren(0.1)}
                    className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <motion.div
                        variants={fadeInUp(20, 0.7)}
                        className="w-full md:w-2/3 text-center md:text-left"
                    >
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                            {heroSection?.settings?.badge || heroSection?.settings?.overline || defaultHeroProps.badge}
                        </div>
                        <motion.h1
                            variants={fadeInUp(20, 0.7)}
                            className="text-4xl md:text-5xl lg:text-6xl 4xl:text-7xl font-black leading-tight tracking-tight mb-6 relative z-10"
                            style={{
                                WebkitFontSmoothing: 'antialiased',
                                textRendering: 'geometricPrecision',
                                fontSynthesis: 'none'
                            }}
                        >
                            {(() => {
                                const fullTitle = heroSection?.title || pageContent?.title || "Latest Tech Insights";
                                const words = fullTitle.split(" ");
                                const firstPart = words.slice(0, -2).join(" ");
                                const lastTwoWords = words.slice(-2).join(" ");

                                return (
                                    <>
                                        {firstPart && `${firstPart} `}
                                        <span className="gradient-text">{lastTwoWords}</span>
                                    </>
                                );
                            })()}
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp(20, 0.7, 0.3)}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl"
                        >
                            {heroSection?.subtitle || pageContent?.description}
                        </motion.p>
                        <motion.p
                            variants={fadeInUp(20, 0.7, 0.4)}
                            className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl leading-relaxed"
                        >
                            Dive into expert perspectives on cloud computing, AI, cybersecurity, and digital transformation.
                            Our team shares actionable insights, best practices, and real-world case studies to help your
                            organization navigate the evolving technology landscape and achieve measurable business outcomes.
                        </motion.p>
                    </motion.div>

                    {/* Hero Illustration */}
                    <motion.div
                        variants={fadeInUp(20, 0.7, 0.2)}
                        className="hidden md:block w-full md:w-1/3 relative"
                    >
                        <motion.div
                            initial={{ y: 10, rotate: -5 }}
                            animate={{
                                y: [10, -10, 10],
                                rotate: [-5, 5, -5],
                                transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            className="relative w-full aspect-square max-w-md mx-auto"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-10 blur-3xl"></div>
                            <div className="relative z-10 grid grid-cols-2 gap-4 p-6 transform rotate-6">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={`blog-card-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }}
                                        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 transform hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <div className="w-full aspect-video rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
                                        <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                                        <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default BlogHeroSection;