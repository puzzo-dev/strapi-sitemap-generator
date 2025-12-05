import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { IndustryDetailChallengesSectionProps } from '@/lib/types/components';

const IndustryDetailChallengesSection: React.FC<IndustryDetailChallengesSectionProps> = ({ industry, isLoading }) => {
  if (isLoading) {
    return null;
  }
  if (!industry?.challenges?.length) return null;
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-12 md:py-20 bg-white dark:bg-[#0a192f] border-b border-blue-100 dark:border-blue-900/40"
    >
      <div className="container mx-auto px-4 max-w-8xl">
        <motion.h2 variants={fadeInUp()} className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-8 text-center">
          Key Challenges
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industry.challenges.map((challenge, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp(0.1 * idx)}
              className="bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow p-6 flex items-start gap-4"
            >
              <AlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-lg text-blue-900 dark:text-blue-100 font-medium">{challenge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustryDetailChallengesSection; 