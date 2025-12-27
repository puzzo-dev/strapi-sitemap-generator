/**
 * Loading Fallback Component
 * 
 * Reusable loading indicator for lazy-loaded routes and async operations.
 * Provides consistent loading UX across the application.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Loading...',
  fullScreen = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white dark:bg-[#0a1929] z-50'
    : 'flex items-center justify-center min-h-[60vh]';

  return (
    <div className={containerClasses}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Spinning loader */}
        <div
          className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
        
        {/* Loading message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground font-medium"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;

/**
 * Minimal inline loader for small contexts (buttons, cards, etc.)
 */
export const InlineLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
    role="status"
    aria-label="Loading"
  />
);

/**
 * Skeleton loader for content placeholders
 */
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);
