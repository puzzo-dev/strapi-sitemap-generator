import React from 'react';
import { motion } from 'framer-motion';
import { FAQItem, FAQCategory } from '@/lib/types/content';
import { MessageCircle, FolderOpen, Sparkles } from 'lucide-react';
import { FAQStatsSectionProps } from '@/lib/types/components';

const FAQStatsSection: React.FC<FAQStatsSectionProps> = ({
    categories,
    faqItems,
    className = '',
}) => {
    const stats = [
        {
            label: 'Questions Answered',
            value: faqItems.length,
            icon: MessageCircle,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            label: 'Topic Categories',
            value: categories.length,
            icon: FolderOpen,
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            label: 'Solutions Delivered',
            value: '500+',
            icon: Sparkles,
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section className={`py-8 ${className}`}>
            <div className="container-custom max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl`} />
                                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                {stat.label}
                                            </p>
                                            <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQStatsSection;