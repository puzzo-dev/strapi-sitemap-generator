import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiTag, FiShare2, FiMessageSquare } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BlogPostDummySectionProps {
  post: BlogPost;
  onShare: () => void;
  commentTab: string;
  setCommentTab: (tab: string) => void;
}

const BlogPostDummySection: React.FC<BlogPostDummySectionProps> = ({ 
  post, 
  onShare, 
  commentTab, 
  setCommentTab 
}) => {
  const { t } = useTranslation();

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
                <span className="font-medium">{t('blog.backToBlog')}</span>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 md:p-10">
                {/* Post intro */}
                <div className="text-lg md:text-xl text-muted-foreground mb-8 font-medium border-l-4 border-primary pl-4 py-2 bg-primary/5 dark:bg-primary/10 rounded-r-lg italic">
                  {post.blogIntro}
                </div>

                {/* Post content */}
                <div
                  className="prose dark:prose-invert prose-headings:text-primary prose-headings:font-bold prose-headings:mb-6 prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-strong:text-primary/90 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded prose-code:text-sm prose-blockquote:border-primary/50 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:rounded-r-md max-w-none"
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
                        {post.authorDetails.userImage ? (
                          <AvatarImage src={post.authorDetails.userImage} alt={post.authorDetails.fullName} />
                        ) : (
                          <AvatarFallback>
                            {post.authorDetails.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{post.authorDetails.fullName}</h3>
                        {post.authorDetails.bio && (
                          <p className="text-muted-foreground">{post.authorDetails.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Share button */}
                <div className="mt-10 pt-6 border-t">
                  <Button variant="outline" onClick={onShare} className="flex items-center">
                    <FiShare2 className="mr-2" /> {t('blog.sharePost')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments section - simplified for dummy content */}
            <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FiMessageSquare className="mr-2" />
                {t('blog.comments')} (0)
              </h2>

              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">{t('blog.noComments')}</p>
                <Button onClick={() => setCommentTab('write')}>
                  {t('blog.beFirstToComment')}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{t('blog.relatedPosts')}</h3>

              <div className="space-y-4">
                {/* Generate dummy related posts */}
                {['ai-revolution-in-business', 'cloud-computing-trends', 'cybersecurity-best-practices']
                  .filter(s => s !== post.slug)
                  .slice(0, 3)
                  .map(relatedSlug => {
                    const relatedTitle = relatedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    const relatedImage = 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1470';
                    return (
                      <Link key={relatedSlug} href={`/blog/${relatedSlug}`}>
                        <div className="group flex gap-3 items-start hover:bg-slate-50 dark:hover:bg-slate-700/30 p-2 rounded-lg transition-colors">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={relatedImage}
                              alt={relatedTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">{relatedTitle}</h4>
                            <p className="text-sm text-muted-foreground">{formatDate(new Date().toISOString())}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                }
              </div>
            </div>

            <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{t('blog.categories')}</h3>

              <div className="space-y-2">
                {['Technology', 'Innovation', 'Digital Transformation', 'Business Strategy'].map(category => (
                  <Link key={category} href={`/blog?category=${category}`}>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <span className="font-medium hover:text-primary transition-colors">{category}</span>
                      <Badge variant="outline">5</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{t('blog.tags')}</h3>

              <div className="flex flex-wrap gap-2">
                {['innovation', 'artificial intelligence', 'machine learning', 'digital transformation', 'cloud computing', 'cybersecurity', 'blockchain', 'IoT'].map(tag => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer transition-colors">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDummySection;