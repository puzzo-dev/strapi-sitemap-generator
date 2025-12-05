import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types/content';
import { formatDate } from '@/lib/utils';

interface BlogPostHeroSectionProps {
  post: BlogPost;
}

const BlogPostHeroSection: React.FC<BlogPostHeroSectionProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 dark:from-[#0a1929] dark:via-[#0c1e3a] dark:to-[#132f4c] py-20 md:py-32 text-gray-900 dark:text-white overflow-hidden">
      {/* Tech-inspired particle background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-20 h-20 rounded-full bg-[#2FB8FF]/30 top-1/4 left-1/3 animate-float-slow"></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#0047AB]/20 bottom-1/4 right-1/3 animate-float-medium"></div>
        <div className="absolute w-16 h-16 rounded-full bg-[#2FB8FF]/40 top-1/2 left-1/4 animate-float-fast"></div>
        <div className="absolute w-24 h-24 rounded-full bg-[#0047AB]/30 bottom-1/3 right-1/4 animate-float-slow"></div>
        <div className="absolute w-12 h-12 rounded-full bg-[#2FB8FF]/20 top-1/3 right-1/2 animate-float-medium"></div>
      </div>

      {post.metaImage && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2FB8FF]/20 to-[#0047AB]/10 dark:from-[#0a1929]/90 dark:to-[#132f4c]/70"></div>
          <img
            src={post.metaImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 max-w-8xl">
        <Link href="/blog">
          <div className="inline-flex items-center text-gray-600 dark:text-white/90 hover:text-gray-900 dark:hover:text-white mb-10 group/back transition-colors">
            <FiArrowLeft className="mr-2 group-hover/back:-translate-x-1 transition-transform" />
            <span className="font-medium">{t('ui.backToBlog')}</span>
          </div>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-down">
            <span className="gradient-text">{post.title.split(' ').slice(0, Math.ceil(post.title.split(' ').length / 2)).join(' ')}</span>
            <span className="text-gray-700 dark:text-gray-300"> {post.title.split(' ').slice(Math.ceil(post.title.split(' ').length / 2)).join(' ')}</span>
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-[#2FB8FF] to-[#0047AB] mb-6 animate-width-expand"></div>

          <div className="flex flex-wrap items-center text-sm md:text-base text-gray-600 dark:text-white/80 mb-8 gap-x-6 gap-y-3">
            <div className="flex items-center">
              <FiCalendar className="mr-2 text-gray-700 dark:text-white/90" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center">
                <FiClock className="mr-2 text-gray-700 dark:text-white/90" />
                <span>{post.readTime} min read</span>
              </div>
            )}

            {post.authorDetails && (
              <div className="flex items-center">
                <FiUser className="mr-2 text-gray-700 dark:text-white/90" />
                <span>{post.authorDetails.fullName}</span>
              </div>
            )}
          </div>

          {post.blogCategory && (
            <Link href={`/blog?category=${post.blogCategory}`}>
              <Badge className="bg-[#2FB8FF]/20 hover:bg-[#2FB8FF]/30 text-[#0047AB] border-none cursor-pointer px-4 py-1.5 dark:bg-white/20 dark:hover:bg-white/30 dark:text-white">
                {post.blogCategory}
              </Badge>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostHeroSection;