'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InlineDatePickerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'borderless' | 'underline' | 'minimal';
  label?: string;
  labelPosition?: 'left' | 'right' | 'inline';
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  editable?: boolean;
  showEditIcon?: boolean;
  fullWidth?: boolean;
  className?: string;
  required?: boolean;
}

const sizeConfig = {
  xs: { height: 'h-6', padding: 'px-2 py-0.5', text: 'text-xs', icon: 'w-3 h-3', calendar: 'w-72' },
  sm: { height: 'h-7', padding: 'px-2 py-1', text: 'text-sm', icon: 'w-3.5 h-3.5', calendar: 'w-80' },
  md: { height: 'h-8', padding: 'px-3 py-1', text: 'text-base', icon: 'w-4 h-4', calendar: 'w-80' },
  lg: { height: 'h-9', padding: 'px-3 py-1.5', text: 'text-lg', icon: 'w-4 h-4', calendar: 'w-96' },
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatDateInput = (date: Date | null): string => {
  if (!date) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const InlineDatePicker: React.FC<InlineDatePickerProps> = ({
  size = 'md',
  variant = 'default',
  label,
  labelPosition = 'left',
  placeholder = 'Select date',
  value = null,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  error = false,
  errorMessage,
  editable = true,
  showEditIcon = false,
  fullWidth = false,
  className = '',
  required = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = sizeConfig[size];

  useEffect(() => {
    if (value) {
      setInputValue(formatDateInput(value));
      setCurrentMonth(value);
    } else {
      setInputValue('');
    }
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditing(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (editable && !disabled && !isEditing) {
      setIsEditing(true);
      setIsOpen(true);
      if (value) {
        setCurrentMonth(value);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    // Try to parse date from input
    const dateMatch = val.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (dateMatch) {
      const [, month, day, year] = dateMatch;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(parsedDate.getTime())) {
        if (onChange) {
          onChange(parsedDate);
        }
      }
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsEditing(true);
    setIsOpen(true);
    if (value) {
      setCurrentMonth(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Don't close editing mode on blur if calendar is open
    if (!isOpen) {
      setIsEditing(false);
    }
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (minDate && selectedDate < minDate) return;
    if (maxDate && selectedDate > maxDate) return;

    if (onChange) {
      onChange(selectedDate);
    }
    setIsOpen(false);
    setIsEditing(false);
    setIsFocused(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
    setInputValue('');
    setIsOpen(false);
    setIsEditing(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (onChange) {
      onChange(today);
    }
    setIsOpen(false);
    setIsEditing(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    const today = new Date();
    const isToday = (day: number) => {
      return day === today.getDate() &&
        currentMonth.getMonth() === today.getMonth() &&
        currentMonth.getFullYear() === today.getFullYear();
    };

    const isSelected = (day: number) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      return value && isSameDay(date, value);
    };

    const isDisabled = (day: number) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    return (
      <div className={cn('bg-white border border-neutral-200 rounded-lg shadow-lg p-4', config.calendar)}>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-neutral-100 rounded transition-colors"
            disabled={disabled}
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-neutral-100 rounded transition-colors"
            disabled={disabled}
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-xs font-medium text-neutral-500 text-center py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="aspect-square" />;
            }

            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const dayIsToday = isToday(day);
            const dayIsSelected = isSelected(day);
            const dayIsDisabled = isDisabled(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => !dayIsDisabled && handleDateClick(day)}
                disabled={dayIsDisabled || disabled}
                className={cn(
                  'aspect-square rounded text-sm font-medium transition-colors',
                  dayIsDisabled || disabled
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'hover:bg-neutral-100 cursor-pointer',
                  dayIsToday && !dayIsSelected && 'bg-primary-50 text-primary-700 font-semibold',
                  dayIsSelected && 'bg-primary-600 text-white font-semibold'
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Today Button */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={goToToday}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            disabled={disabled}
          >
            Today
          </button>
        </div>
      </div>
    );
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

  const displayValue = value ? formatDate(value) : '';

  return (
    <div ref={containerRef} className={`${fullWidth ? 'w-full' : 'inline-flex'} items-center gap-2 relative`}>
      {label && labelPosition === 'left' && (
        <label className={`${config.text} font-medium text-neutral-700 whitespace-nowrap`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
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
              {displayValue || placeholder}
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
            {value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className={`${config.icon} text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-neutral-100 rounded`}
              >
                <X className={config.icon} />
              </button>
            )}
          </div>
        )}
        
        <div className="relative">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <Calendar className={cn(config.icon, 'text-neutral-400')} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={isOpen && !displayValue ? inputValue : formatDateInput(value)}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled || !editable}
            required={required}
            className={`
              ${getInputClasses()}
              ${!isEditing && editable ? 'hidden' : ''}
              pl-8 pr-8
            `}
            aria-label={label || 'Date picker'}
            aria-invalid={error}
          />
          {value && !disabled && isEditing && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded transition-colors"
            >
              <X className={cn(config.icon, 'text-neutral-400')} />
            </button>
          )}
        </div>

        {/* Calendar Popup */}
        {isOpen && !disabled && editable && (
          <div
            ref={calendarRef}
            className="absolute z-50 mt-2"
            style={{ left: 0, top: '100%' }}
          >
            {renderCalendar()}
          </div>
        )}
      </div>

      {label && labelPosition === 'right' && (
        <label className={`${config.text} font-medium text-neutral-700 whitespace-nowrap`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {label && labelPosition === 'inline' && (
        <span className={`${config.text} text-neutral-600 ml-1`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
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
