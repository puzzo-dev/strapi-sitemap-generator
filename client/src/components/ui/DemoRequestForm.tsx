// DemoRequestForm.tsx
// This file was missing. Copying the implementation from BookingForm and renaming the component.

import React from 'react';
import { DemoRequestFormProps } from "@/lib/types";
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
import { submitDemoRequest } from '@/lib/erpnext';
import { useUIText } from '@/hooks/useContent';

const demoRequestFormSchema = z.object({
    fullName: z.string().min(2, 'Full Name is required'),
    email: z.string().email('Valid email required'),
    phone: z.string().optional(),
    companyName: z.string().min(2, 'Company Name is required'),
    companySize: z.enum(['1-10', '11-50', '51-200', '200+']),
    industry: z.string().optional(),
    productInterest: z.string().min(1, 'Select a product'),
    challenges: z.string().min(2, 'Describe your challenges'),
    decisionTimeframe: z.enum(['Immediately', '1-3 months', '3-6 months', 'Not sure']),
    // Removed demoDate and demoTime
    demoMethod: z.enum(['Live Walkthrough', 'Recorded Demo', 'Full Trial Access', 'Technical Deep Dive']),
    message: z.string().optional(),
    consentContact: z.boolean().refine(val => val, { message: 'Consent required' }),
    consentSubscribe: z.boolean().optional(),
});

type DemoRequestFormData = z.infer<typeof demoRequestFormSchema>;


const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '200+',
];
const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Other'
];
const products = [
    'Product A', 'Product B', 'Product C', 'Product D'
];
const demoMethods = [
    'Live Walkthrough', 'Recorded Demo', 'Full Trial Access', 'Technical Deep Dive'
];
const decisionTimeframes = [
    'Immediately', '1-3 months', '3-6 months', 'Not sure'
];

const DemoRequestForm: React.FC<DemoRequestFormProps> = ({ className }) => {
    const form = useForm<DemoRequestFormData>({
        resolver: zodResolver(demoRequestFormSchema),
    });
    const { toast } = useToast();

    const demoRequestMutation = useMutation({
        mutationFn: submitDemoRequest,
        onSuccess: () => {
            toast({ title: 'Demo request submitted successfully!', description: '', });
            form.reset();
        },
        onError: () => {
            toast({ title: 'Failed to submit demo request. Please try again.', description: '', });
        },
    });

    function onSubmit(data: DemoRequestFormData) {
        demoRequestMutation.mutate(data);
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Request a Demo</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* 1. Personal Information */}
                    <FormField name="fullName" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Your Full Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="email" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Your Email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="phone" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Your Phone Number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* 2. Company Information */}
                    <FormField name="companyName" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Your Company Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="companySize" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Size</FormLabel>
                            <FormControl>
                                <select {...field} className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    {companySizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="industry" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                                <select {...field} className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <option value="">Select Industry (optional)</option>
                                    {industries.map(ind => (
                                        <option key={ind} value={ind}>{ind}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* 3. Product Interest */}
                    <FormField name="productInterest" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Interest</FormLabel>
                            <FormControl>
                                <select {...field} className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <option value="">Select Product</option>
                                    {products.map(prod => (
                                        <option key={prod} value={prod}>{prod}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="challenges" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>What challenges are you looking to solve?</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Describe your challenges" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="decisionTimeframe" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>How soon do you plan to make a decision?</FormLabel>
                            <FormControl>
                                <select {...field} className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    {decisionTimeframes.map(tf => (
                                        <option key={tf} value={tf}>{tf}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* 4. Demo Method */}
                    <FormField name="demoMethod" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferred Demo Method</FormLabel>
                            <FormControl>
                                <select {...field} className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    {demoMethods.map(method => (
                                        <option key={method} value={method}>{method}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* 5. Additional Notes */}
                    <FormField name="message" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message / Additional Requirements</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Describe any additional requirements (optional)" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* 6. Consent */}
                    <FormField name="consentContact" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                    I agree to be contacted regarding this demo request.
                                </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="consentSubscribe" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                    Subscribe me to product updates and newsletters. (Optional)
                                </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button type="submit" disabled={demoRequestMutation.isPending}>
                        {demoRequestMutation.isPending ? 'Submitting...' : 'Request Demo'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default DemoRequestForm;
