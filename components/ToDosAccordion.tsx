'use client';

import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

export interface TodoItem {
  id: string;
  label: string;
  completed?: boolean;
  dueDate?: string | Date;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
  disabled?: boolean;
}

export interface TodoSection {
  id: string;
  title: string;
  todos: TodoItem[];
  defaultExpanded?: boolean;
  disabled?: boolean;
}

export interface ToDosAccordionProps {
  sections: TodoSection[];
  size?: 'sm' | 'md' | 'lg';
  showCounts?: boolean;
  showDueDates?: boolean;
  showPriorities?: boolean;
  allowCollapseAll?: boolean;
  defaultExpanded?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
  onTodoToggle?: (sectionId: string, todoId: string, completed: boolean) => void;
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
    checkboxSize: 'sm' as const,
  },
  md: {
    headerPadding: 'px-4 py-3',
    contentPadding: 'px-4 py-3',
    text: 'text-base',
    icon: 'w-5 h-5',
    checkboxSize: 'md' as const,
  },
  lg: {
    headerPadding: 'px-5 py-4',
    contentPadding: 'px-5 py-4',
    text: 'text-lg',
    icon: 'w-5 h-5',
    checkboxSize: 'lg' as const,
  },
};

const priorityColors = {
  low: 'text-blue-600 bg-blue-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
};

const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const todayStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const tomorrowStr = tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  if (dateStr === todayStr) return 'Today';
  if (dateStr === tomorrowStr) return 'Tomorrow';
  
  const diffTime = dateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return `Overdue (${Math.abs(diffDays)}d)`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return dateStr;
};

