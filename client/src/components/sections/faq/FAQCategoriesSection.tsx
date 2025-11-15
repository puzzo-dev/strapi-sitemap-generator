import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FAQItem, FAQCategory, FAQCategoriesSectionProps } from '@/lib/types/content';
import FAQSearchSection from './FAQSearchSection';

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
        : categories.find((c: FAQCategory) => c.id === activeCategory)?.title;

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
                                <Card>
                                    <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                                        Categories
                                    </h3>
                                    <ul className="space-y-2">
                                        {categories.map((category: FAQCategory) => (
                                            <li key={category.id}>
                                                    <Button
                                                        variant={activeCategory === category.id && !isSearching ? "default" : "ghost"}
                                                    onClick={() => {
                                                        setActiveCategory(category.id);
                                                        setIsSearching(false);
                                                        setSearchResults([]);
                                                    }}
                                                        className="w-full justify-start"
                                                >
                                                    {category.title}
                                                    </Button>
                                            </li>
                                        ))}
                                    </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="lg:col-span-9">
                            <Card>
                                <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-6 text-blue-900 dark:text-blue-200">
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
                                                <Card key={item.id}>
                                                    <Button
                                                        variant="ghost"
                                                    onClick={() => toggleItem(item.id)}
                                                    aria-expanded={expandedItems.has(item.id)}
                                                    aria-controls={`faq-content-${item.id}`}
                                                        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                >
                                                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                                        {item.question}
                                                    </h3>
                                                    {expandedItems.has(item.id) ? (
                                                        <ChevronUp className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                                                    ) : (
                                                        <ChevronDown className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                                                    )}
                                                    </Button>

                                                <div
                                                    id={`faq-content-${item.id}`}
                                                    className={`transition-all duration-200 overflow-hidden ${
                                                        expandedItems.has(item.id) ? 'max-h-96' : 'max-h-0'
                                                    }`}
                                                >
                                                        <div className="p-4 text-gray-700 dark:text-gray-300">
                                                        <p>{item.answer}</p>
                                                        </div>
                                                    </div>
                                                </Card>
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
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQCategoriesSection;