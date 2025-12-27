import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FAQSearchSection from './FAQSearchSection';
import { FAQItem, FAQCategory, FAQCategoriesSectionProps } from '@/lib/types/content';

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
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a192f] dark:to-[#0c1e3a]">
            <div className="container-custom max-w-6xl">
                {/* Search Bar */}
                <div className="mb-12">
                    <FAQSearchSection
                        faqItems={faqItems}
                        onSearchResults={handleSearchResults}
                    />
                </div>

                {/* Category Tabs */}
                {!isSearching && (
                    <div className="mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {categories.map((category: FAQCategory) => (
                                <Button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    variant={activeCategory === category.id ? "default" : "outline"}
                                    className={`rounded-full px-6 py-3 transition-all duration-200 ${activeCategory === category.id
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {category.title}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Questions List */}
                <div className="space-y-4">
                    {isSearching && (
                        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <SearchIcon className="h-4 w-4" />
                            <span>
                                {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
                            </span>
                        </div>
                    )}

                    {filteredItems.length > 0 ? (
                        filteredItems.map((item: FAQItem, index: number) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                    aria-expanded={expandedItems.has(item.id)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                                        {item.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: expandedItems.has(item.id) ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedItems.has(item.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-6 pt-2">
                                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <SearchIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                {isSearching
                                    ? "No questions found matching your search."
                                    : "No questions found in this category."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FAQCategoriesSection;