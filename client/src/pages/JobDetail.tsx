import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Send, 
  Calendar,
  Building,
  Layers,
  Award,
  DollarSign,
  CheckCircle,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useJobById } from '@/hooks/useStrapiContent';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import GradientButton from '@/components/ui/GradientButton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { generateJobPostingSchema } from '@/components/seo/StructuredData';
import MetaTags from '@/components/seo/MetaTags';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { jobListings } from '@/lib/data';

// Define the application form schema
const applicationSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  coverLetter: z.string().min(50, { message: 'Cover letter must be at least 50 characters' }),
  resume: z.any().optional(),
  yearsOfExperience: z.string().min(1, { message: 'Please select years of experience' }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' })
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const jobId = id ? parseInt(id, 10) : -1;
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  
  // Fetch job details
  const { data: apiJob, isLoading, error } = useJobById(jobId);
  
  // Application form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
      yearsOfExperience: '',
      agreeToTerms: false
    }
  });
  
  // Find fallback job data from the static data if API fails
  const fallbackJob = jobListings.find(job => job.id === jobId);
  
  // Use API data if available, otherwise use fallback
  const job = apiJob || fallbackJob;
  
  // Handle form submission
  const onSubmit = (data: ApplicationFormValues) => {
    console.log('Form submitted:', data);
    // In a real app, send this data to your backend
    setSubmitted(true);
    
    // Scroll to top to show the success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Generate structured data for SEO
  const jobSchema = job ? generateJobPostingSchema({
    title: job.title,
    description: job.description,
    datePosted: new Date().toISOString().split('T')[0],
    validThrough: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : 
                    job.type === 'Part-time' ? 'PART_TIME' : 
                    job.type === 'Contract' ? 'CONTRACTOR' : 'OTHER',
    hiringOrganization: 'I-Varse Technologies',
    jobLocation: job.location,
  }) : undefined;
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-64 w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render error state or use dummy data
  if (error || !job) {
    // If the id parameter exists but no job is found, create dummy job data
    if (id) {
      // Create a dummy job based on ID
      const dummyJob = {
        id: jobId,
        title: jobId === 1 ? "Senior Full Stack Developer" : 
               jobId === 2 ? "UX/UI Designer" : 
               jobId === 3 ? "DevOps Engineer" :
               jobId === 4 ? "Product Manager" :
               jobId === 5 ? "Data Scientist" :
               "Technical Position",
        department: "Engineering",
        location: "Lagos, Nigeria",
        type: "Full-time",
        description: "We're looking for an experienced professional to join our growing team and help us build cutting-edge solutions for our clients.",
        responsibilities: [
          "Design and implement scalable solutions",
          "Collaborate with cross-functional teams",
          "Mentor junior team members",
          "Participate in code reviews and technical discussions",
          "Stay updated with the latest industry trends and technologies"
        ],
        requirements: [
          "5+ years of relevant experience",
          "Strong proficiency in required technical skills",
          "Excellent problem-solving abilities",
          "Good communication and teamwork skills",
          "Bachelor's degree in Computer Science or related field (or equivalent experience)"
        ],
        benefits: [
          "Competitive salary and benefits package",
          "Remote work options",
          "Professional development opportunities",
          "Collaborative and innovative work environment",
          "Opportunity to work on challenging and impactful projects"
        ],
        qualifications: [
          "Experience with Agile development methodologies",
          "Knowledge of best practices and design patterns",
          "Ability to work independently and as part of a team",
          "Strong attention to detail"
        ],
        salary: "Competitive"
      };
      
      return renderJobDetail(dummyJob);
    }
    
    // If no id parameter or job could be found, show error
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>
                {t('careers.jobNotFound')}
              </AlertDescription>
            </Alert>
            <Link href="/careers">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('careers.backToCareers')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Main render function for job detail
  return renderJobDetail(job);
  
  // Helper function to render job detail with given job data
  function renderJobDetail(job: any) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        {/* SEO metadata */}
        <MetaTags
          title={`${job.title} | Career Opportunities | I-Varse Technologies`}
          description={`Apply for the ${job.title} position at I-Varse Technologies. ${job.description.substring(0, 120)}...`}
          keywords={['career', 'job', 'opportunity', job.title, job.department, 'I-Varse']}
          structuredData={jobSchema}
          ogType="website"
        />
        
        {/* Header section */}
        <div className="bg-gradient-to-br from-primary/95 via-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <Link href="/careers">
              <div className="inline-flex items-center text-white/90 hover:text-white mb-10 group/back transition-colors">
                <ArrowLeft className="mr-2 group-hover/back:-translate-x-1 transition-transform" /> 
                <span className="font-medium">{t('careers.backToCareers')}</span>
              </div>
            </Link>
            
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerChildren(0.1)}
              className="max-w-4xl"
            >
              {submitted && (
                <motion.div
                  variants={fadeInUp(20, 0.7)}
                  className="bg-green-100 border border-green-300 text-green-800 p-4 mb-8 rounded-lg"
                >
                  <div className="flex gap-2 items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-lg">Application Submitted!</h3>
                  </div>
                  <p>Thank you for your interest in the {job.title} position. Our team will review your application and contact you soon.</p>
                </motion.div>
              )}
              
              <motion.div variants={fadeInUp(20, 0.7)} className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/20 px-3 py-1 text-sm font-medium text-white border-white/20">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.department}
                </div>
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/20 px-3 py-1 text-sm font-medium text-white border-white/20">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.type}
                </div>
              </motion.div>
              
              <motion.h1 variants={fadeInUp(20, 0.7)} className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                {job.title}
              </motion.h1>
              
              <motion.div variants={fadeInUp(20, 0.7, 0.1)} className="flex items-center text-lg mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location}</span>
              </motion.div>
              
              <motion.p variants={fadeInUp(20, 0.7, 0.2)} className="text-xl opacity-90">
                {job.description}
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <Layers className="mr-2 h-5 w-5" />
                      Responsibilities
                    </h2>
                    <Separator className="mb-4" />
                    <ul className="space-y-3">
                      {job.responsibilities?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mb-8">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <Award className="mr-2 h-5 w-5" />
                      Requirements
                    </h2>
                    <Separator className="mb-4" />
                    <ul className="space-y-3">
                      {job.requirements?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {job.qualifications && (
                  <Card className="mb-8">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <Building className="mr-2 h-5 w-5" />
                        Qualifications
                      </h2>
                      <Separator className="mb-4" />
                      <ul className="space-y-3">
                        {job.qualifications?.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {job.benefits && (
                  <Card className="mb-8">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Benefits
                      </h2>
                      <Separator className="mb-4" />
                      <ul className="space-y-3">
                        {job.benefits?.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Application sidebar */}
              <div>
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      {!submitted ? (
                        <>
                          <h2 className="text-2xl font-bold mb-4">Apply for this position</h2>
                          <p className="text-muted-foreground mb-6">Fill out this form to apply for the {job.title} position.</p>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name*</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your full name" {...field} />
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
                                      <Input placeholder="your.email@example.com" {...field} />
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
                                      <Input placeholder="Your phone number" {...field} />
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
                                      <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        {...field}
                                      >
                                        <option value="">Select years of experience</option>
                                        <option value="0-1">0-1 years</option>
                                        <option value="1-3">1-3 years</option>
                                        <option value="3-5">3-5 years</option>
                                        <option value="5-10">5-10 years</option>
                                        <option value="10+">10+ years</option>
                                      </select>
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
                                        placeholder="Tell us why you're interested in this position and why you'd be a great fit."
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
                                        onChange={(e) => {
                                          onChange(e.target.files?.[0] || null);
                                        }}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                    <div className="text-xs text-muted-foreground">
                                      Upload your resume (PDF, DOC, or DOCX)
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
                                        I agree to the <Link href="/privacy"><span className="text-primary hover:underline">privacy policy</span></Link> and <Link href="/terms"><span className="text-primary hover:underline">terms of service</span></Link>.
                                      </FormLabel>
                                      <FormMessage />
                                    </div>
                                  </FormItem>
                                )}
                              />
                              
                              <Button type="submit" className="w-full" size="lg">
                                <Send className="mr-2 h-4 w-4" /> Submit Application
                              </Button>
                            </form>
                          </Form>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default JobDetail;