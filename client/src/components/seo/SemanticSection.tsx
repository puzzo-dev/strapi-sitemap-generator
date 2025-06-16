import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SemanticSectionProps } from '@/lib/types';



/**
 * Semantic HTML section with accessibility and structured data attributes
 * Enhances SEO by providing proper HTML semantics and microdata attributes
 */
const SemanticSection: React.FC<SemanticSectionProps> = ({
  as: Component = 'section',
  children,
  className,
  id,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  role,
  itemScope,
  itemType,
  itemProp,
  ariaHidden,
  tabIndex,
  dataTestId,
}) => {
  // Build the props object
  const props: any = {
    id,
    className: cn(className), // Use utility function for class merging
    role,
    'data-testid': dataTestId,
  };
  
  // Add optional accessibility attributes
  if (ariaLabel) props['aria-label'] = ariaLabel;
  if (ariaLabelledby) props['aria-labelledby'] = ariaLabelledby;
  if (ariaDescribedby) props['aria-describedby'] = ariaDescribedby;
  if (ariaHidden !== undefined) props['aria-hidden'] = ariaHidden.toString();
  if (tabIndex !== undefined) props['tabIndex'] = tabIndex;
  
  // Add optional microdata/schema.org attributes
  if (itemScope) props.itemScope = true;
  if (itemType) props.itemType = `http://schema.org/${itemType}`;
  if (itemProp) props.itemProp = itemProp;
  
  return <Component {...props}>{children}</Component>;
};

export default SemanticSection;