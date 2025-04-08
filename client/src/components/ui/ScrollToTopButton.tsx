import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopButtonProps {
  threshold?: number;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left';
  ariaLabel?: string;
}

/**
 * ScrollToTopButton - A button that appears when the user scrolls down 
 * and allows them to smoothly scroll back to the top of the page
 */
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ 
  threshold = 300,
  size = 'md',
  position = 'bottom-right',
  ariaLabel = 'Scroll to top'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Get size classes based on the size prop
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-14 h-14';
      case 'md':
      default:
        return 'w-10 h-10';
    }
  };

  // Get position classes based on the position prop
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'left-4 sm:left-6';
      case 'bottom-right':
      default:
        return 'right-4 sm:right-6';
    }
  };

  // Check scroll position and update button visibility
  useEffect(() => {
    const checkScrollPosition = () => {
      setIsVisible(window.pageYOffset > threshold);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScrollPosition);
    
    // Initial check
    checkScrollPosition();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [threshold]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label={ariaLabel}
          className={`${getSizeClasses()} 
            rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg 
            hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
            flex items-center justify-center transition-transform
            hover:scale-110 active:scale-95`}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;