import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { useTestimonials } from '@/hooks/useStrapiContent';
import { testimonials as localTestimonials } from '@/lib/data';
import { 
  Sparkles, 
  CircuitBoard, 
  Code 
} from 'lucide-react';
import { TestimonialProps } from '@/lib/types';

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  
  // Use API testimonials if available, otherwise fall back to local data
  const testimonials = useMemo(() => {
    return apiTestimonials && apiTestimonials.length > 0 
      ? apiTestimonials 
      : localTestimonials;
  }, [apiTestimonials]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background tech pattern for testimonials */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
        {/* Tech elements */}
        <Sparkles className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 opacity-30 animate-pulse-light" />
        <CircuitBoard className="absolute right-10 bottom-10 h-48 w-48 text-indigo-400 dark:text-indigo-600 opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />

        {/* Decorative curved line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            className="text-blue-500 stroke-current"
            fill="none"
            strokeWidth="0.1"
          />
          <path
            d="M0,70 Q25,50 50,70 T100,70"
            className="text-indigo-500 stroke-current"
            fill="none"
            strokeWidth="0.1"
          />
        </svg>

        {/* Subtle dots */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500/20 dark:bg-blue-400/10 animate-pulse-light"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-3">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
            {t('testimonials.badge')}
          </div>
          <h2 className="heading-md text-blue-600 dark:text-blue-400 mb-6">{t('testimonials.title', 'WHAT OUR CLIENTS SAY')}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('testimonials.subtitle', 'Don\'t just take our word for it. See what our satisfied clients have to say about our services and solutions.')}
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
            testimonials.slice(0, 3).map((testimonial: TestimonialProps, index: number) => (
              <motion.div 
                key={testimonial.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;