import React from 'react';
import { motion } from 'framer-motion';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface IndustryDetailTechnologiesSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailTechnologiesSection: React.FC<IndustryDetailTechnologiesSectionProps> = ({ industry, isLoading }) => {
  if (isLoading) {
    return null;
  }
  if (!industry?.technologies?.length) return null;
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-12 md:py-20 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/40"
    >
      <div className="container mx-auto px-4">
        <motion.h2 variants={fadeInUp()} className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-8 text-center">
          Technologies We Use
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {industry.technologies.map((tech, idx) => (
            <motion.span
              key={tech}
              variants={fadeInUp(0.1 * idx)}
              className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-medium text-sm shadow"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustryDetailTechnologiesSection; 