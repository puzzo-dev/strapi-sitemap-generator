import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { getUIText } from '@/lib/fallbacks';
import {
    Send,
    CheckCircle,
    X,
    User,
    Mail,
    Phone,
    Briefcase,
    FileText,
    Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { submitJobApplication } from '@/lib/strapi';

interface ExpressionOfInterestFormProps {
    isVisible: boolean;
    onClose: () => void;
}

const ExpressionOfInterestForm: React.FC<ExpressionOfInterestFormProps> = ({
    isVisible,
    onClose
}) => {
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const formRef = React.useRef<HTMLDivElement>(null);

    // Scroll to form when it becomes visible
    React.useEffect(() => {
        if (isVisible && formRef.current) {
            const timer = setTimeout(() => {
                formRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }, 100); // Small delay to allow animation to start

            return () => clearTimeout(timer);
        }
    }, [isVisible]);    // Define the expression of interest form schema
    const expressionSchema = z.object({
        fullName: z.string().min(2, 'Full name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email address'),
        phone: z.string().min(10, 'Phone number must be at least 10 characters'),
        yearsOfExperience: z.string().min(1, 'Please select your experience level'),
        areasOfInterest: z.string().min(10, 'Please describe your areas of interest (minimum 10 characters)'),
        coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
        resume: z.any().optional(),
        agreeToTerms: z.boolean().refine(val => val === true, {
            message: 'You must agree to the terms and conditions'
        })
    });

    type ExpressionFormValues = z.infer<typeof expressionSchema>;

    // Form setup
    const form = useForm<ExpressionFormValues>({
        resolver: zodResolver(expressionSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            yearsOfExperience: '',
            areasOfInterest: '',
            coverLetter: '',
            resume: null,
            agreeToTerms: false,
        }
    });

    // Experience options
    const experienceOptions = [
        'Fresh Graduate/Entry Level',
        '1-2 years',
        '3-5 years',
        '6-10 years',
        '10+ years'
    ];

    // Submit mutation
    const submitMutation = useMutation({
        mutationFn: (data: ExpressionFormValues) => submitJobApplication({
            ...data,
            jobTitle: 'Expression of Interest - General Application',
            jobId: 'EOI'
        }),
        onSuccess: () => {
            setIsSubmitted(true);
            toast({
                title: "Expression of Interest Submitted!",
                description: "Thank you for your interest in joining our team. We'll review your submission and get back to you soon.",
                variant: "default",
            });
            form.reset();
        },
        onError: (error) => {
            toast({
                title: "Submission Failed",
                description: error instanceof Error ? error.message : "There was a problem submitting your expression of interest. Please try again.",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (data: ExpressionFormValues) => {
        submitMutation.mutate(data);
    };

    const handleClose = () => {
        if (!submitMutation.isPending) {
            setIsSubmitted(false);
            form.reset();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={formRef}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="container-custom py-8 max-w-7xl">
                        <Card className="max-w-4xl mx-auto shadow-xl border-blue-200 dark:border-blue-800">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-600 text-white rounded-lg">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                            Expression of Interest Form
                                        </CardTitle>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClose}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        disabled={submitMutation.isPending}
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <p className="text-blue-700 dark:text-blue-300 mt-2">
                                    Don't see the perfect role? Tell us about yourself and we'll keep you in mind for future opportunities.
                                </p>
                            </CardHeader>

                            <CardContent className="p-6 md:p-8">
                                {!isSubmitted ? (
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Personal Information */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                                        <User className="h-5 w-5 mr-2 text-blue-600" />
                                                        Personal Information
                                                    </h3>

                                                    <FormField
                                                        control={form.control}
                                                        name="fullName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="flex items-center">
                                                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                                                    Full Name*
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter your full name" {...field} />
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
                                                                <FormLabel className="flex items-center">
                                                                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                                                    Email Address*
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input type="email" placeholder="your.email@example.com" {...field} />
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
                                                                <FormLabel className="flex items-center">
                                                                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                                                    Phone Number*
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="+234 xxx xxx xxxx" {...field} />
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
                                                                <FormLabel className="flex items-center">
                                                                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                                                                    Years of Experience*
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select your experience level" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {experienceOptions.map((option, index) => (
                                                                                <SelectItem key={index} value={option}>
                                                                                    {option}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Professional Information */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                                                        Professional Information
                                                    </h3>

                                                    <FormField
                                                        control={form.control}
                                                        name="areasOfInterest"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Areas of Interest*</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Tell us about your areas of interest, skills, or specific roles you'd like to explore..."
                                                                        className="min-h-24"
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
                                                                <FormLabel className="flex items-center">
                                                                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                                                                    Resume/CV (Optional)
                                                                </FormLabel>
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
                                                                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                                                                </div>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            {/* Cover Letter */}
                                            <FormField
                                                control={form.control}
                                                name="coverLetter"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tell Us About Yourself*</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Share your background, achievements, and what makes you passionate about technology and innovation. Why would you like to work with I-VARSE Technologies?"
                                                                className="min-h-32"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Terms Agreement */}
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
                                                            <FormLabel className="text-sm">
                                                                I agree to I-VARSE Technologies storing and processing my personal data for recruitment purposes in accordance with the{' '}
                                                                <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                                                    Privacy Policy
                                                                </a>{' '}
                                                                and{' '}
                                                                <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                                                    Terms of Service
                                                                </a>
                                                                .
                                                            </FormLabel>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit Button */}
                                            <div className="flex justify-end space-x-4 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={handleClose}
                                                    disabled={submitMutation.isPending}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                                    disabled={submitMutation.isPending}
                                                >
                                                    {submitMutation.isPending ? (
                                                        <span className="flex items-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Submitting...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center">
                                                            <Send className="mr-2 h-4 w-4" />
                                                            Submit Expression of Interest
                                                        </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle className="mx-auto h-20 w-20 text-green-600 mb-6" />
                                        <h3 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-100">
                                            Expression of Interest Submitted!
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                                            Thank you for your interest in joining I-VARSE Technologies. Our HR team will review your submission and contact you if suitable opportunities arise.
                                        </p>
                                        <Button
                                            onClick={handleClose}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        >
                                            Close
                                        </Button>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExpressionOfInterestForm;
