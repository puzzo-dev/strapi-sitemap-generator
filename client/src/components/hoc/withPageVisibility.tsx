import React from 'react';
import { PageContent } from '@/lib/types/core';
import { isPageVisible } from '@/lib/utils/visibility-helpers';
import NotFound from '@/pages/not-found';

/**
 * Higher-order component that wraps pages to check visibility
 * If a page is marked as not visible, it renders a 404 page instead
 */

interface WithPageVisibilityProps {
  pageContent?: PageContent | null;
}

export function withPageVisibility<P extends WithPageVisibilityProps>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithPageVisibilityComponent = (props: P) => {
    const { pageContent } = props;

    // If page content exists but is not visible, show 404
    if (pageContent && !isPageVisible(pageContent)) {
      return <NotFound />;
    }

    // Otherwise render the original component
    return <WrappedComponent {...props} />;
  };

  WithPageVisibilityComponent.displayName = `withPageVisibility(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithPageVisibilityComponent;
}

/**
 * Hook to check if current page should be visible
 * Can be used within page components for additional visibility logic
 */
export const usePageVisibility = (pageContent: PageContent | null | undefined): boolean => {
  return isPageVisible(pageContent);
};

export default withPageVisibility;
