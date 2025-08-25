import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/lib/data/case-studies';

interface IndustryDetailCaseStudiesSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailCaseStudiesSection: React.FC<IndustryDetailCaseStudiesSectionProps> = ({ industry, isLoading }) => {
  if (isLoading) {
    return null;
  }
  if (!industry?.caseStudies?.length) return null;

  // Helper function to find the actual case study by ID and get its slug
  const getCaseStudySlug = (id: number): string | null => {
    const caseStudy = caseStudies.find(cs => cs.id === id);
    return caseStudy?.slug || null;
  };

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
          {industry.caseStudies.map((cs, idx) => {
            const caseStudySlug = getCaseStudySlug(cs.id);

            // If no matching case study found, render a non-clickable card
            if (!caseStudySlug) {
              return (
                <motion.div
                  key={cs.id || idx}
                  variants={fadeInUp(0.1 * idx)}
                  className="bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-md p-6 flex flex-col opacity-75"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100">
                      {cs.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                    {cs.description}
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium text-sm">
                    <span>Coming Soon</span>
                  </div>
                </motion.div>
              );
            }

            return (
              <Link
                key={cs.id || idx}
                href={`/case-studies/${caseStudySlug}`}
              >
                <motion.div
                  variants={fadeInUp(0.1 * idx)}
                  className="group bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors duration-200">
                      {cs.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                    {cs.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustryDetailCaseStudiesSection; 