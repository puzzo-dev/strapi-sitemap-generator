import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTopButtonProps } from '@/lib/types';



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
        return 'w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8';
      case 'lg':
        return 'w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16';
      case 'md':
      default:
        return 'w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11';
    }
  };

  // Get position classes based on the position prop
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'left-3 xs:left-4 sm:left-6 md:left-8';
      case 'bottom-right':
      default:
        return 'right-3 xs:right-4 sm:right-6 md:right-8';
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
            flex items-center justify-center transition-all duration-300
            hover:scale-110 active:scale-95 hover:shadow-xl`}
        >
          <ArrowUp className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;