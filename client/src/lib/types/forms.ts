// Form-related Types

// Base form interface to reduce duplication
export interface BaseFormData {
  name?: string;
  fullName?: string;
  email: string;
  phone?: string;
  message?: string;
  translationKey?: string;
}

export interface ContactFormData extends BaseFormData {
  fullName: string;
  message: string;
  phone: string;
  requestType: 'Product Enquiry' | 'Request for Information' | 'Suggestions' | 'Other';
  erpNextNote?: string;
  // Add ERPNext specific fields
  erpNextLeadSource?: string;
  erpNextCompany?: string;
  erpNextPreferredContact?: 'email' | 'phone' | 'both';
}

export interface DemoRequestFormData extends BaseFormData {
  fullName: string;
  companyName: string;
  companySize: '1-10' | '11-50' | '51-200' | '200+';
  industry?: string;
  productInterest: string;
  challenges: string;
  decisionTimeframe: 'Immediately' | '1-3 months' | '3-6 months' | 'Not sure';
  consentContact: boolean;
  consentSubscribe?: boolean;
  // Optional metadata fields
  erpNextEventType?: string;
  erpNextDuration?: number;
  erpNextAttendees?: string[];
  erpNextLocation?: string;
  erpNextMeetingType?: 'in-person' | 'virtual' | 'hybrid';
}

export interface DemoRequestFormProps {
  className?: string;
  onSubmit?: (data: DemoRequestFormData) => void;
  defaultValues?: Partial<DemoRequestFormData>;
  successMessage?: string;
  errorMessage?: string;
}

export interface FormField {
  label: string;
  placeholder: string;
  validation?: {
    required?: string;
    invalid?: string;
    minLength?: string;
    maxLength?: string;
  };
}

export interface FormContent {
  title: string;
  description?: string;
  fields: Record<string, FormField>;
  submitButton: string;
  success?: {
    title: string;
    description: string;
  };
  error?: {
    title: string;
    description: string;
  };
}

export interface CareersFormState {
  showExpressionForm: boolean;
  formSubmitted: boolean;
} 
