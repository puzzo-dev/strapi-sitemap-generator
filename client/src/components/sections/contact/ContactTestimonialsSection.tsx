import React from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { TestimonialProps } from '@/lib/types/content';

interface ContactTestimonialsSectionProps {
    testimonialSection?: any;
    testimonials?: TestimonialProps[];
    isLoading?: boolean;
    isTestimonialsLoading?: boolean;
}

const ContactTestimonialsSection: React.FC<ContactTestimonialsSectionProps> = ({
    testimonialSection,
    testimonials,
    isLoading,
    isTestimonialsLoading,
}) => {
    // Determine which data to use and loading state
    const displayTestimonials = testimonials || testimonialSection?.settings?.featured || [];
    const isDataLoading = isLoading || isTestimonialsLoading;

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-24 relative overflow-hidden">
            <BackgroundDecoration variant="testimonials" />

            <div className="container-custom relative z-10 max-w-8xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-center text-blue-900 dark:text-blue-200">
                        What Our Clients Say
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Discover what our valued clients have to say about their experience working with I-VARSE Technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {isDataLoading ? (
                        // Loading skeleton for testimonials
                        Array(3).fill(0).map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse" aria-hidden="true">
                                <div className="flex mb-4 space-x-1">
                                    {Array(5).fill(0).map((_, i) => (
                                        <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    ))}
                                </div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-4/6"></div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        displayTestimonials.slice(0, 3).map((testimonial: TestimonialProps) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactTestimonialsSection;