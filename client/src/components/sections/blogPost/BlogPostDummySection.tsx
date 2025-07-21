import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiTag, FiShare2, FiMessageSquare } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BlogPost } from '@/lib/types/content';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogPostDummySectionProps {
  post: BlogPost;
  categories?: string[];
  tags?: string[];
}

const BlogPostDummySection: React.FC<BlogPostDummySectionProps> = ({ 
  post, 
  categories = ['Technology', 'Innovation', 'Digital Transformation', 'Business Strategy'],
  tags = ['innovation', 'artificial intelligence', 'machine learning', 'digital transformation', 'cloud computing', 'cybersecurity', 'blockchain', 'IoT']
}) => {
  const { t } = useTranslation();
  const [commentTab, setCommentTab] = useState<'read' | 'write'>('read');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .catch(err => console.error('Error copying to clipboard:', err));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Render post content with proper formatting
  const renderPostContent = (content: string) => {
    return { __html: content };
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16">
      {/* Hero section with post title and enhanced featured image */}
      <div className="relative bg-gradient-to-br from-primary/55 via-primary to-blue-200 py-20 md:py-32 text-white overflow-hidden">
        {/* Tech-inspired particle background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-20 h-20 rounded-full bg-blue-300 top-1/4 left-1/3 animate-float-slow"></div>
          <div className="absolute w-32 h-32 rounded-full bg-blue-200 bottom-1/4 right-1/3 animate-float-medium"></div>
          <div className="absolute w-16 h-16 rounded-full bg-white/30 top-1/2 left-1/4 animate-float-fast"></div>
          <div className="absolute w-24 h-24 rounded-full bg-white/20 bottom-1/3 right-1/4 animate-float-slow"></div>
          <div className="absolute w-12 h-12 rounded-full bg-blue-100 top-1/3 right-1/2 animate-float-medium"></div>
        </div>

        {post.metaImage && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/20"></div>
            <img
              src={post.metaImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center text-white/90 hover:text-white mb-10 group/back transition-colors">
            <Link href="/blog">
              <div className="flex items-center">
                <FiArrowLeft className="mr-2 group-hover/back:-translate-x-1 transition-transform" />
                <span className="font-medium">{t('ui.backToBlog')}</span>
              </div>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-down">
              {post.title}
            </h1>

            <div className="h-1 w-24 bg-white/80 mb-6 animate-width-expand"></div>

            <div className="flex flex-wrap items-center text-sm md:text-base text-white/80 mb-8 gap-x-6 gap-y-3">
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-white/90" />
                <span>{formatDate(post.publishedDate)}</span>
              </div>

              {post.readTime && (
                <div className="flex items-center">
                  <FiClock className="mr-2 text-white/90" />
                  <span>{post.readTime} min read</span>
                </div>
              )}

              {post.authorDetails && (
                <div className="flex items-center">
                  <FiUser className="mr-2 text-white/90" />
                  <span>{post.authorDetails.fullName}</span>
                </div>
              )}
            </div>

            {post.blogCategory && (
              <Link href={`/blog?category=${post.blogCategory}`}>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none cursor-pointer px-4 py-1.5">
                  {post.blogCategory}
                </Badge>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren(0.1)}
            >
              {/* Post Header */}
              <motion.div variants={fadeInUp()} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-10 mb-8">
                <div className="mb-6">
                  <Badge variant="secondary" className="mb-4">
                    {post.blogCategory}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                    {post.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {post.blogIntro}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <FiTag className="mr-2" />
                      {post.tags?.length || 0} tags
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="mb-8">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 pt-6 border-t">
                  <Button variant="outline" onClick={handleShare} className="flex items-center">
                    <FiShare2 className="mr-2" /> {t('ui.sharePost')}
                  </Button>
                </div>
              </motion.div>

              {/* Comments section - simplified for dummy content */}
              <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FiMessageSquare className="mr-2" />
                  {t('ui.comments')} (0)
                </h2>

                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">{t('ui.noComments')}</p>
                  <Button onClick={() => setCommentTab('write')}>
                    {t('ui.beFirstToComment')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren(0.1)}
              className="space-y-6"
            >
              {/* Author Info */}
              <motion.div variants={fadeInUp()} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('ui.aboutAuthor')}</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('ui.techExpert')}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t('ui.authorBio')}
                </p>
              </motion.div>

              {/* Related Posts */}
              <motion.div variants={fadeInUp()} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('ui.relatedPosts')}</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-primary transition-colors cursor-pointer">
                        {t('ui.relatedPostTitle')} {i}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('ui.relatedPostExcerpt')}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div variants={fadeInUp()} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('ui.categories')}</h3>

                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <span className="font-medium hover:text-primary transition-colors">{category}</span>
                      <Badge variant="outline">5</Badge>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div variants={fadeInUp()} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('ui.tags')}</h3>

                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline" className="hover:bg-primary/10 cursor-pointer transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDummySection;