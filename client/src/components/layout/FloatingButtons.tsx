import React from 'react';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

/**
 * Container for floating action buttons
 * Places buttons at the bottom right of the screen
 */
const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
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