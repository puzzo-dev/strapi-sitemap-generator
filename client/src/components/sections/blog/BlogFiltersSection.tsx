import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { BlogCategory } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface BlogFiltersSectionProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    tag: string;
    setTag: (value: string) => void;
    categories: BlogCategory[];
    allTags: { tag: string; count: number }[];
}

const BlogFiltersSection: React.FC<BlogFiltersSectionProps> = ({
    search,
    setSearch,
    category,
    setCategory,
    tag,
    setTag,
    categories,
    allTags,
}) => {
    const { t } = useTranslation();

    return (
        <Card className="p-6 shadow-md mb-8">
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <Input
                            placeholder={t('ui.searchPlaceholder')}
                            value={search}
                            onChange={(e: { target: { value: string; }; }) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="w-full md:w-44">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('ui.selectCategory')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('ui.allCategories')}</SelectItem>
                                {categories.map(cat => (
                                    <SelectItem key={cat.slug} value={cat.slug}>
                                        {cat.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full md:w-44">
                        <Select value={tag} onValueChange={setTag}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('ui.selectTag')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('ui.allTags')}</SelectItem>
                                {allTags.map(({ tag: tagName, count }) => (
                                    <SelectItem key={tagName} value={tagName}>
                                        {tagName} ({count})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BlogFiltersSection;