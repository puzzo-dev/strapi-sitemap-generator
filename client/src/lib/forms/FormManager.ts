/**
 * Form Management System
 * 
 * Implements SOLID principles for form handling:
 * - Single Responsibility: Each class has one clear purpose
 * - Open/Closed: Easy to extend with new form types
 * - Interface Segregation: Small, focused interfaces
 * - Dependency Inversion: Depends on abstractions
 * - DRY: Eliminates form handling duplication
 */

import { z } from 'zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { 
  IFormField, 
  IFormConfig, 
  IValidationRule,
  IFormSubmissionProvider,
  INotificationService
} from '@/lib/abstractions';
import { ContactFormData, BookingFormData } from '@/lib/types';

// =============================================================================
// FORM VALIDATION BUILDER (Open/Closed Principle)
// =============================================================================

/**
 * Form validation builder - creates Zod schemas dynamically
 */
export class FormValidationBuilder {
  private schema: Record<string, z.ZodType<any>> = {};

  public addField(name: string, rules: IValidationRule[]): this {
    let fieldSchema: z.ZodType<any> = z.string();

    rules.forEach(rule => {
      switch (rule.type) {
        case 'required':
          fieldSchema = fieldSchema.min(1, { message: rule.message });
          break;
        case 'email':
          fieldSchema = z.string().email({ message: rule.message });
          break;
        case 'phone':
          fieldSchema = z.string().regex(/^\+?[\d\s\-\(\)]+$/, { message: rule.message });
          break;
        case 'minLength':
          fieldSchema = z.string().min(rule.value, { message: rule.message });
          break;
        case 'maxLength':
          fieldSchema = z.string().max(rule.value, { message: rule.message });
          break;
        case 'pattern':
          fieldSchema = z.string().regex(new RegExp(rule.value), { message: rule.message });
          break;
      }
    });

    this.schema[name] = fieldSchema;
    return this;
  }

  public build(): z.ZodObject<any> {
    return z.object(this.schema);
  }

  public static fromFields(fields: IFormField[]): z.ZodObject<any> {
    const builder = new FormValidationBuilder();
    
    fields.forEach(field => {
      if (field.validation) {
        builder.addField(field.name, field.validation);
      } else {
        // Default validation based on field type
        const defaultRules: IValidationRule[] = [];
        
        if (field.required) {
          defaultRules.push({
            type: 'required',
            message: `${field.label} is required`
          });
        }

        if (field.type === 'email') {
          defaultRules.push({
            type: 'email',
            message: 'Please enter a valid email address'
          });
        }

        if (field.type === 'tel') {
          defaultRules.push({
            type: 'phone',
            message: 'Please enter a valid phone number'
          });
        }

        builder.addField(field.name, defaultRules);
      }
    });

    return builder.build();
  }
}

// =============================================================================
// FORM MANAGER (Single Responsibility Principle)
// =============================================================================

/**
 * Generic form manager that handles form state and submission
 */
export class FormManager<T extends Record<string, any>> {
  private form: UseFormReturn<T>;
  private submissionProvider: IFormSubmissionProvider;
  private notificationService: INotificationService;
  private config: IFormConfig;

  constructor(
    config: IFormConfig,
    submissionProvider: IFormSubmissionProvider,
    notificationService: INotificationService,
    defaultValues?: Partial<T>
  ) {
    this.config = config;
    this.submissionProvider = submissionProvider;
    this.notificationService = notificationService;

    const schema = FormValidationBuilder.fromFields(config.fields);
    
    this.form = useForm<T>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues as any
    });
  }

  public getForm(): UseFormReturn<T> {
    return this.form;
  }

  public getConfig(): IFormConfig {
    return this.config;
  }

  public createSubmissionMutation() {
    return useMutation({
      mutationFn: (data: T) => this.handleSubmission(data),
      onSuccess: () => {
        this.notificationService.success(this.config.messages.success);
        this.form.reset();
      },
      onError: (error: Error) => {
        this.notificationService.error(
          error.message || this.config.messages.error
        );
      }
    });
  }

  private async handleSubmission(data: T): Promise<boolean> {
    // Determine submission method based on form type
    const formType = this.detectFormType(data);
    
    switch (formType) {
      case 'contact':
        return this.submissionProvider.submitContact(data as any);
      case 'booking':
        return this.submissionProvider.submitBooking(data as any);
      case 'newsletter':
        return this.submissionProvider.submitNewsletter((data as any).email);
      case 'job':
        return this.submissionProvider.submitJobApplication(data);
      default:
        throw new Error('Unknown form type');
    }
  }

  private detectFormType(data: T): string {
    if ('requestType' in data) return 'contact';
    if ('date' in data && 'time' in data) return 'booking';
    if ('email' in data && Object.keys(data).length === 1) return 'newsletter';
    if ('position' in data) return 'job';
    return 'unknown';
  }
}

// =============================================================================
// FORM FACTORY (Factory Pattern + Dependency Inversion)
// =============================================================================

/**
 * Form factory that creates specific form instances
 */
export class FormFactory {
  constructor(
    private submissionProvider: IFormSubmissionProvider,
    private notificationService: INotificationService
  ) {}

  public createContactForm(): FormManager<ContactFormData> {
    const config: IFormConfig = {
      fields: [
        {
          name: 'fullName',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
          validation: [
            { type: 'required', message: 'Name is required' },
            { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
          ]
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email address',
          required: true,
          validation: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]
        },
        {
          name: 'phone',
          type: 'tel',
          label: 'Phone',
          placeholder: 'Enter your phone number',
          required: true,
          validation: [
            { type: 'required', message: 'Phone is required' },
            { type: 'phone', message: 'Please enter a valid phone number' }
          ]
        },
        {
          name: 'requestType',
          type: 'select',
          label: 'Request Type',
          required: true,
          options: [
            { value: 'Product Enquiry', label: 'Product Enquiry' },
            { value: 'Request for Information', label: 'Request for Information' },
            { value: 'Suggestions', label: 'Suggestions' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Tell us about your project',
          required: true,
          validation: [
            { type: 'required', message: 'Message is required' },
            { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' }
          ]
        }
      ],
      submitButton: {
        text: 'Submit',
        submittingText: 'Submitting...'
      },
      messages: {
        success: 'Your message has been sent successfully! We\'ll get back to you soon.',
        error: 'There was a problem submitting your form. Please try again.'
      }
    };

    const defaultValues: Partial<ContactFormData> = {
      fullName: '',
      email: '',
      phone: '',
      requestType: 'Product Enquiry',
      message: ''
    };

    return new FormManager(config, this.submissionProvider, this.notificationService, defaultValues);
  }

  public createBookingForm(): FormManager<BookingFormData> {
    const config: IFormConfig = {
      fields: [
        {
          name: 'fullName',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email address',
          required: true
        },
        {
          name: 'phone',
          type: 'tel',
          label: 'Phone',
          placeholder: 'Enter your phone number',
          required: true
        },
        {
          name: 'topic',
          type: 'text',
          label: 'Topic',
          placeholder: 'Meeting topic',
          required: true
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          required: true
        },
        {
          name: 'time',
          type: 'time',
          label: 'Time',
          required: true
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Tell us more about what you\'d like to discuss',
          required: false
        }
      ],
      submitButton: {
        text: 'Book Appointment',
        submittingText: 'Booking...'
      },
      messages: {
        success: 'Your appointment has been booked successfully! We\'ll send you a confirmation email.',
        error: 'There was a problem booking your appointment. Please try again.'
      }
    };

    const defaultValues: Partial<BookingFormData> = {
      fullName: '',
      email: '',
      phone: '',
      topic: '',
      date: '',
      time: '',
      message: ''
    };

    return new FormManager(config, this.submissionProvider, this.notificationService, defaultValues);
  }

  public createNewsletterForm(): FormManager<{ email: string }> {
    const config: IFormConfig = {
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email',
          required: true
        }
      ],
      submitButton: {
        text: 'Subscribe',
        submittingText: 'Subscribing...'
      },
      messages: {
        success: 'Thank you for subscribing to our newsletter!',
        error: 'There was a problem subscribing. Please try again.'
      }
    };

    return new FormManager(config, this.submissionProvider, this.notificationService, { email: '' });
  }
}

// =============================================================================
// FORM HOOKS (DRY Principle)
// =============================================================================

/**
 * Generic form hook that eliminates duplication
 */
export function useGenericForm<T extends Record<string, any>>(
  formManager: FormManager<T>
) {
  const form = formManager.getForm();
  const config = formManager.getConfig();
  const mutation = formManager.createSubmissionMutation();

  return {
    form,
    config,
    mutation,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
    reset: form.reset
  };
}

/**
 * Contact form hook
 */
export function useContactForm(
  submissionProvider: IFormSubmissionProvider,
  notificationService: INotificationService
) {
  const factory = new FormFactory(submissionProvider, notificationService);
  const formManager = factory.createContactForm();
  return useGenericForm(formManager);
}

/**
 * Booking form hook
 */
export function useBookingForm(
  submissionProvider: IFormSubmissionProvider,
  notificationService: INotificationService
) {
  const factory = new FormFactory(submissionProvider, notificationService);
  const formManager = factory.createBookingForm();
  return useGenericForm(formManager);
}

/**
 * Newsletter form hook
 */
export function useNewsletterForm(
  submissionProvider: IFormSubmissionProvider,
  notificationService: INotificationService
) {
  const factory = new FormFactory(submissionProvider, notificationService);
  const formManager = factory.createNewsletterForm();
  return useGenericForm(formManager);
}
