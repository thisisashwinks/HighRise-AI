'use client';

import React from 'react';

export type ContentSwitcherItemSize = '2xs' | '3xs' | 'xs' | 'sm' | 'md' | 'lg';

export interface ContentSwitcherItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  selected?: boolean;
  size?: ContentSwitcherItemSize;
  iconOnly?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const sizeConfig: Record<ContentSwitcherItemSize, { 
  height: string; 
  padding: string; 
  iconPadding: string; 
  text: string; 
  icon: string;
  gap: string;
}> = {
  '3xs': { 
    height: 'h-6', 
    padding: 'px-1.5 py-2', 
    iconPadding: 'p-0', 
    text: 'text-[11px] leading-4', 
    icon: 'w-3.5 h-3.5',
    gap: 'gap-1'
  },
  '2xs': { 
    height: 'h-7', 
    padding: 'p-2', 
    iconPadding: 'p-0', 
    text: 'text-xs leading-[17px]', 
    icon: 'w-4 h-4',
    gap: 'gap-1.5'
  },
  'xs': { 
    height: 'h-8', 
    padding: 'px-2.5 py-1.5', 
    iconPadding: 'p-0', 
    text: 'text-[13px] leading-[18px]', 
    icon: 'w-4 h-4',
    gap: 'gap-2'
  },
  'sm': { 
    height: 'h-9', 
    padding: 'px-3.5 py-2', 
    iconPadding: 'p-0', 
    text: 'text-sm leading-5', 
    icon: 'w-5 h-5',
    gap: 'gap-2'
  },
  'md': { 
    height: 'h-10', 
    padding: 'px-4 py-2.5', 
    iconPadding: 'p-0', 
    text: 'text-sm leading-5', 
    icon: 'w-5 h-5',
    gap: 'gap-2'
  },
  'lg': { 
    height: 'h-11', 
    padding: 'px-4.5 py-2.5', 
    iconPadding: 'p-0', 
    text: 'text-base leading-6', 
    icon: 'w-5 h-5',
    gap: 'gap-2'
  },
};

export const ContentSwitcherItem: React.FC<ContentSwitcherItemProps> = ({
  icon,
  selected = false,
  size = '3xs',
  iconOnly = false,
  children,
  className = '',
  disabled = false,
  ...buttonProps
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const config = sizeConfig[size];
  const hasIcon = !!icon;
  const hasText = !!children && !iconOnly;

  // Determine state for styling
  const state = isHovered ? 'Hover' : 'Default';

  // Base classes
  const baseClasses = `
    ${config.height}
    ${iconOnly ? 'w-full' : ''}
    ${iconOnly ? config.iconPadding : config.padding}
    ${config.text}
    font-semibold
    transition-all
    flex items-center justify-center
    ${hasIcon && hasText ? config.gap : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Selected state classes
  const selectedClasses = selected
    ? state === 'Hover'
      ? 'bg-purple-100 border border-purple-200 text-purple-700'
      : 'bg-purple-50 border border-purple-50 text-purple-700'
    : state === 'Hover'
    ? 'bg-neutral-50 border-r border-neutral-300 text-neutral-600 shadow-sm'
    : 'bg-white border-r border-neutral-300 text-neutral-600 shadow-sm';

  // Icon-only sizing
  const iconOnlySize = iconOnly
    ? {
        '3xs': 'w-6 h-6',
        '2xs': 'w-7 h-7',
        'xs': 'w-8 h-8',
        'sm': 'w-9 h-9',
        'md': 'w-10 h-10',
        'lg': 'w-11 h-11',
      }[size]
    : '';

  const buttonClasses = `
    ${baseClasses}
    ${selectedClasses}
    ${iconOnly ? iconOnlySize : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={selected}
      role="tab"
    >
      {hasIcon && (
        <span className={`${config.icon} shrink-0`} aria-hidden="true">
          {icon}
        </span>
      )}
      {hasText && (
        <span className="shrink-0 whitespace-nowrap">
          {children}
        </span>
      )}
    </button>
  );
};
