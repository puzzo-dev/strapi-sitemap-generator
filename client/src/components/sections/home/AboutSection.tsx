import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    PlayCircle,
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
import { Button } from '@/components/ui/button';
import { AboutSectionProps } from '@/lib/types/components';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { getTranslation } from '@/lib/utils/translationHelpers';
import { uiLabels } from '@/lib/data';

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

type StatCardProps = {
    stat: any;
    index: number;
    isVisible: boolean;
    getStatIcon: (index: number) => JSX.Element;
};

const StatCard: React.FC<StatCardProps> = ({ stat, index, isVisible, getStatIcon }) => {
    const numericValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
    const count = useCountUp(numericValue, 2500, isVisible);
    const suffix = stat.value.replace(/[0-9]/g, '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, clipPath: 'inset(0 0 24% 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.06 }}
            className="relative group text-center h-full rounded-2xl border border-blue-100/60 dark:border-blue-900/50 bg-white/65 dark:bg-white/5 p-4 overflow-hidden backdrop-blur"
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 dark:border-blue-400"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500 dark:border-blue-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
            </div>

            <div className="mb-2 flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">
                        {getStatIcon(index)}
                    </div>
                </div>
            </div>

            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 duration-[5000ms] animate-scan-line"></div>

            <div className="relative z-10 py-2">
                <div className="text-4xl md:text-5xl font-extrabold mb-1 bg-gradient-to-r from-[#2FB8FF] via-blue-600 to-[#0047AB] dark:from-[#2FB8FF] dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    {count}{suffix}
                </div>
                <div className="text-xs md:text-sm font-medium text-blue-900 dark:text-blue-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.label}
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#2FB8FF] dark:via-[#2FB8FF] to-transparent group-hover:w-full transition-all duration-500"></div>

            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
    );
};

const AboutSection: React.FC<AboutSectionProps> = ({ homePageContent }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

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

    const aboutSection = homePageContent?.sections?.find(s => s.type === 'about');

    const title = aboutSection?.title;
    const badge = aboutSection?.badge;
    const subtitle = aboutSection?.subtitle;
    const content = aboutSection?.content;
    const stats = aboutSection?.settings?.stats || [];
    const video = aboutSection?.settings?.video;

    const contentParagraphs = typeof content === 'string'
        ? content.split('\n').filter(p => p.trim() !== '')
        : [];

    const getStatIcon = (index: number) => {
        const icons = [TrendingUp, Award, Users, Target];
        const Icon = icons[index % icons.length];
        return <Icon className="h-8 w-8" />;
    };

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/8 to-white dark:from-[#0a192f] dark:via-blue-950/20 dark:to-[#0a192f]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-8">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/22"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/16"></div>
                    <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 via-transparent to-transparent"></div>
                </div>
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <Code className="absolute left-10 top-10 h-28 w-28 text-blue-400 dark:text-blue-600" />
                    <LayoutGrid className="absolute right-10 top-6 h-24 w-24 text-blue-400 dark:text-blue-600" />
                    <Cpu className="absolute right-1/3 bottom-10 h-24 w-24 text-blue-400 dark:text-blue-600" />
                </div>
            </div>

            <div className="container-custom relative z-10 max-w-[1400px] px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-4 sm:gap-4 lg:gap-6 items-stretch py-4">
                    <motion.div
                        variants={fadeInUp()}
                        initial="initial"
                        animate={isVisible ? 'animate' : 'initial'}
                        className="relative overflow-hidden rounded-2xl border border-blue-100/60 dark:border-blue-900/50 bg-white/80 dark:bg-white/5 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.08),0_8px_48px_-4px_rgba(0,0,0,0.06)] backdrop-blur flex flex-col"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] rounded-t-2xl" />
                        <div className="p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-6 flex-1 flex flex-col">
                            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
                                <span className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                                {badge || 'About us'}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0047AB] dark:text-white leading-tight" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                {title || 'Engineering outcomes, not just features'}
                            </h2>
                            {subtitle && (
                                <p className="text-lg text-slate-600 dark:text-slate-200/80 leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                            <div className="space-y-3 text-slate-600 dark:text-slate-200/80 text-base leading-relaxed">
                                {contentParagraphs.length > 0 ? (
                                    contentParagraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p className="italic text-slate-500 dark:text-slate-400">Content will be displayed here when available.</p>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3 pt-2">
                                {['Enterprise delivery', 'Security-first', 'AI-assisted', 'Measurable impact'].map((pill) => (
                                    <span key={pill} className="px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-50/80 dark:bg-white/5 border border-blue-100/60 dark:border-white/5 text-blue-800 dark:text-blue-100">
                                        {pill}
                                    </span>
                                ))}
                            </div>
                            <div>
                                <a
                                    href="/about-us"
                                    className="inline-flex items-center text-blue-600 dark:text-blue-300 font-semibold hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-300 group"
                                >
                                    {getTranslation(t, 'ui.learnMoreAboutUs', uiLabels.learnMoreAboutUs)}
                                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp(20, 0.6)}
                        initial="initial"
                        animate={isVisible ? 'animate' : 'initial'}
                        className="flex flex-col gap-6"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-blue-100/60 dark:border-blue-900/50 bg-white/85 dark:bg-white/5 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.08),0_8px_48px_-4px_rgba(0,0,0,0.06)] backdrop-blur flex-1 flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10" />
                            <div className="relative p-3 sm:p-4 flex-1 flex flex-col">
                                <div className="relative rounded-xl overflow-hidden aspect-video border border-blue-100/60 dark:border-blue-900/40 bg-slate-900">
                                    <img
                                        src={video?.thumbnail}
                                        alt={video?.title ? `Video: ${video.title}` : 'About video'}
                                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 shadow-lg text-blue-600 hover:bg-white"
                                    >
                                        <PlayCircle className="h-10 w-10" />
                                    </Button>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="font-semibold">{video?.title || 'Inside I-VARSE'}</div>
                                        <div className="text-sm text-white/80">{video?.description || 'See how we build resilient platforms and partner with clients.'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {stats.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {stats.map((stat: any, index: number) => (
                                    <StatCard
                                        key={index}
                                        stat={stat}
                                        index={index}
                                        isVisible={isVisible}
                                        getStatIcon={getStatIcon}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
