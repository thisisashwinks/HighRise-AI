'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
export type ButtonTheme = 'primary' | 'neutral' | 'destructive' | 'warning' | 'success';
export type ButtonSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonWidth = 'fit-content' | 'fill-container';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;
  width?: ButtonWidth;
  maxWidth?: string;
  iconOnly?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

const sizeConfig: Record<ButtonSize, { height: string; padding: string; iconPadding: string; text: string; icon: string }> = {
  '3xs': { height: 'h-6', padding: 'px-2 py-1', iconPadding: 'p-1.5', text: 'text-xs', icon: 'w-3 h-3' },
  '2xs': { height: 'h-7', padding: 'px-2.5 py-1.5', iconPadding: 'p-2', text: 'text-xs', icon: 'w-3.5 h-3.5' },
  'xs': { height: 'h-8', padding: 'px-3 py-1.5', iconPadding: 'p-2', text: 'text-sm', icon: 'w-4 h-4' },
  'sm': { height: 'h-9', padding: 'px-3 py-2', iconPadding: 'p-2', text: 'text-sm', icon: 'w-4 h-4' },
  'md': { height: 'h-10', padding: 'px-4 py-2', iconPadding: 'p-2.5', text: 'text-base', icon: 'w-5 h-5' },
  'lg': { height: 'h-11', padding: 'px-4 py-2.5', iconPadding: 'p-3', text: 'text-base', icon: 'w-5 h-5' },
  'xl': { height: 'h-12', padding: 'px-5 py-3', iconPadding: 'p-3', text: 'text-lg', icon: 'w-6 h-6' },
  '2xl': { height: 'h-[60px]', padding: 'px-6 py-3.5', iconPadding: 'p-3.5', text: 'text-xl', icon: 'w-6 h-6' },
};

