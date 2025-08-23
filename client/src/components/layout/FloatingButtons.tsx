import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

/**
 * Container for floating action buttons
 * Places buttons side by side at the bottom of the screen
 */
const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-8 z-50 w-full flex justify-between px-8 pointer-events-none">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
      <div className="pointer-events-auto">
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