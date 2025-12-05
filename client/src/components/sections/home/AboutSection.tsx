import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    PlayCircle,
    InfoIcon,
    Code,
    LayoutGrid,
    Cpu,
    CircuitBoard,
    TrendingUp,
    Award,
    Users,
    Target,
    ArrowRight
} from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Button } from '@/components/ui/button';
import { AboutSectionProps } from '@/lib/types/components';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import GradientButton from '@/components/ui/GradientButton';
import { getTranslation } from '@/lib/utils/translationHelpers';
import { uiLabels } from '@/lib/data';

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
};

const AboutSection: React.FC<AboutSectionProps> = ({ homePageContent }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    // Intersection observer for triggering animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Get about section from homePageContent
    const aboutSection = homePageContent?.sections?.find(s => s.type === 'about');

    // Extract data from the section
    const title = aboutSection?.title;
    const badge = aboutSection?.badge;
    const subtitle = aboutSection?.subtitle;
    const content = aboutSection?.content;
    const stats = aboutSection?.settings?.stats || [];
    const video = aboutSection?.settings?.video;

    // Split content into paragraphs if it's a string
    const contentParagraphs = typeof content === 'string'
        ? content.split('\n').filter(p => p.trim() !== '')
        : [];

    // Icon mapping for stats
    const getStatIcon = (index: number) => {
        const icons = [TrendingUp, Award, Users, Target];
        const Icon = icons[index % icons.length];
        return <Icon className="h-8 w-8" />;
    };

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30 dark:from-[#0a192f] dark:to-[#0c1e3a]">
            {/* Background tech pattern */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
                <Code className="absolute left-10 top-20 h-40 w-40 text-blue-400 dark:text-blue-600 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
                <LayoutGrid className="absolute right-20 top-10 h-32 w-32 text-purple-400 dark:text-purple-600 opacity-25 animate-pulse-slower" />
                <Cpu className="absolute right-1/3 bottom-20 h-36 w-36 text-indigo-400 dark:text-indigo-600 opacity-20 transform rotate-12 animate-float" style={{ animationDelay: '2s' }} />

                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="contents">
                            <div className="absolute left-0 right-0 h-px bg-blue-500/20 dark:bg-blue-400/10" style={{ top: `${(i + 1) * 16}%` }}></div>
                            <div className="absolute top-0 bottom-0 w-px bg-blue-500/20 dark:bg-blue-400/10" style={{ left: `${(i + 1) * 16}%` }}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-custom relative z-10 max-w-8xl">
                <motion.div
                    initial="initial"
                    animate={isVisible ? "animate" : "initial"}
                    variants={staggerChildren(0.2)}
                    className="space-y-16"
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp()} className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                            {badge}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-4">{title}</h2>
                        {subtitle && (
                            <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
                        )}
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                        {/* Content */}
                        <motion.div variants={fadeInUp(20, 0.6)} className="w-full lg:w-1/2">
                            <div className="text-gray-600 dark:text-gray-300 space-y-4 text-lg leading-relaxed mb-20">
                                {contentParagraphs.length > 0 ? (
                                    contentParagraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 italic">
                                        Content will be displayed here when available.
                                    </p>
                                )}
                            </div>

                            {/* CTA Link */}
                            <div>
                                <a
                                    href="/about"
                                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 group"
                                >
                                    {getTranslation(t, 'ui.learnMoreAboutUs', uiLabels.learnMoreAboutUs)}
                                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Video Container */}
                        <motion.div variants={fadeInUp(20, 0.6, 0.2)} className="w-full lg:w-1/2">
                            <div className="relative rounded-xl overflow-hidden aspect-video border-2 border-blue-200 dark:border-blue-800/70 group shadow-2xl">
                                {/* Decorative elements */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <CircuitBoard className="absolute top-0 left-0 w-40 h-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4 animate-float" style={{ animationDelay: '0.5s' }} />
                                    <Cpu className="absolute bottom-8 right-8 w-24 h-24 text-indigo-200/20 dark:text-indigo-700/20 transform rotate-12 animate-pulse-slower" />
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tl from-blue-200/20 to-transparent dark:from-blue-800/10 blur-xl animate-pulse-slow"></div>
                                </div>

                                {/* Video */}
                                <div className="absolute inset-3 rounded-lg overflow-hidden shadow-xl z-10 bg-gray-900">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-blue-900/30"></div>
                                        <img
                                            src={video?.thumbnail}
                                            alt={`Video: ${video?.title}`}
                                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                                        />
                                        <Button
                                            size="lg"
                                            variant="ghost"
                                            className="z-20 w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 hover:scale-110 p-0"
                                        >
                                            <PlayCircle className="h-12 w-12 text-blue-600" />
                                        </Button>

                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                                            <div className="font-medium">{video?.title}</div>
                                            <div className="text-sm text-gray-300">{video?.description}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tech corners */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 dark:border-blue-400 z-10"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500 dark:border-blue-400 z-10"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500 dark:border-blue-400 z-10"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 dark:border-blue-400 z-10"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats - Tech-Inspired Design */}
                    {stats.length > 0 && (
                        <motion.div variants={fadeInUp(20, 0.6, 0.3)} className="mt-16">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                                {stats.map((stat: any, index: number) => {
                                    const numericValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
                                    const count = useCountUp(numericValue, 2500, isVisible);
                                    const suffix = stat.value.replace(/[0-9]/g, '');

                                    return (
                                        <motion.div
                                            key={index}
                                            variants={fadeInUp(10, 0.5, index * 0.1)}
                                            className="relative group text-center"
                                        >
                                            {/* Tech border frame */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                {/* Corner brackets */}
                                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 dark:border-blue-400"></div>
                                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
                                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500 dark:border-blue-400"></div>
                                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
                                            </div>

                                            {/* Icon with glow effect */}
                                            <div className="mb-4 flex justify-center">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                                    <div className="relative text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">
                                                        {getStatIcon(index)}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Animated scanning line */}
                                            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 duration-&lsqb;5000ms&rsqb; animate-scan-line"></div>

                                            {/* Value with gradient */}
                                            <div className="relative z-10 py-4">
                                                <div className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-[#2FB8FF] via-blue-600 to-[#0047AB] dark:from-[#2FB8FF] dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                                    {count}{suffix}
                                                </div>
                                                <div className="text-sm md:text-base font-medium text-blue-900 dark:text-blue-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                    {stat.label}
                                                </div>
                                            </div>

                                            {/* Bottom indicator line */}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#2FB8FF] dark:via-[#2FB8FF] to-transparent group-hover:w-full transition-all duration-500"></div>

                                            {/* Pulse effect on hover */}
                                            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
