import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { services, testimonials, clientLogos } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types';

const Home: React.FC = () => {
  const { data: apiServices, isLoading: isServicesLoading } = useQuery<ServiceProps[]>({
    queryKey: ['/api/services'],
    initialData: services,
  });

  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useQuery<TestimonialProps[]>({
    queryKey: ['/api/testimonials'],
    initialData: testimonials,
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary pt-16 pb-24">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span>Top rated web</span><br />
                <span>dev company</span><br />
                <span className="gradient-text">in Lagos, Nigeria</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-lg">
                Embark on a successful innovative journey, we're dedicated to elevating your business experience.
              </p>
              <div className="pt-4 flex space-x-4">
                <GradientButton href="/services">
                  Get Started
                </GradientButton>
                <GradientButton href="/#about" variant="outline" className="border-primary-light text-primary-light hover:bg-primary-light/10 bg-transparent">
                  Learn More
                </GradientButton>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Teams collaborating on digital solutions" 
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-primary rounded-lg blur-xl opacity-40"></div>
                <div className="absolute -top-3 -left-3 w-24 h-24 bg-gradient-primary rounded-lg blur-xl opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Section */}
        <div className="container-custom mt-24">
          <div className="relative rounded-xl overflow-hidden aspect-video max-w-4xl mx-auto bg-secondary-light border border-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="z-10 w-20 h-20 rounded-full gradient-bg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                <i className="fas fa-play text-white text-2xl"></i>
              </div>
              <div className="absolute inset-0 bg-black/50"></div>
              <img 
                src="https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                alt="Video thumbnail" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* About Us Section */}
        <div id="about" className="container-custom mt-24">
          <div className="bg-secondary-light rounded-xl p-8 max-w-4xl mx-auto border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">ABOUT US</h2>
            <p className="text-gray-300 mb-6">
              I-VARSE is a leading tech company specializing in web development, cloud infrastructure, mobile applications, and digital marketing solutions. With a team of experienced professionals, we are dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.
            </p>
            <a href="/services" className="text-primary-light hover:underline flex items-center">
              Learn more about us <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
        
        {/* Client Logos */}
        <div className="container-custom mt-24">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src={logo.image} alt={logo.name} className="h-8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              // Loading skeleton for services
              Array(3).fill(0).map((_, index) => (
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
              apiServices.slice(0, 5).map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
            
            <div className="flex items-center justify-center p-8">
              <a href="/services" className="text-primary-light hover:underline flex items-center">
                Click to Read More <i className="fas fa-arrow-right ml-2"></i>
              </a>
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

      {/* Articles CTA */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 gradient-bg rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">READ AMAZING ARTICLES</h3>
              <p className="text-white/90 mb-6">
                Stay updated with the latest trends in technology and business. Our blog features insightful articles to help you navigate the digital landscape.
              </p>
              <button className="px-6 py-3 rounded-lg bg-white text-primary-dark font-medium hover:bg-opacity-90 transition-opacity">
                Read More
              </button>
            </div>
            
            <div className="p-8 bg-secondary-light rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-300 mb-6">
                Ready to take your business to the next level? Get in touch with our team of experts and discover how we can help you achieve your goals.
              </p>
              <GradientButton href="/contact">
                Get Started
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
