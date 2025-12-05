import React from 'react';
import type { FAQHeroSectionProps } from '@/lib/types';

const FAQHeroSection: React.FC<FAQHeroSectionProps> = ({
    title,
    description,
    isLoading,
}) => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
                <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
                <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
                <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
            </div>

            <div className="container-custom relative z-10 max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    {isLoading ? (
                        <div className="animate-pulse space-y-6">
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
                        </div>
                    ) : (
                        <>
                            <h1 className="heading-xl mb-6 animate-fade-in-up text-center">
                                {title}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
                                {description}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FAQHeroSection;