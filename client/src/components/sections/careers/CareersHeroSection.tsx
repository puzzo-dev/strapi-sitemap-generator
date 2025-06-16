import React from 'react';
import { ChevronRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

const CareersHeroSection: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
                <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />

                {/* Tech pattern elements */}
                <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
                <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                        Careers at I-VARSE
                    </div>

                    <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Join Our <span className="gradient-text">Innovative Team</span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Be part of a dynamic team that's creating cutting-edge solutions and shaping the future of technology.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <GradientButton href="#open-positions" endIcon={<ChevronRight />}>
                            View Open Positions
                        </GradientButton>
                        <GradientButton href="/contact" variant="outline">
                            Contact Us
                        </GradientButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareersHeroSection;