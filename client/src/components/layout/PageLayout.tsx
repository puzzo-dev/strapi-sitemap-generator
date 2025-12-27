/**
 * Unified Page Layout Component
 * 
 * Provides consistent page structure, SEO, and theming across all pages
 * Eliminates layout inconsistencies and duplicate patterns
 */

import React from 'react';
import { motion } from 'framer-motion';
import MetaTags from '@/components/seo/MetaTags';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import { PageContent } from '@/lib/types/core';
import { LoadingSkeletons } from '@/components/ui/LoadingSkeleton';

interface PageLayoutProps {
  children: React.ReactNode;
  pageContent?: PageContent | null;
  isLoading?: boolean;
  
  // SEO Props
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any>;
  
  // Layout Props
  className?: string;
  containerClassName?: string;
  showBackToTop?: boolean;
  
  // Animation Props
  animationType?: 'fade' | 'slide' | 'none';
  animationDelay?: number;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  pageContent,
  isLoading = false,
  
  // SEO Props
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  
  // Layout Props
  className = '',
  containerClassName = '',
  showBackToTop = true,
  
  // Animation Props
  animationType = 'fade',
  animationDelay = 0,
}) => {
  const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

  // Generate SEO metadata with fallbacks
  const seoTitle = generateSeoTitle(
    title || 
    pageContent?.metaTitle || 
    pageContent?.title || 
    'I-VARSE Technologies'
  );
  
  const seoDescription = generateSeoDescription(
    description || 
    pageContent?.metaDescription || 
    pageContent?.description || 
    'Innovative digital solutions for modern businesses'
  );

  // Animation variants
  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5, delay: animationDelay }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.6, delay: animationDelay }
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
      transition: {}
    }
  };

  const currentAnimation = animationVariants[animationType];

  return (
    <>
      {/* SEO Metadata */}
      <MetaTags
        title={seoTitle}
        description={seoDescription}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        ogType={ogType}
        ogUrl={canonicalUrl}
        twitterCard={twitterCard}
        structuredData={structuredData}
      />

      {/* Page Content */}
      <motion.main
        className={`min-h-screen bg-white dark:bg-[#0a1929] ${className}`}
        initial={currentAnimation.initial}
        animate={currentAnimation.animate}
        exit={currentAnimation.exit}
        transition={currentAnimation.transition}
      >
        {isLoading ? (
          <div className="mx-auto px-4 py-16">
            <LoadingSkeletons.Hero className="pb-16" />
            <LoadingSkeletons.Grid items={6} className="mb-16" />
            <LoadingSkeletons.Text lines={5} />
          </div>
        ) : (
          <div className={containerClassName}>
            {children}
          </div>
        )}
      </motion.main>
    </>
  );
};

export default PageLayout;
