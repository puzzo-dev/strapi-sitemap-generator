import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

/**
 * Container for floating action buttons
 * Places buttons side by side at the bottom of the screen
 */
const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-4 xs:bottom-6 sm:bottom-8 lg:bottom-10 z-50 w-full flex justify-between px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pointer-events-none">
      <div className="pointer-events-auto transform transition-transform hover:scale-105">
        <ThemeToggle />
      </div>
      <div className="pointer-events-auto transform transition-transform hover:scale-105">
        <ScrollToTopButton 
          threshold={300}
          size="md"
          position="bottom-right"
          ariaLabel="Scroll back to top"
        />
      </div>
    </div>
  );
};

export default FloatingButtons;