'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DatePickerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  infoTooltip?: string;
  fullWidth?: boolean;
  className?: string;
  required?: boolean;
  mode?: 'single' | 'range';
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onRangeChange?: (start: Date | null, end: Date | null) => void;
}

const sizeConfig = {
  xs: { height: 'h-8', padding: 'px-3 py-1.5', text: 'text-sm', icon: 'w-4 h-4', calendar: 'w-72' },
  sm: { height: 'h-9', padding: 'px-3 py-2', text: 'text-sm', icon: 'w-4 h-4', calendar: 'w-80' },
  md: { height: 'h-10', padding: 'px-4 py-2', text: 'text-base', icon: 'w-5 h-5', calendar: 'w-80' },
  lg: { height: 'h-11', padding: 'px-4 py-2.5', text: 'text-lg', icon: 'w-5 h-5', calendar: 'w-96' },
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

const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  return date >= start && date <= end;
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

export const DatePicker: React.FC<DatePickerProps> = ({
  size = 'md',
  label,
  placeholder = 'Select date',
  value = null,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  error = false,
  errorMessage,
  helperText,
  infoTooltip,
  fullWidth = false,
  className = '',
  required = false,
  mode = 'single',
  rangeStart = null,
  rangeEnd = null,
  onRangeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = sizeConfig[size];
  const isRangeMode = mode === 'range';
  const displayValue = isRangeMode 
    ? (rangeStart && rangeEnd 
        ? `${formatDateInput(rangeStart)} - ${formatDateInput(rangeEnd)}`
        : rangeStart 
          ? formatDateInput(rangeStart)
          : '')
    : formatDateInput(value);

  useEffect(() => {
    if (value) {
      setInputValue(formatDateInput(value));
      setCurrentMonth(value);
    } else {
      setInputValue('');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    // Try to parse date from input
    const dateMatch = val.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (dateMatch) {
      const [, month, day, year] = dateMatch;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(parsedDate.getTime())) {
        if (isRangeMode && onRangeChange) {
          // In range mode, set start date
          onRangeChange(parsedDate, rangeEnd);
        } else if (onChange) {
          onChange(parsedDate);
        }
      }
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
    if (value) {
      setCurrentMonth(value);
    }
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (minDate && selectedDate < minDate) return;
    if (maxDate && selectedDate > maxDate) return;

    if (isRangeMode && onRangeChange) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        // Start new range
        onRangeChange(selectedDate, null);
      } else if (rangeStart && !rangeEnd) {
        // Complete range
        if (selectedDate >= rangeStart) {
          onRangeChange(rangeStart, selectedDate);
        } else {
          onRangeChange(selectedDate, rangeStart);
        }
      }
    } else if (onChange) {
      onChange(selectedDate);
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRangeMode && onRangeChange) {
      onRangeChange(null, null);
    } else if (onChange) {
      onChange(null);
    }
    setInputValue('');
    setIsOpen(false);
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
    if (!isRangeMode && onChange) {
      onChange(today);
      setIsOpen(false);
    }
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
      if (isRangeMode) {
        return (rangeStart && isSameDay(date, rangeStart)) || 
               (rangeEnd && isSameDay(date, rangeEnd));
      }
      return value && isSameDay(date, value);
    };

    const isInRange = (day: number) => {
      if (!isRangeMode || !rangeStart || !rangeEnd) return false;
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      return isDateInRange(date, rangeStart, rangeEnd) && !isSelected(day);
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
            const dayIsInRange = isInRange(day);
            const dayIsDisabled = isDisabled(day);
            const isRangeStart = isRangeMode && rangeStart && isSameDay(date, rangeStart);
            const isRangeEnd = isRangeMode && rangeEnd && isSameDay(date, rangeEnd);

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
                  dayIsSelected && 'bg-primary-600 text-white font-semibold',
                  dayIsInRange && 'bg-primary-100 text-primary-900',
                  isRangeStart && 'rounded-l-lg',
                  isRangeEnd && 'rounded-r-lg',
                  dayIsSelected && (isRangeStart || isRangeEnd) && 'rounded-lg'
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

  const inputClasses = cn(
    config.height,
    config.text,
    config.padding,
    fullWidth ? 'w-full' : '',
    'border rounded-lg',
    error ? 'border-red-500' : isFocused ? 'border-primary-600 ring-2 ring-primary-100' : 'border-neutral-300',
    disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white text-neutral-900',
    'focus:outline-none transition-colors',
    className
  );

  return (
    <div ref={containerRef} className={cn(fullWidth ? 'w-full' : '', 'relative')}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {infoTooltip && (
            <span className="ml-1 text-neutral-400 cursor-help" title={infoTooltip}>
              ℹ️
            </span>
          )}
        </label>
      )}

      {/* Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar className={cn(config.icon, 'text-neutral-400')} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={isOpen && !displayValue ? inputValue : displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(inputClasses, 'pl-10 pr-10')}
          readOnly={!isOpen}
        />
        {(value || (isRangeMode && (rangeStart || rangeEnd))) && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded transition-colors"
          >
            <X className={cn(config.icon, 'text-neutral-400')} />
          </button>
        )}
      </div>

      {/* Calendar Popup */}
      {isOpen && !disabled && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-2"
          style={{ left: 0, top: '100%' }}
        >
          {renderCalendar()}
        </div>
      )}

      {/* Helper Text / Error Message */}
      {(helperText || errorMessage) && (
        <div className={cn('mt-1.5 text-sm', error ? 'text-red-600' : 'text-neutral-600')}>
          {error ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};
