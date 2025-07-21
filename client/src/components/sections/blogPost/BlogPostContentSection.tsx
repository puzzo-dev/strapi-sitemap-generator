import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { FiTag, FiShare2 } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BlogPost } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPostContentSectionProps {
    post: BlogPost;
    onShare: () => void;
}

const BlogPostContentSection: React.FC<BlogPostContentSectionProps> = ({ post, onShare }) => {
    const { t } = useTranslation();

    // Render post content with proper formatting
    const renderPostContent = (content: string) => {
        return { __html: content };
    };

    return (
        <Card className="shadow-md overflow-hidden">
            <CardContent className="p-6 md:p-10">
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
                        <FiShare2 className="mr-2" /> {t('ui.sharePost')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BlogPostContentSection;