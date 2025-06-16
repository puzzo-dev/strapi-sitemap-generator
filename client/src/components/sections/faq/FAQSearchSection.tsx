import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { FAQItem } from '@/lib/types';

interface FAQSearchSectionProps {
    faqItems: FAQItem[];
    onSearchResults: (results: FAQItem[]) => void;
    className?: string;
}

const FAQSearchSection: React.FC<FAQSearchSectionProps> = ({
    faqItems,
    onSearchResults,
    className = '',
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return [];
        }

        const query = searchQuery.toLowerCase();
        return faqItems.filter(
            (item) =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
        );
    }, [faqItems, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            onSearchResults(searchResults);
        } else {
            onSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        onSearchResults([]);
    };

    return (
        <div className={`bg-white dark:bg-gray-900/50 rounded-lg p-6 shadow-sm ${className}`}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {searchQuery && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={clearSearch}
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>

            {searchQuery && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {searchResults.length > 0
                            ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`
                            : `No results found for "${searchQuery}"`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FAQSearchSection;