'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface InlineTextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'borderless' | 'underline' | 'minimal';
  label?: string;
  labelPosition?: 'left' | 'right' | 'top';
  error?: boolean;
  errorMessage?: string;
  editable?: boolean;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  showEditIcon?: boolean;
  fullWidth?: boolean;
  className?: string;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  showCharacterCount?: boolean;
  maxLength?: number;
}

const sizeConfig = {
  'xs': { padding: 'px-2 py-1', text: 'text-xs', icon: 'w-3 h-3', minHeight: 'min-h-[60px]' },
  'sm': { padding: 'px-2 py-1.5', text: 'text-sm', icon: 'w-3.5 h-3.5', minHeight: 'min-h-[80px]' },
  'md': { padding: 'px-3 py-2', text: 'text-base', icon: 'w-4 h-4', minHeight: 'min-h-[100px]' },
  'lg': { padding: 'px-3 py-2.5', text: 'text-lg', icon: 'w-4 h-4', minHeight: 'min-h-[120px]' },
};

export const InlineTextArea: React.FC<InlineTextAreaProps> = ({
  size = 'md',
  variant = 'default',
  label,
  labelPosition = 'top',
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
  minRows = 3,
  maxRows,
  autoResize = true,
  showCharacterCount = false,
  maxLength,
  ...textareaProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [rows, setRows] = useState(minRows);
  const getStringValue = (val: string | number | readonly string[] | undefined): string => {
    if (val === undefined || val === null) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    if (Array.isArray(val)) return val.join('\n');
    return '';
  };
  const initialValue = getStringValue(value || defaultValue);
  const [internalValue, setInternalValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Don't select all for textarea - place cursor at end
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current && isEditing) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
      
      const calculatedRows = Math.ceil(newHeight / lineHeight);
      setRows(calculatedRows);
    }
  }, [internalValue, value, autoResize, minRows, maxRows, isEditing]);

  const handleClick = () => {
    if (editable && !disabled && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to save
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      const newValue = (e.target as HTMLTextAreaElement).value;
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
      textareaRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (isControlled) {
        setInternalValue(previousValue);
      } else {
        if (textareaRef.current) {
          textareaRef.current.value = previousValue;
        }
      }
      setIsEditing(false);
      if (onCancel) {
        onCancel();
      }
      textareaRef.current?.blur();
    }
    
    onKeyDown?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    setIsEditing(true);
    textareaProps.onFocus?.(e);
  };

  const getTextareaClasses = () => {
    const baseClasses = `
      ${config.padding}
      ${config.text}
      ${config.minHeight}
      ${fullWidth ? 'w-full' : ''}
      bg-transparent
      text-neutral-900
      focus:outline-none
      transition-all
      resize-y
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
  const currentLength = displayValue.length;

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
      {label && labelPosition === 'top' && (
        <label className={`${config.text} font-medium text-neutral-700 mb-2 block`}>
          {label}
        </label>
      )}
      
      <div className={`${label && labelPosition === 'left' ? 'flex items-start gap-2' : ''} ${label && labelPosition === 'right' ? 'flex items-start gap-2 flex-row-reverse' : ''}`}>
        {label && (labelPosition === 'left' || labelPosition === 'right') && (
          <label className={`${config.text} font-medium text-neutral-700 whitespace-nowrap pt-2`}>
            {label}
          </label>
        )}
        
        <div className="relative flex-1">
          {!isEditing && editable && !disabled && (
            <div
              onClick={handleClick}
              className={`
                ${config.padding}
                ${config.text}
                ${config.minHeight}
                ${fullWidth ? 'w-full' : ''}
                ${variant === 'borderless' || variant === 'minimal' ? '' : 'border border-transparent'}
                ${variant === 'underline' ? 'border-b-2 border-neutral-300' : ''}
                cursor-text
                flex flex-col gap-2
                group
                whitespace-pre-wrap
              `}
            >
              <div className={`${displayValue ? 'text-neutral-900' : 'text-neutral-400'}`}>
                {displayValue || (textareaProps.placeholder as string) || 'Click to edit'}
              </div>
              {showEditIcon && (
                <div className="flex items-center gap-2 mt-auto">
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
                </div>
              )}
            </div>
          )}
          
          <textarea
            {...textareaProps}
            ref={textareaRef}
            value={displayValue}
            disabled={disabled || !editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={autoResize ? rows : minRows}
            maxLength={maxLength}
            className={`
              ${getTextareaClasses()}
              ${!isEditing && editable ? 'hidden' : ''}
            `}
            style={autoResize && isEditing ? { overflow: maxRows ? 'auto' : 'hidden', height: 'auto' } : undefined}
            aria-label={label || textareaProps['aria-label']}
            aria-invalid={error}
          />
        </div>
      </div>

      {/* Character Count and Error Message */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex-1">
          {error && errorMessage && (
            <p className={`${config.text} text-red-600`}>
              {errorMessage}
            </p>
          )}
        </div>
        {showCharacterCount && maxLength && (
          <p className={`${config.text} ml-2 text-neutral-500`}>
            {currentLength} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
