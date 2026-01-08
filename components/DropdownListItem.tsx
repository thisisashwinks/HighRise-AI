'use client';

import React from 'react';

export type DropdownListItemSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';

export interface DropdownListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: DropdownListItemSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  avatar?: string;
  avatarAlt?: string;
  checkbox?: boolean;
  checked?: boolean;
  description?: string;
  descriptionIcon?: React.ReactNode;
  infoText?: string;
  tags?: string[];
  selected?: boolean;
  isGroupTitle?: boolean;
  isSearch?: boolean;
  isDivider?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const sizeConfig: Record<DropdownListItemSize, { 
  height: string; 
  padding: string; 
  text: string; 
  icon: string;
  avatar: string;
  description: string;
}> = {
  '3xs': { 
    height: 'h-6', 
    padding: 'px-2 py-1.5', 
    text: 'text-xs', 
    icon: 'w-3 h-3',
    avatar: 'w-4 h-4',
    description: 'text-xs'
  },
  '2xs': { 
    height: 'h-7', 
    padding: 'px-2.5 py-1.5', 
    text: 'text-xs', 
    icon: 'w-3.5 h-3.5',
    avatar: 'w-4 h-4',
    description: 'text-xs'
  },
  'xs': { 
    height: 'h-8', 
    padding: 'px-3 py-2', 
    text: 'text-sm', 
    icon: 'w-4 h-4',
    avatar: 'w-5 h-5',
    description: 'text-xs'
  },
  'sm': { 
    height: 'h-9', 
    padding: 'px-3 py-2', 
    text: 'text-sm', 
    icon: 'w-4 h-4',
    avatar: 'w-5 h-5',
    description: 'text-xs'
  },
  'md': { 
    height: 'h-10', 
    padding: 'px-4 py-2', 
    text: 'text-base', 
    icon: 'w-5 h-5',
    avatar: 'w-6 h-6',
    description: 'text-sm'
  },
  'lg': { 
    height: 'h-11', 
    padding: 'px-4 py-2.5', 
    text: 'text-base', 
    icon: 'w-5 h-5',
    avatar: 'w-6 h-6',
    description: 'text-sm'
  },
};

export const DropdownListItem: React.FC<DropdownListItemProps> = ({
  size = 'md',
  leadingIcon,
  trailingIcon,
  avatar,
  avatarAlt,
  checkbox = false,
  checked = false,
  description,
  descriptionIcon,
  infoText,
  tags,
  selected = false,
  isGroupTitle = false,
  isSearch = false,
  isDivider = false,
  children,
  className = '',
  disabled = false,
  ...buttonProps
}) => {
  const config = sizeConfig[size];
  const [isHovered, setIsHovered] = React.useState(false);

  // Divider variant
  if (isDivider) {
    return (
      <div 
        className={`w-full h-px bg-neutral-200 ${className}`}
        role="separator"
        aria-orientation="horizontal"
      />
    );
  }

  // Group title variant
  if (isGroupTitle) {
    return (
      <div
        className={`
          ${config.padding}
          ${config.text}
          font-semibold
          text-neutral-500
          uppercase
          tracking-wide
          ${className}
        `}
        role="group"
        aria-label={typeof children === 'string' ? children : undefined}
      >
        {children}
      </div>
    );
  }

  // Search variant
  if (isSearch) {
    return (
      <div
        className={`
          ${config.padding}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }

  const getItemClasses = () => {
    const baseClasses = `
      ${config.padding}
      w-full
      text-left
      flex items-center gap-2
      transition-colors duration-200
      focus:outline-none
      ${className}
    `;

    if (disabled) {
      return `${baseClasses} text-neutral-400 cursor-not-allowed opacity-50`;
    }

    if (selected) {
      return `${baseClasses} bg-primary-50 text-primary-700 hover:bg-primary-100`;
    }

    if (isHovered && !disabled) {
      return `${baseClasses} bg-neutral-50 text-neutral-900`;
    }

    return `${baseClasses} text-neutral-700`;
  };

  return (
    <button
      {...buttonProps}
      type="button"
      disabled={disabled}
      className={getItemClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="menuitem"
      aria-selected={selected}
      aria-checked={checkbox ? checked : undefined}
    >
      {/* Checkbox */}
      {checkbox && (
        <div className={`${config.icon} flex-shrink-0 flex items-center`}>
          <div
            className={`
              w-4 h-4 border-2 rounded flex items-center justify-center
              ${checked 
                ? 'bg-primary-600 border-primary-600' 
                : 'border-neutral-300 bg-white'
              }
              ${disabled ? 'opacity-50' : ''}
            `}
            role="checkbox"
            aria-checked={checked}
            aria-label={typeof children === 'string' ? children : 'Checkbox'}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Leading Icon */}
      {leadingIcon && !checkbox && (
        <span className={`${config.icon} text-neutral-600 flex-shrink-0`}>
          {leadingIcon}
        </span>
      )}

      {/* Avatar */}
      {avatar && (
        <img
          src={avatar}
          alt={avatarAlt || ''}
          className={`${config.avatar} rounded-full object-cover flex-shrink-0`}
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={`${config.text} flex items-center gap-2`}>
          <span className="truncate">{children}</span>
          {tags && tags.length > 0 && (
            <div className="flex gap-1 flex-shrink-0">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <div className={`${config.description} text-neutral-500 mt-0.5 flex items-start gap-1`}>
            {descriptionIcon && (
              <span className="w-3 h-3 flex-shrink-0 mt-0.5">{descriptionIcon}</span>
            )}
            <span 
              className="overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                maxHeight: '3.6em',
              }}
            >
              {description}
            </span>
          </div>
        )}

        {/* Info Text */}
        {infoText && (
          <div className={`${config.description} text-neutral-500 mt-0.5`}>
            {infoText}
          </div>
        )}
      </div>

      {/* Trailing Icon */}
      {trailingIcon && (
        <span className={`${config.icon} text-neutral-400 flex-shrink-0`}>
          {trailingIcon}
        </span>
      )}

      {/* Selected Indicator */}
      {selected && !checkbox && !trailingIcon && (
        <svg
          className={`${config.icon} text-primary-600 flex-shrink-0`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};
