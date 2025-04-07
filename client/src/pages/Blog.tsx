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

  // Render post card
  const renderPostCard = (post: BlogPost) => (
    <div key={post.slug} className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow duration-300">
      {post.meta_image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.meta_image} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          {post.featured && (
            <div className="absolute top-0 right-0 m-2">
              <Badge variant="destructive">Featured</Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center mb-2 text-sm text-muted-foreground">
          <FiCalendar className="mr-1" />
          <span>{formatDate(post.published_date)}</span>
          
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <FiClock className="mr-1" />
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-primary">{post.title}</h3>
        
        <p className="mb-4 text-muted-foreground flex-grow">{truncateText(post.blog_intro, 150)}</p>
        
        <div className="mt-auto">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <FiTag className="mr-1" /> {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            {post.authorDetails && (
              <div className="flex items-center">
                {post.authorDetails.user_image ? (
                  <img 
                    src={post.authorDetails.user_image} 
                    alt={post.authorDetails.full_name} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <FiUser className="text-primary" />
                  </div>
                )}
                <span className="text-sm text-muted-foreground">{post.authorDetails.full_name}</span>
              </div>
            )}
            
            <Link href={`/blog/${post.slug}`}>
              <Button variant="ghost" size="sm" className="flex items-center">
                {t('blog.readMore')} <FiArrowRight className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Render skeletons during loading
  const renderSkeletons = () => (
    <>
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="flex flex-col h-full rounded-lg shadow-md bg-white dark:bg-slate-800">
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
            {t('blog.subtitle')}
          </p>
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