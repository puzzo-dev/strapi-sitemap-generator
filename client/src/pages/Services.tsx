import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { useServices, useTestimonials } from '@/hooks/useStrapiContent';
import { services, testimonials } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types';

const Services: React.FC = () => {
  const { data: apiServices, isLoading: isServicesLoading } = useServices();
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  
  // Use the API data if available, otherwise fall back to local data
  const displayServices = apiServices?.length ? apiServices : services;
  const displayTestimonials = apiTestimonials?.length ? apiTestimonials : testimonials;

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
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
              <span className="h-4 w-4 mr-2">🔧</span>
              Our Services
            </div>
            
            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="gradient-text">Professional Services</span> for<br />Your Business Needs
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Expert solutions tailored to your business requirements. Our team delivers high-quality services designed to help you succeed in today's competitive market.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <GradientButton href="#services" size="lg">
                Explore Services
              </GradientButton>
              <GradientButton href="/contact" variant="outline" size="lg">
                Request Consultation
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <span className="h-4 w-4 mr-2">🛠️</span>
              What We Offer
            </div>
            <h2 className="section-title">Our Specialized Services</h2>
            <p className="section-subtitle">
              We provide comprehensive tech solutions tailored to meet your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              // Loading skeleton for services
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-6"></div>
                  <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6"></div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3"></div>
                </div>
              ))
            ) : (
              displayServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/60 dark:from-[#132f4c] dark:to-[#0a192f]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <span className="h-4 w-4 mr-2">📋</span>
              How We Work
            </div>
            <h2 className="section-title">Our Development Process</h2>
            <p className="section-subtitle">
              We follow a streamlined process to ensure your project is delivered efficiently and with the highest quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Process Step 1 */}
            <div className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 text-white font-bold group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We analyze your requirements and business goals to create a strategic roadmap.
              </p>
            </div>
            
            {/* Process Step 2 */}
            <div className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mb-6 text-white font-bold group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our design team creates prototypes and wireframes based on your requirements.
              </p>
            </div>
            
            {/* Process Step 3 */}
            <div className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-6 text-white font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our developers build your solution using the latest technologies and best practices.
              </p>
            </div>
            
            {/* Process Step 4 */}
            <div className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6 text-white font-bold group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                After thorough testing, we deliver your solution and provide ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <span className="h-4 w-4 mr-2">💬</span>
              Client Feedback
            </div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Our success is measured by the satisfaction and achievements of those we serve
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading skeleton for testimonials
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30 animate-pulse">
                  <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-blue-100 dark:bg-blue-800/50 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mr-4"></div>
                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            ) : (
              displayTestimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
              <span className="h-4 w-4 mr-2">✨</span>
              Get Started
            </div>
            <h2 className="section-title">Ready to elevate your business?</h2>
            <p className="section-subtitle mb-8">
              Contact us today to discuss how our services can help your business grow and succeed in the digital world.
            </p>
            <GradientButton href="/contact" size="lg">
              Contact Us Now
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
