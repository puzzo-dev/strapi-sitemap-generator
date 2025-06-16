import React from 'react';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';

interface ContactFAQSectionProps {
    faqSection: any;
    isPageLoading: boolean;
}

const ContactFAQSection: React.FC<ContactFAQSectionProps> = ({
    faqSection,
    isPageLoading,
}) => {
    return (
        <section className="bg-white dark:bg-[#0a1929] py-24 relative overflow-hidden">
            <BackgroundDecoration variant="faq" />

            <div className="container-custom relative z-10">
                <header className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        {faqSection?.title || 'Frequently Asked Questions'}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {faqSection?.subtitle}
                    </p>
                </header>

                <div className="max-w-3xl mx-auto space-y-6">
                    {isPageLoading ? (
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
                        // Display FAQ items from the settings.featured property
                        faqSection?.settings?.featured?.map((faq: any, index: number) => (
                            <article
                                key={index}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    {faq.question}
                                </h3>
                                <div className="text-gray-600 dark:text-gray-300">
                                    {faq.answer}
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