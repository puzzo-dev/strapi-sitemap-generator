import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

interface GradientButtonProps extends ButtonProps {
  href?: string;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  href, 
  className = '',
  ...props 
}) => {
  const buttonClasses = cn(
    'gradient-bg text-white hover:opacity-90 transition-opacity',
    className
  );

  if (href) {
    // If it's an external link
    if (href.startsWith('http')) {
      return (
        <a href={href} className={cn('inline-block', buttonClasses)}>
          <Button className={buttonClasses} {...props}>
            {children}
          </Button>
        </a>
      );
    }
    
    // Internal link using wouter Link
    return (
      <Link href={href}>
        <a className="inline-block">
          <Button className={buttonClasses} {...props}>
            {children}
          </Button>
        </a>
      </Link>
    );
  }

  // Regular button
  return (
    <Button className={buttonClasses} {...props}>
      {children}
    </Button>
  );
};

export default GradientButton;
