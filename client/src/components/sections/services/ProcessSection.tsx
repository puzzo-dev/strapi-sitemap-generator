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
    // Get process section from page content
    const processSection = pageContent?.sections?.find(s => s.type === 'custom');
    const processItems = (processSection?.settings?.items as ProcessItem[]) || [];

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
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse">
                            {processSection?.badge}
                        </div>
                        <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 animate-pulse"></div>
                        <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-2/3 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 animate-pulse">
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

    // If no process steps, render nothing
    if (!processItems.length) return null;

    return (
        <section className="py-24 bg-gradient-to-b from-white to-blue-50/60 dark:from-[#132f4c] dark:to-[#0a192f]">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        {processSection?.badge}
                    </div>
                    <h2 className="section-title text-blue-900 dark:text-blue-200">{processSection?.title}</h2>
                    <p className="section-subtitle">
                        {processSection?.subtitle }
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {processItems.map((step, index) => (
                        <Card key={step.id} className="p-6 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-md transition-all">
                            <CardContent>
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mb-6 text-white font-bold group-hover:scale-110 transition-transform`}>
                                    {getIcon(step.icon, step.id)}
                                </div>
                                <h3 className="text-md font-semibold mb-3 text-blue-900 dark:text-blue-200">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">
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