const getVariantClasses = (
  variant: ButtonVariant,
  theme: ButtonTheme,
  disabled: boolean,
  isHovered: boolean,
  isFocused: boolean,
  isActive: boolean
) => {
  const baseClasses = 'transition-all duration-200 font-medium rounded-lg focus:outline-none';
  
  if (variant === 'link') {
    const linkClasses = {
      primary: {
        default: 'text-primary-600 bg-transparent',
        hover: 'text-primary-700 underline',
        focus: 'text-primary-700 underline ring-2 ring-primary-100',
        active: 'text-primary-800 underline',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
      neutral: {
        default: 'text-neutral-600 bg-transparent',
        hover: 'text-neutral-700 underline',
        focus: 'text-neutral-700 underline ring-2 ring-neutral-100',
        active: 'text-neutral-800 underline',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
      destructive: {
        default: 'text-destructive-600 bg-transparent',
        hover: 'text-destructive-700 underline',
        focus: 'text-destructive-700 underline ring-2 ring-destructive-100',
        active: 'text-destructive-800 underline',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
      warning: {
        default: 'text-warning-600 bg-transparent',
        hover: 'text-warning-700 underline',
        focus: 'text-warning-700 underline ring-2 ring-warning-100',
        active: 'text-warning-800 underline',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
      success: {
        default: 'text-success-600 bg-transparent',
        hover: 'text-success-700 underline',
        focus: 'text-success-700 underline ring-2 ring-success-100',
        active: 'text-success-800 underline',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
    };
    
    if (disabled) return `${baseClasses} ${linkClasses[theme].disabled}`;
    if (isActive) return `${baseClasses} ${linkClasses[theme].active}`;
    if (isFocused) return `${baseClasses} ${linkClasses[theme].focus}`;
    if (isHovered) return `${baseClasses} ${linkClasses[theme].hover}`;
    return `${baseClasses} ${linkClasses[theme].default}`;
  }

  if (variant === 'ghost') {
    const ghostClasses = {
      primary: {
        default: `text-primary-600 bg-transparent`,
        hover: `text-primary-700 bg-primary-50`,
        focus: `text-primary-700 bg-primary-50 ring-2 ring-primary-100`,
        active: `text-primary-800 bg-primary-100`,
        disabled: `text-neutral-400 bg-transparent cursor-not-allowed`,
      },
      neutral: {
        default: `text-neutral-600 bg-transparent`,
        hover: `text-neutral-700 bg-neutral-50`,
        focus: `text-neutral-700 bg-neutral-50 ring-2 ring-neutral-100`,
        active: `text-neutral-800 bg-neutral-100`,
        disabled: `text-neutral-400 bg-transparent cursor-not-allowed`,
      },
      destructive: {
        default: `text-destructive-600 bg-transparent`,
        hover: `text-destructive-700 bg-destructive-50`,
        focus: `text-destructive-700 bg-destructive-50 ring-2 ring-destructive-100`,
        active: `text-destructive-800 bg-destructive-100`,
        disabled: `text-neutral-400 bg-transparent cursor-not-allowed`,
      },
      warning: {
        default: `text-warning-600 bg-transparent`,
        hover: `text-warning-700 bg-warning-50`,
        focus: `text-warning-700 bg-warning-50 ring-2 ring-warning-100`,
        active: `text-warning-800 bg-warning-100`,
        disabled: `text-neutral-400 bg-transparent cursor-not-allowed`,
      },
      success: {
        default: `text-success-600 bg-transparent`,
        hover: `text-success-700 bg-success-50`,
        focus: `text-success-700 bg-success-50 ring-2 ring-success-100`,
        active: `text-success-800 bg-success-100`,
        disabled: `text-neutral-400 bg-transparent cursor-not-allowed`,
      },
    };
    
    if (disabled) return `${baseClasses} ${ghostClasses[theme].disabled}`;
    if (isActive) return `${baseClasses} ${ghostClasses[theme].active}`;
    if (isFocused) return `${baseClasses} ${ghostClasses[theme].focus}`;
    if (isHovered) return `${baseClasses} ${ghostClasses[theme].hover}`;
    return `${baseClasses} ${ghostClasses[theme].default}`;
  }

  if (variant === 'tertiary') {
    const tertiaryClasses = {
      primary: {
        default: `text-primary-600 bg-transparent border border-primary-300`,
        hover: `text-primary-700 bg-primary-50 border-primary-400`,
        focus: `text-primary-700 bg-primary-50 border-primary-400 ring-2 ring-primary-100`,
        active: `text-primary-800 bg-primary-100 border-primary-500`,
        disabled: `text-neutral-400 bg-transparent border-neutral-300 cursor-not-allowed`,
      },
      neutral: {
        default: `text-neutral-600 bg-transparent border border-neutral-300`,
        hover: `text-neutral-700 bg-neutral-50 border-neutral-400`,
        focus: `text-neutral-700 bg-neutral-50 border-neutral-400 ring-2 ring-neutral-100`,
        active: `text-neutral-800 bg-neutral-100 border-neutral-500`,
        disabled: `text-neutral-400 bg-transparent border-neutral-300 cursor-not-allowed`,
      },
      destructive: {
        default: `text-destructive-600 bg-transparent border border-destructive-300`,
        hover: `text-destructive-700 bg-destructive-50 border-destructive-400`,
        focus: `text-destructive-700 bg-destructive-50 border-destructive-400 ring-2 ring-destructive-100`,
        active: `text-destructive-800 bg-destructive-100 border-destructive-500`,
        disabled: `text-neutral-400 bg-transparent border-neutral-300 cursor-not-allowed`,
      },
      warning: {
        default: `text-warning-600 bg-transparent border border-warning-300`,
        hover: `text-warning-700 bg-warning-50 border-warning-400`,
        focus: `text-warning-700 bg-warning-50 border-warning-400 ring-2 ring-warning-100`,
        active: `text-warning-800 bg-warning-100 border-warning-500`,
        disabled: `text-neutral-400 bg-transparent border-neutral-300 cursor-not-allowed`,
      },
      success: {
        default: `text-success-600 bg-transparent border border-success-300`,
        hover: `text-success-700 bg-success-50 border-success-400`,
        focus: `text-success-700 bg-success-50 border-success-400 ring-2 ring-success-100`,
        active: `text-success-800 bg-success-100 border-success-500`,
        disabled: `text-neutral-400 bg-transparent border-neutral-300 cursor-not-allowed`,
      },
    };
    
    if (disabled) return `${baseClasses} ${tertiaryClasses[theme].disabled}`;
    if (isActive) return `${baseClasses} ${tertiaryClasses[theme].active}`;
    if (isFocused) return `${baseClasses} ${tertiaryClasses[theme].focus}`;
    if (isHovered) return `${baseClasses} ${tertiaryClasses[theme].hover}`;
    return `${baseClasses} ${tertiaryClasses[theme].default}`;
  }

  if (variant === 'secondary') {
    const secondaryClasses = {
      primary: {
        default: `text-primary-600 bg-primary-50 border border-primary-200`,
        hover: `text-primary-700 bg-primary-100 border-primary-300`,
        focus: `text-primary-700 bg-primary-100 border-primary-300 ring-2 ring-primary-100`,
        active: `text-primary-800 bg-primary-200 border-primary-400`,
        disabled: `text-neutral-400 bg-neutral-100 border-neutral-300 cursor-not-allowed`,
      },
      neutral: {
        default: `text-neutral-600 bg-neutral-50 border border-neutral-200`,
        hover: `text-neutral-700 bg-neutral-100 border-neutral-300`,
        focus: `text-neutral-700 bg-neutral-100 border-neutral-300 ring-2 ring-neutral-100`,
        active: `text-neutral-800 bg-neutral-200 border-neutral-400`,
        disabled: `text-neutral-400 bg-neutral-100 border-neutral-300 cursor-not-allowed`,
      },
      destructive: {
        default: `text-destructive-600 bg-destructive-50 border border-destructive-200`,
        hover: `text-destructive-700 bg-destructive-100 border-destructive-300`,
        focus: `text-destructive-700 bg-destructive-100 border-destructive-300 ring-2 ring-destructive-100`,
        active: `text-destructive-800 bg-destructive-200 border-destructive-400`,
        disabled: `text-neutral-400 bg-neutral-100 border-neutral-300 cursor-not-allowed`,
      },
      warning: {
        default: `text-warning-600 bg-warning-50 border border-warning-200`,
        hover: `text-warning-700 bg-warning-100 border-warning-300`,
        focus: `text-warning-700 bg-warning-100 border-warning-300 ring-2 ring-warning-100`,
        active: `text-warning-800 bg-warning-200 border-warning-400`,
        disabled: `text-neutral-400 bg-neutral-100 border-neutral-300 cursor-not-allowed`,
      },
      success: {
        default: `text-success-600 bg-success-50 border border-success-200`,
        hover: `text-success-700 bg-success-100 border-success-300`,
        focus: `text-success-700 bg-success-100 border-success-300 ring-2 ring-success-100`,
        active: `text-success-800 bg-success-200 border-success-400`,
        disabled: `text-neutral-400 bg-neutral-100 border-neutral-300 cursor-not-allowed`,
      },
    };
    
    if (disabled) return `${baseClasses} ${secondaryClasses[theme].disabled}`;
    if (isActive) return `${baseClasses} ${secondaryClasses[theme].active}`;
    if (isFocused) return `${baseClasses} ${secondaryClasses[theme].focus}`;
    if (isHovered) return `${baseClasses} ${secondaryClasses[theme].hover}`;
    return `${baseClasses} ${secondaryClasses[theme].default}`;
  }

  // Primary variant (default)
  const primaryClasses = {
    primary: {
      default: `text-white bg-primary-600`,
      hover: `text-white bg-primary-700`,
      focus: `text-white bg-primary-700 ring-2 ring-primary-100`,
      active: `text-white bg-primary-800`,
      disabled: `text-neutral-400 bg-neutral-200 cursor-not-allowed`,
    },
    neutral: {
      default: `text-white bg-neutral-600`,
      hover: `text-white bg-neutral-700`,
      focus: `text-white bg-neutral-700 ring-2 ring-neutral-100`,
      active: `text-white bg-neutral-800`,
      disabled: `text-neutral-400 bg-neutral-200 cursor-not-allowed`,
    },
    destructive: {
      default: `text-white bg-destructive-600`,
      hover: `text-white bg-destructive-700`,
      focus: `text-white bg-destructive-700 ring-2 ring-destructive-100`,
      active: `text-white bg-destructive-800`,
      disabled: `text-neutral-400 bg-neutral-200 cursor-not-allowed`,
    },
    warning: {
      default: `text-white bg-warning-600`,
      hover: `text-white bg-warning-700`,
      focus: `text-white bg-warning-700 ring-2 ring-warning-100`,
      active: `text-white bg-warning-800`,
      disabled: `text-neutral-400 bg-neutral-200 cursor-not-allowed`,
    },
    success: {
      default: `text-white bg-success-600`,
      hover: `text-white bg-success-700`,
      focus: `text-white bg-success-700 ring-2 ring-success-100`,
      active: `text-white bg-success-800`,
      disabled: `text-neutral-400 bg-neutral-200 cursor-not-allowed`,
    },
  };
  
  if (disabled) return `${baseClasses} ${primaryClasses[theme].disabled}`;
  if (isActive) return `${baseClasses} ${primaryClasses[theme].active}`;
  if (isFocused) return `${baseClasses} ${primaryClasses[theme].focus}`;
  if (isHovered) return `${baseClasses} ${primaryClasses[theme].hover}`;
  return `${baseClasses} ${primaryClasses[theme].default}`;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  theme = 'primary',
  size = 'md',
  width = 'fit-content',
  maxWidth,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  children,
  className = '',
  labelClassName = '',
  disabled = false,
  ...buttonProps
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const config = sizeConfig[size];
  const hasContent = children && !iconOnly;
  const hasIcons = leadingIcon || trailingIcon;
  const isIconOnlyButton = iconOnly || (!children && (leadingIcon || trailingIcon));

  // Calculate max-width based on 16 characters default
  const defaultMaxWidth = maxWidth || (width === 'fit-content' ? 'max-w-[16ch]' : undefined);

  const buttonClasses = `
    ${config.height}
    ${isIconOnlyButton ? config.iconPadding : config.padding}
    ${config.text}
    ${getVariantClasses(variant, theme, disabled, isHovered, isFocused, isActive)}
    ${width === 'fill-container' ? 'w-full' : ''}
    ${defaultMaxWidth ? defaultMaxWidth : ''}
    flex items-center justify-center gap-2
    ${hasContent && hasIcons ? 'gap-2' : ''}
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const labelClasses = `
    ${labelClassName}
    ${hasContent && defaultMaxWidth ? 'truncate' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={(e) => {
        setIsFocused(true);
        buttonProps.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        buttonProps.onBlur?.(e);
      }}
      onMouseDown={(e) => {
        setIsActive(true);
        buttonProps.onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setIsActive(false);
        buttonProps.onMouseUp?.(e);
      }}
      aria-label={isIconOnlyButton && typeof children === 'string' ? children : undefined}
    >
      {leadingIcon && (
        <span className={config.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {hasContent && (
        <span className={labelClasses}>
          {children}
        </span>
      )}
      {trailingIcon && (
        <span className={config.icon} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