export const ToDosAccordion: React.FC<ToDosAccordionProps> = ({
  sections,
  size = 'md',
  showCounts = true,
  showDueDates = true,
  showPriorities = true,
  allowCollapseAll = true,
  defaultExpanded,
  onExpandedChange,
  onTodoToggle,
  className = '',
  headerClassName = '',
  contentClassName = '',
}) => {
  // Initialize expanded state
  const getInitialExpanded = () => {
    if (defaultExpanded !== undefined) {
      return new Set(defaultExpanded);
    }
    // Expand sections with defaultExpanded prop
    const itemDefaults = sections
      .filter((section) => section.defaultExpanded && !section.disabled)
      .map((section) => section.id);
    if (itemDefaults.length > 0) {
      return new Set(itemDefaults);
    }
    return new Set<string>();
  };

  const [expandedIds, setExpandedIds] = useState<Set<string>>(getInitialExpanded);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [todoStates, setTodoStates] = useState<Record<string, Record<string, boolean>>>(() => {
    const states: Record<string, Record<string, boolean>> = {};
    sections.forEach((section) => {
      states[section.id] = {};
      section.todos.forEach((todo) => {
        states[section.id][todo.id] = todo.completed || false;
      });
    });
    return states;
  });

  const config = sizeConfig[size];

  const isExpanded = (id: string) => expandedIds.has(id);

  const handleToggle = (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section || section.disabled) return;

    setExpandedIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        if (!allowCollapseAll && newSet.size === 1) {
          return prev;
        }
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      onExpandedChange?.(Array.from(newSet));
      return newSet;
    });
  };

  const handleTodoToggle = (sectionId: string, todoId: string, checked: boolean) => {
    setTodoStates((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [todoId]: checked,
      },
    }));
    onTodoToggle?.(sectionId, todoId, checked);
  };

  const getCompletionCount = (section: TodoSection) => {
    const completed = section.todos.filter(
      (todo) => todoStates[section.id]?.[todo.id] ?? todo.completed ?? false
    ).length;
    return { completed, total: section.todos.length };
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, index: number) => {
    const section = sections.find((s) => s.id === id);
    if (!section || section.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ': {
        e.preventDefault();
        handleToggle(id);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = (index + 1) % sections.length;
        const nextSection = sections[nextIndex];
        if (nextSection && !nextSection.disabled) {
          const nextButton = document.getElementById(`todos-accordion-header-${nextSection.id}`);
          nextButton?.focus();
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = index === 0 ? sections.length - 1 : index - 1;
        const prevSection = sections[prevIndex];
        if (prevSection && !prevSection.disabled) {
          const prevButton = document.getElementById(`todos-accordion-header-${prevSection.id}`);
          prevButton?.focus();
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        const firstSection = sections.find((s) => !s.disabled);
        if (firstSection) {
          const firstButton = document.getElementById(`todos-accordion-header-${firstSection.id}`);
          firstButton?.focus();
        }
        break;
      }
      case 'End': {
        e.preventDefault();
        const lastSection = [...sections].reverse().find((s) => !s.disabled);
        if (lastSection) {
          const lastButton = document.getElementById(`todos-accordion-header-${lastSection.id}`);
          lastButton?.focus();
        }
        break;
      }
    }
  };

  return (
    <div className={`flex flex-col border border-neutral-200 rounded-lg overflow-hidden ${className}`} role="region">
      {sections.map((section, index) => {
        const isItemExpanded = isExpanded(section.id);
        const isHovered = hoveredId === section.id;
        const isFocused = focusedId === section.id;
        const isDisabled = section.disabled || false;
        const { completed, total } = getCompletionCount(section);

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
          last:border-b-0
          focus:outline-none
          ${isDisabled ? 'opacity-50 cursor-not-allowed text-neutral-400 bg-neutral-50' : 'cursor-pointer text-neutral-700 bg-white'}
          ${isHovered && !isDisabled ? 'bg-neutral-50' : ''}
          ${isFocused && !isDisabled ? 'ring-2 ring-primary-100 ring-inset' : ''}
          ${headerClassName}
        `.trim().replace(/\s+/g, ' ');

        const contentClasses = `
          ${config.contentPadding}
          ${config.text}
          text-neutral-600
          bg-neutral-50
          border-b
          border-neutral-200
          last:border-b-0
          ${contentClassName}
        `.trim().replace(/\s+/g, ' ');

        return (
          <div key={section.id} className="flex flex-col">
            <button
              id={`todos-accordion-header-${section.id}`}
              type="button"
              className={headerClasses}
              onClick={() => handleToggle(section.id)}
              onKeyDown={(e) => handleKeyDown(e, section.id, index)}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedId(section.id)}
              onBlur={() => setFocusedId(null)}
              disabled={isDisabled}
              aria-expanded={isItemExpanded}
              aria-controls={`todos-accordion-content-${section.id}`}
              aria-disabled={isDisabled}
            >
              <div className="flex-1 flex items-center gap-3">
                <span>{section.title}</span>
                {showCounts && (
                  <span className={`text-xs font-normal px-2 py-0.5 rounded ${
                    completed === total 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {completed}/{total}
                  </span>
                )}
              </div>
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
              id={`todos-accordion-content-${section.id}`}
              role="region"
              aria-labelledby={`todos-accordion-header-${section.id}`}
              className={`overflow-hidden transition-all duration-200 ${
                isItemExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {isItemExpanded && (
                <div className={contentClasses}>
                  <div className="space-y-3">
                    {section.todos.length === 0 ? (
                      <p className="text-neutral-500 text-sm italic">No todos in this section</p>
                    ) : (
                      section.todos.map((todo) => {
                        const isCompleted = todoStates[section.id]?.[todo.id] ?? todo.completed ?? false;
                        const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !isCompleted;

                        return (
                          <div
                            key={todo.id}
                            className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                              isCompleted ? 'opacity-60' : ''
                            } ${isOverdue ? 'bg-red-50 border border-red-200' : ''}`}
                          >
                            <Checkbox
                              size={config.checkboxSize}
                              checked={isCompleted}
                              disabled={todo.disabled}
                              onChange={(e) => handleTodoToggle(section.id, todo.id, e.target.checked)}
                              className="mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 flex-wrap">
                                <label
                                  className={`${config.text} flex-1 cursor-pointer ${
                                    isCompleted ? 'line-through text-neutral-500' : 'text-neutral-900'
                                  }`}
                                  onClick={() => !todo.disabled && handleTodoToggle(section.id, todo.id, !isCompleted)}
                                >
                                  {todo.label}
                                </label>
                                {showPriorities && todo.priority && (
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                                    priorityColors[todo.priority]
                                  }`}>
                                    {todo.priority}
                                  </span>
                                )}
                                {showDueDates && todo.dueDate && (
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                                    isOverdue 
                                      ? 'bg-red-100 text-red-700' 
                                      : 'bg-neutral-100 text-neutral-600'
                                  }`}>
                                    {formatDate(todo.dueDate)}
                                  </span>
                                )}
                              </div>
                              {todo.description && (
                                <p className={`text-sm mt-1 ${isCompleted ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                  {todo.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
