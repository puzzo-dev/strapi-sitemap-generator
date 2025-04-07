import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GradientButton from '@/components/ui/GradientButton';
import ContactForm from '@/components/ui/ContactForm';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { testimonials } from '@/lib/data';
import { TestimonialProps } from '@/lib/types';

const Contact: React.FC = () => {
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useQuery<TestimonialProps[]>({
    queryKey: ['/api/testimonials'],
    initialData: testimonials,
  });

  return (
    <>
      {/* Contact Header */}
      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get in touch with us
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Let's connect and discuss how we can help you achieve your business objectives.
              </p>
              <a href="#contact-form" className="inline-block">
                <GradientButton>
                  Get Started <i className="fas fa-arrow-right ml-2"></i>
                </GradientButton>
              </a>
              
              <div className="aspect-[16/9] max-w-lg mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Business professionals discussing" 
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div id="contact-form">
                <ContactForm />
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800">
                  <h4 className="text-lg font-medium mb-4">Address</h4>
                  <p className="text-gray-300">
                    5 Adams Street, Off Nnamdi Rd,<br />
                    Surulere, Lagos, Nigeria, 101283
                  </p>
                  <div className="mt-4 h-32 bg-gray-800 rounded-lg overflow-hidden">
                    {/* Map would go here - this would be implemented with a real mapping solution */}
                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                      <span>Map Location</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800">
                  <h4 className="text-lg font-medium mb-4">Contact Info</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center mr-4">
                        <i className="fas fa-phone-alt text-primary-light"></i>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white">+234 123 456 7890</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center mr-4">
                        <i className="fas fa-envelope text-primary-light"></i>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">contact@i-varse.com</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center hover:bg-primary-light/30 transition-colors">
                        <i className="fab fa-twitter text-primary-light"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center hover:bg-primary-light/30 transition-colors">
                        <i className="fab fa-facebook-f text-primary-light"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center hover:bg-primary-light/30 transition-colors">
                        <i className="fab fa-linkedin-in text-primary-light"></i>
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
              apiTestimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our services and how we can help your business.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">What services does I-VARSE provide?</h3>
              <p className="text-gray-400">
                I-VARSE provides a range of digital services including web development, mobile app development, cloud infrastructure management, API programming & integration, SEO optimization, and content writing.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">How long does it take to complete a project?</h3>
              <p className="text-gray-400">
                Project timelines vary depending on scope and complexity. A typical website might take 4-6 weeks, while more complex applications could take several months. We'll provide a detailed timeline during our initial consultation.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-secondary-dark rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Do you provide ongoing support after project completion?</h3>
              <p className="text-gray-400">
                Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally after launch. Our team is always available to address any issues or implement updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
