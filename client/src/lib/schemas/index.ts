/**
 * Consolidated Form Validation Schemas
 * 
 * Eliminates duplicate form schemas across the codebase
 * and provides a single source of truth for validation rules.
 */

import { z } from 'zod';

// Base validation rules
export const baseValidation = {
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
  comment: z.string().min(1, 'Comment is required').max(500, 'Comment must be less than 500 characters'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  position: z.string().max(100, 'Position must be less than 100 characters').optional(),
};

// Contact Form Schema
export const contactFormSchema = z.object({
  name: baseValidation.name,
  email: baseValidation.email,
  phone: baseValidation.phone,
  subject: baseValidation.subject,
  message: baseValidation.message,
  company: baseValidation.company,
});

// Comment Schema (for blog posts)
export const commentSchema = z.object({
  name: baseValidation.name,
  email: baseValidation.email,
  comment: baseValidation.comment,
});

// Newsletter Schema
export const newsletterSchema = z.object({
  email: baseValidation.email,
});

// Booking/Appointment Schema
export const bookingSchema = z.object({
  name: baseValidation.name,
  email: baseValidation.email,
  phone: z.string().min(10, 'Phone number is required for appointments'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  service: z.string().min(1, 'Service selection is required'),
  message: baseValidation.message.optional(),
});

// Job Application Schema
export const jobApplicationSchema = z.object({
  name: baseValidation.name,
  email: baseValidation.email,
  phone: baseValidation.phone,
  position: z.string().min(1, 'Position is required'),
  experience: z.string().min(1, 'Experience is required'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  resume: z.any().optional(), // File upload
  linkedIn: z.string().url('Invalid LinkedIn URL').optional(),
  portfolio: z.string().url('Invalid portfolio URL').optional(),
});

// Quote Request Schema
export const quoteRequestSchema = z.object({
  name: baseValidation.name,
  email: baseValidation.email,
  phone: baseValidation.phone,
  company: z.string().min(1, 'Company name is required'),
  projectType: z.string().min(1, 'Project type is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  description: z.string().min(20, 'Project description must be at least 20 characters'),
});

// Consultation Request Schema
export const consultationSchema = z.object({
  name: baseValidation.name,
  email: baseValidation.email,
  phone: baseValidation.phone,
  company: baseValidation.company,
  industry: z.string().min(1, 'Industry is required'),
  challenges: z.string().min(20, 'Please describe your challenges (minimum 20 characters)'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
});

// Export all schemas for easy access
export const formSchemas = {
  contact: contactFormSchema,
  comment: commentSchema,
  newsletter: newsletterSchema,
  booking: bookingSchema,
  jobApplication: jobApplicationSchema,
  quote: quoteRequestSchema,
  consultation: consultationSchema,
};

// Type exports for TypeScript
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;
export type ConsultationFormData = z.infer<typeof consultationSchema>;

// Validation helper functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: z.ZodError } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};

export const getFieldError = (errors: z.ZodError | undefined, fieldName: string): string | undefined => {
  if (!errors) return undefined;
  const fieldError = errors.errors.find(error => error.path.includes(fieldName));
  return fieldError?.message;
};
