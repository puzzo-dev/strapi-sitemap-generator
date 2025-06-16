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
import type { BlogCategory } from '@/lib/types';

interface BlogFiltersSectionProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    tag: string;
    setTag: (value: string) => void;
    categories: BlogCategory[];
    allTags: string[];
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
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    <Input
                        placeholder={t('blog.searchPlaceholder')}
                        value={search}
                        onChange={(e: { target: { value: string; }; }) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-44">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('blog.selectCategory')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('blog.allCategories')}</SelectItem>
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
                            <SelectValue placeholder={t('blog.selectTag')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('blog.allTags')}</SelectItem>
                            {allTags.map(t => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default BlogFiltersSection;