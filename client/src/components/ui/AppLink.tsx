import { AppLinkProps } from '@/lib/types';
import React, { useCallback } from 'react';
import { useLocation } from 'wouter';



/**
 * A custom Link component that scrolls to the top of the page on navigation
 */
const AppLink: React.FC<AppLinkProps> = ({ href, children, className, style, onClick }) => {
  const [, navigate] = useLocation();

  console.log(href);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only apply our custom logic for internal links that don't have hash
    if (
      href.startsWith('/') &&
      !href.includes('#') &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey
    ) {
      e.preventDefault();

      // Navigate to the route
      navigate(href);

      // Scroll to the top
      window.scrollTo(0, 0);
    }

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  }, [href, navigate, onClick]);

  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default AppLink;