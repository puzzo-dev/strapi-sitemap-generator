import React from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { TestimonialProps } from '@/lib/types/content';
import { PageContent } from '@/lib/types/core';

interface ServicesTestimonialsSectionProps {
    testimonials?: TestimonialProps[];
    pageContent?: PageContent | null;
    isLoading: boolean;
}

const ServicesTestimonialsSection: React.FC<ServicesTestimonialsSectionProps> = ({ 
    testimonials, 
    pageContent, 
    isLoading 
}) => {
    // Get testimonials section from page content
    const testimonialsSection = pageContent?.sections?.find(s => s.type === 'testimonials');
    
    // Extract testimonials from section data or use prop
    let displayTestimonials: TestimonialProps[] = [];
    
    if (testimonials && testimonials.length > 0) {
        displayTestimonials = testimonials;
    } else if (testimonialsSection?.settings?.featured) {
        const featured = testimonialsSection.settings.featured;
        if (Array.isArray(featured) && featured.length > 0) {
            displayTestimonials = featured as TestimonialProps[];
        } else if (typeof featured === 'object' && featured !== null && !Array.isArray(featured)) {
            displayTestimonials = [featured as TestimonialProps];
        }
    }

    const renderLoadingSkeleton = () => (
        Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30 animate-pulse">
                <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-blue-100 dark:bg-blue-800/50 rounded-full"></div>
                    ))}
                </div>
                <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full"></div>
                <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6"></div>
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mr-4"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3"></div>
                </div>
            </div>
        ))
    );

    return (
        <section className="py-24 bg-white dark:bg-[#132f4c]">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        <span className="text-lg mr-2">💬</span>
                        {testimonialsSection?.badge || "Client Feedback"}
                    </div>
                    <h2 className="section-title text-blue-900 dark:text-blue-200">
                        {testimonialsSection?.title || "What Our Clients Say"}
                    </h2>
                    <p className="section-subtitle">
                        {testimonialsSection?.subtitle || "Discover what our valued clients have to say about their experience working with I-VARSE Technologies."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {isLoading ? renderLoadingSkeleton() : displayTestimonials.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesTestimonialsSection;