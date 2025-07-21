import React from 'react';
import { Link } from 'wouter';
import { Calendar, User } from 'lucide-react';
import { BlogCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const BlogCard: React.FC<BlogCardProps> = ({
    id,
    name,
    title,
    slug,
    blogCategories,
    blogIntro,
    publishedDate,
    publishedAt,
    featured,
    metaImage,
    author,
    authorDetails,
    readTime,
    tags,
    url,
    ...rest
}) => {
    // Use the passed props directly as the post data
    const post = {
        id,
        name,
        title,
        slug,
        blogCategories,
        blogIntro,
        publishedDate,
        publishedAt,
        featured,
        metaImage,
        author,
        authorDetails,
        readTime,
        tags,
        url,
        ...rest
    };
    
    // Handle the case where url is passed separately (as seen in BlogPostsSection)
    const postUrl = url?.url || `/blog/${post.slug || ''}`;
    
    // Safely get image URL with fallback
    const imageUrl = post.metaImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop';
    
    // Safely get author name with fallback
    const authorName = post.authorDetails?.fullName || post.author || 'I-VARSE Team';
    
    // Format date safely
    const formattedDate = post.publishedDate ? formatDate(post.publishedDate) : '';

    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50">
            {/* Featured Image */}
            <div className="relative overflow-hidden aspect-video">
                <Link href={postUrl}>
                    <img
                        src={imageUrl}
                        alt={post.title || 'Blog post'}
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
                {post.blogCategory && (
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                        {post.blogCategory}
                    </div>
                )}

                {/* Title */}
                <Link href={postUrl}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        {post.title || 'Untitled Post'}
                    </h3>
                </Link>
                
                {/* Excerpt */}
                {post.metaDescription && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {post.metaDescription}
                    </p>
                )}

                {/* Meta info */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{authorName}</span>
                    </div>
                    {formattedDate && (
                        <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formattedDate}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;