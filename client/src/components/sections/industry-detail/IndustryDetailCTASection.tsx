import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { IndustryProps } from '@/lib/types/content';
import { fadeInUp } from '@/lib/animations';

interface IndustryDetailCTASectionProps {
  industry?: IndustryProps | null;
  isLoading?: boolean;
}

const IndustryDetailCTASection: React.FC<IndustryDetailCTASectionProps> = ({ industry, isLoading }) => {
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse">
              Get Started
            </div>
            <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-8 animate-pulse"></div>
            <div className="h-12 bg-blue-100 dark:bg-blue-800/50 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
            Ready to Transform
          </div>
          <h2 className="section-title text-blue-900 dark:text-blue-200">
            Ready to Transform Your {industry?.name}?
          </h2>
          <p className="section-subtitle mb-8">
            Contact our team today to learn more about our industry-specific solutions and how we can help your business succeed in the digital age.
          </p>
          <GradientButton href="/contact" size="lg">
            Get in Touch
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default IndustryDetailCTASection; 