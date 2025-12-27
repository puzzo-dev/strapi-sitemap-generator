import React from 'react';
import { PageContent } from '@/lib/types/core';
import { industriesPageContent } from '@/lib/data/pages';

interface IndustriesContentSectionProps {
    pageContent?: PageContent | null;
    isLoading?: boolean;
}

const IndustriesContentSection: React.FC<IndustriesContentSectionProps> = ({
    pageContent,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <section className="py-16 bg-white dark:bg-[#0a192f]">
                <div className="container-custom max-w-8xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-8"></div>
                            <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6"></div>
                            <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6"></div>
                            <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Get content section from page content (id: 2, type: custom) or use fallback
    const contentSection = pageContent?.sections?.find(s => s.type === 'custom' && s.id === 2)
        || industriesPageContent.sections.find(s => s.type === 'custom' && s.id === 2);

    const title = contentSection?.title || 'Our Industry Expertise';
    const subtitle = contentSection?.subtitle || 'Comprehensive solutions across diverse sectors';
    const content = contentSection?.content || 'At I-Varse Technologies, we understand that each industry has unique challenges and requirements.';
    const badge = contentSection?.settings?.badge || '🎯 Industry Focus';
    const whyChooseUs = contentSection?.settings?.whyChooseUs || [];

    return (
        <section className="py-16 bg-white dark:bg-[#0a192f]">
            <div className="container-custom max-w-8xl">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        {badge}
                    </div>

                    <h2 className="section-title text-blue-900 dark:text-blue-200 mb-4">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="text-xl text-blue-700 dark:text-blue-300 mb-8 font-medium">
                            {subtitle}
                        </p>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                            {content}
                        </p>

                        {whyChooseUs.length > 0 && (
                            <>
                                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">
                                    Our Industry Approach
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {whyChooseUs.map((item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800"
                                        >
                                            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustriesContentSection;
export { IndustriesContentSection };
