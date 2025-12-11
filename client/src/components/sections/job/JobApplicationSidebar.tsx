import React from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { getUIText } from '@/lib/fallbacks';
import {
  Send,
  Calendar,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageContent } from '@/lib/types/core';
import { submitJobApplication } from '@/lib/erpnext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobApplicationSidebarProps {
  job: any;
  submitted: boolean;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  pageContent?: PageContent;
}

const JobApplicationSidebar: React.FC<JobApplicationSidebarProps> = ({
  job,
  submitted,
  onSubmit,
  isLoading,
  pageContent,
}) => {
  const { toast } = useToast();

  // Get application content from page content settings
  const applicationContent = pageContent?.sections?.find(s => s.type === 'custom')?.settings?.jobContent?.application;

  // Experience options for the dropdown
  const experienceOptions = [
    'Fresh Graduate/Entry Level',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  // Define the application form schema with dynamic validation messages
  const applicationSchema = z.object({
    fullName: z.string().min(2, applicationContent?.validation?.fullName || getUIText(undefined, 'required', 'forms')),
    email: z.string().email(applicationContent?.validation?.email || getUIText(undefined, 'emailInvalid', 'forms')),
    phone: z.string().min(10, applicationContent?.validation?.phone || getUIText(undefined, 'phoneInvalid', 'forms')),
    yearsOfExperience: z.string().min(1, applicationContent?.validation?.yearsOfExperience || getUIText(undefined, 'required', 'forms')),
    coverLetter: z.string().min(50, applicationContent?.validation?.coverLetter || getUIText(undefined, 'minLength', 'forms').replace('{min}', '50')),
    resume: z.any().optional(),
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: applicationContent?.validation?.agreeToTerms || getUIText(undefined, 'required', 'forms')
    })
  });

  type ApplicationFormValues = z.infer<typeof applicationSchema>;

  // Application form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      yearsOfExperience: '',
      coverLetter: '',
      resume: null,
      agreeToTerms: false,
    }
  });

  // ERPNext job application mutation
  const jobApplicationMutation = useMutation({
    mutationFn: (data: ApplicationFormValues) => submitJobApplication({
      ...data,
      jobTitle: job.title,
      jobId: job.id?.toString()
    }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your job application has been submitted successfully. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
      onSubmit({ success: true });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: error instanceof Error ? error.message : "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ApplicationFormValues) => {
    jobApplicationMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div>
        <div className="sticky top-24">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="space-y-3">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-24">
        <Card>
          <CardContent className="p-6 md:p-8">
            {!submitted ? (
              <>
                <h2 className="text-xl font-bold mb-4">{applicationContent?.applyTitle || getUIText(undefined, 'applyNow', 'buttons')}</h2>
                <p className="text-muted-foreground mb-6">{applicationContent?.applyDescription?.replace('{job.title}', job.title) || `Please fill out the form below to apply for ${job.title}.`}</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder={applicationContent?.placeholders?.fullName || getUIText(undefined, 'fullName', 'forms')} {...field} />
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
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder={applicationContent?.placeholders?.email || getUIText(undefined, 'email', 'forms')} {...field} />
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
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder={applicationContent?.placeholders?.phone || getUIText(undefined, 'phone', 'forms')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience*</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <SelectValue placeholder={applicationContent?.placeholders?.yearsOfExperience || `Select ${getUIText(undefined, 'experience', 'forms')}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {experienceOptions.map((option: string, index: number) => (
                                  <SelectItem key={index} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={applicationContent?.placeholders?.coverLetter || getUIText(undefined, 'message', 'forms')}
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormLabel>Resume/CV</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onChange(e.target.files?.[0] || null);
                              }}
                              {...fieldProps}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground">
                            {applicationContent?.placeholders?.resume || 'Resume/CV (PDF, DOC, DOCX)'}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              {applicationContent?.agreeText || 'I agree to the'} <Link href="/privacy"><span className="text-primary hover:underline">{applicationContent?.privacyPolicy || 'privacy policy'}</span></Link> and <Link href="/terms"><span className="text-primary hover:underline">{applicationContent?.termsOfService || 'terms of service'}</span></Link>.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={jobApplicationMutation.isPending}
                    >
                      {jobApplicationMutation.isPending ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {getUIText(undefined, 'submitting', 'buttons')}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          {applicationContent?.submitText || getUIText(undefined, 'submit', 'buttons')}
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-200">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in joining our team. We'll review your application and get back to you soon.
                </p>
                <Link href="/careers">
                  <Button variant="outline" className="flex items-center mx-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800/30">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Application Deadline
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Applications are being reviewed on a rolling basis. Apply now for early consideration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationSidebar;
