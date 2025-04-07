import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { services, testimonials, clientLogos } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types';

// Import icons
import { PlayCircle, ArrowRight, ChevronRight, Info as InfoIcon } from 'lucide-react';

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
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-8 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30 animate-pulse-slow" />
          
          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
          <div className="hidden md:block absolute top-1/3 right-20 w-40 h-16 border border-blue-200 dark:border-blue-800/50 rounded-lg -rotate-12"></div>
          
          {/* Circuit-like patterns */}
          <svg className="absolute bottom-10 left-10 w-40 h-40 text-blue-200/30 dark:text-blue-800/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 H40 M60 50 H90 M50 10 V40 M50 60 V90" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <circle cx="50" cy="10" r="2" fill="currentColor" />
            <circle cx="50" cy="90" r="2" fill="currentColor" />
            <circle cx="10" cy="50" r="2" fill="currentColor" />
            <circle cx="90" cy="50" r="2" fill="currentColor" />
          </svg>
          
          <svg className="absolute top-20 right-[10%] w-32 h-32 text-blue-200/20 dark:text-blue-800/10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
            <path d="M25 25 L75 75 M75 25 L25 75" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-8 md:pt-16 lg:py-16">
            <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 animate-slide-in-right">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                Premium Tech Solutions
              </div>
              
              <h1 className="heading-xl">
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Top rated web</span>
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>dev company</span>
                <span className="gradient-text font-extrabold animate-fade-in-up" style={{ animationDelay: '0.6s' }}>in Lagos, Nigeria</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                Embark on a successful innovative journey with cutting-edge solutions for your business. We're dedicated to elevating your digital experience.
              </p>
              
              <div className="pt-8 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <GradientButton href="/services" size="lg" endIcon={<ChevronRight />} className="animate-bounce-subtle">
                  Get Started
                </GradientButton>
                <GradientButton href="/#about" variant="outline" size="lg" className="animate-pulse-light">
                  Learn More
                </GradientButton>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative w-full max-w-lg">
                {/* Glowing background effect */}
                <div className="animate-pulse-slower absolute -bottom-4 -right-4 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-900/20"></div>
                <div className="animate-pulse-slow absolute -top-4 -left-4 h-48 w-48 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-900/10"></div>
                
                {/* Tech border frame */}
                <div className="absolute inset-0 border-2 border-blue-200/50 dark:border-blue-700/30 rounded-2xl -m-2 z-0"></div>
                <div className="absolute inset-0 border border-blue-300/70 dark:border-blue-600/30 rounded-xl rotate-3 z-0"></div>
                
                {/* Slideshow container */}
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl transition-all duration-700 hover:shadow-blue-500/30 group hover:scale-[1.02] border border-blue-200 dark:border-blue-800/50 h-full aspect-[4/3]">
                  {/* Image 1: Web Development */}
                  <div className="absolute inset-0 animate-slideshow" style={{ animationDelay: '0s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Professional working with digital solutions" 
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500 to-blue-600 text-white px-4 py-1 text-sm font-medium">
                      Web Development
                    </div>
                  </div>
                  
                  {/* Image 2: Mobile Apps */}
                  <div className="absolute inset-0 animate-slideshow" style={{ animationDelay: '-10s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Mobile application development" 
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-500 to-indigo-600 text-white px-4 py-1 text-sm font-medium">
                      Mobile Apps
                    </div>
                  </div>
                  
                  {/* Image 3: Cloud Solutions */}
                  <div className="absolute inset-0 animate-slideshow" style={{ animationDelay: '-5s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Cloud computing infrastructure" 
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-cyan-500 to-cyan-600 text-white px-4 py-1 text-sm font-medium">
                      Cloud Solutions
                    </div>
                  </div>
                  
                  {/* Tech corner elements */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                </div>
                
                {/* Tech indicators */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse-light"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse-light" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Specializations Section */}
        <div className="container-custom mt-24">
          <div className="card p-8 md:p-10 lg:p-12 relative overflow-hidden group animate-fade-in">
            {/* Tech pattern background */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden">
              <svg className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="15 10" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
              </svg>
              <svg className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700" viewBox="0 0 100 100" fill="none">
                <path d="M10 50 H90 M50 10 V90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 3" />
                <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10">
              <div className="md:w-1/2 animate-fade-in">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                  Core Competencies
                </div>
                <h2 className="heading-md mb-6 text-blue-600 dark:text-blue-400">SPECIALIZATIONS IN<br />SERVICE OPERATIONS</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.
                </p>
                <a href="/services" className="button-spec group">
                  <span>View All Services</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="spec-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-100 dark:shadow-blue-900/10">
                      <span className="font-bold">01</span>
                    </div>
                    <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Web Development</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Custom websites and web applications with modern technologies</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-100 dark:shadow-indigo-900/10">
                      <span className="font-bold">02</span>
                    </div>
                    <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Mobile Apps</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cross-platform mobile applications for Android and iOS</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center mb-3 shadow-md shadow-cyan-100 dark:shadow-cyan-900/10">
                      <span className="font-bold">03</span>
                    </div>
                    <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Cloud Solutions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Scalable and secure cloud infrastructure deployment</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-100 dark:shadow-purple-900/10">
                      <span className="font-bold">04</span>
                    </div>
                    <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">AI Solutions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Custom AI integrations for business automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video and About Section */}
        <div className="container-custom mt-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Section Title */}
                <div className="mb-8 animate-fade-in">
                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse-slow"></span>
                    Who We Are
                  </div>
                  <h2 className="heading-md text-blue-600 dark:text-blue-400 mt-2">About I-VARSE</h2>
                </div>
                
                {/* About Content */}
                <div className="text-gray-600 dark:text-gray-300 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <p>
                    Founded in 2018, I-VARSE Limited has been at the forefront of digital innovation in Nigeria, providing cutting-edge technology solutions to businesses across various sectors.
                  </p>
                  <p>
                    Our mission is to empower businesses with transformative digital solutions that drive growth, efficiency, and competitive advantage in an increasingly technology-driven world.
                  </p>
                  
                  {/* Key Facts */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">5+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years of Experience</div>
                    </div>
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">100+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                    </div>
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="border border-blue-100 dark:border-blue-800/50 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">20+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Container */}
            <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative rounded-xl overflow-hidden aspect-video card border-2 border-blue-200 dark:border-blue-800/70 group">
                {/* Tech-inspired decorative elements */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <svg className="absolute top-0 left-0 w-40 h-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4" viewBox="0 0 200 200" fill="none">
                    <path d="M100 0 V200 M0 100 H200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 3" />
                    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
                  </svg>
                  
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tl from-blue-200/20 to-transparent dark:from-blue-800/10 blur-xl"></div>
                </div>
                
                {/* Main video container */}
                <div className="absolute inset-3 rounded-lg overflow-hidden shadow-xl z-10 bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-900/30"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1642059863319-1481ad72fc2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Video: About I-VARSE" 
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                    <button className="z-20 w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 hover:scale-110 animate-pulse-light">
                      <PlayCircle className="h-12 w-12 text-blue-600" />
                    </button>
                    
                    {/* Video title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <div className="font-medium">Our Company Story</div>
                      <div className="text-sm text-gray-300">Learn about our mission and values</div>
                    </div>
                  </div>
                </div>
                
                {/* Tech corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-blue-500 dark:border-blue-400 rounded-tl z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-blue-500 dark:border-blue-400 rounded-tr z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-blue-500 dark:border-blue-400 rounded-bl z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-blue-500 dark:border-blue-400 rounded-br z-10"></div>
                
                {/* Dynamic highlights */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                  <div className="absolute top-0 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                  <div className="absolute bottom-0 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                  <div className="absolute left-0 top-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                  <div className="absolute right-0 top-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slower"></div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <InfoIcon className="h-4 w-4 mr-1 text-blue-500" /> 
                  Click to watch our company introduction video
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Logos */}
        <div className="container-custom mt-24">
          <div className="relative overflow-hidden rounded-xl card p-10 md:py-16 border-2 border-blue-100 dark:border-blue-800/50">
            {/* Tech-inspired background pattern */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden">
              <div className="absolute left-0 top-0 w-full h-40 bg-gradient-to-b from-blue-100 dark:from-blue-900/20 to-transparent"></div>
              
              {/* Tech grid pattern */}
              <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i}
                    className="border-b border-r border-blue-200/30 dark:border-blue-700/20 flex items-center justify-center"
                  >
                    {i % 5 === 0 && (
                      <div className="w-1 h-1 rounded-full bg-blue-300/50 dark:bg-blue-600/30"></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Animated circuit lines */}
              <svg className="absolute -right-10 -bottom-10 w-64 h-64 text-blue-400/30 dark:text-blue-600/20 animate-spin-slow" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 4" />
                <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 3" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                  Our Clients
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Trusted by Innovative Companies</h3>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {clientLogos.map((logo, index) => (
                  <div 
                    key={index} 
                    className="h-14 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-3 rounded-lg hover:bg-blue-50/80 dark:hover:bg-blue-900/30 transition-all duration-300">
                      <img src={logo.image} alt={logo.name} className="h-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle">
              We provide innovative solutions tailored to your unique business needs, designed to accelerate your digital transformation journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              // Loading skeleton for services
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="card p-8 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mb-6"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-4/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))
            ) : (
              apiServices.slice(0, 5).map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
            
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Discover More</h3>
                <p className="text-gray-600 dark:text-gray-300">Explore our complete range of services tailored for your business needs</p>
                <GradientButton 
                  href="/services" 
                  variant="default"
                  endIcon={<ArrowRight />}
                >
                  All Services
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">
              Don't just take our word for it. See what our clients have to say about our services and solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading skeleton for testimonials
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="card p-6 animate-pulse">
                  <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-4/6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
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

      {/* CTA Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="gradient-bg rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-4">READ AMAZING ARTICLES</h3>
                <p className="text-white/90 mb-8 text-lg">
                  Stay updated with the latest trends in technology and business. Our blog features insightful articles to help you navigate the digital landscape.
                </p>
                <GradientButton 
                  href="/blog" 
                  variant="light"
                  endIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Read Articles
                </GradientButton>
              </div>
            </div>
            
            <div className="card p-8 md:p-10 border-2 border-blue-100 dark:border-blue-900/30">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">CONTACT US</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Ready to take your business to the next level? Get in touch with our team of experts and discover how we can help you achieve your goals.
              </p>
              <GradientButton 
                href="/contact"
                endIcon={<ArrowRight className="h-4 w-4" />}
              >
                Get in Touch
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
