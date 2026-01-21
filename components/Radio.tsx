'use client';

import React, { useState, useRef } from 'react';

export type RadioSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type RadioState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: RadioSize;
  checked?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  labelPosition?: 'left' | 'right';
  className?: string;
  labelClassName?: string;
  name?: string;
  value?: string;
}

// Radio dot icon SVG for different sizes
const RadioDot: React.FC<{ size: RadioSize }> = ({ size }) => {
  // The dot is positioned at 30% inset for md/lg, 31.25% for smaller sizes
  const dotSizes: Record<RadioSize, { size: string; inset: string }> = {
    '3xs': { size: 'w-1 h-1', inset: 'inset-[31.25%]' },
    '2xs': { size: 'w-1 h-1', inset: 'inset-[31.25%]' },
    'xs': { size: 'w-1 h-1', inset: 'inset-[31.25%]' },
    'sm': { size: 'w-1.5 h-1.5', inset: 'inset-[31.25%]' },
    'md': { size: 'w-1.5 h-1.5', inset: 'inset-[30%]' },
    'lg': { size: 'w-2 h-2', inset: 'inset-[30%]' },
  };

  const dot = dotSizes[size];

  return (
    <div className={`absolute ${dot.inset} flex items-center justify-center`}>
      <div className={`${dot.size} bg-white rounded-full`} />
    </div>
  );
};

const sizeConfig: Record<RadioSize, { 
  size: string; 
  borderRadius: string;
}> = {
  '3xs': { size: 'w-2.5 h-2.5', borderRadius: 'rounded-full' },
  '2xs': { size: 'w-3 h-3', borderRadius: 'rounded-full' },
  'xs': { size: 'w-3.5 h-3.5', borderRadius: 'rounded-full' },
  'sm': { size: 'w-4 h-4', borderRadius: 'rounded-full' },
  'md': { size: 'w-[18px] h-[18px]', borderRadius: 'rounded-full' },
  'lg': { size: 'w-5 h-5', borderRadius: 'rounded-full' },
};

export const Radio: React.FC<RadioProps> = ({
  size = 'sm',
  checked = false,
  error = false,
  label,
  helperText,
  labelPosition = 'right',
  className = '',
  labelClassName = '',
  disabled = false,
  name,
  value,
  onChange,
  ...inputProps
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const config = sizeConfig[size];
  const isDisabled = disabled;
  const effectiveState: RadioState = isDisabled ? 'Disabled' : isFocused ? 'Focused' : isHovered ? 'Hover' : 'Default';

  // Get radio styling based on state
  const getRadioClasses = () => {
    const baseClasses = `${config.size} ${config.borderRadius} border transition-all duration-200 flex items-center justify-center relative overflow-hidden`;
    
    if (isDisabled) {
      if (checked) {
        return `${baseClasses} bg-neutral-300 border-neutral-300`;
      }
      return `${baseClasses} bg-neutral-100 border-neutral-300`;
    }

    if (error) {
      if (checked) {
        return `${baseClasses} bg-[#6938ef] border-[#f04438]`;
      }
      return `${baseClasses} bg-white border-[#f04438]`;
    }

    if (effectiveState === 'Focused') {
      const focusRingClass = size === '3xs' || size === '2xs' 
        ? 'shadow-[0px_0px_0px_2px_#ebe9fe]' 
        : 'shadow-[0px_0px_0px_4px_#ebe9fe]';
      if (checked) {
        return `${baseClasses} bg-[#6938ef] border-[#6938ef] ${focusRingClass}`;
      }
      return `${baseClasses} bg-white border-[#bdb4fe] ${focusRingClass}`;
    }

    if (effectiveState === 'Hover') {
      if (checked) {
        return `${baseClasses} bg-[#7a5af8] border-[#7a5af8] cursor-pointer`;
      }
      return `${baseClasses} bg-[#ebe9fe] border-[#6938ef] cursor-pointer`;
    }

    // Default state
    if (checked) {
      return `${baseClasses} bg-[#6938ef] border-[#6938ef]`;
    }
    return `${baseClasses} bg-white border-neutral-400`;
  };

  const radioClasses = getRadioClasses();
  const inputId = inputProps.id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {label && labelPosition === 'left' && (
        <div className="flex flex-col">
          <label
            htmlFor={inputId}
            className={`text-sm font-medium text-neutral-900 cursor-pointer ${labelClassName}`}
          >
            {label}
          </label>
          {helperText && (
            <span className="text-xs text-neutral-600 mt-0.5">{helperText}</span>
          )}
        </div>
      )}
      
      <div className="relative flex items-center">
        <input
          {...inputProps}
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={onChange}
          onMouseEnter={() => !isDisabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={(e) => {
            setIsFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            inputProps.onBlur?.(e);
          }}
          className="sr-only"
          aria-invalid={error}
        />
        <label
          htmlFor={inputId}
          className={`${radioClasses} ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onMouseEnter={() => !isDisabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {checked && <RadioDot size={size} />}
        </label>
      </div>

      {label && labelPosition === 'right' && (
        <div className="flex flex-col">
          <label
            htmlFor={inputId}
            className={`text-sm font-medium text-neutral-900 cursor-pointer ${labelClassName}`}
          >
            {label}
          </label>
          {helperText && (
            <span className="text-xs text-neutral-600 mt-0.5">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};
