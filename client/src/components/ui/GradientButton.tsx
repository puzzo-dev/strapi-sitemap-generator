import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'light';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  href, 
  className = '',
  variant = 'default',
  size = 'default',
  endIcon,
  startIcon,
  ...props 
}) => {
  // Style variants
  const getButtonClasses = () => {
    let baseClasses = 'rounded-lg font-medium transition-all duration-700 ease-in-out flex items-center justify-center';
    
    // Size variations
    const sizeClasses = {
      sm: 'text-sm px-4 py-2',
      default: 'px-6 py-3',
      lg: 'text-lg px-8 py-4',
      icon: 'p-2'
    };
    
    // Variant styles
    const variantClasses = {
      default: 'gradient-bg text-white hover:shadow-lg hover:shadow-blue-500/20 hover:translate-y-[-2px] active:translate-y-0 active:shadow-md',
      outline: 'bg-transparent border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 hover:translate-y-[-2px] active:translate-y-0',
      ghost: 'bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:translate-y-[-2px] active:translate-y-0',
      light: 'bg-white text-blue-600 hover:bg-gray-50 shadow-md hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0'
    };
    
    return cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      className
    );
  };

  const buttonContent = (
    <>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </>
  );

  if (href) {
    // If it's an external link
    if (href.startsWith('http')) {
      return (
        <a 
          href={href} 
          className={getButtonClasses()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonContent}
        </a>
      );
    }
    
    // Internal link using wouter Link
    return (
      <Link href={href}>
        <div className={cn(getButtonClasses(), "cursor-pointer")}>
          {buttonContent}
        </div>
      </Link>
    );
  }

  // Regular button
  return (
    <button className={getButtonClasses()} {...props}>
      {buttonContent}
    </button>
  );
};

export default GradientButton;
