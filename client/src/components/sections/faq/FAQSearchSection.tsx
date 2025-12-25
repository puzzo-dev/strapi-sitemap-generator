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
        <div className={className}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                    type="text"
                    className="pl-12 pr-12 h-12 text-base border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {searchQuery && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4 text-gray-500" aria-hidden="true" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQSearchSection;