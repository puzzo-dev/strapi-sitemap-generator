import React from 'react';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';

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
    // Determine which data to use and loading state
    const displayFAQItems = faqItems || faqSection?.settings?.items || faqSection?.settings?.featured || [];
    const isDataLoading = isLoading || isPageLoading;

    return (
        <section className="bg-white dark:bg-[#0a1929] py-24 relative overflow-hidden">
            <BackgroundDecoration variant="faq" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-blue-900 dark:text-blue-200 !text-3xl md:!text-4xl lg:!text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 !text-base md:!text-lg lg:!text-xl">
                        Find answers to common questions about our services and how we can help your business.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {isDataLoading ? (
                        // Loading skeleton for FAQs
                        Array(3).fill(0).map((_, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse" aria-hidden="true">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                            </div>
                        ))
                    ) : (
                        // Display FAQ items
                        displayFAQItems.map((faq: any, index: number) => (
                            <article
                                key={faq.id || index}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                            >
                                <h3 className="!text-xl md:!text-2xl lg:!text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    {faq.question || faq.title}
                                </h3>
                                <div className="!text-base md:!text-lg lg:!text-xl text-gray-600 dark:text-gray-300">
                                    {faq.answer || faq.description}
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactFAQSection;