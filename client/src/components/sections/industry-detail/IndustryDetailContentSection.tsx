import React from 'react';
import { motion } from 'framer-motion';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp } from '@/lib/animations';

interface IndustryDetailContentSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailContentSection: React.FC<IndustryDetailContentSectionProps> = ({ industry, isLoading }) => {
  if (isLoading || !industry?.content) {
    return null;
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={fadeInUp()}
      className="py-12 md:py-20 bg-white dark:bg-[#0a192f] border-b border-blue-100 dark:border-blue-900/40"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUp()}
            className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-8 text-center"
          >
            About {industry.name}
          </motion.h2>
          <motion.div
            variants={fadeInUp(0.2)}
            className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <p className="text-lg leading-relaxed">
              {industry.content}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default IndustryDetailContentSection; 