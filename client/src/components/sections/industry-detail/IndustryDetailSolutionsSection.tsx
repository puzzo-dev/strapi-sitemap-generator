import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';

interface IndustryDetailSolutionsSectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailSolutionsSection: React.FC<IndustryDetailSolutionsSectionProps> = ({ industry, isLoading }) => {
  if (isLoading) {
    return null;
  }
  if (!industry?.solutions?.length) return null;
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerChildren()}
      className="py-12 md:py-20 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/40"
    >
      <div className="container mx-auto px-4">
        <motion.h2 variants={fadeInUp()} className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-8 text-center">
          Our Solutions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industry.solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp(0.1 * idx)}
            >
              <Card className="p-6 flex items-start gap-4">
                <CardContent className="flex items-start gap-4 p-0">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-lg text-blue-900 dark:text-blue-100 font-medium">{solution}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustryDetailSolutionsSection; 