import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialProps } from '@/lib/types/content';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface IndustriesTestimonialsSectionProps {
  testimonials: TestimonialProps[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
}

const IndustriesTestimonialsSection: React.FC<IndustriesTestimonialsSectionProps> = ({
  testimonials = [],
  title,
  subtitle,
  isLoading = false
}) => {
  if (isLoading || !testimonials.length) {
    return null;
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-16 md:py-24 bg-white dark:bg-[#0a192f]"
    >
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            variants={fadeInUp()}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-6"
          >
            {title || 'What Our Clients Say'}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={fadeInUp(0.2)}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          variants={staggerChildren(0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index}
              variants={fadeInUp(0.1 * index)}
              className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 shadow-lg"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default IndustriesTestimonialsSection; 