'use client';

import React from 'react';
import { Checkbox, CheckboxSize } from './Checkbox';

export interface CheckboxOption {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
  checked?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  size?: CheckboxSize;
  direction?: 'horizontal' | 'vertical';
  label?: string;
  hintText?: string;
  disabled?: boolean;
  error?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  name?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  size = 'sm',
  direction = 'horizontal',
  label,
  hintText,
  disabled = false,
  error = false,
  value = [],
  onChange,
  className = '',
  name,
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (disabled) return;
    
    if (onChange) {
      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    }
  };

  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-4' 
    : 'flex flex-col gap-3';

  const groupId = name || `checkbox-group-${Math.random().toString(36).substr(2, 9)}`;
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

      {/* Checkbox Group */}
      <div 
        id={groupId}
        className={containerClasses}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={hintText ? `${groupId}-hint` : undefined}
        aria-invalid={error}
        aria-disabled={disabled}
      >
        {options.map((option) => {
          const isChecked = value.includes(option.value);
          const isOptionDisabled = disabled || option.disabled;
          
          return (
            <Checkbox
              key={option.value}
              size={size}
              checked={isChecked}
              disabled={isOptionDisabled}
              error={error}
              label={option.label}
              helperText={option.helperText}
              labelPosition="right"
              onChange={(e) => handleChange(option.value, e.target.checked)}
              name={name}
              value={option.value}
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
