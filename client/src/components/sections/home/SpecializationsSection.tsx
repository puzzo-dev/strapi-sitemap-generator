import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import { useServices, usePageContent, useSectionContent } from '@/hooks/useStrapiContent';
import { ArrowRight, Code, LayoutGrid, Cpu, CircuitBoard, Sparkles } from 'lucide-react';
import { services as localServices } from '@/lib/data';
import type { ServiceProps, PageSection, AppLinkProps } from '@/lib/types';

const SpecializationsSection: React.FC = () => {
    const { t } = useTranslation();
    const { data: apiServices, isLoading: isServicesLoading } = useServices();
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');
    const { data: sectionData, isLoading: isSectionLoading } = useSectionContent('services');

    // Get section content from page data, section data, or use defaults
    const sectionContent = useMemo(() => {
        const section = pageContent?.sections?.find(s => s.type === 'services') as PageSection;
        const title = section?.title || sectionData?.title || t('Core Competencies');
        const subtitle = section?.subtitle || sectionData?.subtitle || t('Specializations in Service Operations');
        const description = section?.content || sectionData?.content || t('I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.');
        const buttonSettings = section?.settings?.primaryButton || sectionData?.settings?.primaryButton || {} as AppLinkProps;
        const buttonText = buttonSettings?.title || t('Get Started');
        const buttonUrl = (buttonSettings as AppLinkProps)?.href || '/services';

        return {
            title,
            subtitle,
            description,
            buttonText,
            buttonUrl
        };

    }, [pageContent, sectionData, t]);

    // Get all services from API or fallback to local data
    const allServices = useMemo(() => {
        if (isServicesLoading || !apiServices?.length) {
            return localServices;
        }
        return apiServices;
    }, [apiServices, isServicesLoading]);

    // Get featured services from section settings or use all services
    const displayServices = useMemo(() => {
        const servicesSection = pageContent?.sections?.find(s => s.type === 'services');
        if (servicesSection?.settings?.featured && Array.isArray(servicesSection.settings.featured)) {
            return servicesSection.settings.featured as ServiceProps[];
        }
        if (sectionData?.settings?.featured && Array.isArray(sectionData.settings.featured)) {
            return sectionData.settings.featured as ServiceProps[];
        }
        return allServices;
    }, [allServices, pageContent, sectionData]);

    // Organize services into a layout with 7 positions
    const serviceLayout = useMemo(() => {
        const services = [...displayServices];
        while (services.length < 7) {
            services.push(services[services.length % services.length] || localServices[0]);
        }
        const selectedServices = services.slice(0, 7);
        const featuredIndex = 3;

        return {
            topRow: [selectedServices[0], selectedServices[1]],
            middleRow: [
                selectedServices[2],
                { ...selectedServices[featuredIndex], featured: true },
                selectedServices[4]
            ],
            bottomRow: [selectedServices[5], selectedServices[6]]
        };
    }, [displayServices]);

    const isLoading = isServicesLoading || isPageLoading || isSectionLoading;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/30 pointer-events-none"></div>

            <div className="container-custom">
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

                <div className="relative">
                    <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden pointer-events-none">
                        <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
                        <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700 animate-float" style={{ animationDelay: '2s' }} />
                        <Cpu className="absolute right-1/3 top-20 w-32 h-32 text-indigo-400 dark:text-indigo-600 animate-float" style={{ animationDelay: '0.5s' }} />
                        <CircuitBoard className="absolute left-1/4 bottom-10 w-40 h-40 text-purple-400 dark:text-purple-600 animate-pulse-slower transform rotate-12" />
                        <Sparkles className="absolute right-1/4 top-1/4 w-20 h-20 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
                    </div>

                    {/* Top row - 2 cards with equal width */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="col-span-1"
                        >
                            {isLoading || !serviceLayout.topRow[0] ? (
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ) : (
                                <ServiceCard service={serviceLayout.topRow[0]} />
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="col-span-1"
                        >
                            {isLoading || !serviceLayout.topRow[1] ? (
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ) : (
                                <ServiceCard service={serviceLayout.topRow[1]} />
                            )}
                        </motion.div>
                    </div>

                    {/* Middle row - 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="col-span-1"
                        >
                            {isLoading || !serviceLayout.middleRow[0] ? (
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ) : (
                                <ServiceCard service={serviceLayout.middleRow[0]} />
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="col-span-1 transform md:scale-105"
                        >
                            {isLoading || !serviceLayout.middleRow[1] ? (
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ) : (
                                <ServiceCard service={serviceLayout.middleRow[1]} featured={true} />
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="col-span-1"
                        >
                            {isLoading || !serviceLayout.middleRow[2] ? (
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ) : (
                                <ServiceCard service={serviceLayout.middleRow[2]} />
                            )}
                        </motion.div>
                    </div>

                    {/* Bottom row - 2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {serviceLayout.bottomRow.map((service, index) => (
                            <motion.div
                                key={`bottom-${service.id}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                                className="col-span-1"
                            >
                                {isLoading ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <ServiceCard service={service} />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-20 flex justify-center"
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