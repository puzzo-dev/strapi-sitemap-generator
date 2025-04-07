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
      {/* Header Section */}
      <section className="bg-secondary-dark py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Welcome to the realm of innovation</h2>
            <p className="section-subtitle">
              Embark on a successful innovative journey, we're dedicated to elevating your business experience.
            </p>
            <div className="mt-8">
              <GradientButton href="/contact">
                Get Started
              </GradientButton>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              // Loading skeleton for services
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-secondary rounded-xl p-8 border border-gray-800 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mb-6"></div>
                  <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded mb-6 w-4/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
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
      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Development Process</h2>
            <p className="section-subtitle">
              We follow a streamlined process to ensure your project is delivered efficiently and with the highest quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Process Step 1 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800 relative">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-6 text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Discovery</h3>
              <p className="text-gray-400">
                We analyze your requirements and business goals to create a strategic roadmap.
              </p>
            </div>
            
            {/* Process Step 2 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800 relative">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-6 text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Design</h3>
              <p className="text-gray-400">
                Our design team creates prototypes and wireframes based on your requirements.
              </p>
            </div>
            
            {/* Process Step 3 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800 relative">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-6 text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Development</h3>
              <p className="text-gray-400">
                Our developers build your solution using the latest technologies and best practices.
              </p>
            </div>
            
            {/* Process Step 4 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800 relative">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-6 text-white font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Delivery</h3>
              <p className="text-gray-400">
                After thorough testing, we deliver your solution and provide ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary-light py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">TESTIMONIALS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading skeleton for testimonials
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-secondary rounded-xl p-6 border border-gray-800 animate-pulse">
                  <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded mb-6 w-4/6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
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
      <section className="bg-secondary py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
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
