// Form-related Types

// Base form interface to reduce duplication
export interface BaseFormData {
  name?: string;
  fullName?: string;
  email: string;
  phone?: string;
  message: string;
  translationKey?: string;
}

export interface ContactFormData extends BaseFormData {
  fullName: string;
  phone: string;
  requestType: 'Product Enquiry' | 'Request for Information' | 'Suggestions' | 'Other';
  erpNextNote?: string;
  // Add ERPNext specific fields
  erpNextLeadSource?: string;
  erpNextCompany?: string;
  erpNextPreferredContact?: 'email' | 'phone' | 'both';
}

export interface DemoRequestFormData extends BaseFormData {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  topic?: string;
  companyName?: string;
  companySize?: string;
  industry?: string;
  productInterest?: string;
  challenges?: string;
  decisionTimeframe?: string;
  demoMethod?: string;
  consentContact?: boolean;
  consentSubscribe?: boolean;
  // Add ERPNext specific fields
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
