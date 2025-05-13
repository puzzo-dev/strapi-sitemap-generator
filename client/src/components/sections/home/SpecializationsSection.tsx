import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import { useServices, usePageContent } from '@/hooks/useStrapiContent';
import { ArrowRight, Code, LayoutGrid, Cpu, CircuitBoard, Sparkles } from 'lucide-react';
import { services as localServices } from '@/lib/data';
import type { ServiceProps, PageSection } from '@/lib/types';

const SpecializationsSection: React.FC = () => {
    const { t } = useTranslation();
    const { data: apiServices, isLoading: isServicesLoading } = useServices();
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');

    // Get section content from page data or use defaults
    const sectionContent = useMemo(() => {
        const section = pageContent?.sections?.find(s => s.type === 'services') as PageSection;
        return {
            title: section?.title || t('Core Competencies'),
            subtitle: section?.subtitle || t('Specializations in Service Operations'),
            description: section?.content || t('I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.'),
            buttonText: section?.settings?.primaryButton?.text || t('Get Started'),
            buttonUrl: section?.settings?.primaryButton?.url || '/services'
        };
    }, [pageContent, t]);

    // Get featured services from section settings or use all services
    const displayServices = useMemo(() => {
        if (isServicesLoading || !apiServices?.length) {
            return localServices.slice(0, 5);
        }

        // Try to get featured services from section settings
        const servicesSection = pageContent?.sections?.find(s => s.type === 'services');
        if (servicesSection?.settings?.featured && Array.isArray(servicesSection.settings.featured)) {
            return servicesSection.settings.featured as ServiceProps[];
        }

        // Fallback to first 5 services
        return apiServices.slice(0, 5);
    }, [apiServices, isServicesLoading, pageContent]);

    // Distribute services into positions with proper null checking
    const [leftTop, leftBottom, center, rightTop, rightBottom] = useMemo(() => {
        const services = [...displayServices];
        while (services.length < 5) {
            services.push(services[services.length - 1] || localServices[0]);
        }
        return [
            services[0] || null,
            services[1] || null,
            services[2] || null,
            services[3] || null,
            services[4] || null
        ];
    }, [displayServices]);

    const isLoading = isServicesLoading || isPageLoading;

    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/30 pointer-events-none"></div>

            <div className="container-custom">
                {/* Section Header with staggered animation */}
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                        {sectionContent.title}
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="heading-md mb-4 text-blue-600 dark:text-blue-400 font-bold"
                    >
                        <span className="relative inline-block pb-2">
                            {sectionContent.subtitle}
                            <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        {sectionContent.description}
                    </motion.p>
                </div>

                {/* Rest of the existing layout structure remains the same */}
                <div className="relative">
                    {/* Tech pattern background */}
                    <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden pointer-events-none">
                        <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
                        <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700 animate-float" style={{ animationDelay: '2s' }} />
                        <Cpu className="absolute right-1/3 top-20 w-32 h-32 text-indigo-400 dark:text-indigo-600 animate-float" style={{ animationDelay: '0.5s' }} />
                        <CircuitBoard className="absolute left-1/4 bottom-10 w-40 h-40 text-purple-400 dark:text-purple-600 animate-pulse-slower transform rotate-12" />
                        <Sparkles className="absolute right-1/4 top-1/4 w-20 h-20 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
                    </div>

                    {/* Service cards layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 md:max-h-[700px]">
                        {/* Left column */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                {isLoading || !leftTop ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <ServiceCard service={leftTop} />
                                )}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {isLoading || !leftBottom ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <ServiceCard service={leftBottom} />
                                )}
                            </motion.div>
                        </div>

                        {/* Center column */}
                        <div className="flex items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className="transform md:scale-105 md:-my-2"
                            >
                                {isLoading || !center ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <ServiceCard service={center} />
                                )}
                            </motion.div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                {isLoading || !rightTop ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <ServiceCard service={rightTop} />
                                )}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {isLoading || !rightBottom ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <ServiceCard service={rightBottom} />
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 flex justify-center"
                    >
                        <div className="relative z-20">
                            <GradientButton 
                                href={sectionContent.buttonUrl} 
                                className="px-10 w-56" 
                                endIcon={<ArrowRight />}
                            >
                                {sectionContent.buttonText}
                            </GradientButton>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpecializationsSection;