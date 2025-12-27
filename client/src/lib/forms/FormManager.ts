/**
 * Form Management System
 */

import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ContactFormData, DemoRequestFormData } from '@/lib/types';
import { erpNextService } from '@/lib/services/ERPNextService';
import { formSchemas } from '@/lib/schemas';
import { notificationService } from '@/lib/services/UtilityServices';

// Define concrete types for form configuration
export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface FormConfig {
  fields: FormField[];
  submitButton: {
    text: string;
    submittingText: string;
  };
  messages: {
    success: string;
    error: string;
  };
}

/**
 * Hook to manage the contact form
 */
export function useContactForm() {
  const config: FormConfig = {
    fields: [
        { name: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
        { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Enter your phone number', required: true },
        { name: 'requestType', type: 'select', label: 'Request Type', required: true, options: [
            { value: 'Product Enquiry', label: 'Product Enquiry' },
            { value: 'Request for Information', label: 'Request for Information' },
            { value: 'Suggestions', label: 'Suggestions' },
            { value: 'Other', label: 'Other' }
        ]},
        { name: 'message', type: 'textarea', label: 'Message', placeholder: 'Tell us about your project', required: true }
    ],
    submitButton: { text: 'Submit', submittingText: 'Submitting...' },
    messages: { success: 'Your message has been sent successfully!', error: 'There was a problem submitting your form.' }
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchemas.contact),
    defaultValues: { fullName: '', email: '', phone: '', requestType: 'Product Enquiry', message: '' }
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => erpNextService.submitContactForm(data),
    onSuccess: () => {
      notificationService.success(config.messages.success);
      form.reset();
    },
    onError: (error: Error) => {
      notificationService.error(error.message || config.messages.error);
    }
  });

  return {
    form,
    config,
    mutation,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
  };
}

/**
 * Hook to manage the demo request form
 */
export function useDemoRequestForm() {
  const config: FormConfig = {
    fields: [
      { name: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
      { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
      { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Enter your phone number', required: false },
      { name: 'companyName', type: 'text', label: 'Company Name', placeholder: 'Your company name', required: true },
      { name: 'companySize', type: 'text', label: 'Company Size', placeholder: 'Select your company size', required: true },
      { name: 'industry', type: 'text', label: 'Industry', placeholder: 'Industry (optional)', required: false },
      { name: 'productInterest', type: 'text', label: 'Product Interest', placeholder: 'Which product are you interested in?', required: true },
      { name: 'challenges', type: 'textarea', label: 'Challenges', placeholder: 'What challenges are you looking to solve?', required: true },
      { name: 'decisionTimeframe', type: 'text', label: 'Decision Timeframe', placeholder: 'How soon do you plan to decide?', required: true },
      { name: 'message', type: 'textarea', label: 'Additional Details', placeholder: 'Any other details (optional)', required: false }
    ],
    submitButton: { text: 'Request Demo', submittingText: 'Requesting Demo...' },
    messages: { success: 'Your demo request has been submitted!', error: 'There was a problem submitting your request.' }
  };

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(formSchemas.demoRequest),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      companySize: '1-10',
      industry: '',
      productInterest: '',
      challenges: '',
      decisionTimeframe: 'Immediately',
      message: '',
      consentContact: false,
      consentSubscribe: false
    }
  });

  const mutation = useMutation({
    mutationFn: (data: DemoRequestFormData) => erpNextService.submitDemoRequest(data),
    onSuccess: () => {
      notificationService.success(config.messages.success);
      form.reset();
    },
    onError: (error: Error) => {
      notificationService.error(error.message || config.messages.error);
    }
  });

  return {
    form,
    config,
    mutation,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
  };
}
