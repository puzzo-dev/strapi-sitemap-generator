import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import GradientButton from '@/components/ui/GradientButton';
import ContactForm from '@/components/ui/ContactForm';
import BookingForm from '@/components/ui/BookingForm';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { testimonials } from '@/lib/data';
import { TestimonialProps } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getPageContent } from '@/lib/strapi';
import { usePageContent, useSiteConfig } from '@/hooks/useStrapiContent';

const Contact: React.FC = () => {
  const [formType, setFormType] = useState<'contact' | 'booking'>('contact');

  // Fetch testimonials data
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useQuery<TestimonialProps[]>({
    queryKey: ['/api/testimonials'],
    initialData: testimonials,
  });

  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('contact');

  // Fetch site configuration
  const { data: siteConfig } = useSiteConfig();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />

          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              {isPageLoading ? (
                <>
                  <div className="h-12 bg-gray-700 rounded mb-6 w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded mb-8 w-5/6 animate-pulse"></div>
                  <div className="h-12 bg-gray-700 rounded w-40 animate-pulse"></div>
                  <div className="aspect-[16/9] max-w-lg mt-12 bg-gray-700 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                    <span className="h-4 w-4 mr-2">✉️</span>
                    Contact Us
                  </div>

                  <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="gradient-text">Get in touch</span> with<br />our team
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up max-w-lg" style={{ animationDelay: '0.4s' }}>
                    {pageContent?.sections?.find(s => s.type === 'hero')?.subtitle ||
                      'Let\'s connect and discuss how we can help you achieve your business objectives.'}
                  </p>

                  <a href="#contact-form" className="inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <GradientButton size="lg">
                      {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.buttonText || 'Get Started'}
                      <i className="fas fa-arrow-right ml-2"></i>
                    </GradientButton>
                  </a>

                  <div className="aspect-[16/9] max-w-lg mt-12">
                    <img
                      src={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.image ||
                        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                      alt="Business professionals discussing"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="w-full lg:w-1/2">
              <div className="mb-6 flex space-x-4">
                <Button
                  variant={formType === 'contact' ? 'default' : 'outline'}
                  className={formType === 'contact' ? 'gradient-bg' : ''}
                  onClick={() => setFormType('contact')}
                >
                  Contact Us
                </Button>
                <Button
                  variant={formType === 'booking' ? 'default' : 'outline'}
                  className={formType === 'booking' ? 'gradient-bg' : ''}
                  onClick={() => setFormType('booking')}
                >
                  Book Appointment
                </Button>
              </div>

              <div id="contact-form">
                {formType === 'contact' ? (
                  <ContactForm />
                ) : (
                  <BookingForm />
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Address</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {siteConfig?.contactAddress || '4 Adana Street, Off Tejuosho Rd,\nSurulere, Lagos, Nigeria, 101283'}
                  </p>
                  <div className="mt-4 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {/* Map would go here - this would be implemented with a real mapping solution */}
                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                      <span>Map Location</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Contact Info</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                        <i className="fas fa-phone-alt text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
                        <p className="text-gray-900 dark:text-white">{siteConfig?.contactPhone || '+234 123 456 7890'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                        <i className="fas fa-envelope text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                        <p className="text-gray-900 dark:text-white">{siteConfig?.contactEmail || 'contact@itechnologies.ng'}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <i className="fab fa-twitter text-blue-600 dark:text-blue-400"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <i className="fab fa-facebook-f text-blue-600 dark:text-blue-400"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                        <i className="fab fa-linkedin-in text-blue-600 dark:text-blue-400"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-blue-500 dark:bg-blue-600 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              {pageContent?.sections?.find(s => s.type === 'testimonials')?.title || 'TESTIMONIALS'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {pageContent?.sections?.find(s => s.type === 'testimonials')?.subtitle ||
                'See what our clients have to say about their experience working with us.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading skeleton for testimonials
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-6 w-4/6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 mr-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            ) : (
              // If there are testimonials in the page content, use those, otherwise fall back to API testimonials
              ((pageContent?.sections?.find(s => s.type === 'testimonials')?.items?.length) ?
                (pageContent?.sections?.find(s => s.type === 'testimonials')?.items || [])
                : (apiTestimonials || [])
              ).map((testimonial: any) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-[#0a1929] py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute bottom-40 left-40 w-60 h-60 rounded-full bg-blue-600 dark:bg-blue-700 blur-3xl"></div>
          <div className="absolute top-40 right-40 w-80 h-80 rounded-full bg-blue-500 dark:bg-blue-600 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {pageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('FAQ'))?.title || 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {pageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('FAQ'))?.subtitle ||
                'Find answers to common questions about our services and how we can help your business.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {isPageLoading ? (
              // Loading skeleton for FAQs
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              ))
            ) : (
              // Check if there are FAQ items in the page content
              pageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('FAQ'))?.items ? (
                // Map through FAQ items from Strapi
                pageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('FAQ'))?.items?.map((faq: any, index: number) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))
              ) : (
                // Fallback FAQ items
                <>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">What services does I-VARSE provide?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      I-VARSE provides a range of digital services including web development, mobile app development, cloud infrastructure management, API programming & integration, SEO optimization, and content writing.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">How long does it take to complete a project?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Project timelines vary depending on scope and complexity. A typical website might take 4-6 weeks, while more complex applications could take several months. We'll provide a detailed timeline during our initial consultation.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Do you provide ongoing support after project completion?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally after launch. Our team is always available to address any issues or implement updates.
                    </p>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
