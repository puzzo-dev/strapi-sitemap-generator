import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FAQItem, FAQCategory } from '@/lib/types/content';
import { HelpCircle, Users, Clock, CheckCircle } from 'lucide-react';
import { FAQStatsSectionProps } from '@/lib/types/components';

const FAQStatsSection: React.FC<FAQStatsSectionProps> = ({
    categories,
    faqItems,
    className = '',
}) => {
    const stats = [
        {
            name: 'Total Questions',
            value: faqItems.length,
            icon: HelpCircle,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            name: 'Categories',
            value: categories.length,
            icon: Users,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            name: 'Avg. Response Time',
            value: '< 24h',
            icon: Clock,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        },
        {
            name: 'Resolution Rate',
            value: '98%',
            icon: CheckCircle,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        },
    ];

    return (
        <section className={`py-12 bg-gray-50 dark:bg-gray-900/50 ${className}`}>
            <div className="container-custom max-w-8xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <Card key={stat.name}>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                            <IconComponent className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {stat.name}
                                            </p>
                                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQStatsSection;