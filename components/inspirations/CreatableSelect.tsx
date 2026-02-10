'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectOption } from '@/components/Select';
import { ChevronDown, Plus } from 'lucide-react';

interface CreatableSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  onAddOption?: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
}

export const CreatableSelect: React.FC<CreatableSelectProps> = ({
  label,
  value,
  onChange,
  options,
  onAddOption,
  placeholder = 'Select or type to create new',
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  fullWidth = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateOption, setShowCreateOption] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !opt.disabled
      )
    : options.filter(opt => !opt.disabled);

  // Check if search query matches any existing option
  const exactMatch = options.some(opt => opt.label.toLowerCase() === searchQuery.toLowerCase());
  const showCreate = searchQuery && !exactMatch && searchQuery.trim().length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setShowCreateOption(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (searchQuery.trim() && onAddOption) {
      onAddOption(searchQuery.trim());
      if (onChange) {
        onChange(searchQuery.trim());
      }
      setSearchQuery('');
      setIsOpen(false);
      setShowCreateOption(false);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setSearchQuery('');
    setShowCreateOption(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={fullWidth ? 'w-full' : ''} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-neutral-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full h-10 px-4 py-2 text-base border rounded-lg
            flex items-center justify-between gap-2
            transition-all duration-200
            focus:outline-none
            ${disabled
              ? 'bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed'
              : error
              ? 'bg-white text-neutral-900 border-red-500'
              : 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-400'
            }
            ${fullWidth ? 'w-full' : ''}
          `}
        >
          <span className={value ? 'text-neutral-900' : 'text-neutral-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-neutral-200">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowCreateOption(true);
                }}
                placeholder="Search or type to create..."
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && showCreate) {
                    e.preventDefault();
                    handleCreate();
                  } else if (e.key === 'Escape') {
                    setIsOpen(false);
                    setSearchQuery('');
                  }
                }}
              />
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 && (
                <div className="py-1">
                  {filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`
                        w-full px-4 py-2 text-sm text-left
                        hover:bg-neutral-50 transition-colors
                        ${value === option.value ? 'bg-primary-50 text-primary-900' : 'text-neutral-900'}
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Create New Option */}
              {showCreate && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="w-full px-4 py-2 text-sm text-left text-primary-600 hover:bg-primary-50 transition-colors border-t border-neutral-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create &quot;{searchQuery}&quot;
                </button>
              )}

              {filteredOptions.length === 0 && !showCreate && (
                <div className="px-4 py-8 text-center text-sm text-neutral-500">
                  No options found. Type to create a new one.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-neutral-500 mt-1">{helperText}</p>
      )}
      {error && errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
