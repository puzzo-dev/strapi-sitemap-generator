import React, { useEffect, useState } from 'react';
import SocialShareButtons from './SocialShareButtons';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FloatingSocialShareProps {
  /** Title to share */
  title?: string;
  /** Description text to share */
  description?: string;
  /** Optional image URL to share */
  imageUrl?: string;
  /** Optional hashtags */
  hashtags?: string[];
  /** Position - 'left' or 'right' */
  position?: 'left' | 'right';
  /** Offset from the edge in pixels */
  offset?: number;
  /** Whether the component should appear after scrolling down */
  showOnScroll?: boolean;
  /** Threshold for showing the buttons when scrolling (percentage of viewport) */
  scrollThreshold?: number;
}

/**
 * Floating social share buttons that appear on page scroll
 */
const FloatingSocialShare: React.FC<FloatingSocialShareProps> = ({
  title = document.title,
  description = '',
  imageUrl,
  hashtags = [],
  position = 'left',
  offset = 16,
  showOnScroll = true,
  scrollThreshold = 0.2,
}) => {
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isDismissed, setIsDismissed] = useState(false);
  const { ref, inView } = useInView({
    threshold: scrollThreshold,
  });
  
  // Handle visibility based on scroll position
  useEffect(() => {
    if (showOnScroll && !isDismissed) {
      setIsVisible(inView);
    }
  }, [inView, showOnScroll, isDismissed]);
  
  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }
  
  return (
    <>
      {/* Invisible element to track scroll position */}
      <div ref={ref} className="absolute top-[20vh]" />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-40 top-1/2 transform -translate-y-1/2 ${position === 'left' ? 'left-0' : 'right-0'}`}
            style={{ [position]: `${offset}px` }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
              {/* Close button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="absolute -top-2 -right-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1 shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close share panel"
              >
                <X size={12} />
              </button>
              
              {/* Share buttons */}
              <SocialShareButtons
                title={title}
                description={description}
                hashtags={hashtags}
                variant="vertical"
                buttonClassName="my-1"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSocialShare;