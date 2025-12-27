import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CircuitBoard, Code } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { PageSection, SectionItem } from '@/lib/types/core';
import {
    fadeInUp,
    staggerChildren,
    gridItemAnimation,
    slideIn
} from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';

interface CoreValuesSectionProps extends PageSection {
    isPageLoading?: boolean;
}

const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
    title,
    subtitle,
    settings,
    isPageLoading
}) => {
    const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Get values from settings or use fallback defaults
    const fallbackValues: SectionItem[] = [
        {
            id: 1,
            title: 'Innovation',
            description: 'We constantly push boundaries and explore new technologies to deliver forward-thinking solutions that keep our clients ahead of the curve.',
            icon: 'lightning'
        },
        {
            id: 2,
            title: 'Excellence',
            description: 'We are committed to delivering the highest quality in everything we do, with meticulous attention to detail and a passion for perfection.',
            icon: 'shield'
        },
        {
            id: 3,
            title: 'Collaboration',
            description: 'We believe in the power of teamwork, both within our organization and with our clients, fostering relationships built on trust and mutual success.',
            icon: 'users'
        }
    ];
    const values: SectionItem[] = settings?.items && settings.items.length > 0 ? settings.items : fallbackValues;
    const displayTitle = title || 'Our Core Values';
    const displaySubtitle = subtitle || 'The principles that guide everything we do';

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'lightning': return Sparkles;
            case 'shield': return Sparkles;
            case 'users': return CircuitBoard;
            case 'code': return Code;
            default: return Sparkles;
        }
    };

    // Show loading state
    if (isPageLoading) {
        return (
            <section className="py-24 bg-white dark:bg-[#132f4c]">
                <div className="container-custom max-w-8xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                            {settings?.loadingText || "Loading..."}
                        </div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            ref={valuesRef}
            initial="initial"
            animate={valuesInView ? "animate" : "initial"}
            variants={staggerChildren(0.1)}
            className="py-24 bg-white dark:bg-[#132f4c]"
        >
            <div className="container-custom max-w-8xl">
                <motion.div
                    variants={fadeInUp()}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        🏆 {settings?.label || 'Our Core Values'}
                    </div>
                    <h2 className="section-title text-blue-900 dark:text-blue-200">
                        {displayTitle}
                    </h2>
                    <p className="section-subtitle">
                        {displaySubtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerChildren(0.1)}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {values.map((value, index) => {
                        const IconComponent = getIconComponent(value.icon || 'default');
                        return (
                            <motion.div
                                key={value.id}
                                variants={gridItemAnimation(index)}
                            >
                                <Card className="p-8 border border-blue-100 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300 group">
                                    <CardContent>
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default CoreValuesSection;