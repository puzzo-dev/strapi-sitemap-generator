import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import { useServices } from '@/hooks/useStrapiContent';
import { ArrowRight, Code, LayoutGrid, Cpu, CircuitBoard, Sparkles } from 'lucide-react';
import { services as localServices } from '@/lib/data';

const SpecializationsSection: React.FC = () => {
    const { t } = useTranslation();
    const { data: apiServices, isLoading, error } = useServices();

    // Get 5 services from API or fallback to local data
    const displayServices = useMemo(() => {
        // Use API services if available, otherwise use local services
        const availableServices = apiServices && apiServices.length > 0
            ? apiServices
            : localServices;

        // Take up to 5 services
        return availableServices.slice(0, 5);
    }, [apiServices]);

        // Service slide indicators (simple dots with different colors)
        const serviceIcons = [
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>,
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>,
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>,
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>,
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        ];

    // Distribute services into positions
    const [leftTop, leftBottom, center, rightTop, rightBottom] = useMemo(() => {
        // If still loading, return null for all positions
        if (isLoading) {
            return [null, null, null, null, null];
        }

        // Make sure we have exactly 5 services
        const services = [...displayServices];
        while (services.length < 5) {
            // If we don't have enough services, duplicate the last one
            services.push(services[services.length - 1] || localServices[0]);
        }

        // Return services for each position
        return [
            services[0], // Left top
            services[1], // Left bottom
            services[2], // Center (featured)
            services[3], // Right top
            services[4]  // Right bottom
        ];
    }, [displayServices, isLoading]);

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
                        {t('Core Competencies')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="heading-md mb-4 text-blue-600 dark:text-blue-400 font-bold"
                    >
                        <span className="relative inline-block pb-2">
                            {t('Specializations in Service Operations')}
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
                        {t('I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.')}
                    </motion.p>
                </div>

                {/* Main content with hexagonal layout */}
                <div className="relative">
                    {/* Tech pattern background - Enhanced but subtle */}
                    <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden pointer-events-none">
                        <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
                        <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700 animate-float" style={{ animationDelay: '2s' }} />
                        <Cpu className="absolute right-1/3 top-20 w-32 h-32 text-indigo-400 dark:text-indigo-600 animate-float" style={{ animationDelay: '0.5s' }} />
                        <CircuitBoard className="absolute left-1/4 bottom-10 w-40 h-40 text-purple-400 dark:text-purple-600 animate-pulse-slower transform rotate-12" />
                        <Sparkles className="absolute right-1/4 top-1/4 w-20 h-20 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
                    </div>

                    {/* Innovative layout with featured service in center */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 md:max-h-[700px]">
                        {/* Left column - 2 services */}
                        <div className="space-y-8">
                            {/* Web Development */}
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

                            {/* Mobile Apps */}
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

                        {/* Center column - Featured service with larger card */}
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

                        {/* Right column - 2 services */}
                        <div className="space-y-8">
                            {/* Cloud Solutions */}
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

                            {/* AI Solutions */}
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6"
                    >
                        <GradientButton href="/services" className="px-10 w-56 mx-auto" endIcon={<ArrowRight />} >
                            {t('Get Started')}
                        </GradientButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpecializationsSection;