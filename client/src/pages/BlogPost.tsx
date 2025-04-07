import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiTag, FiShare2, FiMessageSquare } from 'react-icons/fi';
import { useBlogPostBySlug, useBlogComments, useBlogPosts } from '@/hooks/useStrapiContent';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitBlogComment } from '@/lib/strapi';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { BlogPost } from '@/lib/types';

// Comment form schema
const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  comment: z.string().min(5, { message: 'Comment must be at least 5 characters' })
});

type CommentFormValues = z.infer<typeof commentSchema>;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [commentTab, setCommentTab] = useState<string>('read'); // 'read' or 'write'
  
  // Fetch blog post
  const { data: post, isLoading: isLoadingPost, error: postError } = useBlogPostBySlug(slug);
  
  // Fetch comments
  const { data: comments = [], isLoading: isLoadingComments } = useBlogComments(post?.name || '');
  
  // Fetch related posts - based on the same category or tags
  const { data: allPosts = [] } = useBlogPosts();
  
  // Create mutation for submitting comments
  const commentMutation = useMutation({
    mutationFn: (data: CommentFormValues) => {
      if (!post?.name) throw new Error('Post ID not available');
      return submitBlogComment(post.name, data);
    },
    onSuccess: () => {
      // Invalidate the comments query to refetch with the new comment
      queryClient.invalidateQueries({ queryKey: ['blog-comments', post?.name] });
      form.reset();
      setCommentTab('read'); // Switch back to reading comments after submission
    }
  });
  
  // Comment form
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: ''
    }
  });
  
  // Find related posts based on category and tags
  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    
    return allPosts
      .filter(p => 
        p.name !== post.name && (
          p.blog_category === post.blog_category ||
          (p.tags && post.tags && p.tags.some(tag => post.tags?.includes(tag)))
        )
      )
      .slice(0, 3); // Limit to 3 related posts
  }, [post, allPosts]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return dateString;
    }
  };
  
  // Handle comment form submission
  const onSubmitComment = (data: CommentFormValues) => {
    commentMutation.mutate(data);
  };
  
  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.blog_intro,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying to clipboard:', err));
    }
  };
  
  // Render post content with proper formatting
  const renderPostContent = (content: string) => {
    return { __html: content };
  };
  
  // Render loading state
  if (isLoadingPost) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (postError || !post) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>
                {t('blog.postNotFound')}
              </AlertDescription>
            </Alert>
            <Link href="/blog">
              <Button variant="outline" className="flex items-center">
                <FiArrowLeft className="mr-2" /> {t('blog.backToBlog')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16">
      {/* Hero section with post title and featured image */}
      <div className="relative bg-primary py-16 md:py-24 text-white">
        {post.meta_image && (
          <div className="absolute inset-0 opacity-20 bg-black">
            <img 
              src={post.meta_image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/blog">
            <Button variant="ghost" className="text-white mb-8 hover:bg-primary/20">
              <FiArrowLeft className="mr-2" /> {t('blog.backToBlog')}
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm md:text-base opacity-90 mb-6 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              
              {post.readTime && (
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
              )}
              
              {post.authorDetails && (
                <div className="flex items-center">
                  <FiUser className="mr-1" />
                  <span>{post.authorDetails.full_name}</span>
                </div>
              )}
            </div>
            
            {post.blog_category && (
              <Link href={`/blog?category=${post.blog_category}`}>
                <Badge className="hover:bg-primary-foreground/20 cursor-pointer">
                  {post.blog_category}
                </Badge>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              {/* If there's a meta image and we already used it in the hero, we don't need to show it again */}
              
              <div className="p-6 md:p-10">
                {/* Post intro */}
                <div className="text-lg md:text-xl text-muted-foreground mb-8 font-medium border-l-4 border-primary pl-4 italic">
                  {post.blog_intro}
                </div>
                
                {/* Post content */}
                <div 
                  className="prose dark:prose-invert prose-headings:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg max-w-none"
                  dangerouslySetInnerHTML={renderPostContent(post.content)}
                />
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link key={tag} href={`/blog?tag=${tag}`}>
                          <Badge variant="outline" className="flex items-center hover:bg-muted cursor-pointer">
                            <FiTag className="mr-1" /> {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Author bio */}
                {post.authorDetails && (
                  <div className="mt-10 pt-6 border-t">
                    <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                      <Avatar className="w-16 h-16">
                        {post.authorDetails.user_image ? (
                          <AvatarImage src={post.authorDetails.user_image} alt={post.authorDetails.full_name} />
                        ) : (
                          <AvatarFallback>
                            {post.authorDetails.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{post.authorDetails.full_name}</h3>
                        {post.authorDetails.bio && (
                          <p className="text-muted-foreground">{post.authorDetails.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Share button */}
                <div className="mt-10 pt-6 border-t">
                  <Button variant="outline" onClick={handleShare} className="flex items-center">
                    <FiShare2 className="mr-2" /> {t('blog.sharePost')}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Comments section */}
            <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FiMessageSquare className="mr-2" />
                {t('blog.comments')} ({comments.length})
              </h2>
              
              <Tabs value={commentTab} onValueChange={setCommentTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="read">
                    {t('blog.readComments')}
                  </TabsTrigger>
                  <TabsTrigger value="write">
                    {t('blog.writeComment')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="read">
                  {isLoadingComments ? (
                    <div className="space-y-4">
                      {Array(3).fill(0).map((_, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div>
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24 mt-1" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">{t('blog.noComments')}</p>
                      <Button onClick={() => setCommentTab('write')}>
                        {t('blog.beFirstToComment')}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {comments.map(comment => (
                        <Card key={comment.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarFallback>
                                    {comment.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base">{comment.name}</CardTitle>
                                  <CardDescription>{formatDate(comment.created_date)}</CardDescription>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p>{comment.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="write">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{t('blog.leaveComment')}</h3>
                    <p className="text-muted-foreground">{t('blog.commentPolicy')}</p>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitComment)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('blog.yourName')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('blog.namePlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('blog.yourEmail')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('blog.emailPlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('blog.yourComment')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t('blog.commentPlaceholder')} 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        disabled={commentMutation.isPending}
                        className="w-full md:w-auto"
                      >
                        {commentMutation.isPending ? t('blog.submittingComment') : t('blog.submitComment')}
                      </Button>
                      
                      {commentMutation.isError && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {t('blog.commentError')}
                          </AlertDescription>
                        </Alert>
                      )}
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Author card */}
            {post.authorDetails && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('blog.aboutAuthor')}</h3>
                <Separator className="mb-4" />
                
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    {post.authorDetails.user_image ? (
                      <AvatarImage src={post.authorDetails.user_image} alt={post.authorDetails.full_name} />
                    ) : (
                      <AvatarFallback>
                        {post.authorDetails.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h4 className="text-lg font-bold">{post.authorDetails.full_name}</h4>
                  {post.authorDetails.bio && (
                    <p className="text-muted-foreground mt-2">{post.authorDetails.bio}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('blog.relatedPosts')}</h3>
                <Separator className="mb-4" />
                
                <div className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                      <div className="group flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
                        {relatedPost.meta_image && (
                          <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                            <img 
                              src={relatedPost.meta_image} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(relatedPost.published_date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t('blog.tags')}</h3>
                <Separator className="mb-4" />
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;