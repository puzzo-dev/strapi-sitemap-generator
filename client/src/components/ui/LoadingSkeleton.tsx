/**
 * Unified Loading Skeleton System
 * 
 * Replaces 50+ duplicate skeleton patterns throughout the codebase
 * with a single, reusable, customizable system.
 */

import React from 'react';

interface SkeletonProps {
  className?: string;
  Image?: boolean;  
  width?: string | number;
  height?: string | number;
}

interface SkeletonFormProps {
  fields?: number;
  showTitle?: boolean;
  className?: string;
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

interface SkeletonCardProps {
  showImage?: boolean;
  textLines?: number;
  className?: string;
}

interface SkeletonHeroProps {
  showBadge?: boolean;
  titleLines?: number;
  descriptionLines?: number;
  showButtons?: boolean;
  className?: string;
}

interface SkeletonSectionProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

interface SkeletonGridProps {
  items?: number;
  columns?: number;
  showImage?: boolean;
  textLines?: number;
  className?: string;
}

/**
 * Base skeleton element
 */
export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'full', 
  height = '4' 
}) => {
  const widthClass = typeof width === 'string' ? `w-${width}` : '';
  const heightClass = typeof height === 'string' ? `h-${height}` : '';
  
  return (
    <div 
      className={`bg-gray-200 max-w-8xl mx-auto dark:bg-gray-700 rounded animate-pulse ${widthClass} ${heightClass} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : undefined,
        height: typeof height === 'number' ? `${height}px` : undefined,
      }}
    />
  );
};
/**
 * Multi-line text skeleton
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        width={i === lines - 1 ? '3/4' : 'full'} 
        height="4" 
      />
    ))}
  </div>
);
/**
 * Card skeleton with optional image
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  showImage = true, 
  textLines = 3, 
  className = '' 
}) => (
  <div className={`p-6 animate-pulse ${className}`}>
    {showImage && (
      <Skeleton width="full" height="48" className="mb-4 rounded-lg" />
    )}
    <SkeletonText lines={textLines} />
  </div>
);
/**
 * Hero section skeleton
 */
export const SkeletonHero: React.FC<SkeletonHeroProps> = ({
  showBadge = true,
  titleLines = 2,
  descriptionLines = 3,
  showButtons = true,
  className = ''
}) => (
  <div className={`space-y-6 ${className}`}>
    {showBadge && (
      <Skeleton width="32" height="8" className="mx-auto" />
    )}
    
    <div className="space-y-4">
      {Array.from({ length: titleLines }).map((_, i) => (
        <Skeleton 
          key={`title-${i}`} 
          width={i === titleLines - 1 ? '3/4' : 'full'} 
          height="12" 
          className="mx-auto" 
        />
      ))}
    </div>
    
    <div className="space-y-2 max-w-3xl mx-auto">
      {Array.from({ length: descriptionLines }).map((_, i) => (
        <Skeleton 
          key={`desc-${i}`} 
          width={i === descriptionLines - 1 ? '5/6' : 'full'} 
          height="6" 
          className="mx-auto" 
        />
      ))}
    </div>
    
    {showButtons && (
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton width="32" height="12" />
        <Skeleton width="28" height="12" />
      </div>
    )}
  </div>
);

/**
 * Grid skeleton (for products, services, team, etc.)
 */
export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  items = 6,
  columns = 3,
  showImage = true,
  textLines = 3,
  className = ''
}) => {
  const gridClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className} max-w-8xl mx-auto`;
  
  return (
    <div className={gridClass}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard 
          key={i} 
          showImage={showImage} 
          textLines={textLines}
          className="border border-gray-200 dark:border-gray-700 rounded-lg"
        />
      ))}
    </div>
  );
};
/**
 * Form skeleton
 */
export const SkeletonForm: React.FC<SkeletonFormProps> = ({
  fields = 4,
  showTitle = true,
  className = ''
}) => (
  <div className={`space-y-6 ${className} max-w-8xl mx-auto`}>
    {showTitle && (
      <Skeleton width="1/2" height="8" />
    )}
    
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton width="1/4" height="4" />
        <Skeleton width="full" height="12" className="rounded-lg" />
      </div>
    ))}
    
    <Skeleton width="full" height="12" className="rounded-lg" />
  </div>
);
/**
 * Loading section wrapper
 */
export const SkeletonSection: React.FC<SkeletonSectionProps> = ({
  children,
  isLoading = false,
  className = ''
}) => {
  if (isLoading) {
    return (
      <div className={`animate-pulse ${className} max-w-8xl mx-auto`}>
        {children}
      </div>
    );
  }
  
  return <>{children}</>;
};

// Export commonly used skeleton combinations
export const LoadingSkeletons = {
  Hero: SkeletonHero,
  Grid: SkeletonGrid, 
  Card: SkeletonCard,
  Text: SkeletonText,
  Form: SkeletonForm,
  Section: SkeletonSection,
  Base: Skeleton,
};

export default LoadingSkeletons;
