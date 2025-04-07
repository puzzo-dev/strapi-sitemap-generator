import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData } from '@/lib/types';
import { submitContactForm } from '@/lib/strapi';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: error instanceof Error ? error.message : "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormData) {
    contactMutation.mutate(data);
  }

  return (
    <div className="bg-secondary-dark rounded-xl p-8 border border-gray-800">
      <h3 className="text-xl font-semibold mb-6">CONTACT US</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-300">Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
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
                <FormLabel className="text-sm font-medium text-gray-300">Email *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email address" 
                    type="email"
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-300">Phone *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your phone number" 
                    type="tel"
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-300">Message *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project" 
                    rows={4}
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
            className="w-full gradient-bg px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
