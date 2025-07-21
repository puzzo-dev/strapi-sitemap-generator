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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData } from '@/lib/types';
import { submitContactForm } from '@/lib/erpnext';
import { useUIContent, useUIText } from '@/hooks/useContent';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  requestType: z.enum(['Product Enquiry', 'Request for Information', 'Suggestions', 'Other'], {
    required_error: 'Please select a request type'
  }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

interface ContactFormProps {
  title?: string;
  submitText?: string;
  submittingText?: string;
  successMessage?: string;
  errorMessage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  title,
  submitText,
  submittingText,
  successMessage,
  errorMessage
}) => {
  const { toast } = useToast();
  const getUIText = useUIText();
  
  // Use dynamic content with fallbacks
  const formTitle = title || getUIText('contactUs', 'forms');
  const submitButtonText = submitText || getUIText('submit', 'buttons');
  const submittingButtonText = submittingText || getUIText('submitting', 'buttons');
  const successMsg = successMessage || getUIText('success', 'forms');
  const errorMsg = errorMessage || getUIText('error', 'forms');
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      requestType: 'Product Enquiry',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: successMsg,
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: error instanceof Error ? error.message : errorMsg,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormData) {
    contactMutation.mutate(data);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">{formTitle}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{getUIText('fullName', 'forms')} *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={getUIText('fullName', 'forms')} 
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{getUIText('email', 'forms')} *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={getUIText('email', 'forms')} 
                    type="email"
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your phone number" 
                    type="tel"
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Request Type *</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select request type</option>
                    <option value="Product Enquiry">Product Enquiry</option>
                    <option value="Request for Information">Request for Information</option>
                    <option value="Suggestions">Suggestions</option>
                    <option value="Other">Other</option>
                  </select>
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Message *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project" 
                    rows={4}
                    {...field} 
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {submittingButtonText}
              </span>
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
