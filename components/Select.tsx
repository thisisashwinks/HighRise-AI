'use client';

import React, { useState, useRef, useEffect } from 'react';

export type SelectSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'icon' | 'avatar' | 'search' | 'tags';

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  size?: SelectSize;
  variant?: SelectVariant;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
}

const sizeConfig: Record<SelectSize, { height: string; padding: string; text: string; icon: string; chevron: string }> = {
  '3xs': { height: 'h-6', padding: 'px-2 py-1.5', text: 'text-xs', icon: 'w-3 h-3', chevron: 'w-3 h-3' },
  '2xs': { height: 'h-7', padding: 'px-2.5 py-1.5', text: 'text-xs', icon: 'w-3.5 h-3.5', chevron: 'w-3.5 h-3.5' },
  'xs': { height: 'h-8', padding: 'px-3 py-2', text: 'text-sm', icon: 'w-4 h-4', chevron: 'w-4 h-4' },
  'sm': { height: 'h-9', padding: 'px-3 py-2', text: 'text-sm', icon: 'w-4 h-4', chevron: 'w-4 h-4' },
  'md': { height: 'h-10', padding: 'px-4 py-2', text: 'text-base', icon: 'w-5 h-5', chevron: 'w-5 h-5' },
  'lg': { height: 'h-11', padding: 'px-4 py-2.5', text: 'text-base', icon: 'w-5 h-5', chevron: 'w-5 h-5' },
};

export const Select: React.FC<SelectProps> = ({
  size = 'md',
  variant = 'default',
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  fullWidth = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  className = '',
  ...buttonProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const config = sizeConfig[size];
  const selectedOption = options.find(opt => opt.value === value);

  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !opt.disabled
      )
    : options.filter(opt => !opt.disabled);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens and searchable is true
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const getButtonClasses = () => {
    const baseClasses = `
      ${config.height}
      ${config.padding}
      ${config.text}
      ${fullWidth ? 'w-full' : ''}
      border rounded-lg
      flex items-center justify-between gap-2
      transition-all duration-200
      focus:outline-none
      ${className}
    `;

    if (disabled) {
      return `${baseClasses} bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed`;
    }

    if (error) {
      return `${baseClasses} bg-white text-neutral-900 border-red-500 ${
        isFocused ? 'ring-2 ring-red-100' : ''
      }`;
    }

    if (isFocused) {
      return `${baseClasses} bg-white text-neutral-900 border-primary-600 ring-2 ring-primary-100`;
    }

    if (isHovered) {
      return `${baseClasses} bg-white text-neutral-900 border-neutral-400`;
    }

    return `${baseClasses} bg-white text-neutral-900 border-neutral-300 shadow-sm`;
  };

  const getDisplayText = () => {
    if (selectedOption) {
      return selectedOption.label;
    }
    return placeholder;
  };

  const getDisplayColor = () => {
    if (disabled) return 'text-neutral-400';
    if (selectedOption) return 'text-neutral-900';
    return 'text-neutral-500';
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`} ref={containerRef}>
      {label && (
        <label className={`${config.text} font-medium text-neutral-900 mb-2 block`}>
          {label}
        </label>
      )}

      <div className="relative">
        <button
          {...buttonProps}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
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
          className={getButtonClasses()}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Avatar */}
            {variant === 'avatar' && selectedOption?.avatar && (
              <img
                src={selectedOption.avatar}
                alt={selectedOption.label}
                className={`${config.icon} rounded-full object-cover`}
              />
            )}

            {/* Icon */}
            {variant === 'icon' && selectedOption?.icon && (
              <span className={`${config.icon} text-neutral-600 flex-shrink-0`}>
                {selectedOption.icon}
              </span>
            )}

            {/* Selected value or placeholder */}
            <span className={`${getDisplayColor()} truncate flex-1 text-left`}>
              {getDisplayText()}
            </span>
          </div>

          {/* Chevron icon */}
          <svg
            className={`${config.chevron} text-neutral-400 flex-shrink-0 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden"
            role="listbox"
          >
            {/* Search input */}
            {searchable && (
              <div className="p-2 border-b border-neutral-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                />
              </div>
            )}

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`
                        w-full px-4 py-2 text-left text-sm
                        flex items-center gap-2
                        transition-colors
                        ${isSelected ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {/* Avatar */}
                      {variant === 'avatar' && option.avatar && (
                        <img
                          src={option.avatar}
                          alt={option.label}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      )}

                      {/* Icon */}
                      {(variant === 'icon' || variant === 'avatar') && option.icon && (
                        <span className="w-4 h-4 text-neutral-600 flex-shrink-0">
                          {option.icon}
                        </span>
                      )}

                      {/* Label */}
                      <span className="flex-1 truncate">{option.label}</span>

                      {/* Selected indicator */}
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-primary-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
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

