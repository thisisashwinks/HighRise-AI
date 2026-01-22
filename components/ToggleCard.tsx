'use client';

import React, { useState } from 'react';
import { Toggle } from './Toggle';

export type ToggleCardState = 'Default' | 'Hover' | 'Selected' | 'Disabled';

export interface ToggleCardProps {
  label: string;
  description?: string;
  checked?: boolean;
  state?: ToggleCardState;
  error?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  customIcon?: React.ReactNode;
  labelIcon?: React.ReactNode;
  custom?: React.ReactNode;
  className?: string;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ToggleCard: React.FC<ToggleCardProps> = ({
  label,
  description,
  checked = false,
  state,
  error = false,
  disabled = false,
  icon,
  customIcon,
  labelIcon,
  custom,
  className = '',
  onChange,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isDisabled = disabled || state === 'Disabled';
  const isSelected = checked || state === 'Selected';
  const effectiveState: ToggleCardState = isDisabled 
    ? 'Disabled' 
    : state || (isHovered ? 'Hover' : 'Default');
  
  const hasDescription = !!description;
  const hasCustom = !!custom;

  // Get card styling based on state
  const getCardClasses = () => {
    const itemsAlignment = hasDescription || hasCustom ? 'items-start' : 'items-center';
    const baseClasses = `bg-white border rounded-lg p-2 flex gap-2 ${itemsAlignment} transition-all duration-200`;
    
    if (isDisabled) {
      return `${baseClasses} border-neutral-200 cursor-not-allowed`;
    }

    if (error) {
      if (isSelected) {
        return `${baseClasses} border-[#d92d20] ${effectiveState === 'Hover' ? 'shadow-sm' : ''}`;
      }
      return `${baseClasses} border-[#f04438] ${effectiveState === 'Hover' ? 'border-[#fda29b] shadow-sm' : ''}`;
    }

    if (isSelected) {
      return `${baseClasses} border-[#6938ef] ${effectiveState === 'Hover' ? 'shadow-sm' : ''}`;
    }

    if (effectiveState === 'Hover') {
      return `${baseClasses} border-[#d9d6fe] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer`;
    }

    return `${baseClasses} border-neutral-200 cursor-pointer`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    if (onChange) {
      onChange(!checked);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const handleToggleChange = (newChecked: boolean) => {
    if (isDisabled) return;
    if (onChange) {
      onChange(newChecked);
    }
  };

  const cardClasses = getCardClasses();
  const showIcon = !!icon && !customIcon;
  const showCustomIcon = !!customIcon;

  return (
    <div
      className={`${cardClasses} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="switch"
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      aria-invalid={error}
    >
      {/* Custom Icon Slot */}
      {showCustomIcon && (
        <div className={`${
          isDisabled ? 'bg-neutral-100' : 'bg-neutral-100'
        } flex flex-col items-center justify-center px-0 py-2 rounded shrink-0 w-8 h-8`}>
          {customIcon}
        </div>
      )}

      {/* Default Icon */}
      {showIcon && (
        <div className={`${
          isDisabled 
            ? 'bg-neutral-100 border-4 border-neutral-50' 
            : 'bg-purple-100 border-4 border-purple-50'
        } mix-blend-multiply rounded-full shrink-0 w-8 h-8 relative`}>
          <div className={`absolute left-1.5 overflow-clip w-4 h-4 top-1.5 ${
            isDisabled ? 'opacity-60' : ''
          }`}>
            {icon}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 items-start min-h-0 min-w-0 relative">
        <div className="flex gap-1 items-center relative shrink-0">
          <p className={`font-medium leading-[18px] relative shrink-0 text-sm tracking-normal ${
            isDisabled ? 'text-neutral-400' : 'text-neutral-700'
          }`}>
            {label}
          </p>
          {labelIcon && (
            <div className="flex items-center justify-center relative shrink-0 w-3 h-3">
              {labelIcon}
            </div>
          )}
        </div>
        {hasDescription && (
          <p className={`font-normal leading-[17px] min-w-full not-italic relative shrink-0 text-xs tracking-normal w-min ${
            isDisabled ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {description}
          </p>
        )}
        {hasCustom && (
          <div className="bg-neutral-100 flex flex-col items-center justify-center px-0 py-2 relative rounded shrink-0 w-full">
            {custom}
          </div>
        )}
      </div>

      {/* Toggle */}
      <div onClick={(e) => e.stopPropagation()}>
        <Toggle
          size="xs"
          checked={isSelected}
          error={error}
          disabled={isDisabled}
          onChange={handleToggleChange}
          className="shrink-0"
        />
      </div>
    </div>
  );
};
