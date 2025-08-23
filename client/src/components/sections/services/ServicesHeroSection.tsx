import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { PageContent } from '@/lib/types/core';
import {
  fadeInUp as fadeInUpAnimation,
  staggerChildren as staggerChildrenAnimation,
  scaleUp as scaleUpAnimation
} from '@/lib/animations';
import { findSection } from '@/lib/utils/section-helpers';
import { getThemeColors } from '@/lib/utils/theme-helpers';
import { cn } from '@/lib/utils';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';

interface ServicesHeroSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ 
  pageContent}) => {
  // Get hero section from page content using unified helper
  const heroSection = findSection(pageContent, 'hero');

  return (
    <motion.section 
      initial="initial"
      animate="animate"
      className={cn(
        "relative overflow-hidden py-16 md:pt-24 md:pb-16 hero-section",
        getThemeColors('background', 'gradient'),
        getThemeColors('border', 'muted')
      )}
    >
      {/* Use unified background decoration */}
      <BackgroundDecoration variant="default" />

      <div className="container-custom relative z-10">
        <motion.div 
          variants={staggerChildrenAnimation(0.1)}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div 
            variants={fadeInUpAnimation(20, 0.6)}
            className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
          >
            <span className="text-lg mr-2">🔧</span>
            {heroSection?.badge}
          </motion.div>
          
          <motion.h1 
            variants={fadeInUpAnimation(20, 0.7)}
            className="heading-xl mb-6"
          >
            {heroSection?.title ? (
              (() => {
                const words = heroSection.title.split(' ');
                const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : heroSection.title;

                return (
                  <>
                    {regularWords}{' '}
                    <span className="gradient-text">
                      {highlightedWords}
                    </span>
                  </>
                );
              })()
            ) : (
              <>
                <span className="gradient-text">Professional Services</span> for<br />Your Business Growth
              </>
            )}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUpAnimation(20, 0.7, 0.3)}
            className={cn(
              "text-xl mb-8",
              getThemeColors('text', 'muted')
            )}
          >
            {heroSection?.subtitle || "Transform your business with our comprehensive suite of professional services designed to drive innovation, efficiency, and growth."}
          </motion.p>
          
          <motion.div 
            variants={fadeInUpAnimation(20, 0.7, 0.5)}
            className="flex flex-wrap justify-center gap-4"
          >
            <GradientButton 
              href={heroSection?.settings?.primaryButton?.href || "#services"} 
              size="lg" 
              endIcon={<ArrowRight />}
            >
              {heroSection?.settings?.primaryButton?.children || "Explore Services"}
            </GradientButton>
            <GradientButton 
              href={heroSection?.settings?.secondaryButton?.href || "/contact"} 
              variant="outline" 
              size="lg"
            >
              {heroSection?.settings?.secondaryButton?.children || "Get Started"}
            </GradientButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesHeroSection;