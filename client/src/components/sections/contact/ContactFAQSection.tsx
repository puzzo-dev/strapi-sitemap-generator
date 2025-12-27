import React from 'react';
import { HelpCircle } from 'lucide-react';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface ContactFAQSectionProps {
    faqSection?: any;
    faqItems?: any[];
    isLoading?: boolean;
    isPageLoading?: boolean;
}

const ContactFAQSection: React.FC<ContactFAQSectionProps> = ({
    faqSection,
    faqItems,
    isLoading,
    isPageLoading,
}) => {
    // Determine which data to use - we always have fallback data, so only show loading if explicitly no data
    const fallbackFAQs = [
        { id: 1, question: "What services do you offer?", answer: "We offer a comprehensive range of digital solutions including web development, mobile app development, cloud services, AI/ML solutions, and digital transformation consulting." },
        { id: 2, question: "How long does a typical project take?", answer: "Project timelines vary based on complexity and scope. A standard website takes 4-6 weeks, while enterprise applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation." },
        { id: 3, question: "What is your pricing model?", answer: "We offer flexible pricing models including fixed-price projects, time and materials, and retainer-based engagements. Contact us for a customized quote based on your specific requirements." },
        { id: 4, question: "Do you provide ongoing support and maintenance?", answer: "Yes, we offer comprehensive support and maintenance packages to ensure your digital solutions continue to perform optimally. Our support includes bug fixes, updates, security patches, and feature enhancements." }
    ];
    const displayFAQItems = faqItems || faqSection?.settings?.items || faqSection?.settings?.featured || fallbackFAQs;
    // Only show loading if we truly don't have any data (which shouldn't happen with fallbacks)
    const isDataLoading = !displayFAQItems || displayFAQItems.length === 0;

    return (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-[#0a1929] dark:to-[#0d1f33] py-24 relative overflow-hidden">
            <BackgroundDecoration variant="faq" />

            <div className="container-custom relative z-10 max-w-8xl">
                <div
                    className="text-center mb-16 space-y-4"
                    {...fadeInUp()}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-200">
                        {faqSection?.title || 'Frequently Asked Questions'}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {faqSection?.subtitle || 'Find answers to common questions about our services and how we can help your business.'}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {isDataLoading ? (
                        // Loading skeleton for FAQs
                        <div className="space-y-4">
                            {Array(5).fill(0).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
                                    aria-hidden="true"
                                >
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                                </div>
                            ))}
                        </div>
                    ) : displayFAQItems.length > 0 ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                            {...staggerChildren}
                        >
                            {displayFAQItems.slice(0, 8).map((faq: any, index: number) => (
                                <AccordionItem
                                    key={faq.id || index}
                                    value={`item-${index}`}
                                    className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                                        <div className="flex items-start gap-4 flex-1 pr-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                                {faq.question || faq.title}
                                            </h3>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6">
                                        <div className="pl-14 pr-4">
                                            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {faq.answer || faq.description}
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                No FAQ items available. Please contact us directly for any questions.
                            </p>
                        </div>
                    )}

                    {!isDataLoading && displayFAQItems.length > 8 && (
                        <div className="text-center mt-12">
                            <p className="text-gray-600 dark:text-gray-400">
                                Still have questions? <a href="/support" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Contact our support team</a>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactFAQSection;