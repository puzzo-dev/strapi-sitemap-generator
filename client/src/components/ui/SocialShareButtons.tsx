import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface SocialShareButtonsProps {
  /** URL to share - defaults to current page if not specified */
  url?: string;
  /** Title to share */
  title?: string;
  /** Description text to share (used in email and some platforms) */
  description?: string;
  /** Optional hashtags to append (without # symbol) */
  hashtags?: string[];
  /** Display variant - 'vertical', 'horizontal' or 'floating' */
  variant?: 'vertical' | 'horizontal' | 'floating';
  /** Whether to show text labels alongside icons */
  showLabels?: boolean;
  /** Optional class name for custom styling */
  className?: string;
  /** Optional class for individual buttons */
  buttonClassName?: string;
}

/**
 * Social share buttons component for quick sharing content across platforms
 */
const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = document.title,
  description = '',
  hashtags = [],
  variant = 'horizontal',
  showLabels = false,
  className = '',
  buttonClassName = '',
}) => {
  // Encode parameters for URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = hashtags.join(',');
  
  // Share URLs for different platforms
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtags.length ? `&hashtags=${encodedHashtags}` : ''}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
  
  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: "Link copied",
          description: "URL copied to clipboard",
          variant: "default",
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
        });
      }
    );
  };
  
  // Base button classes
  const baseButtonClass = `
    inline-flex items-center justify-center ${showLabels ? 'px-4' : 'p-2.5'} rounded-full
    transition-all duration-200 ease-in-out 
    hover:shadow-md hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    ${buttonClassName}
  `;
  
  // Container classes based on variant
  let containerClass = 'flex items-center gap-2 ';
  if (variant === 'vertical') {
    containerClass += 'flex-col';
  } else if (variant === 'horizontal') {
    containerClass += 'flex-row flex-wrap';
  } else if (variant === 'floating') {
    containerClass += 'flex-col fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg';
  }
  
  return (
    <TooltipProvider>
      <div className={`${containerClass} ${className}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={twitterUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${baseButtonClass} bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2]`}
              aria-label="Share on Twitter"
            >
              <Twitter size={18} />
              {showLabels && <span className="ml-2">Twitter</span>}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Twitter</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${baseButtonClass} bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2]`}
              aria-label="Share on Facebook"
            >
              <Facebook size={18} />
              {showLabels && <span className="ml-2">Facebook</span>}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Facebook</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${baseButtonClass} bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]`}
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} />
              {showLabels && <span className="ml-2">LinkedIn</span>}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on LinkedIn</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={emailUrl}
              className={`${baseButtonClass} bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200`}
              aria-label="Share via Email"
            >
              <Mail size={18} />
              {showLabels && <span className="ml-2">Email</span>}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share via Email</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={copyLinkToClipboard}
              className={`${baseButtonClass} bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-300`}
              aria-label="Copy Link"
            >
              <LinkIcon size={18} />
              {showLabels && <span className="ml-2">Copy Link</span>}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy Link to Clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default SocialShareButtons;