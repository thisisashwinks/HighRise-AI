'use client';

import React from 'react';
import { ToggleCard, ToggleCardProps } from './ToggleCard';

export interface ToggleCardOption extends Omit<ToggleCardProps, 'onChange' | 'onClick'> {
  value: string;
}

export interface ToggleCardGroupProps {
  options: ToggleCardOption[];
  direction?: 'horizontal' | 'vertical';
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
}

export const ToggleCardGroup: React.FC<ToggleCardGroupProps> = ({
  options,
  direction = 'vertical',
  value = [],
  onChange,
  className = '',
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (onChange) {
      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    }
  };

  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-1' 
    : 'flex flex-col gap-1';

  return (
    <div className={`${containerClasses} ${className}`}>
      {options.map((option) => {
        const { value: optionValue, ...cardProps } = option;
        const isChecked = value.includes(optionValue);
        
        return (
          <ToggleCard
            key={optionValue}
            {...cardProps}
            checked={isChecked}
            onChange={(checked) => handleChange(optionValue, checked)}
          />
        );
      })}
    </div>
  );
};
