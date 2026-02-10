'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface InlineInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'borderless' | 'underline' | 'minimal';
  label?: string;
  labelPosition?: 'left' | 'right' | 'inline';
  error?: boolean;
  errorMessage?: string;
  editable?: boolean;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  showEditIcon?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const sizeConfig = {
  'xs': { height: 'h-6', padding: 'px-2 py-0.5', text: 'text-xs', icon: 'w-3 h-3' },
  'sm': { height: 'h-7', padding: 'px-2 py-1', text: 'text-sm', icon: 'w-3.5 h-3.5' },
  'md': { height: 'h-8', padding: 'px-3 py-1', text: 'text-base', icon: 'w-4 h-4' },
  'lg': { height: 'h-9', padding: 'px-3 py-1.5', text: 'text-lg', icon: 'w-4 h-4' },
};

export const InlineInput: React.FC<InlineInputProps> = ({
  size = 'md',
  variant = 'default',
  label,
  labelPosition = 'left',
  error = false,
  errorMessage,
  editable = true,
  onSave,
  onCancel,
  showEditIcon = false,
  fullWidth = false,
  className = '',
  disabled,
  value,
  defaultValue,
  onChange,
  onBlur,
  onKeyDown,
  ...inputProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const getStringValue = (val: string | number | readonly string[] | undefined): string => {
    if (val === undefined || val === null) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    if (Array.isArray(val)) return val.join(',');
    return '';
  };
  const initialValue = getStringValue(value || defaultValue);
  const [internalValue, setInternalValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = sizeConfig[size];
  const isControlled = value !== undefined;

  useEffect(() => {
    if (isControlled && value !== undefined) {
      const stringValue = getStringValue(value);
      setInternalValue(stringValue);
      setPreviousValue(stringValue);
    }
  }, [value, isControlled]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (editable && !disabled && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsEditing(false);
    
    const newValue = e.target.value;
    if (newValue !== previousValue) {
      if (onSave) {
        onSave(newValue);
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      setPreviousValue(newValue);
    } else if (onCancel) {
      onCancel();
    }
    
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = (e.target as HTMLInputElement).value;
      if (newValue !== previousValue) {
        if (onSave) {
          onSave(newValue);
        }
        if (!isControlled) {
          setInternalValue(newValue);
        }
        setPreviousValue(newValue);
      }
      setIsEditing(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (isControlled) {
        setInternalValue(previousValue);
      } else {
        if (inputRef.current) {
          inputRef.current.value = previousValue;
        }
      }
      setIsEditing(false);
      if (onCancel) {
        onCancel();
      }
      inputRef.current?.blur();
    }
    
    onKeyDown?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setIsEditing(true);
    inputProps.onFocus?.(e);
  };

  const getInputClasses = () => {
    const baseClasses = `
      ${config.height}
      ${config.text}
      ${config.padding}
      ${fullWidth ? 'w-full' : ''}
      bg-transparent
      text-neutral-900
      focus:outline-none
      transition-all
      ${disabled ? 'cursor-not-allowed opacity-50' : editable ? 'cursor-text' : ''}
      ${className}
    `;

    switch (variant) {
      case 'borderless':
        return `${baseClasses} ${isEditing || isFocused ? 'ring-1 ring-primary-500 rounded' : ''}`;
      case 'underline':
        return `${baseClasses} border-b-2 ${error ? 'border-red-500' : isEditing || isFocused ? 'border-primary-600' : 'border-neutral-300'} rounded-none`;
      case 'minimal':
        return `${baseClasses} ${isEditing || isFocused ? 'bg-neutral-50 rounded px-2' : ''}`;
      default:
        return `${baseClasses} border ${error ? 'border-red-500' : isEditing || isFocused ? 'border-primary-600 ring-1 ring-primary-100' : 'border-neutral-300'} rounded`;
    }
  };

  const displayValue = isControlled ? getStringValue(value) : internalValue;

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-flex'} items-center gap-2`}>
      {label && labelPosition === 'left' && (
        <label className={`${config.text} font-medium text-neutral-700 whitespace-nowrap`}>
          {label}
        </label>
      )}
      
      <div className="relative flex-1">
        {!isEditing && editable && !disabled && (
          <div
            onClick={handleClick}
            className={`
              ${config.height}
              ${config.text}
              ${config.padding}
              ${fullWidth ? 'w-full' : ''}
              ${variant === 'borderless' || variant === 'minimal' ? '' : 'border border-transparent'}
              ${variant === 'underline' ? 'border-b-2 border-neutral-300' : ''}
              cursor-text
              flex items-center gap-2
              group
            `}
          >
            <span className={`${displayValue ? 'text-neutral-900' : 'text-neutral-400'}`}>
              {displayValue || (inputProps.placeholder as string) || 'Click to edit'}
            </span>
            {showEditIcon && (
              <svg
                className={`${config.icon} text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            )}
          </div>
        )}
        
        <input
          {...inputProps}
          ref={inputRef}
          value={displayValue}
          disabled={disabled || !editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`
            ${getInputClasses()}
            ${!isEditing && editable ? 'hidden' : ''}
          `}
          aria-label={label || inputProps['aria-label']}
          aria-invalid={error}
        />
      </div>

      {label && labelPosition === 'right' && (
        <label className={`${config.text} font-medium text-neutral-700 whitespace-nowrap`}>
          {label}
        </label>
      )}

      {label && labelPosition === 'inline' && (
        <span className={`${config.text} text-neutral-600 ml-1`}>
          {label}
        </span>
      )}

      {error && errorMessage && (
        <p className={`mt-1 ${config.text} text-red-600`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
