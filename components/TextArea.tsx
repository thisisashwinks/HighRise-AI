'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'prompt-input';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  infoTooltip?: string;
  fullWidth?: boolean;
  showCharacterCount?: boolean;
  maxLength?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
}

const sizeConfig = {
  xs: { padding: 'px-3 py-2', text: 'text-sm', minHeight: 'min-h-[80px]' },
  sm: { padding: 'px-3 py-2.5', text: 'text-sm', minHeight: 'min-h-[100px]' },
  md: { padding: 'px-4 py-3', text: 'text-base', minHeight: 'min-h-[120px]' },
  lg: { padding: 'px-4 py-3.5', text: 'text-lg', minHeight: 'min-h-[140px]' },
};

export const TextArea: React.FC<TextAreaProps> = ({
  size = 'md',
  variant = 'default',
  label,
  helperText,
  error = false,
  errorMessage,
  infoTooltip,
  fullWidth = false,
  showCharacterCount = false,
  maxLength,
  minRows = 3,
  maxRows,
  autoResize = false,
  className = '',
  disabled,
  value,
  onChange,
  ...textareaProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [rows, setRows] = useState(minRows);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const config = sizeConfig[size];
  // Calculate current length - works for both controlled and uncontrolled components
  const getCurrentLength = () => {
    if (typeof value === 'string') {
      return value.length;
    }
    if (textareaRef.current) {
      return textareaRef.current.value.length;
    }
    return textareaProps.defaultValue?.toString().length || 0;
  };
  const currentLength = getCurrentLength();

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      // Reset height to calculate scrollHeight
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
      
      // Calculate rows for character count display
      const calculatedRows = Math.ceil(newHeight / lineHeight);
      setRows(calculatedRows);
    }
  }, [value, autoResize, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
      
      const calculatedRows = Math.ceil(newHeight / lineHeight);
      setRows(calculatedRows);
    }
  };

  const textareaClasses = `
    ${config.padding}
    ${config.text}
    ${config.minHeight}
    ${fullWidth ? 'w-full' : ''}
    border rounded-lg
    ${error ? 'border-red-500' : isFocused ? 'border-primary-600 ring-2 ring-primary-100' : 'border-neutral-300'}
    ${disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white text-neutral-900'}
    focus:outline-none
    transition-colors
    resize-y
    ${variant === 'prompt-input' ? 'font-mono' : ''}
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
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

      <div className="relative">
        <textarea
          {...textareaProps}
          ref={textareaRef}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          rows={autoResize ? rows : minRows}
          maxLength={maxLength}
          onFocus={(e) => {
            setIsFocused(true);
            textareaProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textareaProps.onBlur?.(e);
          }}
          className={textareaClasses}
          style={autoResize ? { overflow: maxRows ? 'auto' : 'hidden' } : undefined}
        />
      </div>

      {/* Character Count and Helper Text / Error Message */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex-1">
          {(helperText || errorMessage) && (
            <p className={`${config.text} ${error ? 'text-red-600' : 'text-neutral-600'}`}>
              {error ? errorMessage : helperText}
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
