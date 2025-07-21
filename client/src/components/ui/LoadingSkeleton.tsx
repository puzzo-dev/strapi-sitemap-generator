import React from 'react';
import { LoadingSkeletonProps } from '@/lib/types';

/**
 * Loading skeleton component for content placeholders
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  lines = 5,
  variant = 'text' 
}) => {
  if (variant === 'card') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-4/6"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    );
  }
  
  if (variant === 'image') {
    return (
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    );
  }
  
  // Text skeleton (default)
  return (
    <div className="animate-pulse space-y-4">
      {Array(lines).fill(0).map((_, index) => {
        // Add some variability to line lengths
        let width = '100%';
        if (index === 0) width = '80%';  // First line
        if (index === lines - 1) width = '60%';  // Last line
        if (index % 3 === 0) width = '90%';  // Every third line
        
        // Make some lines appear as headings
        const isHeading = index === 0 || index === Math.floor(lines / 2);
        const height = isHeading ? 'h-6' : 'h-4';
        
        return (
          <div 
            key={index} 
            className={`${height} bg-gray-200 dark:bg-gray-700 rounded`}
            style={{ width }}
          ></div>
        );
      })}
    </div>
  );
};

export default LoadingSkeleton;