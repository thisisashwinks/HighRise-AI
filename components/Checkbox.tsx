'use client';

import React, { useState, useRef, useEffect } from 'react';

export type CheckboxSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type CheckboxState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  labelPosition?: 'left' | 'right';
  className?: string;
  labelClassName?: string;
}

// Checkmark icon SVG paths for different sizes
const CheckmarkIcon: React.FC<{ size: CheckboxSize }> = ({ size }) => {
  const paths: Record<CheckboxSize, string> = {
    '3xs': 'M2 5L4 7L6 3',
    '2xs': 'M2.5 6L4.5 8L7.5 4',
    'xs': 'M2.5 6L4.5 8L7.5 4',
    'sm': 'M3 7L5.5 9.5L11 4',
    'md': 'M3.5 8L6 10.5L12.5 4',
    'lg': 'M4 9L7 12L16 3',
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <path
        d={paths[size]}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Indeterminate (minus) icon SVG
const IndeterminateIcon: React.FC<{ size: CheckboxSize }> = ({ size }) => {
  const paths: Record<CheckboxSize, { x: number; y: number; width: number }> = {
    '3xs': { x: 3, y: 7, width: 6 },
    '2xs': { x: 3, y: 7.5, width: 6 },
    'xs': { x: 3, y: 7.5, width: 6 },
    'sm': { x: 4, y: 8, width: 8 },
    'md': { x: 4.5, y: 9, width: 9 },
    'lg': { x: 5, y: 10, width: 10 },
  };

  const path = paths[size];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <line
        x1={path.x}
        y1={path.y}
        x2={path.x + path.width}
        y2={path.y}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const sizeConfig: Record<CheckboxSize, { 
  size: string; 
  borderRadius: string;
  focusRingSize: string;
  iconPadding: string;
}> = {
  '3xs': { size: 'w-2.5 h-2.5', borderRadius: 'rounded-[2px]', focusRingSize: 'shadow-[0px_0px_0px_2px_var(--tw-ring-color)]', iconPadding: 'p-[30.56%]' },
  '2xs': { size: 'w-3 h-3', borderRadius: 'rounded-[2px]', focusRingSize: 'shadow-[0px_0px_0px_2px_var(--tw-ring-color)]', iconPadding: 'p-[30.56%]' },
  'xs': { size: 'w-3.5 h-3.5', borderRadius: 'rounded-[2px]', focusRingSize: 'shadow-[0px_0px_0px_4px_var(--tw-ring-color)]', iconPadding: 'p-[30.56%]' },
  'sm': { size: 'w-4 h-4', borderRadius: 'rounded-[4px]', focusRingSize: 'shadow-[0px_0px_0px_4px_var(--tw-ring-color)]', iconPadding: 'p-[28.13%]' },
  'md': { size: 'w-[18px] h-[18px]', borderRadius: 'rounded-[4px]', focusRingSize: 'shadow-[0px_0px_0px_4px_var(--tw-ring-color)]', iconPadding: 'p-[29.58%]' },
  'lg': { size: 'w-5 h-5', borderRadius: 'rounded-[6px]', focusRingSize: 'shadow-[0px_0px_0px_4px_var(--tw-ring-color)]', iconPadding: 'p-[29.58%]' },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  size = 'sm',
  checked = false,
  indeterminate = false,
  error = false,
  label,
  helperText,
  labelPosition = 'right',
  className = '',
  labelClassName = '',
  disabled = false,
  onChange,
  ...inputProps
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = sizeConfig[size];
  const isDisabled = disabled;
  const isChecked = checked || indeterminate;
  const effectiveState: CheckboxState = isDisabled ? 'Disabled' : isFocused ? 'Focused' : isHovered ? 'Hover' : 'Default';

  // Set indeterminate state on the input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Get checkbox styling based on state
  const getCheckboxClasses = () => {
    const baseClasses = `${config.size} ${config.borderRadius} border transition-all duration-200 flex items-center justify-center relative overflow-hidden`;
    
    if (isDisabled) {
      if (isChecked) {
        return `${baseClasses} bg-neutral-300 border-neutral-300`;
      }
      return `${baseClasses} bg-neutral-100 border-neutral-300`;
    }

    if (error) {
      if (isChecked) {
        return `${baseClasses} bg-[#6938ef] border-[#f04438]`;
      }
      return `${baseClasses} bg-white border-[#f04438]`;
    }

    if (effectiveState === 'Focused') {
      const focusRingClass = size === '3xs' || size === '2xs' 
        ? 'shadow-[0px_0px_0px_2px_#ebe9fe]' 
        : 'shadow-[0px_0px_0px_4px_#ebe9fe]';
      if (isChecked) {
        return `${baseClasses} bg-[#6938ef] border-[#6938ef] ${focusRingClass}`;
      }
      return `${baseClasses} bg-white border-[#bdb4fe] ${focusRingClass}`;
    }

    if (effectiveState === 'Hover') {
      if (isChecked) {
        return `${baseClasses} bg-[#7a5af8] border-[#7a5af8] cursor-pointer`;
      }
      return `${baseClasses} bg-[#ebe9fe] border-[#6938ef] cursor-pointer`;
    }

    // Default state
    if (isChecked) {
      return `${baseClasses} bg-[#6938ef] border-[#6938ef]`;
    }
    return `${baseClasses} bg-white border-neutral-400`;
  };

  const checkboxClasses = getCheckboxClasses();
  const inputId = inputProps.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

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
          ref={inputRef}
          id={inputId}
          type="checkbox"
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
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-invalid={error}
        />
        <label
          htmlFor={inputId}
          className={`${checkboxClasses} ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onMouseEnter={() => !isDisabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isChecked && (
            <div className="absolute inset-0 flex items-center justify-center">
              {indeterminate ? (
                <IndeterminateIcon size={size} />
              ) : (
                <CheckmarkIcon size={size} />
              )}
            </div>
          )}
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
