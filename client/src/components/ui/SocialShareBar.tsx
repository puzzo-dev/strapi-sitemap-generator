import React from 'react';
import SocialShareButtons from './SocialShareButtons';
import { Share2 } from 'lucide-react';

interface SocialShareBarProps {
  /** Title to share */
  title?: string;
  /** Description text to share */
  description?: string;
  /** Optional image URL to share */
  imageUrl?: string;
  /** Optional hashtags */
  hashtags?: string[];
  /** Whether to show text labels alongside icons */
  showLabels?: boolean;
  /** Alignment of the share bar */
  align?: 'left' | 'center' | 'right';
  /** Optional class name for custom styling */
  className?: string;
  /** Optional display style */
  style?: 'minimal' | 'standard' | 'prominent';
  /** Optional custom heading text */
  headingText?: string;
}

/**
 * Social share bar component that can be embedded within content
 */
const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title = document.title,
  description = '',
  imageUrl,
  hashtags = [],
  showLabels = false,
  align = 'center',
  className = '',
  style = 'standard',
  headingText,
}) => {
  // Determine component styling based on style prop
  let containerClasses = '';
  let headingClasses = '';
  let buttonsContainerClasses = '';
  
  switch (style) {
    case 'minimal':
      containerClasses = 'py-2';
      headingClasses = 'text-sm font-medium text-gray-600 dark:text-gray-400';
      buttonsContainerClasses = 'mt-1';
      break;
    case 'prominent':
      containerClasses = 'border-t border-b border-gray-200 dark:border-gray-800 py-6 my-8';
      headingClasses = 'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4';
      buttonsContainerClasses = 'mt-4';
      break;
    case 'standard':
    default:
      containerClasses = 'border border-gray-200 dark:border-gray-800 rounded-lg p-4 my-6';
      headingClasses = 'text-base font-medium text-gray-800 dark:text-gray-200 mb-3';
      buttonsContainerClasses = 'mt-2';
      break;
  }
  
  // Alignment classes
  let alignmentClass = '';
  switch (align) {
    case 'left':
      alignmentClass = 'items-start text-left';
      break;
    case 'right':
      alignmentClass = 'items-end text-right';
      break;
    case 'center':
    default:
      alignmentClass = 'items-center text-center';
      break;
  }
  
  return (
    <div className={`flex flex-col ${alignmentClass} ${containerClasses} ${className}`}>
      <div className={headingClasses}>
        <span className="inline-flex items-center gap-2">
          <Share2 size={16} className="text-blue-500" />
          {headingText || 'Share this content'}
        </span>
      </div>
      
      <div className={buttonsContainerClasses}>
        <SocialShareButtons
          title={title}
          description={description}
          hashtags={hashtags}
          variant="horizontal"
          showLabels={showLabels}
          buttonClassName="mx-1 my-1"
        />
      </div>
    </div>
  );
};

export default SocialShareBar;