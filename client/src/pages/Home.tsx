import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { services, testimonials, clientLogos } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types';
import { usePageContent, useServices, useTestimonials } from '@/hooks/useStrapiContent';

// Import icons
import { 
  PlayCircle, 
  ArrowRight, 
  ChevronRight, 
  Info as InfoIcon,
  CircleOff,
  CircleDot,
  Cpu,
  CircuitBoard,
  Code,
  LayoutGrid,
  Sparkles
} from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');
  
  // Fetch services from Strapi
  const { data: apiServices, isLoading: isServicesLoading } = useServices();
  
  // Fetch testimonials from Strapi
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] pt-12 pb-20 md:pt-16 md:pb-24 lg:py-24 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30 animate-pulse-slow" />
          
          {/* Tech pattern */}
          <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
            <CircuitBoard className="absolute right-0 top-0 h-64 w-64 text-blue-800 opacity-20 transform rotate-12" />
            <Cpu className="absolute left-10 bottom-10 h-48 w-48 text-indigo-700 opacity-15 transform -rotate-12" />
          </div>
        </div>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left column - Content */}
            <div className="order-2 lg:order-1">
              <div className="space-y-6 md:space-y-8">
                {isPageLoading ? (
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </div>
                ) : (
                  <h1 className="hero-title">
                    {pageContent?.sections?.find(s => s.type === 'hero')?.title || 'INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES'}
                  </h1>
                )}
                
                {isPageLoading ? (
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 lg:pr-10 hidden md:block">
                    {pageContent?.sections?.find(s => s.type === 'hero')?.subtitle || 
                    'Embark on a successful innovative journey with cutting-edge solutions for your business. We\'re dedicated to elevating your digital experience.'}
                  </p>
                )}
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <GradientButton 
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"} 
                    size="lg" 
                    endIcon={<ChevronRight />} 
                    className="sm:w-auto py-3 animate-snowfall" 
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                  </GradientButton>
                  <GradientButton 
                    href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"} 
                    variant="outline" 
                    size="lg" 
                    className="sm:w-auto py-3" 
                  >
                    {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                  </GradientButton>
                </div>
              </div>
            </div>
            
            {/* Right column - Slideshow */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/10 fade-in-slide">
                {/* Tech slideshow container */}
                <div className="relative h-full w-full border border-blue-200 dark:border-blue-800 rounded-xl bg-white/80 dark:bg-gray-900/80 p-3">
                  {/* Main content area with tech corners */}
                  <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 rounded-lg overflow-hidden">
                    {/* Tech corner elements */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                  </div>
                  
                  {/* Tech indicators */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    <CircleDot className="h-4 w-4 text-blue-500 animate-pulse-light" />
                    <CircleOff className="h-4 w-4 text-indigo-500 animate-pulse-light" style={{ animationDelay: '1s' }} />
                    <CircleDot className="h-4 w-4 text-cyan-500 animate-pulse-light" style={{ animationDelay: '2s' }} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile-only content - Shows third on mobile, after the slideshow */}
            <div className="w-full block md:hidden lg:hidden order-3 mt-12 space-y-8 mobile-space-y staggered-fade-in">
              {isPageLoading ? (
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  {pageContent?.sections?.find(s => s.type === 'hero')?.subtitle || 
                  'Embark on a successful innovative journey with cutting-edge solutions for your business. We\'re dedicated to elevating your digital experience.'}
                </p>
              )}
              
              <div className="pt-4 flex flex-col gap-4 w-full">
                <GradientButton 
                  href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.url || "/services"} 
                  size="default" 
                  endIcon={<ChevronRight />} 
                  className="w-full py-4 justify-center animate-snowfall" 
                  fullWidth
                >
                  {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.primaryButton?.text || t('button.getStarted')}
                </GradientButton>
                <GradientButton 
                  href={pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.url || "/#about"} 
                  variant="outline" 
                  size="default" 
                  className="w-full py-4 justify-center" 
                  fullWidth
                >
                  {pageContent?.sections?.find(s => s.type === 'hero')?.settings?.secondaryButton?.text || t('button.learnMore')}
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="card p-8 md:p-10 lg:p-12 relative overflow-hidden group animate-fade-in shadow-lg">
            {/* Tech pattern background */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 overflow-hidden">
              <Code className="absolute -right-20 -bottom-10 w-64 h-64 text-blue-400 dark:text-blue-600 animate-spin-slow" />
              <LayoutGrid className="absolute -left-10 -top-10 w-48 h-48 text-blue-300 dark:text-blue-700" />
            </div>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 relative z-10">
              <div className="md:w-1/2 space-y-6 animate-fade-in">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                  Core Competencies
                </div>
                <h2 className="heading-md mb-6 text-blue-600 dark:text-blue-400">SPECIALIZATIONS IN<br />SERVICE OPERATIONS</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses toward digital success.
                </p>
                <a href="/services" className="button-spec group text-lg">
                  <span>View All Services</span>
                  <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.1s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-100 dark:shadow-blue-900/10">
                      <span className="font-bold text-lg">01</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">Web Development</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Custom websites and web applications with modern technologies</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-100 dark:shadow-indigo-900/10">
                      <span className="font-bold text-lg">02</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">Mobile Apps</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Cross-platform mobile applications for Android and iOS</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.3s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center mb-4 shadow-md shadow-cyan-100 dark:shadow-cyan-900/10">
                      <span className="font-bold text-lg">03</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">Cloud Solutions</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Scalable and secure cloud infrastructure deployment</p>
                  </div>
                  
                  <div className="spec-card animate-fade-in-up p-5 md:p-6" style={{ animationDelay: '0.4s' }}>
                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center mb-4 shadow-md shadow-purple-100 dark:shadow-purple-900/10">
                      <span className="font-bold text-lg">04</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-300">AI Solutions</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">Custom AI integrations for business automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video and About Section */}
      <section className="py-24">
        <div className="container-custom">
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
                  <CircuitBoard className="absolute top-0 left-0 w-40 h-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4" />
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
      </section>
      
      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-blue-50/50 dark:bg-blue-950/30 relative overflow-hidden">
        {/* Background tech pattern */}
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
          <Sparkles className="absolute right-10 top-20 h-64 w-64 text-blue-400 dark:text-blue-600 opacity-30" />
          <div className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Our Services
            </div>
            <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">SERVICE OFFERINGS</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our comprehensive range of digital solutions designed to help businesses thrive in the digital age. Each service is tailored to meet your specific needs and goals.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              // Loading placeholders
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md animate-pulse h-64 flex flex-col">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-2"></div>
                  <div className="mt-auto h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))
            ) : (
              (apiServices || services).slice(0, 6).map((service, index) => (
                <div key={service.id || index} style={{ animationDelay: `${0.1 * index}s` }}>
                  <ServiceCard service={service} />
                </div>
              ))
            )}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <GradientButton href="/services" className="px-10">
              View All Services
            </GradientButton>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Testimonials
            </div>
            <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">WHAT OUR CLIENTS SAY</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Don't just take our word for it. See what our satisfied clients have to say about our services and solutions.
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading placeholders
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md animate-pulse h-64 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-2"></div>
                  <div className="mt-auto h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              (apiTestimonials || testimonials).slice(0, 3).map((testimonial, index) => (
                <div key={testimonial.id || index} style={{ animationDelay: `${0.1 * index}s` }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;