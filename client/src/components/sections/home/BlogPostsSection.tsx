import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import BlogCard from '@/components/ui/BlogCard';
import { useBlogPosts, useSectionContent } from '@/hooks/useStrapiContent';
import { blogPostsSectionFallback } from '@/lib/data';
import {
  ArrowRight,
  Code,
  LayoutGrid,
  Sparkles,
  Cpu,
  CircuitBoard,
  BookOpen,
  FileText,
  Newspaper,
  Lightbulb,
  Zap,
  Bookmark,
  ChevronRight,
  Database,
  Server,
  Cloud,
  Layers,
  PenTool,
  BookMarked,
  MessageSquare,
  Rss,
  Share2,
  Hash,
  Feather
} from 'lucide-react';
import type { PageSection } from '@/lib/types';

// Background decoration component (unchanged)
const BackgroundDecoration: React.FC = () => (
  <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
    <Sparkles className="absolute right-10 top-20 h-64 w-64 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-slower" />
    <Cpu className="absolute left-20 top-40 h-40 w-40 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
    <CircuitBoard className="absolute right-1/4 bottom-20 h-56 w-56 text-purple-400 dark:text-purple-600 opacity-20 transform rotate-12 animate-float" style={{ animationDelay: '2s' }} />
    <Code className="absolute left-1/3 bottom-1/3 h-48 w-48 text-cyan-400 dark:text-cyan-600 opacity-25 transform -rotate-6 animate-pulse-slower" />
    <BookOpen className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
    <Database className="absolute right-1/5 top-1/4 h-32 w-32 text-green-400 dark:text-green-600 opacity-20 animate-float" style={{ animationDelay: '1.2s' }} />
    <Newspaper className="absolute left-1/4 top-3/4 h-40 w-40 text-amber-400 dark:text-amber-600 opacity-20 animate-pulse-slower" style={{ animationDelay: '0.8s' }} />
    <Feather className="absolute right-1/3 top-1/6 h-36 w-36 text-sky-400 dark:text-sky-600 opacity-25 animate-float" style={{ animationDelay: '1.7s' }} />
    <PenTool className="absolute left-2/3 bottom-1/4 h-28 w-28 text-rose-400 dark:text-rose-600 opacity-20 transform rotate-6 animate-pulse-slower" style={{ animationDelay: '2.3s' }} />
    <BookMarked className="absolute right-1/6 bottom-1/3 h-32 w-32 text-violet-400 dark:text-violet-600 opacity-20 transform -rotate-12 animate-float" style={{ animationDelay: '1.5s' }} />
    <MessageSquare className="absolute left-1/6 top-1/2 h-24 w-24 text-teal-400 dark:text-teal-600 opacity-20 animate-pulse-slower" style={{ animationDelay: '1.9s' }} />
    <Rss className="absolute right-1/2 bottom-1/6 h-20 w-20 text-orange-400 dark:text-orange-600 opacity-20 transform rotate-45 animate-float" style={{ animationDelay: '2.1s' }} />
    <Share2 className="absolute left-1/2 top-1/5 h-28 w-28 text-emerald-400 dark:text-emerald-600 opacity-20 animate-pulse-slower" style={{ animationDelay: '1.3s' }} />
    <Hash className="absolute right-1/4 top-1/2 h-24 w-24 text-fuchsia-400 dark:text-fuchsia-600 opacity-20 transform -rotate-15 animate-float" style={{ animationDelay: '0.7s' }} />
    <div className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
    <div className="absolute top-1/3 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
    <div className="absolute top-0 left-1/3 h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>
    <motion.div
      initial={{ opacity: 0, top: '100%' }}
      animate={{
        opacity: [0, 0.6, 0.1],
        top: ['100%', '0%', '0%'],
        transition: { duration: 3, repeat: Infinity, repeatDelay: 5 }
      }}
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
    />
    <motion.div
      initial={{ opacity: 0, left: '100%' }}
      animate={{
        opacity: [0, 0.6, 0.1],
        left: ['100%', '0%', '0%'],
        transition: { duration: 3, delay: 1.5, repeat: Infinity, repeatDelay: 5 }
      }}
      className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-transparent"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-30"></div>
    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-30"></div>
    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/30 dark:bg-blue-400/20 animate-pulse-light"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  </div>
);

const BlogPostsSection: React.FC = () => {
  const { t } = useTranslation();
  const { data: section = blogPostsSectionFallback, isLoading: isSectionLoading } = useSectionContent('blog');
  const { data: recentBlogPosts, isLoading: isBlogPostsLoading } = useBlogPosts({
    limit: section.settings?.postsToShow || 3
  });

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] border-b border-blue-100 dark:border-blue-900/40">
      <BackgroundDecoration />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
          >
            <Lightbulb className="h-4 w-4 mr-2 animate-pulse" />
            {t('blog.latestInsights')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-md mb-4 text-blue-600 dark:text-blue-400 font-bold"
          >
            <span className="relative inline-block pb-2">
              {section.title || t('blog.insightsExpertise')}
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "50%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {section.subtitle || t('blog.stayUpdated')}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isBlogPostsLoading || isSectionLoading ? (
            Array(section.settings?.postsToShow || 3).fill(0).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md h-96 flex flex-col relative overflow-hidden group border border-blue-100 dark:border-blue-800/30"
              >
                <div className="absolute inset-0 overflow-hidden opacity-10">
                  <motion.div
                    animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  />
                </div>
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, ease: "linear" } }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, delay: 0.1, ease: "linear" } }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, delay: 0.2, ease: "linear" } }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, delay: 0.3, ease: "linear" } }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, delay: 0.4, ease: "linear" } }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" } }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                    />
                  </div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "100%"], transition: { repeat: Infinity, duration: 2, delay: 0.6, ease: "linear" } }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            recentBlogPosts?.map((post, index) => (
              <motion.div
                key={post.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/0 dark:border-blue-500/0 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300 z-10"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/0 dark:border-blue-500/0 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300 z-10"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/0 dark:border-blue-500/0 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/0 dark:border-blue-500/0 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300 z-10"></div>
                  <BlogCard {...post} url={{ url: `/blog/${post.slug}` }} />
                </div>
              </motion.div>
            ))
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <GradientButton
            href={'/blog'}
            variant={'default'}
            size={'lg'}
            className="group"
            endIcon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
          >
            {section.settings?.primaryButton?.text || t('blog.viewAllArticles')}
          </GradientButton>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border border-blue-500/30 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-blue-500/50 animate-ping"></div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostsSection;