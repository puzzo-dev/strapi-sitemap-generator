import React from 'react';
import { FAQItem } from '@/lib/types';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface FAQPopularSectionProps {
    faqItems: FAQItem[];
    onQuestionClick: (itemId: number) => void;
    className?: string;
}

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
            <div className="container-custom">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Most Popular</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Quick answers to the questions you're most likely to have.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularQuestions.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group"
                            onClick={() => onQuestionClick(item.id)}
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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