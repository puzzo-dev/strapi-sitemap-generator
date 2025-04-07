import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, HTMLAttributes, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

// Create a custom type for onClick handlers that works with any HTML element
type ClickHandler = (event: MouseEvent<Element>) => void;

// Base props shared by all variants
interface BaseGradientButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'light';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  as?: 'button' | 'a' | 'div' | 'span';
  onClick?: ClickHandler;
  href?: string;
}

// Type for button variant
type ButtonGradientProps = BaseGradientButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseGradientButtonProps>;

// Type for anchor variant
type AnchorGradientProps = BaseGradientButtonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseGradientButtonProps>;

// Type for div variant
type DivGradientProps = BaseGradientButtonProps & Omit<HTMLAttributes<HTMLDivElement>, keyof BaseGradientButtonProps>;

// Type for span variant
type SpanGradientProps = BaseGradientButtonProps & Omit<HTMLAttributes<HTMLSpanElement>, keyof BaseGradientButtonProps>;

// Union type for all possible props
type GradientButtonProps = ButtonGradientProps | AnchorGradientProps | DivGradientProps | SpanGradientProps;

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  href, 
  className = '',
  variant = 'default',
  size = 'default',
  endIcon,
  startIcon,
  fullWidth = false,
  ...props 
}) => {
  // Style variants
  const getButtonClasses = () => {
    let baseClasses = 'rounded-lg font-medium transition-all duration-300 ease-in-out flex items-center justify-center relative overflow-hidden';
    
    // Size variations
    const sizeClasses = {
      sm: 'text-sm px-4 py-2',
      default: 'px-6 py-3',
      lg: 'text-lg px-8 py-4',
      icon: 'p-2'
    };
    
    // Variant styles
    const variantClasses = {
      default: 'gradient-bg text-white hover:shadow-lg hover:shadow-blue-500/20 hover:translate-y-[-2px] active:translate-y-0 active:shadow-md hover:scale-105 before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:blur-xl hover:before:opacity-100 before:transition-opacity',
      outline: 'bg-transparent border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 hover:translate-y-[-2px] hover:scale-105 active:translate-y-0 hover:border-blue-600 dark:hover:border-blue-300',
      ghost: 'bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:translate-y-[-2px] hover:scale-105 active:translate-y-0',
      light: 'bg-white text-blue-600 hover:bg-gray-50 shadow-md hover:shadow-lg hover:translate-y-[-2px] hover:scale-105 active:translate-y-0'
    };
    
    // For fullWidth buttons that need to be smaller and centered on desktop
    const fullWidthClasses = fullWidth
      ? 'w-full md:w-auto md:mx-auto'
      : '';
    
    return cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      fullWidthClasses,
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
          onClick={props.onClick as AnchorGradientProps['onClick']}
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

  // Render based on as prop
  if (props.as === 'div') {
    const { onClick, ...divProps } = props as DivGradientProps;
    return (
      <div 
        className={cn(getButtonClasses(), "cursor-pointer")} 
        onClick={onClick}
        {...divProps}
      >
        {buttonContent}
      </div>
    );
  } else if (props.as === 'span') {
    const { onClick, ...spanProps } = props as SpanGradientProps;
    return (
      <span 
        className={cn(getButtonClasses(), "cursor-pointer")} 
        onClick={onClick}
        {...spanProps}
      >
        {buttonContent}
      </span>
    );
  } else if (props.as === 'a') {
    const { href: propsHref, target, rel, onClick, ...anchorProps } = props as AnchorGradientProps;
    return (
      <a 
        className={getButtonClasses()} 
        href={propsHref} 
        target={target} 
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
        {...anchorProps}
      >
        {buttonContent}
      </a>
    );
  }
  
  // Default to button
  const { as, onClick, ...buttonProps } = props as ButtonGradientProps;
  return (
    <button 
      className={getButtonClasses()} 
      onClick={onClick}
      {...buttonProps}
    >
      {buttonContent}
    </button>
  );
};

export default GradientButton;
