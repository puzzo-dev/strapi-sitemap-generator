import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types/content';

interface ServiceDetailHeroSectionProps {
  service: ServiceProps;
}

const ServiceDetailHeroSection: React.FC<ServiceDetailHeroSectionProps> = ({ service }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />

        {/* Tech pattern elements */}
        <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
        <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
      </div>

      <div className="container-custom relative z-10 max-w-8xl">
        <Link href="/services">
          <a className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>All Services</span>
          </a>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
              Our Services
            </div>

            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {service.title ? (
                (() => {
                  const words = service.title.split(' ');
                  const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                  const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : service.title;

                  return (
                    <>
                      {regularWords}{' '}
                      <span className="gradient-text">
                        {highlightedWords}
                      </span>
                    </>
                  );
                })()
              ) : (
                <span className="gradient-text">Service Details</span>
              )}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {service.description}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <GradientButton href="#benefits" endIcon={<ArrowRight />}>
                Explore Benefits
              </GradientButton>
              <GradientButton href="/contact" variant="outline">
                Get Started
              </GradientButton>
            </div>
          </div>

          <div className="hidden lg:flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative h-96 w-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full bg-blue-50 dark:bg-blue-900/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-blue-100 dark:border-blue-800/50 shadow-xl">
                  {/* Service icon or illustration would go here */}
                  <div className="text-6xl text-blue-500 dark:text-blue-400">
                    {/* Just using a placeholder icon here - would ideally be replaced with a proper illustration */}
                    <svg className="h-32 w-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12C22 14.2091 20.2091 16 18 16C15.7909 16 14 14.2091 14 12C14 9.79086 15.7909 8 18 8C20.2091 8 22 9.79086 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 5C10 6.65685 8.65685 8 7 8C5.34315 8 4 6.65685 4 5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 19C10 20.6569 8.65685 22 7 22C5.34315 22 4 20.6569 4 19C4 17.3431 5.34315 16 7 16C8.65685 16 10 17.3431 10 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blue-100/50 dark:bg-blue-700/20 animate-pulse-slower"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-purple-100/50 dark:bg-purple-700/20 animate-pulse-slow"></div>
              <div className="absolute h-full w-full rounded-full border-2 border-dashed border-blue-200/50 dark:border-blue-700/20 animate-spin-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailHeroSection;