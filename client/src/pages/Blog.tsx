import React, { useState } from 'react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiCalendar, FiClock, FiUser, FiTag } from 'react-icons/fi';
import { useBlogPosts, useBlogCategories } from '@/hooks/useStrapiContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { BlogPost } from '@/lib/types';

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [tag, setTag] = useState('all');
  
  // Fetch blog posts with optional filters
  const { 
    data: posts = [], 
    isLoading: isLoadingPosts,
    error: postsError 
  } = useBlogPosts({
    category: category === 'all' ? undefined : category,
    tag: tag === 'all' ? undefined : tag,
    // We don't need to filter by search on the API level as we'll do it client-side
  });

  // Fetch categories
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories
  } = useBlogCategories();

  // Get unique tags from all posts
  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts by search term
  const filteredPosts = React.useMemo(() => {
    if (!search) return posts;
    
    const searchLower = search.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) || 
      post.blog_intro.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower)
    );
  }, [posts, search]);

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return dateString;
    }
  };

  // Render post card with enhanced styling and animations
  const renderPostCard = (post: BlogPost) => (
    <div key={post.slug} className="group flex flex-col h-full overflow-hidden rounded-xl shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {post.meta_image && (
        <div className="relative h-52 overflow-hidden">
          <img 
            src={post.meta_image} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {post.featured && (
            <div className="absolute top-0 right-0 m-3">
              <Badge variant="destructive" className="font-medium px-3 py-1 text-sm">Featured</Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {post.title}
            </h3>
          </div>
        </div>
      )}
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <FiCalendar className="mr-1.5 text-primary" />
          <span>{formatDate(post.published_date)}</span>
          
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <FiClock className="mr-1.5 text-primary" />
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="mb-5 text-muted-foreground flex-grow">{truncateText(post.blog_intro, 120)}</p>
        
        <div className="mt-auto">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                  <FiTag className="mr-1.5" /> {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">+{post.tags.length - 3}</Badge>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            {post.authorDetails && (
              <div className="flex items-center">
                {post.authorDetails.user_image ? (
                  <img 
                    src={post.authorDetails.user_image} 
                    alt={post.authorDetails.full_name} 
                    className="w-8 h-8 rounded-full mr-2.5 border-2 border-white dark:border-slate-700 shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2.5 border-2 border-white dark:border-slate-700 shadow-sm">
                    <FiUser className="text-primary" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.authorDetails.full_name}</span>
              </div>
            )}
            
            <Link href={`/blog/${post.slug}`}>
              <div className="group/btn flex items-center text-primary font-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
                {t('blog.readMore')} 
                <FiArrowRight className="ml-1.5 transform group-hover/btn:translate-x-1 transition-transform" />
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
          <Skeleton className="h-52 w-full" />
          <div className="p-6">
            <div className="flex space-x-2 mb-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full ml-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            <Skeleton className="h-8 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-5" />
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24 ml-2" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Hero section with tech particles animation */}
      <div className="relative bg-gradient-to-br from-primary/95 via-primary to-blue-700 text-white py-16 md:py-32 overflow-hidden">
        {/* Tech-inspired particle background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-20 h-20 rounded-full bg-blue-300 top-1/4 left-1/3 animate-float-slow"></div>
          <div className="absolute w-32 h-32 rounded-full bg-blue-200 bottom-1/4 right-1/3 animate-float-medium"></div>
          <div className="absolute w-16 h-16 rounded-full bg-white/30 top-1/2 left-1/4 animate-float-fast"></div>
          <div className="absolute w-24 h-24 rounded-full bg-white/20 bottom-1/3 right-1/4 animate-float-slow"></div>
          <div className="absolute w-12 h-12 rounded-full bg-blue-100 top-1/3 right-1/2 animate-float-medium"></div>
          <div className="absolute w-2 h-10 bg-blue-300 top-2/3 left-2/3 animate-pulse"></div>
          <div className="absolute w-3 h-16 bg-blue-200 bottom-1/3 left-1/3 animate-pulse"></div>
          <div className="absolute w-2 h-12 bg-white/30 top-1/4 right-1/4 animate-pulse"></div>
          <div className="absolute w-3 h-14 bg-white/20 bottom-1/4 right-2/3 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              {t('blog.title')}
            </h1>
            <div className="h-1 w-24 bg-white mb-6 animate-width-expand"></div>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl animate-fade-in">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="md:w-3/4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts
                    .filter(post => post.featured)
                    .slice(0, 2)
                    .map(renderPostCard)}
                </div>
              </div>
            )}
            
            {/* All posts */}
            <h2 className="text-2xl font-bold mb-6">{t('blog.latestPosts')}</h2>
            
            {isLoadingPosts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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