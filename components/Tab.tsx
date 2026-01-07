'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  removable?: boolean;
  disabled?: boolean;
  dropdown?: Array<{ label: string; onClick: () => void }>;
}

export interface TabProps {
  tabs: TabItem[];
  type?: 'line' | 'segment' | 'no-border';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  iconOnly?: boolean;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  onTabRemove?: (tabId: string) => void;
  justifyContent?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { padding: 'px-3 py-1.5', text: 'text-sm', icon: 'w-4 h-4' },
  md: { padding: 'px-4 py-2', text: 'text-base', icon: 'w-5 h-5' },
  lg: { padding: 'px-5 py-2.5', text: 'text-lg', icon: 'w-5 h-5' },
  xl: { padding: 'px-6 py-3', text: 'text-xl', icon: 'w-6 h-6' },
  '2xl': { padding: 'px-7 py-3.5', text: 'text-2xl', icon: 'w-6 h-6' },
};

export const Tab: React.FC<TabProps> = ({
  tabs,
  type = 'line',
  placement = 'top',
  size = 'md',
  iconOnly = false,
  defaultTab,
  onTabChange,
  onTabRemove,
  justifyContent = false,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleTabClick = (tabId: string) => {
    if (tabs.find((t) => t.id === tabId)?.disabled) return;
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleRemove = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabRemove?.(tabId);
    if (activeTab === tabId && tabs.length > 1) {
      const currentIndex = tabs.findIndex((t) => t.id === tabId);
      const nextTab = tabs[currentIndex + 1] || tabs[currentIndex - 1];
      if (nextTab) {
        setActiveTab(nextTab.id);
        onTabChange?.(nextTab.id);
      }
    }
  };

  const config = sizeConfig[size];
  const isVertical = placement === 'left' || placement === 'right';

  const getTabClasses = (tab: TabItem) => {
    const isActive = activeTab === tab.id;
    const isHovered = hoveredTab === tab.id;
    const baseClasses = `${config.padding} ${config.text} font-medium transition-all flex items-center gap-2 ${
      tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${justifyContent && !isVertical ? 'flex-1 justify-center' : ''}`;

    if (isVertical) {
      if (type === 'segment') {
        return `${baseClasses} w-full justify-start rounded-l-lg ${
          isActive
            ? 'bg-primary-600 text-white'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`;
      }
      if (type === 'no-border') {
        return `${baseClasses} w-full justify-start ${
          isActive
            ? 'text-primary-600 font-semibold'
            : 'text-neutral-600 hover:text-neutral-900'
        }`;
      }
      // Line type for vertical
      return `${baseClasses} w-full justify-start ${
        isActive
          ? 'text-primary-600 border-l-2 border-primary-600 bg-primary-50'
          : 'text-neutral-600 hover:text-neutral-900 border-l-2 border-transparent hover:border-neutral-300'
      }`;
    }

    // Horizontal tabs
    if (type === 'segment') {
      return `${baseClasses} rounded-t-lg ${
        isActive
          ? 'bg-primary-600 text-white'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
      }`;
    }

    if (type === 'no-border') {
      return `${baseClasses} ${
        isActive
          ? 'text-primary-600 font-semibold'
          : 'text-neutral-600 hover:text-neutral-900'
      }`;
    }

    // Line type (default) for horizontal
    return `${baseClasses} border-b-2 ${
      isActive
        ? 'text-primary-600 border-primary-600'
        : 'text-neutral-600 border-transparent hover:text-neutral-900 hover:border-neutral-300'
    }`;
  };

  const containerClasses = `flex ${
    isVertical ? 'flex-col' : 'flex-row'
  } ${justifyContent && !isVertical ? 'w-full' : ''} ${className}`;

  return (
    <div className={containerClasses}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="relative"
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => {
            setHoveredTab(null);
            setOpenDropdown(null);
          }}
        >
          <button
            onClick={() => handleTabClick(tab.id)}
            className={getTabClasses(tab)}
            disabled={tab.disabled}
          >
            {tab.icon && !iconOnly && <span className={config.icon}>{tab.icon}</span>}
            {iconOnly && tab.icon ? (
              <span className={config.icon}>{tab.icon}</span>
            ) : (
              <span>{tab.label}</span>
            )}
            {tab.badge && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
                {tab.badge}
              </span>
            )}
            {tab.removable && (
              <button
                onClick={(e) => handleRemove(e, tab.id)}
                className="ml-2 p-0.5 hover:bg-neutral-200 rounded"
                aria-label={`Remove ${tab.label}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {tab.dropdown && (
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          {tab.dropdown && (hoveredTab === tab.id || openDropdown === tab.id) && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 min-w-[150px]">
              {tab.dropdown.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 first:rounded-t-lg last:rounded-b-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

