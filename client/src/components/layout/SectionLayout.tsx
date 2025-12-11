/**
 * Unified Section Layout Component
 * 
 * Provides consistent section structure, spacing, and theming
 * Eliminates section layout inconsistencies across components
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/index';
import { PageSection } from '@/lib/types/core';
import { LoadingSkeletons } from '@/components/ui/LoadingSkeleton';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { isSectionVisible } from '@/lib/utils/visibility-helpers';

interface SectionLayoutProps {
  children: React.ReactNode;

  // Section Identity
  id?: string;
  className?: string;

  // Content Structure
  title?: string;
  subtitle?: string;
  badge?: string;
  description?: string;

  // Layout & Styling
  background?: 'default' | 'muted' | 'accent' | 'gradient';
  spacing?: 'compact' | 'default' | 'comfortable' | 'spacious' | 'none';
  containerSize?: 'default';
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textAlign?: 'left' | 'center' | 'right';
  variant?: 'hero' | 'feature' | 'default';

  // Background Elements
  showDecoration?: boolean;
  decorationVariant?: 'default' | 'testimonials' | 'faq';

  // Loading State
  isLoading?: boolean;
  loadingType?: 'section' | 'hero' | 'grid' | 'form';

  // Animation
  animateOnScroll?: boolean;
  animationDelay?: number;

  // Accessibility
  ariaLabel?: string;
  ariaLabelledby?: string;
  role?: string;

  // Section
  section?: PageSection;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  id,
  className = '',
  title,
  subtitle,
  badge,
  description,
  background = 'default',
  spacing = 'default',
  containerSize = 'default',
  paddingX = 'md',
  size = 'lg',
  textAlign = 'left',
  variant = 'default',
  animateOnScroll = true,
  animationDelay = 0,
  showDecoration = false,
  decorationVariant = 'default',
  isLoading = false,
  loadingType = 'section',
  role,
  ariaLabel,
  ariaLabelledby,
  section,
  ...props
}) => {
  // Check visibility - if section is provided and not visible, don't render
  if (section && !isSectionVisible(section)) {
    return null;
  }

  // Generate class names based on props
  const sectionClasses = cn(
    'relative w-full',
    {
      'bg-white dark:bg-[#0a1929]': background === 'default',
      'bg-gray-50 dark:bg-gray-900/50': background === 'muted',
      'bg-blue-50 dark:bg-blue-950/30': background === 'accent',
      'bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]': background === 'gradient',
    },
    {
      'py-8 md:py-12': spacing === 'compact',
      'py-12 md:py-16': spacing === 'default',
      'py-16 md:py-20': spacing === 'comfortable',
      'py-20 md:py-24': spacing === 'spacious',
      'py-0': spacing === 'none',
    },
    className
  );

  const containerClasses = cn(
    'relative z-10',

    // Padding X variants
    {
      'px-0': paddingX === 'none',
      'px-4': paddingX === 'sm',
      'px-6': paddingX === 'md',
      'px-8': paddingX === 'lg',
      'px-12': paddingX === 'xl',
    },

    // Size variants
    {
      'max-w-4xl': size === 'sm',
      'max-w-6xl': size === 'md',
      'max-w-8xl': size === 'lg',
      'max-w-full': size === 'xl',
    },

    'mx-auto'
  );

  const headerClasses = cn(
    'mb-12',

    // Text alignment
    {
      'text-left': textAlign === 'left',
      'text-center': textAlign === 'center',
      'text-right': textAlign === 'right',
    }
  );

  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: animationDelay,
        ease: "easeOut"
      }
    }
  };

  // Loading skeleton based on type
  const renderLoadingSkeleton = () => {
    switch (loadingType) {
      case 'hero':
        return <LoadingSkeletons.Hero />;
      case 'grid':
        return <LoadingSkeletons.Grid />;
      case 'form':
        return <LoadingSkeletons.Form />;
      default:
        return <LoadingSkeletons.Text lines={5} />;
    }
  };

  return (
    <motion.section
      id={id}
      className={sectionClasses}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      initial={animateOnScroll ? "hidden" : undefined}
      whileInView={animateOnScroll ? "visible" : undefined}
      viewport={{ once: true, margin: "-100px" }}
      variants={animateOnScroll ? animationVariants : undefined}
    >
      {/* Background Decoration */}
      {showDecoration && (
        <BackgroundDecoration variant={decorationVariant} />
      )}

      <div className={containerClasses}>
        {/* Section Header */}
        {(title || subtitle || badge || description) && (
          <div className={headerClasses}>
            {badge && (
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: animationDelay }}
              >
                {badge}
              </motion.div>
            )}

            {title && (
              <motion.h2
                className={cn(
                  'font-bold text-gray-900 dark:text-white mb-4',
                  {
                    'text-3xl md:text-4xl lg:text-5xl': variant === 'hero',
                    'text-2xl md:text-3xl lg:text-4xl': variant === 'feature',
                    'text-xl md:text-2xl lg:text-3xl': variant === 'default',
                  }
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: animationDelay + 0.1 }}
              >
                {title}
              </motion.h2>
            )}

            {subtitle && (
              <motion.p
                className={cn(
                  'text-gray-600 dark:text-gray-300 mb-4',
                  {
                    'text-lg md:text-xl': variant === 'hero',
                    'text-base md:text-lg': variant === 'feature',
                    'text-sm md:text-base': variant === 'default',
                  }
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: animationDelay + 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}

            {description && (
              <motion.div
                className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: animationDelay + 0.3 }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        )}

        {/* Section Content */}
        {isLoading ? (
          renderLoadingSkeleton()
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: animationDelay + 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default SectionLayout;
