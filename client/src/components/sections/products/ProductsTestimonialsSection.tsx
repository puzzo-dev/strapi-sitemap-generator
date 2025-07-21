import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { fadeInUp, staggerChildren, scaleUp } from '@/lib/animations';
import { PageContent } from '@/lib/types/core';
import { TestimonialProps } from '@/lib/types/content';
import { Card, CardContent } from '@/components/ui/card';

interface ProductsTestimonialsSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsTestimonialsSection: React.FC<ProductsTestimonialsSectionProps> = ({ 
  pageContent, 
  isLoading = false 
}) => {
  // Get testimonials section from page content
  const testimonialsSection = pageContent?.sections?.find(s => s.type === 'testimonials');
  
  // Extract testimonials from section data or fallback to empty array
  let displayTestimonials: TestimonialProps[] = [];
  
  if (testimonialsSection?.settings?.featured) {
    const featured = testimonialsSection.settings.featured;
    if (Array.isArray(featured) && featured.length > 0) {
      displayTestimonials = featured as TestimonialProps[];
    } else if (typeof featured === 'object' && featured !== null && !Array.isArray(featured)) {
      displayTestimonials = [featured as TestimonialProps];
    }
  }

  return (
    <motion.section 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="content-section bg-white dark:bg-[#132f4c]"
    >
      <div className="container-custom">
        <motion.div 
          variants={fadeInUp(20, 0.6)}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            {testimonialsSection?.badge}
          </div>
          <div className="text-center mb-16">
            <h2 className="section-title text-blue-900 dark:text-blue-200">{testimonialsSection?.title}</h2>
            <p className="section-subtitle">
              {testimonialsSection?.subtitle}
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          variants={staggerChildren(0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {isLoading ? (
            // Loading skeleton for testimonials
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
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
                </CardContent>
              </Card>
            ))
          ) : (
            displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={scaleUp(0.95, 0.6, index * 0.1)}
                className="h-full"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="h-full">
                  {testimonial.rating && testimonial.content && (
                    <TestimonialCard testimonial={testimonial} />
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductsTestimonialsSection;