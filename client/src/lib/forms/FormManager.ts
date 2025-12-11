/**
 * Form Management System
 */

import { z } from 'zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ContactFormData, DemoRequestFormData } from '@/lib/types';
import { erpNextService } from '@/lib/services/ERPNextService';
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

// Zod schema builder remains the same, but without dependency on IValidationRule
export class FormValidationBuilder {
  private schema: Record<string, z.ZodType<any>> = {};

  public addField(name: string, field: FormField): this {
    let fieldSchema: z.ZodString = z.string();

    if (field.required) {
      fieldSchema = fieldSchema.min(1, { message: `${field.label} is required` });
    }

    if (field.type === 'email') {
      fieldSchema = fieldSchema.email({ message: 'Please enter a valid email address' });
    }

    if (field.type === 'tel') {
      fieldSchema = fieldSchema.regex(/^\+?[\d\s\-()]+$/, { message: 'Please enter a valid phone number' });
    }
    
    this.schema[name] = fieldSchema;
    return this;
  }

  public build(): z.ZodObject<any> {
    return z.object(this.schema);
  }

  public static fromFields(fields: FormField[]): z.ZodObject<any> {
    const builder = new FormValidationBuilder();
    fields.forEach(field => builder.addField(field.name, field));
    return builder.build();
  }
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

  const schema = FormValidationBuilder.fromFields(config.fields);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
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
      { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Enter your phone number', required: true },
      { name: 'topic', type: 'text', label: 'Demo Topic', placeholder: 'What would you like a demo of?', required: true },
      { name: 'date', type: 'date', label: 'Preferred Date', required: true },
      { name: 'time', type: 'time', label: 'Preferred Time', required: true },
      { name: 'message', type: 'textarea', label: 'Additional Details', placeholder: 'Tell us more about your needs', required: false }
    ],
    submitButton: { text: 'Request Demo', submittingText: 'Requesting Demo...' },
    messages: { success: 'Your demo request has been submitted!', error: 'There was a problem submitting your request.' }
  };

  const schema = FormValidationBuilder.fromFields(config.fields);
  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', topic: '', date: '', time: '', message: '' }
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
