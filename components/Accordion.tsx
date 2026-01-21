'use client';

import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  allowCollapseAll?: boolean;
  defaultExpanded?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const sizeConfig = {
  sm: {
    headerPadding: 'px-3 py-2',
    contentPadding: 'px-3 py-2',
    text: 'text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    headerPadding: 'px-4 py-3',
    contentPadding: 'px-4 py-3',
    text: 'text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    headerPadding: 'px-5 py-4',
    contentPadding: 'px-5 py-4',
    text: 'text-lg',
    icon: 'w-5 h-5',
  },
  xl: {
    headerPadding: 'px-6 py-5',
    contentPadding: 'px-6 py-5',
    text: 'text-xl',
    icon: 'w-6 h-6',
  },
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  size = 'md',
  allowCollapseAll = true,
  defaultExpanded,
  onExpandedChange,
  className = '',
  headerClassName = '',
  contentClassName = '',
}) => {
  // Initialize expanded state
  const getInitialExpanded = () => {
    if (defaultExpanded !== undefined) {
      return new Set(defaultExpanded);
    }
    // If single type and no defaultExpanded, expand first non-disabled item
    if (type === 'single' && items.length > 0) {
      const firstEnabled = items.find((item) => !item.disabled);
      if (firstEnabled) {
        return new Set([firstEnabled.id]);
      }
    }
    // If items have defaultExpanded prop, use those
    const itemDefaults = items
      .filter((item) => item.defaultExpanded && !item.disabled)
      .map((item) => item.id);
    if (itemDefaults.length > 0) {
      return new Set(itemDefaults);
    }
    return new Set<string>();
  };

  const [expandedIds, setExpandedIds] = useState<Set<string>>(getInitialExpanded);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const config = sizeConfig[size];

  const isExpanded = (id: string) => expandedIds.has(id);

  const handleToggle = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.disabled) return;

    setExpandedIds((prev) => {
      const newSet = new Set(prev);

      if (type === 'single') {
        // Single type: close all others, toggle current
        if (newSet.has(id)) {
          // If collapsing and allowCollapseAll is false, don't collapse if it's the only one
          if (!allowCollapseAll && newSet.size === 1) {
            return prev;
          }
          newSet.clear();
        } else {
          newSet.clear();
          newSet.add(id);
        }
      } else {
        // Multiple type: toggle current item
        if (newSet.has(id)) {
          // If collapsing and allowCollapseAll is false, don't collapse if it's the only one
          if (!allowCollapseAll && newSet.size === 1) {
            return prev;
          }
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      }

      onExpandedChange?.(Array.from(newSet));
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, index: number) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ': {
        e.preventDefault();
        handleToggle(id);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = (index + 1) % items.length;
        const nextItem = items[nextIndex];
        if (nextItem && !nextItem.disabled) {
          const nextButton = document.getElementById(`accordion-header-${nextItem.id}`);
          nextButton?.focus();
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = index === 0 ? items.length - 1 : index - 1;
        const prevItem = items[prevIndex];
        if (prevItem && !prevItem.disabled) {
          const prevButton = document.getElementById(`accordion-header-${prevItem.id}`);
          prevButton?.focus();
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        const firstItem = items.find((i) => !i.disabled);
        if (firstItem) {
          const firstButton = document.getElementById(`accordion-header-${firstItem.id}`);
          firstButton?.focus();
        }
        break;
      }
      case 'End': {
        e.preventDefault();
        const lastItem = [...items].reverse().find((i) => !i.disabled);
        if (lastItem) {
          const lastButton = document.getElementById(`accordion-header-${lastItem.id}`);
          lastButton?.focus();
        }
        break;
      }
    }
  };

  return (
    <div className={`flex flex-col ${className}`} role="region">
      {items.map((item, index) => {
        const isItemExpanded = isExpanded(item.id);
        const isHovered = hoveredId === item.id;
        const isFocused = focusedId === item.id;
        const isDisabled = item.disabled || false;

        const headerClasses = `
          ${config.headerPadding}
          ${config.text}
          w-full
          flex
          items-center
          justify-between
          gap-3
          text-left
          font-medium
          transition-all
          duration-200
          border-b
          border-neutral-200
          focus:outline-none
          ${isDisabled ? 'opacity-50 cursor-not-allowed text-neutral-400' : 'cursor-pointer text-neutral-700'}
          ${isHovered && !isDisabled ? 'bg-neutral-50' : ''}
          ${isFocused && !isDisabled ? 'ring-2 ring-primary-100 ring-inset' : ''}
          ${headerClassName}
        `.trim().replace(/\s+/g, ' ');

        const contentClasses = `
          ${config.contentPadding}
          ${config.text}
          text-neutral-600
          border-b
          border-neutral-200
          ${contentClassName}
        `.trim().replace(/\s+/g, ' ');

        return (
          <div key={item.id} className="flex flex-col">
            <button
              id={`accordion-header-${item.id}`}
              type="button"
              className={headerClasses}
              onClick={() => handleToggle(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id, index)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedId(item.id)}
              onBlur={() => setFocusedId(null)}
              disabled={isDisabled}
              aria-expanded={isItemExpanded}
              aria-controls={`accordion-content-${item.id}`}
              aria-disabled={isDisabled}
            >
              <span className="flex-1">{item.header}</span>
              <svg
                className={`${config.icon} transition-transform duration-200 flex-shrink-0 ${
                  isItemExpanded ? 'rotate-180' : ''
                } ${isDisabled ? 'text-neutral-400' : 'text-neutral-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className={`overflow-hidden transition-all duration-200 ${
                isItemExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {isItemExpanded && (
                <div className={contentClasses}>{item.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
