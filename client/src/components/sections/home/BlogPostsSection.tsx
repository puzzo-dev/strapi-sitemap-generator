import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import BlogCard from '@/components/ui/BlogCard';
import { useBlogPosts } from '@/hooks/useStrapiContent';
import { 
  ArrowRight, 
  Code, 
  LayoutGrid 
} from 'lucide-react';

const BlogPostsSection: React.FC = () => {
  const { t } = useTranslation();
  const { data: recentBlogPosts, isLoading: isBlogPostsLoading } = useBlogPosts({
    limit: 3,
    // featured: true
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background tech pattern - similar to other sections */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
        {/* Add tech background elements similar to other sections */}
        <Code className="absolute left-10 top-20 h-40 w-40 text-blue-400 dark:text-blue-600 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <LayoutGrid className="absolute right-20 top-10 h-32 w-32 text-purple-400 dark:text-purple-600 opacity-25 animate-pulse-slower" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
            Latest Insights
          </div>
          <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">INSIGHTS & EXPERTISE</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with the latest trends, insights, and news from our technology experts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isBlogPostsLoading ? (
            // Loading placeholders
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md animate-pulse h-96 flex flex-col">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                <div className="mt-auto h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))
          ) : (
            // Render blog posts with fallback to empty array if null
            (recentBlogPosts || []).map((post, index) => (
              <motion.div
                key={post.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <GradientButton href="/blog" className="px-10 w-56 mx-auto" endIcon={<ArrowRight />}>
            View All Articles
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default BlogPostsSection;