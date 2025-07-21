import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FiMessageSquare } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDate } from '@/lib/utils';

// Comment form schema
const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  comment: z.string().min(5, { message: 'Comment must be at least 5 characters' })
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface Comment {
  id: string;
  name: string;
  comment: string;
  createdDate: string;
}

interface BlogPostCommentsSectionProps {
  comments: Comment[];
  isLoadingComments: boolean;
  commentTab: string;
  setCommentTab: (tab: string) => void;
  onSubmitComment: (data: CommentFormValues) => void;
  commentMutation: {
    isPending: boolean;
    isError: boolean;
  };
  form: any;
}

const BlogPostCommentsSection: React.FC<BlogPostCommentsSectionProps> = ({
  comments,
  isLoadingComments,
  commentTab,
  setCommentTab,
  onSubmitComment,
  commentMutation,
  form,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-900 dark:text-blue-200">
        <FiMessageSquare className="mr-2" />
        {t('ui.comments')} ({comments.length})
      </h2>

      <Tabs value={commentTab} onValueChange={setCommentTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="read">
            {t('ui.readComments')}
          </TabsTrigger>
          <TabsTrigger value="write">
            {t('ui.writeComment')}
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
              <p className="text-muted-foreground mb-4">{t('ui.noComments')}</p>
              <Button onClick={() => setCommentTab('write')}>
                {t('ui.beFirstToComment')}
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
                          <CardDescription>{formatDate(comment.createdDate)}</CardDescription>
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
            <h3 className="text-xl font-bold mb-2">{t('ui.leaveComment')}</h3>
            <p className="text-muted-foreground">{t('ui.commentPolicy')}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitComment)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('ui.yourName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('ui.namePlaceholder')} {...field} />
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
                      <FormLabel>{t('ui.yourEmail')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('ui.emailPlaceholder')} {...field} />
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
                    <FormLabel>{t('ui.yourComment')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('ui.commentPlaceholder')}
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
                {commentMutation.isPending ? t('ui.submittingComment') : t('ui.submitComment')}
              </Button>

              {commentMutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {t('ui.commentError')}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogPostCommentsSection;