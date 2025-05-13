import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import BlogCard from '@/components/ui/BlogCard';
import { useBlogPosts } from '@/hooks/useStrapiContent';
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
  Bookmark
} from 'lucide-react';

const BlogPostsSection: React.FC = () => {
  const { t } = useTranslation();
  const { data: recentBlogPosts, isLoading: isBlogPostsLoading } = useBlogPosts({
    limit: 3,
    // featured: true
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced animated background with tech pattern */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
        {/* Tech elements with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0.3,
            scale: [0.8, 1.1, 0.9, 1],
            rotate: [0, 5, -5, 0],
            transition: { duration: 8, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute left-10 top-20"
        >
          <Code className="h-40 w-40 text-blue-400 dark:text-blue-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0.25,
            scale: [0.9, 1.2, 0.8, 1],
            rotate: [0, -8, 8, 0],
            transition: { duration: 10, delay: 1, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute right-20 top-10"
        >
          <LayoutGrid className="h-32 w-32 text-purple-400 dark:text-purple-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0.2,
            scale: [1, 0.9, 1.1, 1],
            rotate: [0, 10, -10, 0],
            transition: { duration: 9, delay: 2, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute right-1/4 bottom-1/4"
        >
          <Cpu className="h-36 w-36 text-indigo-400 dark:text-indigo-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0.3,
            scale: [0.8, 1, 0.9, 1.1],
            rotate: [0, -5, 5, 0],
            transition: { duration: 7, delay: 1.5, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute left-1/3 bottom-20"
        >
          <CircuitBoard className="h-48 w-48 text-cyan-400 dark:text-cyan-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0.25,
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 8, -8, 0],
            transition: { duration: 8, delay: 0.5, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute left-1/4 top-1/3"
        >
          <BookOpen className="h-24 w-24 text-blue-400 dark:text-blue-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0.2,
            scale: [0.9, 1.1, 0.8, 1],
            rotate: [0, -10, 10, 0],
            transition: { duration: 9, delay: 3, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute right-1/3 top-2/3"
        >
          <Newspaper className="h-32 w-32 text-green-400 dark:text-green-600" />
        </motion.div>

        {/* Animated tech scan lines */}
        <motion.div
          initial={{ opacity: 0, top: '100%' }}
          animate={{
            opacity: [0, 0.6, 0.1],
            top: ['100%', '0%', '0%'],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5
            }
          }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, left: '100%' }}
          animate={{
            opacity: [0, 0.6, 0.1],
            left: ['100%', '0%', '0%'],
            transition: {
              duration: 3,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 5
            }
          }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-transparent"
        />

        {/* Snowfall particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const randomLeft = (i * 5) % 100;
          const randomScale = 0.5 + ((i % 5) * 0.1);
          const randomDuration = 8 + ((i % 5) * 1);
          const randomDelay = (i % 5) * 1;

          return (
            <motion.div
              key={`snowfall-particle-${i}`}
              className="absolute h-1 w-1 rounded-full bg-blue-500/50 dark:bg-blue-400/50"
              initial={{
                y: -20,
                opacity: 0,
                scale: randomScale
              }}
              animate={{
                y: '120%',
                opacity: [0, 0.8, 0.5, 0],
                transition: {
                  duration: randomDuration,
                  delay: randomDelay,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                left: `${randomLeft}%`,
              }}
            />
          );
        })}

        {/* Animated network connections */}
        <svg className="absolute inset-0 w-full h-full z-0 opacity-10 dark:opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Animated dots */}
          {[
            { cx: 20, cy: 20, color: "blue", delay: 0.2 },
            { cx: 80, cy: 30, color: "cyan", delay: 0.7 },
            { cx: 50, cy: 70, color: "indigo", delay: 1.2 },
            { cx: 30, cy: 80, color: "purple", delay: 1.7 },
            { cx: 70, cy: 60, color: "blue", delay: 2.2 }
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx} cy={dot.cy} r="2"
              className={`text-${dot.color}-500 fill-current`}
              initial={{ opacity: 0, r: 0 }}
              animate={{
                opacity: 1,
                r: [0, 2, 1.5, 2],
                transition: {
                  duration: 3,
                  delay: dot.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  times: [0, 0.3, 0.8, 1]
                }
              }}
            />
          ))}

          {/* Animated lines */}
          {[
            { x1: 20, y1: 20, x2: 80, y2: 30, color: "blue", delay: 0.5 },
            { x1: 80, y1: 30, x2: 50, y2: 70, color: "cyan", delay: 1 },
            { x1: 50, y1: 70, x2: 30, y2: 80, color: "indigo", delay: 1.5 },
            { x1: 30, y1: 80, x2: 70, y2: 60, color: "purple", delay: 2 },
            { x1: 70, y1: 60, x2: 20, y2: 20, color: "blue", delay: 2.5 }
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              className={`text-${line.color}-500 stroke-current`}
              initial={{ opacity: 0, strokeWidth: 0 }}
              animate={{
                opacity: 0.5,
                strokeWidth: 0.2,
                pathLength: [0, 1],
                transition: {
                  duration: 2,
                  delay: line.delay,
                  ease: "easeInOut"
                }
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header with animated elements */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
          >
            <Lightbulb className="h-4 w-4 mr-2 animate-pulse" />
            Latest Insights
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-md mb-4 text-blue-600 dark:text-blue-400 font-bold"
          >
            <span className="relative inline-block pb-2">
              INSIGHTS & EXPERTISE
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "50%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              ></motion.div>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Stay updated with the latest trends, insights, and news from our technology experts.
          </motion.p>
        </div>
        {/* Blog Posts Grid with stylish animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isBlogPostsLoading ? (
            // Enhanced loading placeholders with animations
            Array(3).fill(0).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md h-96 flex flex-col relative overflow-hidden group"
              >
                {/* Animated loading background */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
                    }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  />
                </div>

                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 relative overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Infinity, duration: 2, ease: "linear" }
                    }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 relative overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Infinity, duration: 2, delay: 0.1, ease: "linear" }
                    }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 relative overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Infinity, duration: 2, delay: 0.2, ease: "linear" }
                    }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 relative overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Infinity, duration: 2, delay: 0.3, ease: "linear" }
                    }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 relative overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      transition: { repeat: Infinity, duration: 2, delay: 0.4, ease: "linear" }
                    }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                  />
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                    <motion.div
                      animate={{
                        x: ["-100%", "100%"],
                        transition: { repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" }
                      }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                    />
                  </div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                    <motion.div
                      animate={{
                        x: ["-100%", "100%"],
                        transition: { repeat: Infinity, duration: 2, delay: 0.6, ease: "linear" }
                      }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent absolute"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Actual blog posts
            recentBlogPosts?.map((post, index) => (
              <motion.div
                key={post.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard
                  {...post}
                  url={{ url: `/blog/${post.slug}` }}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <GradientButton
            href="/blog"
            variant="default"
            size="lg"
            className="group"
          >
            <span className="flex items-center">
              <span>View All Articles</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </GradientButton>
        </motion.div>

        {/* Tech-inspired decorative elements at the bottom */}
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