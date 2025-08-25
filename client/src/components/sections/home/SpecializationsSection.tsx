import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import { ArrowRight, Code, LayoutGrid, Cpu, CircuitBoard, Sparkles } from 'lucide-react';
import { ServiceProps } from '@/lib/types/content';
import { PageSection, AppLinkProps, PageContent } from '@/lib/types/core';
import { SpecializationsSectionProps } from '@/lib/types/components';

const SpecializationsSection: React.FC<SpecializationsSectionProps> = ({ homePageContent, services, isLoading }) => {
    // Get services section from homePageContent
    const servicesSection = homePageContent?.sections?.find((s: PageSection) => s.type === 'services');

    // Extract section content from servicesSection
    const title = servicesSection?.title;
    const subtitle = servicesSection?.subtitle;
    const description = servicesSection?.content;
    const buttonSettings = servicesSection?.settings?.primaryButton;
    const featuredServices = servicesSection?.settings?.featured;

    // Get all services from props
    const allServices = services || [];

    // Only allow ServiceProps in displayServices
    const filterServiceProps = (arr: any[]): ServiceProps[] =>
        Array.isArray(arr) ? arr.filter((s): s is ServiceProps => s && typeof s === 'object' && 'icon' in s && 'title' in s && 'description' in s) : [];

    // Get featured services from section settings or use all services
    const displayServices: ServiceProps[] =
        Array.isArray(featuredServices) && featuredServices.length > 0
            ? filterServiceProps(featuredServices)
            : filterServiceProps(allServices);

    // Organize services into a layout with 7 positions
    const serviceLayout = useMemo(() => {
        const services = [...displayServices];
        while (services.length < 7 && services.length > 0) {
            services.push(services[services.length % services.length]);
        }
        const selectedServices = services.slice(0, 7);
        const featuredIndex = 3;
        return {
            topRow: [selectedServices[0], selectedServices[1]],
            middleRow: [
                selectedServices[2],
                selectedServices[featuredIndex] ? { ...selectedServices[featuredIndex], featured: true } : undefined,
                selectedServices[4]
            ],
            bottomRow: [selectedServices[5], selectedServices[6]]
        };
    }, [displayServices]);

    // Type guard for ServiceProps
    function isServiceProps(obj: any): obj is ServiceProps {
        return obj && typeof obj === 'object' && 'icon' in obj && 'title' in obj && 'description' in obj;
    }
    // Type guard for featured ServiceProps
    function hasFeatured(obj: any): obj is ServiceProps & { featured: boolean } {
        return isServiceProps(obj) && 'featured' in obj && typeof obj.featured === 'boolean';
    }

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
                        {/*  */}
                        {title}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="heading-md mb-4 text-blue-900 dark:text-blue-200 font-bold"
                    >
                        <span className="relative inline-block pb-2">
                            {subtitle}
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
                        {description}
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
                        {[0, 1].map(idx => (
                            <motion.div
                                key={`top-${idx}`}
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="col-span-1"
                            >
                                {isLoading || !serviceLayout.topRow[idx] ? (
                                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    isServiceProps(serviceLayout.topRow[idx]) && <ServiceCard service={serviceLayout.topRow[idx]} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                    {/* Middle row - 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-6">
                        {[0, 1, 2].map(idx => (
                            <motion.div
                                key={`middle-${idx}`}
                                initial={{ opacity: 0, x: idx === 0 ? -30 : idx === 2 ? 30 : 0, y: idx === 1 ? 30 : 0 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 + (idx === 1 ? 0.1 : 0), delay: 0.2 * (idx + 1) }}
                                className={`col-span-1${idx === 1 ? ' transform md:scale-105' : ''}`}
                            >
                                {isLoading || !serviceLayout.middleRow[idx] ? (
                                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    isServiceProps(serviceLayout.middleRow[idx])
                                        ? hasFeatured(serviceLayout.middleRow[idx])
                                            ? <ServiceCard service={serviceLayout.middleRow[idx]} featured={serviceLayout.middleRow[idx].featured} />
                                            : <ServiceCard service={serviceLayout.middleRow[idx]} />
                                        : null
                                )}
                            </motion.div>
                        ))}
                    </div>
                    {/* Bottom row - 2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {serviceLayout.bottomRow.map((service, index) => (
                            <motion.div
                                key={`bottom-${service?.id || 'service'}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                                className="col-span-1"
                            >
                                {isLoading || !service ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    isServiceProps(service) && <ServiceCard service={service} />
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
                            {buttonSettings && typeof buttonSettings === 'object' && (
                                <GradientButton
                                    href={buttonSettings.href}
                                    className="px-10 w-56"
                                    endIcon={<ArrowRight />}
                                >
                                    {buttonSettings.title}
                                </GradientButton>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpecializationsSection;