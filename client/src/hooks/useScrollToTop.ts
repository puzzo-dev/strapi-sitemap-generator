import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook that scrolls the window to the top
 * whenever the location (route) changes, with special handling for hash anchors
 */
export function useScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // If there's a hash in the URL (anchor link), scroll to that element
    // Otherwise, scroll to the top of the page
    
    if (window.location.hash) {
      // Attempt to find the element with the ID matching the hash
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // Add a small delay to ensure the DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      } else {
        // If element doesn't exist, scroll to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    } else {
      // No hash in URL, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [location]);
  
  return null;
}