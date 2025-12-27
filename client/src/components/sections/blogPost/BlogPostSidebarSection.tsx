import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types/content';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPostSidebarSectionProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

const BlogPostSidebarSection: React.FC<BlogPostSidebarSectionProps> = ({ post, relatedPosts }) => {
    const { t } = useTranslation();

    return (
        <div className="lg:w-1/3 space-y-8">
            {/* Author card */}
            {post.authorDetails && (
                <Card className="shadow-md p-6">
                    <CardContent>
                        <h3 className="text-xl font-bold mb-4">{t('ui.aboutAuthor')}</h3>
                        <Separator className="mb-4" />

                        <div className="flex flex-col items-center text-center">
                            <Avatar className="w-24 h-24 mb-4">
                                {post.authorDetails.userImage ? (
                                    <AvatarImage src={post.authorDetails.userImage} alt={post.authorDetails.fullName} />
                                ) : (
                                    <AvatarFallback>
                                        {post.authorDetails.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <h4 className="text-lg font-bold">{post.authorDetails.fullName}</h4>
                            {post.authorDetails.bio && (
                                <p className="text-muted-foreground mt-2">{post.authorDetails.bio}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Related posts */}
            {relatedPosts.length > 0 && (
                <Card className="shadow-md p-6">
                    <CardContent>
                        <h3 className="text-xl font-bold mb-4">{t('ui.relatedPosts')}</h3>
                        <Separator className="mb-4" />

                        <div className="space-y-4">
                            {relatedPosts.map(relatedPost => (
                                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                                    <div className="group flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
                                        {relatedPost.metaImage && (
                                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                                                <img
                                                    src={relatedPost.metaImage}
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
                                                {formatDate(relatedPost.publishedDate)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <Card className="shadow-md p-6">
                    <CardContent>
                        <h3 className="text-xl font-bold mb-4">{t('ui.tags')}</h3>
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
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BlogPostSidebarSection;