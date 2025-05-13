import React from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const BlogCard: React.FC<BlogCardProps> = (props) => {
    // Check if we're receiving a post object or if the props themselves are the post
    const post = props;
    console.log(props);

    // Handle the case where url is passed separately (as seen in BlogPostsSection)
    const postUrl = props.url?.url || `/blog/${post.slug}`;

    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50">
            {/* Featured Image */}
            <div className="relative overflow-hidden aspect-video">
                <Link href={postUrl}>
                    <img
                        src={post.metaImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                    />
                </Link>
                {post.featured && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Featured
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
                {/* Category */}
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                    {post.blogCategory}
                </div>

                {/* Title */}
                <Link href={postUrl}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        {post.title}
                    </h3>
                </Link>
                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {post.metaDescription}
                </p>

                {/* Meta info */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{post.author || 'I-VARSE Team'}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(post.publishedDate)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;