import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { FAQItem } from '@/lib/types/content';
import { FAQSearchSectionProps } from '@/lib/types/components';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
        <div className={`bg-white dark:bg-gray-900/50 rounded-lg p-6 shadow-sm ${className} max-w-8xl mx-auto`}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                    type="text"
                    className="pl-10 pr-10"
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {searchQuery && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={clearSearch}
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </Button>
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