'use client';

import React from 'react';
import { Radio, RadioSize } from './Radio';

export interface RadioOption {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  size?: RadioSize;
  direction?: 'horizontal' | 'vertical';
  label?: string;
  hintText?: string;
  disabled?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  size = 'sm',
  direction = 'horizontal',
  label,
  hintText,
  disabled = false,
  error = false,
  value,
  onChange,
  className = '',
  name,
}) => {
  const handleChange = (optionValue: string) => {
    if (disabled) return;
    
    if (onChange) {
      onChange(optionValue);
    }
  };

  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-4' 
    : 'flex flex-col gap-3';

  const groupId = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = label ? `${groupId}-label` : undefined;

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label 
          id={labelId}
          className={`block text-sm font-medium text-neutral-900 mb-2 ${
            disabled ? 'text-neutral-400' : ''
          }`}
        >
          {label}
        </label>
      )}

      {/* Radio Group */}
      <div 
        id={groupId}
        className={containerClasses}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={hintText ? `${groupId}-hint` : undefined}
        aria-invalid={error}
        aria-disabled={disabled}
      >
        {options.map((option) => {
          const isChecked = value === option.value;
          const isOptionDisabled = disabled || option.disabled;
          
          return (
            <Radio
              key={option.value}
              size={size}
              checked={isChecked}
              disabled={isOptionDisabled}
              error={error}
              label={option.label}
              helperText={option.helperText}
              labelPosition="right"
              name={name || groupId}
              value={option.value}
              onChange={(e) => {
                if (e.target.checked) {
                  handleChange(option.value);
                }
              }}
            />
          );
        })}
      </div>

      {/* Hint Text */}
      {hintText && (
        <p 
          id={`${groupId}-hint`}
          className={`text-xs mt-2 ${
            error 
              ? 'text-[#f04438]' 
              : disabled 
                ? 'text-neutral-400' 
                : 'text-neutral-600'
          }`}
        >
          {hintText}
        </p>
      )}
    </div>
  );
};
