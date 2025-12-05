import React from 'react';
import { FAQItem } from '@/lib/types/content';
import { ArrowRight } from 'lucide-react';
import { FAQPopularSectionProps } from '@/lib/types/components';

const FAQPopularSection: React.FC<FAQPopularSectionProps> = ({
    faqItems,
    onQuestionClick,
    className = '',
}) => {
    // Get the first 6 items as "popular" questions
    const popularQuestions = faqItems.slice(0, 6);

    if (popularQuestions.length === 0) {
        return null;
    }

    return (
        <section className={`py-16 bg-white dark:bg-gray-900 ${className}`}>
            <div className="container-custom max-w-8xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                        Popular Questions
                    </div>
                    <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                        Popular Questions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Find answers to the most commonly asked questions about our services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularQuestions.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group"
                            onClick={() => onQuestionClick(item.id)}
                        >
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.question}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                                {item.answer}
                            </p>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                <span>Read more</span>
                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQPopularSection;