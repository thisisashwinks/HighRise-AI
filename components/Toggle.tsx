'use client';

import React, { useState, useRef } from 'react';

export type ToggleSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type ToggleState = 'Default' | 'Hover' | 'Focus' | 'Disabled';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onChange'> {
  size?: ToggleSize;
  checked?: boolean;
  error?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  labelClassName?: string;
}

const sizeConfig: Record<ToggleSize, {
  trackHeight: string;
  trackWidth: string;
  thumbSize: string;
  thumbOffset: string;
  borderRadius: string;
}> = {
  '3xs': {
    trackHeight: 'h-4',
    trackWidth: 'w-7',
    thumbSize: 'w-3 h-3',
    thumbOffset: 'translate-x-[2px]',
    borderRadius: 'rounded-[12px]',
  },
  '2xs': {
    trackHeight: 'h-4',
    trackWidth: 'w-7',
    thumbSize: 'w-3 h-3',
    thumbOffset: 'translate-x-[2px]',
    borderRadius: 'rounded-[12px]',
  },
  'xs': {
    trackHeight: 'h-4',
    trackWidth: 'w-7',
    thumbSize: 'w-3 h-3',
    thumbOffset: 'translate-x-[2px]',
    borderRadius: 'rounded-[12px]',
  },
  'sm': {
    trackHeight: 'h-5',
    trackWidth: 'w-9',
    thumbSize: 'w-4 h-4',
    thumbOffset: 'translate-x-[2px]',
    borderRadius: 'rounded-[12px]',
  },
  'md': {
    trackHeight: 'h-6',
    trackWidth: 'w-11',
    thumbSize: 'w-4 h-4',
    thumbOffset: 'translate-x-[2px]',
    borderRadius: 'rounded-[12px]',
  },
  'lg': {
    trackHeight: 'h-6',
    trackWidth: 'w-11',
    thumbSize: 'w-5 h-5',
    thumbOffset: 'translate-x-[2px]',
    borderRadius: 'rounded-[12px]',
  },
};

export const Toggle: React.FC<ToggleProps> = ({
  size = 'sm',
  checked = false,
  error = false,
  label,
  disabled = false,
  onChange,
  className = '',
  labelClassName = '',
  ...buttonProps
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const config = sizeConfig[size];
  const isDisabled = disabled;
  const effectiveState: ToggleState = isDisabled ? 'Disabled' : isFocused ? 'Focus' : isHovered ? 'Hover' : 'Default';

  const handleClick = () => {
    if (isDisabled) return;
    if (onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
    buttonProps.onKeyDown?.(e);
  };

  // Get track styling based on state
  const getTrackClasses = () => {
    const baseClasses = `${config.trackHeight} ${config.trackWidth} ${config.borderRadius} relative transition-all duration-200 flex items-center p-[2px]`;
    
    if (isDisabled) {
      return `${baseClasses} bg-neutral-100 cursor-not-allowed`;
    }

    if (error) {
      const borderClass = 'border border-[#f04438]';
      if (checked) {
        return `${baseClasses} ${borderClass} bg-[#6938ef]`;
      }
      return `${baseClasses} ${borderClass} bg-neutral-100`;
    }

    if (effectiveState === 'Focus') {
      const focusRing = 'shadow-[0px_0px_0px_4px_#ebe9fe]';
      if (checked) {
        return `${baseClasses} ${focusRing} bg-[#6938ef]`;
      }
      return `${baseClasses} ${focusRing} bg-neutral-50`;
    }

    if (effectiveState === 'Hover') {
      if (checked) {
        return `${baseClasses} bg-[#5925dc] cursor-pointer`;
      }
      return `${baseClasses} bg-neutral-200 cursor-pointer`;
    }

    // Default state
    if (checked) {
      return `${baseClasses} bg-[#6938ef]`;
    }
    return `${baseClasses} bg-neutral-100`;
  };

  const trackClasses = getTrackClasses();
  const toggleId = buttonProps.id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button
        {...buttonProps}
        ref={buttonRef}
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={isDisabled}
        aria-invalid={error}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={(e) => {
          setIsFocused(true);
          buttonProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          buttonProps.onBlur?.(e);
        }}
        className={`${trackClasses} ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'} focus:outline-none`}
      >
        {/* Thumb */}
        <div
          className={`${config.thumbSize} bg-white rounded-full transition-transform duration-200 ${
            checked 
              ? size === 'lg' 
                ? 'translate-x-[20px]' 
                : size === 'md'
                ? 'translate-x-[24px]'
                : size === 'sm'
                ? 'translate-x-[16px]'
                : 'translate-x-[12px]'
              : config.thumbOffset
          }`}
        />
      </button>

      {label && (
        <label
          htmlFor={toggleId}
          className={`cursor-pointer ${
            isDisabled ? 'text-neutral-400' : 'text-neutral-900'
          } ${
            size === 'lg' || size === 'md' ? 'text-base' :
            size === 'sm' ? 'text-sm' :
            size === 'xs' ? 'text-[13px]' :
            size === '2xs' ? 'text-xs' :
            'text-[11px]'
          } ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
