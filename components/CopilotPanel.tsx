'use client';

import React, { useState } from 'react';

export interface RecentQuery {
  id: string;
  title: string;
  date: string;
  onSelect?: () => void;
  onDismiss?: () => void;
}

export interface SuggestedAction {
  id: string;
  label: string;
  onClick: () => void;
}

export interface CopilotPanelTab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

export interface CopilotPanelProps {
  // State props
  expanded?: boolean;
  empty?: boolean;
  showTabs?: boolean;
  showSwap?: boolean;
  showExpandable?: boolean;
  showDock?: boolean;
  showBack?: boolean;
  
  // Content props
  title?: string;
  prompt?: string;
  promptDescription?: string;
  suggestedActions?: SuggestedAction[];
  recentQueries?: RecentQuery[];
  tabs?: CopilotPanelTab[];
  defaultTab?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  
  // Callbacks
  onClose?: () => void;
  onSwap?: () => void;
  onExpand?: () => void;
  onDock?: () => void;
  onBack?: () => void;
  onTabChange?: (tabId: string) => void;
  onNewChat?: () => void;
  onQuerySearch?: (query: string) => void;
  
  // Styling
  className?: string;
  position?: 'left' | 'right';
  width?: 'narrow' | 'wide';
}

export const CopilotPanel: React.FC<CopilotPanelProps> = ({
  expanded = false,
  empty = true,
  showTabs = false,
  showSwap = false,
  showExpandable = false,
  showDock = false,
  showBack = false,
  title = 'Ask AI',
  prompt = "What's on your mind?",
  promptDescription,
  suggestedActions = [],
  recentQueries = [],
  tabs = [],
  defaultTab,
  content,
  footer,
  onClose,
  onSwap,
  onExpand,
  onDock,
  onBack,
  onTabChange,
  onNewChat,
  onQuerySearch,
  className = '',
  position = 'right',
  width = 'narrow',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');
  const [querySearch, setQuerySearch] = useState('');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleQuerySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuerySearch(value);
    onQuerySearch?.(value);
  };

  const isWide = expanded && width === 'wide';
  const panelWidth = isWide ? 'w-[800px]' : expanded ? 'w-[600px]' : 'w-[400px]';

  return (
    <div
      className={`
        fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full
        bg-white border-l border-neutral-200 shadow-xl
        flex flex-col z-50
        ${panelWidth}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="complementary"
      aria-label="AI Copilot Panel"
    >
      {/* Recent Queries Panel (Left side when expanded) */}
      {expanded && (
        <div className="w-[240px] border-r border-neutral-200 flex flex-col bg-neutral-50">
          {/* Search Bar */}
          <div className="p-3 border-b border-neutral-200">
            <input
              type="text"
              placeholder="Search"
              value={querySearch}
              onChange={handleQuerySearchChange}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Recent Queries List */}
          <div className="flex-1 overflow-y-auto">
            {recentQueries.length === 0 ? (
              <div className="p-4 text-sm text-neutral-500 text-center">
                No recent queries
              </div>
            ) : (
              <div className="p-2">
                {recentQueries.map((query) => (
                  <div
                    key={query.id}
                    className="group p-3 mb-1 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                    onClick={query.onSelect}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-900 truncate mb-1">
                          {query.title}
                        </p>
                        <p className="text-xs text-neutral-500">{query.date}</p>
                      </div>
                      {query.onDismiss && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            query.onDismiss?.();
                          }}
                          className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:bg-neutral-200 rounded transition-opacity"
                          aria-label="Dismiss query"
                        >
                          <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {showBack && (
              <button
                onClick={onBack}
                className="p-1 hover:bg-neutral-100 rounded transition-colors flex-shrink-0"
                aria-label="Go back"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-lg font-semibold text-neutral-900 truncate">{title}</h2>
            {onNewChat && (
              <button
                onClick={onNewChat}
                className="ml-2 px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded transition-colors"
              >
                Start a new chat
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Menu Dots */}
            <button
              className="p-2 hover:bg-neutral-100 rounded transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {/* Swap/Pin Icon */}
            {showSwap && (
              <button
                onClick={onSwap}
                className="p-2 hover:bg-neutral-100 rounded transition-colors"
                aria-label="Swap panels"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            )}

            {/* Expand/Collapse Icon */}
            {showExpandable && (
              <button
                onClick={onExpand}
                className="p-2 hover:bg-neutral-100 rounded transition-colors"
                aria-label={expanded ? 'Collapse' : 'Expand'}
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            )}

            {/* Dock Icon */}
            {showDock && (
              <button
                onClick={onDock}
                className="p-2 hover:bg-neutral-100 rounded transition-colors"
                aria-label="Dock panel"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                </svg>
              </button>
            )}

            {/* Close Icon */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded transition-colors"
                aria-label="Close panel"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {showTabs && tabs.length > 0 && (
          <div className="flex border-b border-neutral-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex-1 px-4 py-3 text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }
                `.trim().replace(/\s+/g, ' ')}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {empty ? (
            <div className="p-6 flex flex-col items-center justify-center h-full">
              {/* Prompt Section */}
              <div className="text-center mb-8 max-w-md">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{prompt}</h3>
                {promptDescription && (
                  <p className="text-sm text-neutral-600">{promptDescription}</p>
                )}
              </div>

              {/* Suggested Actions */}
              {suggestedActions.length > 0 && (
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {suggestedActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.onClick}
                      className="px-4 py-3 text-sm text-left border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-primary-500 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              {content || (
                <div className="text-sm text-neutral-600">
                  {tabs.find(t => t.id === activeTab)?.content || 'No content available'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
