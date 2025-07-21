import React from 'react';
import { motion } from 'framer-motion';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface IndustryDetailCaseStudiesSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailCaseStudiesSection: React.FC<IndustryDetailCaseStudiesSectionProps> = ({ industry, isLoading }) => {
  if (isLoading) {
    return null;
  }
  if (!industry?.caseStudies?.length) return null;
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-12 md:py-20 bg-white dark:bg-[#0a192f] border-b border-blue-100 dark:border-blue-900/40"
    >
      <div className="container mx-auto px-4">
        <motion.h2 variants={fadeInUp()} className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-8 text-center">
          Related Case Studies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industry.caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.id || idx}
              variants={fadeInUp(0.1 * idx)}
              className="bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow p-6 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100 mb-2">{cs.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{cs.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustryDetailCaseStudiesSection; 