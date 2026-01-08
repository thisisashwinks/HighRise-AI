'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'leading-icon' | 'leading-dropdown' | 'trailing-dropdown' | 'leading-text' | 'payment' | 'tags' | 'trailing-button' | 'phone';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingText?: string;
  leadingDropdown?: {
    options: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
  };
  trailingDropdown?: {
    options: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
  };
  trailingButton?: {
    label: string;
    onClick: () => void;
  };
  tags?: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  onTagRemove?: (id: string) => void;
  infoTooltip?: string;
  fullWidth?: boolean;
}

const sizeConfig = {
  '3xs': { height: 'h-6', padding: 'px-2 py-1', text: 'text-xs', icon: 'w-3 h-3' },
  '2xs': { height: 'h-7', padding: 'px-2.5 py-1', text: 'text-xs', icon: 'w-3.5 h-3.5' },
  'xs': { height: 'h-8', padding: 'px-3 py-1.5', text: 'text-sm', icon: 'w-4 h-4' },
  'sm': { height: 'h-9', padding: 'px-3 py-2', text: 'text-sm', icon: 'w-4 h-4' },
  'md': { height: 'h-10', padding: 'px-4 py-2', text: 'text-base', icon: 'w-5 h-5' },
  'lg': { height: 'h-11', padding: 'px-4 py-2.5', text: 'text-lg', icon: 'w-5 h-5' },
};

export const Input: React.FC<InputProps> = ({
  size = 'md',
  variant = 'default',
  label,
  helperText,
  error = false,
  errorMessage,
  leadingIcon,
  trailingIcon,
  leadingText,
  leadingDropdown,
  trailingDropdown,
  trailingButton,
  tags = [],
  onTagRemove,
  infoTooltip,
  fullWidth = false,
  className = '',
  disabled,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showLeadingDropdown, setShowLeadingDropdown] = useState(false);
  const [showTrailingDropdown, setShowTrailingDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leadingDropdownRef = useRef<HTMLDivElement>(null);
  const trailingDropdownRef = useRef<HTMLDivElement>(null);

  const config = sizeConfig[size];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (leadingDropdownRef.current && !leadingDropdownRef.current.contains(event.target as Node)) {
        setShowLeadingDropdown(false);
      }
      if (trailingDropdownRef.current && !trailingDropdownRef.current.contains(event.target as Node)) {
        setShowTrailingDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputClasses = `
    ${config.height}
    ${config.text}
    ${config.padding}
    ${fullWidth ? 'w-full' : ''}
    border rounded-lg
    ${error ? 'border-red-500' : isFocused ? 'border-primary-600 ring-2 ring-primary-100' : 'border-neutral-300'}
    ${disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white text-neutral-900'}
    focus:outline-none
    transition-colors
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`} ref={containerRef}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label className={`${config.text} font-medium text-neutral-900`}>{label}</label>
          {infoTooltip && (
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-xs hover:bg-neutral-300"
                aria-label="Information"
              >
                i
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg whitespace-nowrap z-50">
                  {infoTooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-neutral-900 rotate-45"></div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        {/* Leading Text */}
        {leadingText && (
          <span className={`${config.text} text-neutral-600 px-2 border-r border-neutral-300 ${config.height} flex items-center`}>
            {leadingText}
          </span>
        )}

        {/* Leading Dropdown */}
        {leadingDropdown && (
          <div className="relative" ref={leadingDropdownRef}>
            <button
              type="button"
              onClick={() => setShowLeadingDropdown(!showLeadingDropdown)}
              className={`
                ${config.height}
                px-3
                border-l border-t border-b rounded-l-lg
                ${error ? 'border-red-500' : 'border-neutral-300'}
                ${disabled ? 'bg-neutral-100' : 'bg-white'}
                flex items-center gap-1
                ${config.text}
              `}
              disabled={disabled}
            >
              <span>{leadingDropdown.value}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLeadingDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-[150px] max-h-60 overflow-y-auto">
                {leadingDropdown.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      leadingDropdown.onChange(option.value);
                      setShowLeadingDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Leading Icon */}
        {leadingIcon && !leadingDropdown && (
          <div className={`absolute left-3 ${config.icon} text-neutral-400 pointer-events-none`}>
            {leadingIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          {...inputProps}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            inputProps.onBlur?.(e);
          }}
          className={`
            ${inputClasses}
            ${leadingIcon && !leadingDropdown ? 'pl-10' : ''}
            ${trailingIcon || trailingDropdown || trailingButton ? 'pr-10' : ''}
            ${leadingDropdown ? 'rounded-l-none' : ''}
            ${trailingDropdown || trailingButton ? 'rounded-r-none' : ''}
            ${tags.length > 0 ? 'flex items-center gap-1 flex-wrap' : ''}
          `}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute left-4 flex items-center gap-1 flex-wrap pointer-events-none">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={`${config.text} px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded flex items-center gap-1`}
              >
                {tag.icon && <span className={config.icon}>{tag.icon}</span>}
                {tag.label}
                {onTagRemove && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagRemove(tag.id);
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Trailing Icon */}
        {trailingIcon && !trailingDropdown && !trailingButton && (
          <div className={`absolute right-3 ${config.icon} text-neutral-400 pointer-events-none`}>
            {trailingIcon}
          </div>
        )}

        {/* Trailing Dropdown */}
        {trailingDropdown && (
          <div className="relative" ref={trailingDropdownRef}>
            <button
              type="button"
              onClick={() => setShowTrailingDropdown(!showTrailingDropdown)}
              className={`
                ${config.height}
                px-3
                border-r border-t border-b rounded-r-lg
                ${error ? 'border-red-500' : 'border-neutral-300'}
                ${disabled ? 'bg-neutral-100' : 'bg-white'}
                flex items-center gap-1
                ${config.text}
              `}
              disabled={disabled}
            >
              <span>{trailingDropdown.value}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showTrailingDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-[150px] max-h-60 overflow-y-auto">
                {trailingDropdown.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      trailingDropdown.onChange(option.value);
                      setShowTrailingDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Trailing Button */}
        {trailingButton && (
          <button
            type="button"
            onClick={trailingButton.onClick}
            className={`
              ${config.height}
              px-4
              border-r border-t border-b rounded-r-lg
              ${error ? 'border-red-500' : 'border-neutral-300'}
              ${disabled ? 'bg-neutral-100 text-neutral-400' : 'bg-white text-primary-600 hover:bg-neutral-50'}
              ${config.text}
              font-medium
            `}
            disabled={disabled}
          >
            {trailingButton.label}
          </button>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || errorMessage) && (
        <p className={`mt-1 ${config.text} ${error ? 'text-red-600' : 'text-neutral-600'}`}>
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
};

