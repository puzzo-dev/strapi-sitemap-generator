import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import GradientButton from '@/components/ui/GradientButton';
import { ArrowRight, Code, LayoutGrid, Cpu, CircuitBoard, Sparkles, Server, Globe, Smartphone, Search, PenTool, Cloud, Database, BarChart } from 'lucide-react';
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

    // Type guard for ServiceProps
    function isServiceProps(obj: any): obj is ServiceProps {
        return obj && typeof obj === 'object' && 'icon' in obj && 'title' in obj && 'description' in obj;
    }

    // Icon mapping
    const getServiceIcon = (iconName: string) => {
        const icons: { [key: string]: any } = {
            'fa-server': Server,
            'fa-code': Code,
            'fa-globe': Globe,
            'fa-mobile': Smartphone,
            'fa-search': Search,
            'fa-pen-tool': PenTool,
            'fa-cloud': Cloud,
            'fa-database': Database,
            'fa-chart-bar': BarChart,
            'fa-cpu': Cpu
        };
        const IconComponent = icons[iconName] || Server;
        return <IconComponent className="h-8 w-8" />;
    };

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-[#0a192f] dark:via-blue-950/30 dark:to-[#0a192f]">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden pointer-events-none">
                <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
                <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700 animate-float" style={{ animationDelay: '2s' }} />
                <Cpu className="absolute right-1/3 top-20 w-32 h-32 text-indigo-400 dark:text-indigo-600 animate-float" style={{ animationDelay: '0.5s' }} />
                <CircuitBoard className="absolute left-1/4 bottom-10 w-40 h-40 text-purple-400 dark:text-purple-600 animate-pulse-slower transform rotate-12" />
                <Sparkles className="absolute right-1/4 top-1/4 w-20 h-20 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                        {title}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 dark:text-blue-200"
                        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                    >
                        {subtitle}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Services Grid - No Cards - Show only 6 most trendy */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {isLoading ? (
                        Array(6).fill(0).map((_, index) => (
                            <div key={index} className="animate-pulse space-y-4">
                                <div className="h-16 w-16 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl"></div>
                                <div className="h-6 bg-blue-100/50 dark:bg-blue-900/20 rounded w-3/4"></div>
                                <div className="h-4 bg-blue-100/50 dark:bg-blue-900/20 rounded w-full"></div>
                                <div className="h-4 bg-blue-100/50 dark:bg-blue-900/20 rounded w-5/6"></div>
                            </div>
                        ))
                    ) : displayServices && displayServices.length > 0 ? (
                        displayServices.slice(0, 6).map((service, index) => (
                            <motion.div
                                key={service.id || `service-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Tech corner brackets on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -m-4">
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 dark:border-blue-400"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500 dark:border-blue-400"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
                                </div>

                                <Link href={service.slug ? `/services/${service.slug}` : '#'}>
                                    <a className="block space-y-4">
                                        {/* Icon with glow */}
                                        <div className="relative inline-block">
                                            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                            <div className="relative h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                                {getServiceIcon(service.icon)}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-extrabold text-blue-900 dark:text-blue-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                                            {service.description}
                                        </p>

                                        {/* Bottom indicator */}
                                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                            <span>Learn More</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>

                                        {/* Expanding line */}
                                        <div className="h-0.5 w-12 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] dark:from-[#2FB8FF] dark:to-[#0047AB] group-hover:w-full transition-all duration-500"></div>
                                    </a>
                                </Link>
                            </motion.div>
                        ))
                    ) : null}
                </div>

                {/* CTA Button */}
                {buttonSettings && typeof buttonSettings === 'object' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-16 flex justify-center"
                    >
                        <GradientButton
                            href={buttonSettings.href}
                            size="lg"
                            endIcon={<ArrowRight />}
                        >
                            {buttonSettings.title}
                        </GradientButton>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default SpecializationsSection;