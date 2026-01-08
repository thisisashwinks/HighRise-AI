'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DropdownListItem, DropdownListItemProps } from './DropdownListItem';

export type DropdownSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type DropdownType = 'default' | 'tree-select' | 'tree' | 'tree-floating';

export interface DropdownOption extends Omit<DropdownListItemProps, 'size' | 'selected' | 'children'> {
  value: string;
  label: string;
  children?: DropdownOption[];
}

export interface DropdownProps {
  size?: DropdownSize;
  type?: DropdownType;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  maxHeight?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  customItems?: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'left' | 'right' | 'center';
  position?: 'bottom' | 'top';
}

const sizeConfig: Record<DropdownSize, { 
  text: string;
  itemSize: DropdownListItemProps['size'];
}> = {
  '3xs': { text: 'text-xs', itemSize: '3xs' },
  '2xs': { text: 'text-xs', itemSize: '2xs' },
  'xs': { text: 'text-sm', itemSize: 'xs' },
  'sm': { text: 'text-sm', itemSize: 'sm' },
  'md': { text: 'text-base', itemSize: 'md' },
  'lg': { text: 'text-base', itemSize: 'lg' },
};

export const Dropdown: React.FC<DropdownProps> = ({
  size = 'md',
  type = 'default',
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  fullWidth = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchValue: controlledSearchValue,
  onSearchChange,
  maxHeight = 'max-h-60',
  header,
  footer,
  customItems,
  className = '',
  trigger,
  open: controlledOpen,
  onOpenChange,
  align = 'left',
  position = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const config = sizeConfig[size];
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : isOpen;
  const searchValue = controlledSearchValue !== undefined ? controlledSearchValue : internalSearchValue;

  // Filter options based on search query
  const filteredOptions = searchable && searchValue
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchValue.toLowerCase()) &&
        !opt.disabled
      )
    : options.filter(opt => !opt.disabled);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setIsOpen(false);
        }
        if (controlledSearchValue === undefined) {
          setInternalSearchValue('');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isControlled, onOpenChange, controlledSearchValue]);

  // Focus search input when dropdown opens and searchable is true
  useEffect(() => {
    if (open && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open, searchable]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setIsOpen(false);
        }
        if (controlledSearchValue === undefined) {
          setInternalSearchValue('');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, isControlled, onOpenChange, controlledSearchValue]);

  const handleToggle = () => {
    if (disabled) return;
    const newOpen = !open;
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      if (Array.isArray(value)) {
        const newValue = value.includes(optionValue)
          ? value.filter(v => v !== optionValue)
          : [...value, optionValue];
        onChange(newValue);
      } else {
        onChange(optionValue);
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setIsOpen(false);
        }
      }
    }
    if (controlledSearchValue === undefined) {
      setInternalSearchValue('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledSearchValue === undefined) {
      setInternalSearchValue(newValue);
    }
    onSearchChange?.(newValue);
  };

  const isSelected = (optionValue: string) => {
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const getAlignmentClasses = () => {
    if (align === 'right') return 'right-0';
    if (align === 'center') return 'left-1/2 -translate-x-1/2';
    return 'left-0';
  };

  const getPositionClasses = () => {
    if (position === 'top') return 'bottom-full mb-1';
    return 'top-full mt-1';
  };

  const renderOptions = (opts: DropdownOption[], level = 0) => {
    const paddingClasses = [
      'pl-4',
      'pl-8',
      'pl-12',
      'pl-16',
    ];
    const paddingClass = paddingClasses[Math.min(level, paddingClasses.length - 1)] || 'pl-4';

    return opts.map((option) => {
      const selected = isSelected(option.value);
      const hasChildren = option.children && option.children.length > 0;

      return (
        <div key={option.value}>
          <div className={level > 0 ? paddingClass : ''}>
            <DropdownListItem
              size={config.itemSize}
              leadingIcon={option.leadingIcon}
              trailingIcon={option.trailingIcon}
              avatar={option.avatar}
              avatarAlt={option.avatarAlt}
              checkbox={option.checkbox}
              checked={selected}
              description={option.description}
              descriptionIcon={option.descriptionIcon}
              infoText={option.infoText}
              tags={option.tags}
              selected={selected}
              disabled={option.disabled}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.label}
            </DropdownListItem>
          </div>
          {hasChildren && type !== 'default' && (
            <div>
              {renderOptions(option.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} relative ${className}`} ref={containerRef}>
      {label && (
        <label className={`${config.text} font-medium text-neutral-900 mb-2 block`}>
          {label}
        </label>
      )}

      <div className="relative">
        {/* Trigger */}
        {trigger ? (
          <div onClick={handleToggle} className="cursor-pointer">
            {trigger}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={handleToggle}
            className={`
              ${fullWidth ? 'w-full' : ''}
              px-4 py-2
              ${config.text}
              border rounded-lg
              bg-white text-neutral-900 border-neutral-300
              hover:border-neutral-400
              focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-600
              disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-300 disabled:cursor-not-allowed
              flex items-center justify-between gap-2
              transition-all duration-200
            `}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <span className="truncate">
              {Array.isArray(value) 
                ? value.length > 0 
                  ? `${value.length} selected`
                  : placeholder
                : options.find(opt => opt.value === value)?.label || placeholder
              }
            </span>
            <svg
              className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Dropdown Menu */}
        {open && (
          <div
            ref={dropdownRef}
            className={`
              absolute z-50 w-full
              ${getAlignmentClasses()}
              ${getPositionClasses()}
              bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden
            `}
            role="menu"
          >
            {/* Header Slot */}
            {header && (
              <div className="border-b border-neutral-200">
                {header}
              </div>
            )}

            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-neutral-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                />
              </div>
            )}

            {/* Custom Items */}
            {customItems && (
              <div className="border-b border-neutral-200">
                {customItems}
              </div>
            )}

            {/* Options List */}
            <div className={`${maxHeight} overflow-y-auto`}>
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-500 text-center">
                  No options found
                </div>
              ) : (
                renderOptions(filteredOptions)
              )}
            </div>

            {/* Footer Slot */}
            {footer && (
              <div className="border-t border-neutral-200">
                {footer}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
