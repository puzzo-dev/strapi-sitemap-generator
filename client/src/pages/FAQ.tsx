import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { usePageContent } from "../hooks/useStrapiContent";
import { faqContent } from "../lib/data";
import { FAQItem, FAQCategory, FAQPageContent } from "../lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ: React.FC = () => {
    const { data: faqPageContent, isLoading, error } = usePageContent("faq");

    // Error handling
    if (error) {
        return (
            <div className="container-custom py-16">
                <p className="text-red-500">Failed to load FAQ content. Please try again later.</p>
            </div>
        );
    }

    // Use fallback data if API data is not available
    const faqData = faqPageContent as FAQPageContent || faqContent;
    const title = faqData.title;
    const description = faqData.description;
    const categories = faqData.categories || [];

    // Get items directly from the page content level as per the type definition
    const faqItems = React.useMemo(() => {
        return faqData.items || [];
    }, [faqData]);

    const [activeCategory, setActiveCategory] = useState<number>(
        categories && categories.length > 0 ? categories[0].id : 1
    );
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const toggleItem = (itemId: number) => {
        setExpandedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const filteredItems = React.useMemo(() => {
        return faqItems.filter((item: FAQItem) => {
            if (Array.isArray(item.categoryIds)) {
                return item.categoryIds.includes(activeCategory);
            }
            return false;
        });
    }, [faqItems, activeCategory]);

    return (
        <>
            <Helmet>
                <title>{title} | I-Varse Technologies</title>
                <meta name="description" content={description} />
            </Helmet>

            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
                    <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
                    <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
                    <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="heading-xl mb-6 animate-fade-in-up text-center">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white dark:bg-[#0a192f]">
                <div className="container-custom">
                    {isLoading ? (
                        <div className="max-w-4xl mx-auto">
                            <div className="animate-pulse space-y-8">
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-3">
                                        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                    </div>
                                    <div className="lg:col-span-9">
                                        <div className="space-y-4">
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <div key={i}>
                                                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                                        <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-3">
                                <div className="sticky top-24 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 shadow-sm">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                                        Categories
                                    </h3>
                                    <ul className="space-y-2">
                                        {categories.map((category: FAQCategory) => (
                                            <li key={category.id}>
                                                <button
                                                    onClick={() => setActiveCategory(category.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-md transition ${activeCategory === category.id
                                                        ? "bg-blue-600 text-white"
                                                        : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                                        }`}
                                                >
                                                    {category.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="lg:col-span-9">
                                <div className="bg-white dark:bg-gray-900/30 rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                        {categories.find(
                                            (c: FAQCategory) => c.id === activeCategory
                                        )?.title || "Frequently Asked Questions"}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                        {
                                            categories.find(
                                                (c: FAQCategory) => c.id === activeCategory
                                            )?.description
                                        }
                                    </p>

                                    <div className="space-y-4">
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item: FAQItem) => (
                                                <div
                                                    key={item.id}
                                                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => toggleItem(item.id)}
                                                        aria-expanded={expandedItems.includes(item.id)}
                                                        aria-controls={`faq-content-${item.id}`}
                                                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                    >
                                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                            {item.question}
                                                        </h3>
                                                        {expandedItems.includes(item.id) ? (
                                                            <ChevronUp className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                                                        ) : (
                                                            <ChevronDown className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                                                        )}
                                                    </button>

                                                    <div
                                                        id={`faq-content-${item.id}`}
                                                        className={`transition-all duration-200 overflow-hidden ${expandedItems.includes(item.id) ? 'max-h-96' : 'max-h-0'
                                                            }`}
                                                    >
                                                        <div className="p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                            <p>{item.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    No questions found in this category.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Still have questions?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            If you couldn't find the answer to your question, our team is here
                            to help.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Contact Us
                            </a>
                            <a
                                href="mailto:info@itechnologies.ng"
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                Email Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQ;
