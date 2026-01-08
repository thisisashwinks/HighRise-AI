'use client';

import React, { useState } from 'react';
import { ContentSwitcherItem, ContentSwitcherItemSize } from './ContentSwitcherItem';

export interface ContentSwitcherItemData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ContentSwitcherProps {
  items: ContentSwitcherItemData[];
  size?: ContentSwitcherItemSize;
  iconOnly?: boolean;
  defaultSelected?: string;
  onSelectionChange?: (itemId: string) => void;
  className?: string;
}

const getBorderRadius = (size: ContentSwitcherItemSize): string => {
  if (size === 'sm' || size === 'md' || size === 'lg') {
    return 'rounded-lg';
  }
  return 'rounded';
};

export const ContentSwitcher: React.FC<ContentSwitcherProps> = ({
  items,
  size = '3xs',
  iconOnly = false,
  defaultSelected,
  onSelectionChange,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState<string>(defaultSelected || items[0]?.id || '');

  const handleItemClick = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item?.disabled) return;
    
    setSelectedId(itemId);
    onSelectionChange?.(itemId);
  };

  const borderRadius = getBorderRadius(size);

  const containerClasses = `
    inline-flex items-center
    border border-neutral-300
    ${borderRadius}
    overflow-hidden
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={containerClasses} role="tablist">
      {items.map((item, index) => {
        const isSelected = selectedId === item.id;
        const isLast = index === items.length - 1;
        
        // Remove right border on last item for unselected items
        // Selected items don't have right border (they have full border)
        const itemClasses = isLast ? 'border-r-0' : '';

        return (
          <ContentSwitcherItem
            key={item.id}
            icon={item.icon}
            selected={isSelected}
            size={size}
            iconOnly={iconOnly}
            disabled={item.disabled}
            className={itemClasses}
            onClick={() => handleItemClick(item.id)}
            aria-selected={isSelected}
            aria-controls={`content-switcher-panel-${item.id}`}
          >
            {item.label}
          </ContentSwitcherItem>
        );
      })}
    </div>
  );
};
