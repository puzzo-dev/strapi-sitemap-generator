import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    FiArrowRight,
    FiCalendar,
    FiClock,
    FiUser,
    FiTag,
} from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { gridItemAnimation } from '@/lib/animations';

interface BlogPostCardProps extends BlogPost { }

const BlogPostCard: React.FC<BlogPostCardProps> = (post) => {
    const { t } = useTranslation();

    // Truncate text
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    return (
        <motion.div
            key={post.slug}
            variants={gridItemAnimation(0)}
            className="group flex flex-col h-full overflow-hidden rounded-xl shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300"
        >
            {post.metaImage && (
                <div className="relative h-48 md:h-40 overflow-hidden">
                    <img
                        src={post.metaImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {post.featured && (
                        <div className="absolute top-0 right-0 m-2">
                            <Badge variant="destructive" className="font-medium px-2 py-0.5 text-xs">Featured</Badge>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xs font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {post.title}
                        </h3>
                    </div>
                </div>
            )}
            <div className="flex flex-col flex-grow p-4 md:p-5">
                <div className="flex items-center mb-2 text-xs text-muted-foreground">
                    <FiCalendar className="mr-1 text-primary" />
                    <span>{formatDate(post.publishedDate)}</span>
                    {post.readTime && (
                        <>
                            <span className="mx-1.5">•</span>
                            <FiClock className="mr-1 text-primary" />
                            <span>{post.readTime} min read</span>
                        </>
                    )}
                </div>
                <h3 className="text-sm md:text-base font-bold mb-1.5 text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                </h3>
                <p className="mb-2.5 text-xs text-muted-foreground flex-grow line-clamp-2">{truncateText(post.blogIntro, 80)}</p>
                <div className="mt-auto">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 2).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors py-0 px-1.5">
                                    <FiTag className="mr-1 h-3 w-3" /> {tag}
                                </Badge>
                            ))}
                            {post.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs py-0 px-1.5">+{post.tags.length - 2}</Badge>
                            )}
                        </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                        {post.authorDetails && (
                            <div className="flex items-center">
                                {post.authorDetails.userImage ? (
                                    <img
                                        src={post.authorDetails.userImage}
                                        alt={post.authorDetails.fullName}
                                        className="w-6 h-6 rounded-full mr-2 border border-white dark:border-slate-700 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 border border-white dark:border-slate-700 shadow-sm">
                                        <FiUser className="text-primary h-3 w-3" />
                                    </div>
                                )}
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{post.authorDetails.fullName}</span>
                            </div>
                        )}
                        <Link href={`/blog/${post.slug}`}>
                            <div className="group/btn flex items-center text-primary font-medium text-xs hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
                                {t('ui.readMore')}
                                <FiArrowRight className="ml-1 transform group-hover/btn:translate-x-1 transition-transform h-3 w-3" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPostCard;