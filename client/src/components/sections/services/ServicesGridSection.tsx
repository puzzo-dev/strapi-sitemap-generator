import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ServiceProps } from '@/lib/types/content';
import {
    ArrowRight,
    Server,
    Code,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Cloud,
    Database,
    BarChart,
    Cpu,
    Settings,
    Shield,
    Rocket,
    TrendingUp,
    Wifi,
    Link as LinkIcon,
    Atom,
    ShieldCheck
} from 'lucide-react';

interface ServicesGridSectionProps {
    services: ServiceProps[];
    isLoading: boolean;
}

const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({ services, isLoading }) => {
    // Icon mapping - updated to match service data
    const getServiceIcon = (iconName: string) => {
        const icons: { [key: string]: any } = {
            'fa-cogs': Settings,
            'fa-cloud-shield': ShieldCheck,
            'fa-cloud': Cloud,
            'fa-mobile': Smartphone,
            'fa-code': Code,
            'fa-rocket': Rocket,
            'fa-chart-line': TrendingUp,
            'fa-shield-alt': Shield,
            'fa-database': Database,
            'fa-wifi': Wifi,
            'fa-link': LinkIcon,
            'fa-atom': Atom,
            // Fallback icons
            'fa-server': Server,
            'fa-globe': Globe,
            'fa-search': Search,
            'fa-pen-tool': PenTool,
            'fa-chart-bar': BarChart,
            'fa-cpu': Cpu
        };
        const IconComponent = icons[iconName] || Settings;
        return <IconComponent className="h-8 w-8" />;
    };

    const renderLoadingSkeleton = () => {
        const mosaicPattern = [
            { featured: true },
            { featured: false },
            { featured: false },
            { featured: true },
            { featured: true },
            { featured: false },
        ];

        return (
            <>
                {Array(6).fill(0).map((_, index) => {
                    const pattern = mosaicPattern[index % mosaicPattern.length];
                    const isFeatured = pattern.featured;
                    return (
                        <div
                            key={index}
                            className={`rounded-2xl border border-blue-100/60 dark:border-blue-900/40 bg-white/70 dark:bg-white/5 backdrop-blur shadow-lg animate-pulse p-5 space-y-3 ${isFeatured ? 'md:col-span-2' : 'md:col-span-1'
                                }`}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <div className={`bg-blue-100 dark:bg-blue-900/40 rounded-xl flex-shrink-0 ${isFeatured ? 'h-14 w-14 md:h-16 md:w-16' : 'h-12 w-12'
                                    }`} />
                                <div className="flex-1 space-y-2">
                                    <div className={`bg-blue-100 dark:bg-blue-900/40 rounded ${isFeatured ? 'h-8 w-3/4' : 'h-6 w-3/4'
                                        }`} />
                                    {isFeatured && (
                                        <div className="h-4 w-1/2 bg-blue-100 dark:bg-blue-900/40 rounded" />
                                    )}
                                </div>
                            </div>
                            <div className="h-4 w-full bg-blue-100 dark:bg-blue-900/40 rounded" />
                            <div className="h-4 w-5/6 bg-blue-100 dark:bg-blue-900/40 rounded" />
                            {isFeatured && (
                                <>
                                    <div className="h-4 w-full bg-blue-100 dark:bg-blue-900/40 rounded" />
                                    <div className="h-4 w-4/5 bg-blue-100 dark:bg-blue-900/40 rounded" />
                                </>
                            )}
                            <div className="flex gap-2 mt-3">
                                {Array(isFeatured ? 4 : 3).fill(0).map((_, i) => (
                                    <div key={i} className="h-7 w-20 bg-blue-100 dark:bg-blue-900/40 rounded-full" />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    const renderServices = () => {
        // Create mosaic pattern: 3 cards per row, important ones take 2 spaces
        const mosaicPattern = [
            { featured: true, position: 'left' },   // Row 1: [Featured 2] [Regular 1]
            { featured: false, position: 'right' },
            { featured: false, position: 'left' },  // Row 2: [Regular 1] [Featured 2]
            { featured: true, position: 'right' },
            { featured: true, position: 'left' },   // Row 3: [Featured 2] [Regular 1]
            { featured: false, position: 'right' },
            { featured: false, position: 'left' },  // Row 4: [Regular 1] [Featured 2]
            { featured: true, position: 'right' },
        ];

        return (
            <>
                {services.map((service, index) => {
                    const pattern = mosaicPattern[index % mosaicPattern.length];
                    const isFeatured = pattern.featured;

                    return (
                        <motion.div
                            key={service.id || `service-${index}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl border border-blue-100/60 dark:border-blue-900/40 bg-white/80 dark:bg-white/5 backdrop-blur shadow-lg hover:border-blue-500/60 dark:hover:border-blue-400/60 hover:shadow-xl transition-all duration-300 ${isFeatured ? 'md:col-span-2' : 'md:col-span-1'
                                }`}
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] rounded-t-2xl" />
                            <div className={`p-4 relative z-10 h-full flex flex-col gap-2.5 ${isFeatured ? 'md:p-5 lg:p-6' : ''}`}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-300 group-hover:from-blue-500/25 group-hover:to-indigo-500/25 transition-all duration-300 flex-shrink-0 ${isFeatured ? 'h-11 w-11 md:h-12 md:w-12' : 'h-10 w-10'
                                                }`}>
                                                {getServiceIcon(service.icon)}
                                            </div>
                                            {!isFeatured && (
                                                <ArrowRight className="h-4 w-4 text-blue-500 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 ml-auto" />
                                            )}
                                        </div>
                                        <h3 className={`font-bold text-slate-900 dark:text-white leading-tight ${isFeatured ? 'text-xl md:text-2xl mb-1.5' : 'text-base md:text-lg'
                                            }`} style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                            {service.title}
                                        </h3>
                                        {isFeatured && service.subtitle && (
                                            <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                                                {service.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    {isFeatured && (
                                        <ArrowRight className="h-5 w-5 text-blue-500 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 flex-shrink-0" />
                                    )}
                                </div>
                                <p className={`text-slate-600 dark:text-slate-200/80 leading-relaxed ${isFeatured ? 'text-sm md:text-base line-clamp-3 md:line-clamp-4' : 'text-xs md:text-sm line-clamp-2'
                                    }`}>
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-200 mt-auto">
                                    {isFeatured ? (
                                        ['Featured', 'Premium', 'Enterprise'].map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-white/5 dark:to-white/5 border border-blue-200/60 dark:border-white/10">
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        ['Professional', 'Secure'].map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 rounded-full bg-blue-50/80 dark:bg-white/5 border border-blue-100/60 dark:border-white/5">
                                                {tag}
                                            </span>
                                        ))
                                    )}
                                </div>
                                <Link href={service.slug ? `/services/${service.slug}` : '#'} className={`inline-flex items-center text-blue-600 dark:text-blue-300 font-semibold hover:underline ${isFeatured ? 'text-sm mt-1' : 'text-xs'
                                    }`}>
                                    {isFeatured ? 'Learn More' : 'Details'}
                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </>
        );
    };

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-[#0a192f] dark:via-blue-950/30 dark:to-[#0a192f] relative overflow-hidden">
            {/* Background decoration like homepage */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-8">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/22"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/16"></div>
                    <div className="absolute top-0 left-3/4 w-px h-full bg-blue-500/10"></div>
                </div>
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <Code className="absolute left-10 top-20 h-32 w-32 text-blue-400 dark:text-blue-600" />
                    <Server className="absolute right-10 top-40 h-28 w-28 text-indigo-400 dark:text-indigo-600" />
                    <Database className="absolute left-1/4 bottom-20 h-24 w-24 text-cyan-400 dark:text-cyan-600" />
                    <Cloud className="absolute right-1/4 bottom-40 h-32 w-32 text-purple-400 dark:text-purple-600" />
                </div>
            </div>
            <div className="container-custom max-w-8xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                        What We Offer
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 dark:text-blue-200"
                        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                    >
                        Our Specialized Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Comprehensive solutions tailored to meet your business needs and drive growth.
                    </motion.p>
                </div>

                {/* Mosaic Grid Layout - 3 cards per row, important cards span 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {isLoading ? renderLoadingSkeleton() : renderServices()}
                </div>
            </div>
        </section>
    );
};

export default ServicesGridSection;