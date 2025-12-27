import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { subscribeToNewsletter } from '@/lib/erpnext';
import { NewsletterFormProps } from '@/lib/types';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className }) => {
  const { toast } = useToast();
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: (data: NewsletterFormData) => subscribeToNewsletter(data.email),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: error instanceof Error ? error.message : "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: NewsletterFormData) {
    subscriptionMutation.mutate(data);
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    type="email"
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="gradient-bg px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            disabled={subscriptionMutation.isPending}
          >
            {subscriptionMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewsletterForm;
