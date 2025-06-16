import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem, FAQCategory } from '@/lib/types';
import FAQSearchSection from './FAQSearchSection';

interface FAQCategoriesSectionProps {
    categories: FAQCategory[];
    faqItems: FAQItem[];
    activeCategory: number;
    setActiveCategory: (categoryId: number) => void;
    expandedItems: number[];
    toggleItem: (itemId: number) => void;
    isLoading: boolean;
}

const FAQCategoriesSection: React.FC<FAQCategoriesSectionProps> = ({
    categories,
    faqItems,
    activeCategory,
    setActiveCategory,
    expandedItems,
    toggleItem,
    isLoading,
}) => {
    const [searchResults, setSearchResults] = useState<FAQItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchResults = (results: FAQItem[]) => {
        setSearchResults(results);
        setIsSearching(results.length > 0 || results.length === 0);
    };

    const filteredItems = React.useMemo(() => {
        if (isSearching && searchResults.length >= 0) {
            return searchResults;
        }
        
        return faqItems.filter((item: FAQItem) => {
            if (Array.isArray(item.categoryIds)) {
                return item.categoryIds.includes(activeCategory);
            }
            return false;
        });
    }, [faqItems, activeCategory, searchResults, isSearching]);

    const displayTitle = isSearching 
        ? "Search Results" 
        : categories.find((c: FAQCategory) => c.id === activeCategory)?.title || "Frequently Asked Questions";

    const displayDescription = isSearching 
        ? "Results matching your search query" 
        : categories.find((c: FAQCategory) => c.id === activeCategory)?.description;

    return (
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
                            <div className="sticky top-24 space-y-6">
                                {/* Search Section */}
                                <FAQSearchSection
                                    faqItems={faqItems}
                                    onSearchResults={handleSearchResults}
                                />

                                {/* Categories */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 shadow-sm">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                                        Categories
                                    </h3>
                                    <ul className="space-y-2">
                                        {categories.map((category: FAQCategory) => (
                                            <li key={category.id}>
                                                <button
                                                    onClick={() => {
                                                        setActiveCategory(category.id);
                                                        setIsSearching(false);
                                                        setSearchResults([]);
                                                    }}
                                                    className={`w-full text-left px-3 py-2 rounded-md transition ${
                                                        activeCategory === category.id && !isSearching
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
                        </div>

                        <div className="lg:col-span-9">
                            <div className="bg-white dark:bg-gray-900/30 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                    {displayTitle}
                                </h2>
                                {displayDescription && (
                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                        {displayDescription}
                                    </p>
                                )}

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
                                                    className={`transition-all duration-200 overflow-hidden ${
                                                        expandedItems.includes(item.id) ? 'max-h-96' : 'max-h-0'
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
                                                {isSearching 
                                                    ? "No questions found matching your search."
                                                    : "No questions found in this category."
                                                }
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
    );
};

export default FAQCategoriesSection;