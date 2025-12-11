// DemoRequestForm.tsx
// This file was missing. Copying the implementation from BookingForm and renaming the component.

import React from 'react';
import { DemoRequestFormProps, DemoRequestFormData } from "@/lib/types";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { demoRequestSchema } from '@/lib/schemas';


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
    'OpsCloud', 'OpsCloud HMS', 'OpsCloud IOT', 'OpsCloud Education', 'OpsCloud Commerce'
];
const decisionTimeframes = [
    'Immediately', '1-3 months', '3-6 months', 'Not sure'
];

const DemoRequestForm: React.FC<DemoRequestFormProps> = ({ className }) => {
    const form = useForm<DemoRequestFormData>({
        resolver: zodResolver(demoRequestSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            companyName: '',
            companySize: '' as DemoRequestFormData['companySize'],
            industry: '',
            productInterest: '',
            challenges: '',
            decisionTimeframe: '' as DemoRequestFormData['decisionTimeframe'],
            message: '',
            consentContact: false,
            consentSubscribe: false,
        },
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
                    {/* Side-by-side fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        <option value="">Select company size</option>
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
                        <FormField name="decisionTimeframe" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>How soon do you plan to make a decision?</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <option value="">Select timeframe</option>
                                    {decisionTimeframes.map(tf => (
                                        <option key={tf} value={tf}>{tf}</option>
                                    ))}
                                </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="challenges" control={form.control} render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>What challenges are you looking to solve?</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Describe your challenges" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <FormField name="message" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message / Additional Requirements</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Describe any additional requirements (optional)" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

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
