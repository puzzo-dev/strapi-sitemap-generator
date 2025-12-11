import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { useAnalytics } from '@/contexts/AnalyticsContext';
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
import { useUIText } from '@/hooks/useContent';
import { getUIText as getUITextFallback, UI_TEXT_FALLBACKS } from '@/lib/fallbacks';

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
  defaultRequestType?: string;
  defaultMessage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title,
  submitText,
  submittingText,
  successMessage,
  errorMessage,
  defaultRequestType,
  defaultMessage
}) => {
  const { toast } = useToast();
  const getUITextForms = useUIText('contactUs', 'forms');
  const getUITextButtons = useUIText('submit', 'buttons');
  const getUITextSubmitting = useUIText('submitting', 'buttons');
  const getUITextSuccess = useUIText('success', 'forms');
  const getUITextError = useUIText('error', 'forms');
  const getUITextFullName = useUIText('fullName', 'forms');
  const getUITextEmail = useUIText('email', 'forms');
  const { trackFormSubmission, trackEvent } = useAnalytics();

  // Use dynamic content with fallbacks
  const formTitle = title || getUITextForms();
  const submitButtonText = submitText || getUITextButtons();
  const submittingButtonText = submittingText || getUITextSubmitting();
  const successMsg = successMessage || getUITextSuccess();
  const errorMsg = errorMessage || getUITextError();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      requestType: (defaultRequestType as any) || 'Product Enquiry',
      message: defaultMessage || '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data, variables) => {
      // Track successful form submission
      trackFormSubmission({
        action: 'form_submit',
        category: 'Contact',
        label: 'Contact Form Success',
        form_id: 'contact-form',
        form_name: 'Contact Form',
        form_destination: 'contact',
        form_submit_text: submitButtonText
      });

      // Track lead generation event
      trackEvent({
        action: 'lead',
        category: 'Conversion',
        label: `Contact Form - ${variables.requestType}`,
        customParameters: {
          request_type: variables.requestType,
          lead_source: 'contact_form',
          form_type: 'contact'
        }
      });

      toast({
        title: "Success!",
        description: successMsg,
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      // Track form submission error
      trackEvent({
        action: 'form_error',
        category: 'Form',
        label: 'Contact Form Error',
        customParameters: {
          error_message: error instanceof Error ? error.message : 'Unknown error',
          form_id: 'contact-form'
        }
      });

      toast({
        title: "Error!",
        description: error instanceof Error ? error.message : errorMsg,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormData) {
    // Track form start/attempt
    trackEvent({
      action: 'form_start',
      category: 'Form',
      label: 'Contact Form Started',
      customParameters: {
        form_id: 'contact-form',
        request_type: data.requestType
      }
    });

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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{getUITextFullName()} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={getUITextFullName()}
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{getUITextEmail()} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={getUITextEmail()}
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.phone} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={UI_TEXT_FALLBACKS.forms.placeholders.phone}
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.requestType} *</FormLabel>
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
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.message} *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={UI_TEXT_FALLBACKS.forms.placeholders.message}
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
            className="max-w-sm bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? (
              <span className="flex items-start justify-center">
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
