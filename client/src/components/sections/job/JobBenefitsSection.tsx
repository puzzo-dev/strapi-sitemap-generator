import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Benefit, PageContent } from '@/lib/types/core';
import {
    fadeInUp,
    staggerChildren
} from '@/lib/animations';

interface JobBenefitsSectionProps {
    benefits?: Benefit[];
    isLoading?: boolean;
    pageContent?: PageContent;
}

const JobBenefitsSection: React.FC<JobBenefitsSectionProps> = ({
    benefits = [],
    isLoading = false,
    pageContent
}) => {
    const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Get benefits content from page content settings
    const benefitsContent = pageContent?.sections?.find(s => s.type === 'features')?.settings;

    // Use provided benefits or fallback to default benefits from page content
    const displayBenefits = benefits.length > 0 ? benefits : (benefitsContent?.items || []);

    return (
        <motion.section
            ref={benefitsRef}
            initial="initial"
            animate={benefitsInView ? "animate" : "initial"}
            variants={staggerChildren()}
            className="py-16 md:py-24 bg-white dark:bg-[#132f4c]"
        >
            <div className="container mx-auto px-4 max-w-8xl">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h2
                        variants={fadeInUp()}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-6"
                    >
                        {benefitsContent?.title || "Benefits & Perks"}
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp(0.2)}
                        className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        {benefitsContent?.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayBenefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.id || index}
                            variants={fadeInUp(0.1 * index)}
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={fadeInUp()}
                    className="mt-16 text-center"
                >
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Ready to join our team?
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Apply Today
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Join our innovative team and be part of creating cutting-edge solutions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default JobBenefitsSection;