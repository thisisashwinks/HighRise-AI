'use client';

import React from 'react';
import { Input, InputProps } from './Input';

export interface InputFormSection {
  label?: string;
  icon?: React.ReactNode;
  fields: Array<InputProps & { id: string }>;
}

export interface InputFormProps {
  size?: 'sm' | 'md' | 'lg';
  columns?: 1 | 2 | 3 | number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sections: InputFormSection[];
  dividers?: boolean;
  showIcons?: boolean;
  state?: 'default' | 'loading' | 'error';
  loadingMessage?: string;
  errorMessage?: string;
  className?: string;
}

const sizeConfig = {
  sm: {
    inputSize: 'sm' as const,
    spacing: 'gap-3',
    sectionSpacing: 'mb-6',
  },
  md: {
    inputSize: 'md' as const,
    spacing: 'gap-4',
    sectionSpacing: 'mb-8',
  },
  lg: {
    inputSize: 'lg' as const,
    spacing: 'gap-5',
    sectionSpacing: 'mb-10',
  },
};

export const InputForm: React.FC<InputFormProps> = ({
  size = 'md',
  columns = 1,
  header,
  footer,
  sections,
  dividers = false,
  showIcons = true,
  state = 'default',
  loadingMessage = 'Loading form...',
  errorMessage = 'Failed to load form',
  className = '',
}) => {
  const config = sizeConfig[size];

  const getColumnClasses = (cols: number) => {
    const gridCols: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    };
    return gridCols[cols] || `grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(cols, 3)}`;
  };

  if (state === 'loading') {
    return (
      <div className={`${className}`}>
        {header && <div className="mb-6">{header}</div>}
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-neutral-600">{loadingMessage}</p>
          </div>
        </div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={`${className}`}>
        {header && <div className="mb-6">{header}</div>}
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-base font-medium text-neutral-900">{errorMessage}</p>
            <p className="text-sm text-neutral-600">Please try again later or contact support if the problem persists.</p>
          </div>
        </div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    );
  }

  return (
    <div className={className}>
      {header && <div className="mb-6">{header}</div>}
      
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Label */}
            {section.label && (
              <div className="flex items-center gap-2 mb-4">
                {showIcons && section.icon && (
                  <div className="w-3.5 h-3.5 text-neutral-600 flex-shrink-0">
                    {section.icon}
                  </div>
                )}
                <h3 className={`font-medium text-neutral-900 ${
                  size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
                }`}>
                  {section.label}
                </h3>
              </div>
            )}

            {/* Input Fields Grid */}
            <div className={`grid ${getColumnClasses(columns)} ${config.spacing}`}>
              {section.fields.map((field) => (
                <Input
                  key={field.id}
                  {...field}
                  size={config.inputSize}
                  fullWidth
                />
              ))}
            </div>

            {/* Divider */}
            {dividers && sectionIndex < sections.length - 1 && (
              <div className="mt-6 border-t border-neutral-200"></div>
            )}
          </div>
        ))}
      </div>

      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
};
