'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export type InputSliderSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputSliderState = 'Default' | 'Hover' | 'Focus' | 'Disabled';

export interface InputSliderProps {
  size?: InputSliderSize;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  infoTooltip?: string;
  fullWidth?: boolean;
  className?: string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

const sizeConfig: Record<InputSliderSize, {
  trackHeight: string;
  thumbSize: string;
  thumbOffset: string;
  labelText: string;
  valueText: string;
  helperText: string;
}> = {
  xs: {
    trackHeight: 'h-1',
    thumbSize: 'w-3 h-3',
    thumbOffset: '-translate-y-1',
    labelText: 'text-xs',
    valueText: 'text-xs',
    helperText: 'text-xs',
  },
  sm: {
    trackHeight: 'h-1.5',
    thumbSize: 'w-4 h-4',
    thumbOffset: '-translate-y-1.5',
    labelText: 'text-sm',
    valueText: 'text-sm',
    helperText: 'text-xs',
  },
  md: {
    trackHeight: 'h-2',
    thumbSize: 'w-5 h-5',
    thumbOffset: '-translate-y-2',
    labelText: 'text-base',
    valueText: 'text-base',
    helperText: 'text-sm',
  },
  lg: {
    trackHeight: 'h-2.5',
    thumbSize: 'w-6 h-6',
    thumbOffset: '-translate-y-2.5',
    labelText: 'text-lg',
    valueText: 'text-lg',
    helperText: 'text-sm',
  },
};

export const InputSlider: React.FC<InputSliderProps> = ({
  size = 'md',
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  showValue = false,
  valuePrefix = '',
  valueSuffix = '',
  infoTooltip,
  fullWidth = false,
  className = '',
  onChange,
  onChangeEnd,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const config = sizeConfig[size];

  // Calculate percentage for positioning
  const percentage = ((currentValue - min) / (max - min)) * 100;

  // Handle value change
  const handleValueChange = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    if (!isControlled) {
      setInternalValue(steppedValue);
    }
    onChange?.(steppedValue);
  }, [min, max, step, isControlled, onChange]);

  // Handle mouse/touch events on track
  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;
    const newValue = min + (percentage / 100) * (max - min);
    
    handleValueChange(newValue);
    onChangeEnd?.(newValue);
  }, [disabled, min, max, handleValueChange, onChangeEnd]);

  // Handle drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const percentage = (x / rect.width) * 100;
      const newValue = min + (percentage / 100) * (max - min);
      handleValueChange(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (sliderRef.current && inputRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, (currentValue - min) / (max - min) * rect.width));
        const percentage = (x / rect.width) * 100;
        const finalValue = min + (percentage / 100) * (max - min);
        onChangeEnd?.(finalValue);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, min, max, handleValueChange, onChangeEnd, currentValue]);

  // Handle input change (for keyboard and programmatic changes)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    handleValueChange(newValue);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    onChangeEnd?.(currentValue);
  };

  // Format display value
  const formatValue = (val: number) => {
    return `${valuePrefix}${val}${valueSuffix}`;
  };

  const effectiveState: InputSliderState = disabled ? 'Disabled' : isFocused ? 'Focus' : isHovered ? 'Hover' : 'Default';

  // Get track styling based on state
  const getTrackClasses = () => {
    const baseClasses = `${config.trackHeight} rounded-full relative transition-colors`;
    
    if (disabled) {
      return `${baseClasses} bg-neutral-200`;
    }

    if (error) {
      return `${baseClasses} bg-red-100`;
    }

    return `${baseClasses} bg-neutral-200`;
  };

  // Get fill styling
  const getFillClasses = () => {
    const baseClasses = `${config.trackHeight} rounded-full absolute left-0 top-0 transition-all`;
    
    if (disabled) {
      return `${baseClasses} bg-neutral-300`;
    }

    if (error) {
      return `${baseClasses} bg-red-500`;
    }

    if (effectiveState === 'Focus') {
      return `${baseClasses} bg-[#6938ef]`;
    }

    if (effectiveState === 'Hover') {
      return `${baseClasses} bg-[#5925dc]`;
    }

    return `${baseClasses} bg-[#6938ef]`;
  };

  // Get thumb styling
  const getThumbClasses = () => {
    const baseClasses = `${config.thumbSize} rounded-full border-2 transition-all absolute top-1/2 ${config.thumbOffset} cursor-pointer`;
    
    if (disabled) {
      return `${baseClasses} bg-white border-neutral-300 cursor-not-allowed`;
    }

    if (error) {
      return `${baseClasses} bg-white border-red-500`;
    }

    if (effectiveState === 'Focus') {
      return `${baseClasses} bg-white border-[#6938ef] shadow-[0px_0px_0px_4px_#ebe9fe]`;
    }

    if (effectiveState === 'Hover' || isDragging) {
      return `${baseClasses} bg-white border-[#5925dc] shadow-md`;
    }

    return `${baseClasses} bg-white border-[#6938ef]`;
  };

  const trackClasses = getTrackClasses();
  const fillClasses = getFillClasses();
  const thumbClasses = getThumbClasses();
  const sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label and Info Tooltip */}
      {(label || infoTooltip) && (
        <div className="flex items-center gap-2 mb-2">
          {label && (
            <label htmlFor={sliderId} className={`${config.labelText} font-medium text-neutral-900`}>
              {label}
            </label>
          )}
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
          {showValue && (
            <span className={`${config.valueText} font-medium text-neutral-700 ml-auto`}>
              {formatValue(currentValue)}
            </span>
          )}
        </div>
      )}

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative w-full cursor-pointer"
        onClick={handleTrackClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hidden input for accessibility and form integration */}
        <input
          ref={inputRef}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={handleInputBlur}
          onMouseDown={() => !disabled && setIsDragging(true)}
          className="sr-only"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-invalid={error}
          aria-describedby={helperText || errorMessage ? `${sliderId}-helper` : undefined}
        />

        {/* Track Background */}
        <div className={trackClasses}>
          {/* Fill */}
          <div
            className={fillClasses}
            style={{ width: `${percentage}%` }}
          />
          
          {/* Thumb */}
          <div
            className={thumbClasses}
            style={{ left: `calc(${percentage}% - ${size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'})` }}
            onMouseDown={(e) => {
              if (!disabled) {
                e.preventDefault();
                setIsDragging(true);
              }
            }}
          />
        </div>
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || errorMessage) && (
        <p
          id={`${sliderId}-helper`}
          className={`mt-1 ${config.helperText} ${error ? 'text-red-600' : 'text-neutral-600'}`}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
};
