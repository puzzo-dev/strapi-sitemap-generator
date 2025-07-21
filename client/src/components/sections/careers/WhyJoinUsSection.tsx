import React from 'react';
import { Award, Laptop, Heart } from 'lucide-react';
import { PageContent } from '@/lib/types/core';

interface WhyJoinUsSectionProps {
    pageContent?: PageContent | null;
    isLoading?: boolean;
}

interface ValueItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
}

const WhyJoinUsSection: React.FC<WhyJoinUsSectionProps> = ({
    pageContent,
    isLoading = false
}) => {
    // Get why join us section from page content
    const whyJoinUsSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title === 'Why Join Us');

    // If no page content or why join us section, don't render anything
    if (!pageContent || !whyJoinUsSection) {
        return null;
    }

    const title = whyJoinUsSection.title;
    const subtitle = whyJoinUsSection.subtitle;
    const content = whyJoinUsSection.content;
    const image = whyJoinUsSection.settings?.image;
    const values = whyJoinUsSection.settings?.values as ValueItem[];
    const backgroundColor = whyJoinUsSection.backgroundColor;

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'Award': return Award;
            case 'Users': return Award;
            case 'Laptop': return Laptop;
            case 'Heart': return Heart;
            default: return Award;
        }
    };

    return (
        <section className={`content-section ${backgroundColor || 'bg-white dark:bg-[#132f4c]'}`}>
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                            <span className="text-lg mr-2">👥</span>
                            {whyJoinUsSection.settings?.badge}
                        </div>

                        {isLoading ? (
                            <div className="animate-pulse space-y-6">
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                            </div>
                        ) : (
                            <>
                                <h2 className="heading-lg mb-6 text-blue-900 dark:text-blue-200">
                                    {subtitle}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    {content}
                                </p>
                                {values && values.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {values.map((value: ValueItem) => {
                                            const IconComponent = getIconComponent(value.icon);
                                            return (
                                                <div key={value.id} className="flex items-start space-x-3">
                                                    <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${value.color} text-white flex items-center justify-center shadow-md`}>
                                                        <IconComponent className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 dark:text-white mb-1">{value.title}</h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="relative">
                        <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/50 h-[500px]">
                            <img
                                src={image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                                alt="I-VARSE Team at Work"
                                className="object-cover w-full h-full"
                            />

                            {/* Tech corner elements */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                        </div>

                        {/* Background tech elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-700/50 z-0"></div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 border border-blue-200 dark:border-blue-700/50 rounded-lg rotate-12 z-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyJoinUsSection;