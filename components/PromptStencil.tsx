'use client';

import React from 'react';
import { TextArea } from './TextArea';
import { Button } from './Button';

export interface PromptStencilProps {
  /** Optional label above the input */
  label?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Current value (controlled) */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler; if provided, a primary action button is shown */
  onSubmit?: () => void;
  /** Label for the submit button when onSubmit is provided */
  submitLabel?: string;
  /** Optional footer content (helper text, character count, secondary actions) */
  footer?: React.ReactNode;
  /** Size of the input area */
  size?: 'sm' | 'md' | 'lg';
  /** Minimum rows for the textarea */
  minRows?: number;
  /** Maximum rows for the textarea (when autoResize is true) */
  maxRows?: number;
  /** Show character count when maxLength is set */
  showCharacterCount?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Helper text below the input */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message when error is true */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-resize textarea as user types */
  autoResize?: boolean;
  /** Additional class name for the container */
  className?: string;
  /** Optional id for the textarea (for form association) */
  id?: string;
}

const sizeConfig = {
  sm: { inputSize: 'sm' as const, spacing: 'gap-3' },
  md: { inputSize: 'md' as const, spacing: 'gap-4' },
  lg: { inputSize: 'lg' as const, spacing: 'gap-5' },
};

export const PromptStencil: React.FC<PromptStencilProps> = ({
  label,
  placeholder = 'Enter your prompt...',
  value = '',
  onChange,
  onSubmit,
  submitLabel = 'Submit',
  footer,
  size = 'md',
  minRows = 3,
  maxRows = 8,
  showCharacterCount = false,
  maxLength,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  autoResize = true,
  className = '',
  id,
}) => {
  const config = sizeConfig[size];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`flex flex-col ${config.spacing} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`font-medium text-neutral-900 ${
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
          }`}
        >
          {label}
        </label>
      )}

      <div className="flex flex-col gap-3">
        <TextArea
          id={id}
          variant="prompt-input"
          size={config.inputSize}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          minRows={minRows}
          maxRows={maxRows}
          autoResize={autoResize}
          fullWidth
          error={error}
          errorMessage={errorMessage}
          helperText={helperText}
          disabled={disabled}
          showCharacterCount={showCharacterCount}
          maxLength={maxLength}
        />

        {onSubmit && (
          <div className="flex justify-end">
            <Button
              variant="primary"
              theme="primary"
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
              onClick={onSubmit}
              disabled={disabled}
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </div>

      {footer && <div className="mt-1">{footer}</div>}
    </div>
  );
};
