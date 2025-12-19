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
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/10 to-white dark:from-[#0a192f] dark:via-blue-950/20 dark:to-[#0a192f]">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-8">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/22"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/16"></div>
                    <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 via-transparent to-transparent"></div>
                </div>
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <Code className="absolute -right-10 bottom-10 w-48 h-48 text-blue-400 dark:text-blue-600" />
                    <CircuitBoard className="absolute left-10 top-16 w-44 h-44 text-blue-400 dark:text-blue-600" />
                    <Sparkles className="absolute right-1/3 top-10 w-16 h-16 text-blue-400 dark:text-blue-600" />
                </div>
            </div>

            <div className="container-custom relative z-10 max-w-[1400px] px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.3fr] gap-4 sm:gap-6 lg:gap-8 items-start py-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-2xl border border-blue-100/60 dark:border-blue-900/40 bg-white/80 dark:bg-white/5 shadow-2xl backdrop-blur"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] rounded-t-2xl" />
                        <div className="p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5">
                            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
                                <span className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                                {title || 'What we excel at'}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0047AB] dark:text-white leading-tight" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                {subtitle || 'Specialized solutions tailored to modern enterprises'}
                            </h2>
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-200/80 leading-relaxed">
                                {description || 'We blend strategy, engineering, and design to ship resilient platforms with measurable outcomes.'}
                            </p>
                            <p className="text-base text-slate-600 dark:text-slate-200/80 leading-relaxed">
                                We stay beyond launch—standing up delivery pods, runbooks, and observability so the platform remains reliable while you scale.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {['Cloud-native builds', 'Composable platforms', 'Data & insights', 'Experience design'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-100 bg-blue-50/70 dark:bg-white/5 border border-blue-100/60 dark:border-white/5 rounded-lg px-3 py-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-200/80">
                                <div className="rounded-lg border border-blue-100/60 dark:border-white/5 bg-white/70 dark:bg-white/5 px-3 py-2">
                                    Delivery squads aligned to business outcomes, not ticket volume.
                                </div>
                                <div className="rounded-lg border border-blue-100/60 dark:border-white/5 bg-white/70 dark:bg-white/5 px-3 py-2">
                                    Reliability baked in: SRE playbooks, quality gates, and observability.
                                </div>
                            </div>
                            {buttonSettings && typeof buttonSettings === 'object' && (
                                <div>
                                    <GradientButton href={buttonSettings.href} endIcon={<ArrowRight />}>
                                        {buttonSettings.title}
                                    </GradientButton>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 p-2">
                        {isLoading ? (
                            Array(6).fill(0).map((_, index) => (
                                <div key={index} className="h-full rounded-2xl border border-blue-100/60 dark:border-blue-900/40 bg-white/70 dark:bg-white/5 backdrop-blur shadow-lg animate-pulse p-6 space-y-3">
                                    <div className="h-4 w-16 bg-blue-100 dark:bg-blue-900/40 rounded" />
                                    <div className="h-6 w-3/4 bg-blue-100 dark:bg-blue-900/40 rounded" />
                                    <div className="h-4 w-full bg-blue-100 dark:bg-blue-900/40 rounded" />
                                    <div className="h-4 w-5/6 bg-blue-100 dark:bg-blue-900/40 rounded" />
                                </div>
                            ))
                        ) : displayServices && displayServices.length > 0 ? (
                            displayServices.slice(0, 6).map((service, index) => (
                                <motion.div
                                    key={service.id || `service-${index}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="group relative h-full overflow-hidden rounded-2xl border border-blue-100/60 dark:border-blue-900/40 bg-white/80 dark:bg-white/5 backdrop-blur shadow-[0_4px_24px_-2px_rgba(0,0,0,0.08),0_8px_48px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12),0_16px_64px_-8px_rgba(0,0,0,0.08)] hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all duration-300"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] rounded-t-2xl" />
                                    <div className="p-5 relative z-10 h-full flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-300 group-hover:from-blue-500/25 group-hover:to-indigo-500/25 transition-all duration-300">
                                                    {getServiceIcon(service.icon)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                                        {service.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-blue-500 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300" />
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-200/80 leading-relaxed line-clamp-3">
                                            {service.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs font-semibold text-blue-700 dark:text-blue-200">
                                            {['Secure', 'Scalable', 'Composable'].map((tag) => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-blue-50/80 dark:bg-white/5 border border-blue-100/60 dark:border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link href={service.slug ? `/services/${service.slug}` : '#'} className="inline-flex items-center text-blue-600 dark:text-blue-300 font-semibold text-sm hover:underline mt-auto">
                                            Explore
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecializationsSection;