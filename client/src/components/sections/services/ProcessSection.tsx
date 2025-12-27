import React from 'react';
import { PageContent } from '@/lib/types/core';
import {
    Search,
    Map,
    Code,
    CheckCircle,
    Rocket,
    Settings,
    Users,
    Zap,
    Target,
    Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProcessItem {
    id: number;
    title: string;
    description: string;
    icon?: string;
}

interface ProcessSectionProps {
    pageContent?: PageContent | null;
    isLoading?: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ pageContent, isLoading = false }) => {
    // Fallback process items
    const fallbackProcessItems: ProcessItem[] = [
        { id: 1, title: "Discover", description: "We start by understanding your business goals, target audience, and specific requirements.", icon: "Search" },
        { id: 2, title: "Plan", description: "We develop a comprehensive strategy and project plan tailored to your needs.", icon: "Map" },
        { id: 3, title: "Develop", description: "Our expert team builds your solution using the latest technologies and best practices.", icon: "Code" },
        { id: 4, title: "Test", description: "We thoroughly test your solution to ensure it meets all requirements and performs flawlessly.", icon: "CheckCircle" },
        { id: 5, title: "Deploy", description: "We launch your solution and provide ongoing support to ensure continued success.", icon: "Rocket" }
    ];

    // Get process section from page content - look for custom section with "Process" in title
    const processSection = pageContent?.sections?.find(s =>
        s.type === 'custom' && (s.title?.includes('Process') || s.badge?.includes('Process'))
    );
    const processItems = (processSection?.settings?.items as ProcessItem[]) || fallbackProcessItems;

    const gradients = [
        'from-blue-400 to-blue-600',
        'from-indigo-400 to-indigo-600',
        'from-cyan-400 to-cyan-600',
        'from-purple-400 to-purple-600',
        'from-green-400 to-green-600'
    ];

    // Icon mapping function
    const getIcon = (iconName?: string, stepId?: number) => {
        switch (iconName?.toLowerCase()) {
            case 'search':
                return <Search className="h-6 w-6" />;
            case 'map':
                return <Map className="h-6 w-6" />;
            case 'code':
                return <Code className="h-6 w-6" />;
            case 'checkcircle':
            case 'check':
                return <CheckCircle className="h-6 w-6" />;
            case 'rocket':
                return <Rocket className="h-6 w-6" />;
            case 'settings':
                return <Settings className="h-6 w-6" />;
            case 'users':
                return <Users className="h-6 w-6" />;
            case 'zap':
                return <Zap className="h-6 w-6" />;
            case 'target':
                return <Target className="h-6 w-6" />;
            case 'star':
                return <Star className="h-6 w-6" />;
            default:
                return <span className="text-lg font-bold">{stepId}</span>;
        }
    };

    // If loading, show skeleton
    if (isLoading) {
        return (
            <section className="py-24 bg-gradient-to-b from-white to-blue-50/60 dark:from-[#132f4c] dark:to-[#0a192f]">
                <div className="container-custom max-w-8xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse">
                            {processSection?.badge}
                        </div>
                        <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 animate-pulse"></div>
                        <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-2/3 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-white dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800/50 animate-pulse">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-6"></div>
                                <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-3"></div>
                                <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2"></div>
                                <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/60 dark:from-[#132f4c] dark:to-[#0a192f] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-8">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/22"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/16"></div>
                    <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500/10"></div>
                </div>
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <Settings className="absolute left-10 top-20 h-28 w-28 text-blue-400 dark:text-blue-600" />
                    <Zap className="absolute right-10 bottom-20 h-32 w-32 text-indigo-400 dark:text-indigo-600" />
                    <Target className="absolute right-1/4 top-1/3 h-24 w-24 text-cyan-400 dark:text-cyan-600" />
                </div>
            </div>
            <div className="container-custom max-w-8xl relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        {processSection?.badge}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-200 mb-3">{processSection?.title}</h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {processSection?.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {processItems.map((step, index) => (
                        <Card key={step.id} className="p-3 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-lg hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all bg-white/80 dark:bg-white/5 backdrop-blur">
                            <CardContent className="p-0">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mb-4 text-white font-bold group-hover:scale-110 transition-transform`}>
                                    {getIcon(step.icon, step.id)}
                                </div>
                                <h3 className="text-sm font-bold mb-2 text-blue-900 dark:text-blue-200">{step.title}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {step.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;