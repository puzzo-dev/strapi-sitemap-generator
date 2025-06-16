import React from 'react';

interface BackgroundDecorationProps {
    variant?: 'default' | 'testimonials' | 'faq';
    className?: string;
}

const BackgroundDecoration: React.FC<BackgroundDecorationProps> = ({
    variant = 'default',
    className = ''
}) => {
    if (variant === 'testimonials') {
        return (
            <div className={`absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none ${className}`} aria-hidden="true">
                <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-blue-500 dark:bg-blue-600 blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
            </div>
        );
    }

    if (variant === 'faq') {
        return (
            <div className={`absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none ${className}`} aria-hidden="true">
                <div className="absolute bottom-40 left-40 w-60 h-60 rounded-full bg-blue-600 dark:bg-blue-700 blur-3xl"></div>
                <div className="absolute top-40 right-40 w-80 h-80 rounded-full bg-blue-500 dark:bg-blue-600 blur-3xl"></div>
            </div>
        );
    }

    // Default hero background
    return (
        <div className={`absolute inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
            {/* Animated gradient orbs */}
            <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
            <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />

            {/* Tech pattern elements */}
            <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
            <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>
    );
};

export default BackgroundDecoration;