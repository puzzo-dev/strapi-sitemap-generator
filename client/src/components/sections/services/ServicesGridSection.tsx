import React, { useState, useEffect, useRef } from 'react';
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
    Brain,
    ShieldCheck,
    CloudCog
} from 'lucide-react';

interface ServicesGridSectionProps {
    services: ServiceProps[];
    isLoading: boolean;
}

const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({ services, isLoading }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const containerTop = container.getBoundingClientRect().top;
            const containerHeight = container.offsetHeight;
            const windowHeight = window.innerHeight;

            // Only update when sticky section is in view
            if (containerTop <= 0 && containerTop > -(containerHeight - windowHeight)) {
                contentRefs.current.forEach((ref, index) => {
                    if (ref) {
                        const rect = ref.getBoundingClientRect();
                        const middle = windowHeight / 2;

                        if (rect.top <= middle && rect.bottom >= middle) {
                            setActiveIndex(index);
                        }
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            'fa-atom': Brain,
            'fa-server': Server,
            'fa-globe': Globe,
            'fa-search': Search,
            'fa-pen-tool': PenTool,
            'fa-chart-bar': BarChart,
            'fa-cpu': Cpu
        };
        const IconComponent = icons[iconName] || Settings;
        return <IconComponent className="h-6 w-6" />;
    };

    if (isLoading) {
        return (
            <section className="relative bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-[#0a192f] dark:via-blue-950/30 dark:to-[#0a192f] py-24">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-blue-100 dark:bg-blue-900/40 rounded w-1/3 mx-auto"></div>
                        <div className="h-6 bg-blue-100 dark:bg-blue-900/40 rounded w-2/3 mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="relative bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-[#0a192f] dark:via-blue-950/30 dark:to-[#0a192f] overflow-hidden">
            {/* Background decoration */}
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

            {/* Header */}
            <div className="relative z-10 py-24">
                <div className="max-w-7xl mx-auto px-8">
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
                </div>
            </div>

            {/* STICKY SCROLL SECTION */}
            <div ref={containerRef} className="relative">
                <div className="max-w-7xl mx-auto px-8 pb-20">
                    <div className="flex gap-12">
                        {/* Left Side - Sticky List */}
                        <div className="w-2/5 sticky top-24 h-fit">
                            <div className="space-y-2">
                                {services.map((service, index) => (
                                    <div
                                        key={service.id || `nav-${index}`}
                                        className={`py-4 px-6 cursor-pointer transition-all duration-300 border-l-4 rounded-r-lg ${activeIndex === index
                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold shadow-sm'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                                            }`}
                                        onClick={() => {
                                            const el = contentRefs.current[index];
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm font-bold ${activeIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'
                                                }`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-lg">{service.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Scrolling Content */}
                        <div className="w-3/5">
                            {services.map((service, index) => (
                                <div
                                    key={service.id || `content-${index}`}
                                    ref={el => {
                                        if (el) contentRefs.current[index] = el;
                                    }}
                                    className="min-h-screen flex items-center py-12"
                                >
                                    <div className="w-full">
                                        <div className={`transition-all duration-700 ease-out ${activeIndex === index
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-40 translate-y-8'
                                            }`}>
                                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                                                Service {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="text-5xl font-bold mt-4 mb-6 text-blue-900 dark:text-blue-200" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                                                {service.title}
                                            </h3>
                                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                                {service.description}
                                            </p>
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100/60 dark:border-blue-900/40 p-8 shadow-lg">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-300 h-12 w-12">
                                                        {getServiceIcon(service.icon)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Features</h4>
                                                        <p className="text-gray-600 dark:text-gray-300">Enterprise-grade solution with comprehensive support</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={service.slug ? `/services/${service.slug}` : '#'}
                                                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-4"
                                                >
                                                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesGridSection;