import React, { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DialogProps } from "@radix-ui/react-dialog";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { sheetVariants } from "@/components/ui/sheet";

// UI Component Types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export interface BaseGradientButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'light';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  as?: 'button' | 'a' | 'div' | 'span';
  onClick?: (event: React.MouseEvent<Element>) => void;
  href?: string;
}

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

export interface CommandDialogProps extends DialogProps { }

export interface SemanticSectionProps {
  as?: 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav' | 'div';
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  role?: string;
  itemScope?: boolean;
  itemType?: string;
  itemProp?: string;
  ariaHidden?: boolean;
  tabIndex?: number;
  dataTestId?: string;
}

export interface LoadingSkeletonProps {
  lines?: number;
  variant?: 'text' | 'card' | 'image';
}

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export interface ScrollToTopButtonProps {
  threshold?: number;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left';
  ariaLabel?: string;
}

export interface DynamicContentProps {
  content: string | { [key: string]: any };
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface LanguageSelectorProps {
  compact?: boolean;
}

export interface LanguageButtonProps {
  variant?: "ghost" | "link" | "default" | "destructive" | "outline" | "secondary";
  size?: "icon" | "default" | "sm" | "lg";
  className?: string;
}

export interface NewsletterFormProps {
  className?: string;
}

// Generic card props interface to reduce duplication
export interface CardProps<T> {
  item: T;
  compact?: boolean;
  featured?: boolean;
  isReversed?: boolean;
  className?: string;
}

// Specific card type aliases for consistency
export type ProductCardProps = CardProps<import('./content').ProductProps>;
export type ServiceCardProps = CardProps<import('./content').ServiceProps>;
export type BlogCardProps = CardProps<import('./content').BlogPost>;
export type BlogPostCardProps = CardProps<import('./content').BlogPost>;
 