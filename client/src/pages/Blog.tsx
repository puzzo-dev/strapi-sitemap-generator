import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiUser,
  FiTag,
  FiFileText,
  FiBookOpen
} from 'react-icons/fi';
import { useBlogPosts, useBlogCategories } from '@/hooks/useStrapiContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { BlogPost, BlogCategory } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import {
  fadeInUp,
  staggerChildren,
  scaleUp,
  slideIn,
  gridItemAnimation,
  snowfallParticleAnimation,
  floatingShapeAnimation
} from '@/lib/animations';
import { blogPosts as fallbackPosts, blogCategories as fallbackCategories } from '@/lib/data';

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [tag, setTag] = useState('all');

  // Fetch blog posts with optional filters
  const {
    data: posts = fallbackPosts,
    isLoading: isLoadingPosts,
    error: postsError
  } = useBlogPosts({
    category: category === 'all' ? undefined : category,
    tag: tag === 'all' ? undefined : tag,
  });

  // Fetch categories with fallback
  const {
    data: categories = fallbackCategories,
    isLoading: isLoadingCategories
  } = useBlogCategories();

  // Get unique tags from all posts
  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    (posts || fallbackPosts).forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts by search term
  const filteredPosts = React.useMemo(() => {
    if (!search) return posts || fallbackPosts;

    const searchLower = search.toLowerCase();
    return (posts || fallbackPosts).filter(post =>
      post.title.toLowerCase().includes(searchLower) ||
      post.blogIntro.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower)
    );
  }, [posts, search]);

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  // Render post card with enhanced styling and animations
  const renderPostCard = (post: BlogPost) => (
    <div key={post.slug} className="group flex flex-col h-full overflow-hidden rounded-xl shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                {t('blog.readMore')}
                <FiArrowRight className="ml-1 transform group-hover/btn:translate-x-1 transition-transform h-3 w-3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Render enhanced skeletons during loading
  const renderSkeletons = () => (
    <>
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="flex flex-col h-full rounded-xl shadow-lg bg-white dark:bg-slate-800 overflow-hidden">
          <Skeleton className="h-36 md:h-32 w-full" />
          <div className="p-4 md:p-5">
            <div className="flex space-x-2 mb-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-3 rounded-full ml-1.5" />
              <Skeleton className="h-3 w-12" />
            </div>

            <Skeleton className="h-4 w-3/4 mb-1.5" />
            <Skeleton className="h-2.5 w-full mb-1" />
            <Skeleton className="h-2.5 w-3/4 mb-2.5" />

            <div className="flex flex-wrap gap-1.5 mb-3">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <div className="flex items-center">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-3 w-16 ml-2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
      >
        {/* Tech-inspired background elements - Enhanced with more icons */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            variants={scaleUp(0.8, 1.5, 0.2)}
            className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40"
          />
          <motion.div
            variants={scaleUp(0.8, 1.8, 0.5)}
            className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30"
          />
          <motion.div
            variants={scaleUp(0.8, 2, 0.8)}
            className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30"
          />

          {/* Enhanced tech pattern with more icons */}
          <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{
                opacity: 0.3,
                y: 0,
                rotate: 12,
                transition: {
                  duration: 0.8,
                  delay: 0.3
                }
              }}
              className="absolute right-0 top-0"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0, 10, 0],
                  rotate: [12, 15, 10, 13, 12],
                  transition: {
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }
                }}
              >
                <FiFileText className="h-64 w-64 text-blue-800" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{
                opacity: 0.3,
                y: 0,
                rotate: -12,
                transition: {
                  duration: 0.8,
                  delay: 0.5
                }
              }}
              className="absolute left-10 bottom-10"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0, -15, 0],
                  rotate: [-12, -9, -14, -10, -12],
                  transition: {
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut"
                  }
                }}
              >
                <FiBookOpen className="h-48 w-48 text-indigo-700" />
              </motion.div>
            </motion.div>
          </div>

          {/* Animated tech scan line */}
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

          {/* Snowfall particles */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
              // Precalculate random values to avoid React errors
              const randomLeft = (i * 6.67) % 100; // Distribute evenly across width
              const randomScale = 0.5 + ((i % 5) * 0.1); // 0.5 to 0.9
              const randomDuration = 8 + ((i % 5) * 1); // 8 to 12 seconds
              const randomDelay = (i % 5) * 1; // 0 to 4 seconds

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
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerChildren(0.1)}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div
              variants={fadeInUp(20, 0.7)}
              className="w-full md:w-2/3 text-center md:text-left"
            >
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <FiFileText className="h-4 w-4 mr-2" />
                Insights
              </div>

              <motion.h1
                variants={fadeInUp(20, 0.7)}
                className="heading-xl mb-6 text-gray-900 dark:text-white"
              >
                <span className="gradient-text">{t('blog.title')}</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp(20, 0.7, 0.3)}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
              >
                {t('blog.subtitle')}
              </motion.p>

              <motion.div variants={fadeInUp(20, 0.7, 0.5)} className="flex flex-wrap justify-center md:justify-start gap-4">
                <Input
                  placeholder={t('blog.searchPlaceholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-xs hidden md:block"
                />
              </motion.div>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              variants={fadeInUp(20, 0.7, 0.2)}
              className="hidden md:block w-full md:w-1/3 relative"
            >
              <motion.div
                initial={{ y: 10, rotate: -5 }}
                animate={{
                  y: [10, -10, 10],
                  rotate: [-5, 5, -5],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-full aspect-square max-w-md mx-auto"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-10 blur-3xl"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4 p-6 transform rotate-6">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={`blog-card-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.3 + (i * 0.1) }
                      }}
                      className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 transform hover:-translate-y-1 transition-transform duration-300"
                    >
                      <div className="w-full aspect-video rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
                      <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                      <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content */}
          <div className="md:w-4/5">
            {/* Search and filter */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <Input
                    placeholder={t('blog.searchPlaceholder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                        <SelectItem key={cat.slug} value={cat.slug || `category-${cat.name}`}>
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
                      {allTags.map(tag => (
                        <SelectItem key={tag} value={tag || `tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Error message */}
            {postsError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-8 text-red-700 dark:text-red-400">
                <p>{t('blog.errorMessage')}</p>
              </div>
            )}

            {/* Filter results summary */}
            {!isLoadingPosts && !postsError && (
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {filteredPosts.length === 0
                    ? t('blog.noResults')
                    : t('blog.showingResults', { count: filteredPosts.length })}
                </p>
              </div>
            )}

            {/* Featured posts section */}
            {!isLoadingPosts && !postsError && filteredPosts.some(post => post.featured) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{t('blog.featuredPosts')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts
                    .filter(post => post.featured)
                    .slice(0, 2)
                    .map(renderPostCard)}
                </div>
              </div>
            )}

            {/* All posts */}
            <h2 className="text-xl font-bold mb-6">{t('blog.latestPosts')}</h2>

            {isLoadingPosts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderSkeletons()}
              </div>
            ) : (
              <>
                {filteredPosts.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                    <p className="text-xl text-muted-foreground mb-4">{t('blog.noPosts')}</p>
                    <Button onClick={() => {
                      setSearch('');
                      setCategory('all');
                      setTag('all');
                    }}>
                      {t('blog.clearFilters')}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPosts.map(renderPostCard)}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4 space-y-8">
            {/* Categories */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{t('blog.categories')}</h3>
              <Separator className="mb-4" />

              {isLoadingCategories ? (
                <div className="space-y-2">
                  {Array(5).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-full" />
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {categories.map(cat => (
                    <li key={cat.slug}>
                      <Button
                        variant={category === cat.slug ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setCategory(category === cat.slug ? 'all' : cat.slug)}
                      >
                        {cat.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{t('blog.popularTags')}</h3>
              <Separator className="mb-4" />

              {isLoadingPosts ? (
                <div className="flex flex-wrap gap-2">
                  {Array(10).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-16" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {allTags.map(t => (
                    <Badge
                      key={t}
                      variant={tag === t ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => setTag(tag === t ? 'all' : t)}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{t('blog.subscribe')}</h3>
              <Separator className="mb-4" />
              <p className="text-muted-foreground mb-4">{t('blog.subscribeText')}</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;