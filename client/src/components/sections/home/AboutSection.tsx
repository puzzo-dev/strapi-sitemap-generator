import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    PlayCircle,
    InfoIcon,
    Code,
    LayoutGrid,
    Cpu,
    CircuitBoard
} from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Button } from '@/components/ui/button';
import { AboutSectionProps } from '@/lib/types/components';

const AboutSection: React.FC<AboutSectionProps> = ({ homePageContent }) => {

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

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background tech pattern for about section */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
                {/* Tech elements */}
                <Code className="absolute left-10 top-20 h-40 w-40 text-blue-400 dark:text-blue-600 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
                <LayoutGrid className="absolute right-20 top-10 h-32 w-32 text-purple-400 dark:text-purple-600 opacity-25 animate-pulse-slower" />
                <Cpu className="absolute right-1/3 bottom-20 h-36 w-36 text-indigo-400 dark:text-indigo-600 opacity-20 transform rotate-12 animate-float" style={{ animationDelay: '2s' }} />

                {/* Tech scan line */}
                <div className="tech-scan-line" style={{ animationDelay: '3s' }}></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="contents">
                            <div className="absolute left-0 right-0 h-px bg-blue-500/20 dark:bg-blue-400/10" style={{ top: `${(i + 1) * 16}%` }}></div>
                            <div className="absolute top-0 bottom-0 w-px bg-blue-500/20 dark:bg-blue-400/10" style={{ left: `${(i + 1) * 16}%` }}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            {/* Section Title */}
                            <div className="mb-8 animate-fade-in">
                                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
                                    <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse-slow"></span>
                                    {badge}
                                </div>
                                <h2 className="heading-md text-blue-900 dark:text-blue-200 mt-2">{title}</h2>
                            </div>

                            {/* About Content */}
                            <div className="text-gray-600 dark:text-gray-300 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                {contentParagraphs.length > 0 ? (
                                    contentParagraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 italic">
                                        Content will be displayed here when available.
                                    </p>
                                )}

                                {/* Key Facts */}
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    {stats.map((stat: any, index: number) => (
                                        <div
                                            key={index}
                                            className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up"
                                            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                                        >
                                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Container */}
                    <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="relative rounded-xl overflow-hidden aspect-video card border-2 border-blue-200 dark:border-blue-800/70 group">
                            {/* Tech-inspired decorative elements - Enhanced */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <CircuitBoard className="absolute top-0 left-0 w-40 h-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4 animate-float" style={{ animationDelay: '0.5s' }} />
                                <Cpu className="absolute bottom-8 right-8 w-24 h-24 text-indigo-200/20 dark:text-indigo-700/20 transform rotate-12 animate-pulse-slower" />
                                <Code className="absolute top-8 right-8 w-16 h-16 text-cyan-200/20 dark:text-cyan-700/20 animate-pulse-light" />
                                <LayoutGrid className="absolute bottom-12 left-12 w-20 h-20 text-purple-200/15 dark:text-purple-700/15 animate-float" style={{ animationDelay: '1.5s' }} />

                                {/* Gradient orb */}
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tl from-blue-200/20 to-transparent dark:from-blue-800/10 blur-xl animate-pulse-slow"></div>

                                {/* Circuit lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="currentColor" strokeWidth="0.3" fill="none" />
                                    <circle cx="20" cy="20" r="3" fill="currentColor" className="animate-pulse-light" />
                                    <circle cx="80" cy="20" r="3" fill="currentColor" className="animate-pulse-light" style={{ animationDelay: '1s' }} />
                                    <circle cx="80" cy="80" r="3" fill="currentColor" className="animate-pulse-light" style={{ animationDelay: '2s' }} />
                                    <circle cx="20" cy="80" r="3" fill="currentColor" className="animate-pulse-light" style={{ animationDelay: '3s' }} />
                                </svg>
                            </div>

                            {/* Main video container */}
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
                                        className="z-20 w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 hover:scale-110 animate-pulse-light p-0"
                                    >
                                        <PlayCircle className="h-12 w-12 text-blue-600" />
                                    </Button>

                                    {/* Video title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                                        <div className="font-medium">{video?.title}</div>
                                        <div className="text-sm text-gray-300">{video?.description}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Tech corner elements */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-blue-500 dark:border-blue-400 rounded-tl z-10"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-blue-500 dark:border-blue-400 rounded-tr z-10"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-blue-500 dark:border-blue-400 rounded-bl z-10"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-blue-500 dark:border-blue-400 rounded-br z-10"></div>

                            {/* Dynamic highlights */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                                <div className="absolute top-0 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                                <div className="absolute bottom-0 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                                <div className="absolute left-0 top-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                                <div className="absolute right-0 top-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <InfoIcon className="h-4 w-4 mr-1 text-blue-500" />
                                Click to watch our company introduction video
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;