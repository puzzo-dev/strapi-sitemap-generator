import React from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import { ServiceProps } from '@/lib/types/content';

interface ServicesGridSectionProps {
    services: ServiceProps[];
    isLoading: boolean;
}

const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({ services, isLoading }) => {
    const renderLoadingSkeleton = () => (
        <>
            {/* First row - 2 cards */}
            {[1, 2].map((index) => (
                <div key={`skeleton-row1-${index}`} className="md:col-span-3 bg-white dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-6"></div>
                    <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3"></div>
                </div>
            ))}

            {/* Second row - 3 cards */}
            {[1, 2, 3].map((index) => (
                <div key={`skeleton-row2-${index}`} className="md:col-span-2 bg-white dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-6"></div>
                    <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3"></div>
                </div>
            ))}

            {/* Third row - 2 cards */}
            {[1, 2].map((index) => (
                <div key={`skeleton-row3-${index}`} className="md:col-span-3 bg-white dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-6"></div>
                    <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3"></div>
                </div>
            ))}
        </>
    );

    const renderServices = () => (
        <>
            {/* First row - 2 cards */}
            {services.slice(0, 2).map((service) => (
                <div key={service.id} className="md:col-span-3">
                    <ServiceCard service={service} />
                </div>
            ))}

            {/* Second row - 3 cards */}
            {services.slice(2, 5).map((service) => (
                <div key={service.id} className="md:col-span-2">
                    <ServiceCard service={service} />
                </div>
            ))}

            {/* Third row - 2 cards */}
            {services.slice(5, 7).map((service) => (
                <div key={service.id} className="md:col-span-3">
                    <ServiceCard service={service} />
                </div>
            ))}
        </>
    );

    return (
        <section id="services" className="py-24 bg-white dark:bg-[#132f4c]">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        🛠️ What We Offer
                    </div>
                    <h2 className="section-title text-blue-900 dark:text-blue-200">Our Specialized Services</h2>
                    <p className="section-subtitle">
                        Comprehensive solutions tailored to meet your business needs and drive growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                    {isLoading ? renderLoadingSkeleton() : renderServices()}
                </div>
            </div>
        </section>
    );
};

export default ServicesGridSection;