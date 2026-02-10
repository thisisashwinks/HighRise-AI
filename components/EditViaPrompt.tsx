'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { TextArea } from './TextArea';

export interface EditViaPromptProps {
  /** The prompt content to display/edit */
  value: string;
  /** Change handler for when prompt is edited */
  onChange?: (value: string) => void;
  /** Handler for when prompt is saved/submitted */
  onSave?: (value: string) => void;
  /** Handler for when edit is cancelled */
  onCancel?: () => void;
  /** Label above the component */
  label?: string;
  /** Placeholder text when editing */
  placeholder?: string;
  /** Whether the component starts in edit mode */
  defaultEditMode?: boolean;
  /** Whether editing is enabled */
  editable?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Minimum rows for textarea */
  minRows?: number;
  /** Maximum rows for textarea (when autoResize is true) */
  maxRows?: number;
  /** Show character count */
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
  /** Custom class name for container */
  className?: string;
  /** Label for the edit button */
  editLabel?: string;
  /** Label for the save button */
  saveLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Show inspect icon */
  showInspectIcon?: boolean;
  /** Custom footer content */
  footer?: React.ReactNode;
}

const sizeConfig = {
  sm: { 
    inputSize: 'sm' as const, 
    text: 'text-sm',
    spacing: 'gap-2',
    buttonSize: 'sm' as const,
  },
  md: { 
    inputSize: 'md' as const, 
    text: 'text-base',
    spacing: 'gap-3',
    buttonSize: 'md' as const,
  },
  lg: { 
    inputSize: 'lg' as const, 
    text: 'text-lg',
    spacing: 'gap-4',
    buttonSize: 'lg' as const,
  },
};

export const EditViaPrompt: React.FC<EditViaPromptProps> = ({
  value = '',
  onChange,
  onSave,
  onCancel,
  label,
  placeholder = 'Enter your prompt...',
  defaultEditMode = false,
  editable = true,
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
  editLabel = 'Edit',
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
  showInspectIcon = true,
  footer,
}) => {
  const [isEditing, setIsEditing] = useState(defaultEditMode);
  const [editedValue, setEditedValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const config = sizeConfig[size];

  // Sync editedValue with value prop when value changes externally
  useEffect(() => {
    if (!isEditing) {
      setEditedValue(value);
      setPreviousValue(value);
    }
  }, [value, isEditing]);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        // Place cursor at end
        const length = textarea.value.length;
        textarea.setSelectionRange(length, length);
      }
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (editable && !disabled) {
      setPreviousValue(editedValue);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    const newValue = editedValue;
    onChange?.(newValue);
    onSave?.(newValue);
    setPreviousValue(newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(previousValue);
    setIsEditing(false);
    onCancel?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditedValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to save
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    // Escape to cancel
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const currentLength = editedValue.length;

  return (
    <div className={`flex flex-col ${config.spacing} ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className={`${config.text} font-medium text-neutral-900`}>
            {label}
          </label>
          {!isEditing && editable && !disabled && (
            <button
              onClick={handleEdit}
              className={`${config.text} text-primary-600 hover:text-primary-700 flex items-center gap-1.5 transition-colors`}
              aria-label="Edit prompt"
            >
              {showInspectIcon && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
              {editLabel}
            </button>
          )}
        </div>
      )}

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <div ref={textareaRef as any}>
            <TextArea
              variant="prompt-input"
              size={config.inputSize}
              placeholder={placeholder}
              value={editedValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showCharacterCount && maxLength && (
                <span className={`${config.text} text-neutral-500`}>
                  {currentLength} / {maxLength}
                </span>
              )}
              {helperText && !error && (
                <span className={`${config.text} text-neutral-600`}>
                  {helperText}
                </span>
              )}
              {error && errorMessage && (
                <span className={`${config.text} text-red-600`}>
                  {errorMessage}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                theme="neutral"
                size={config.buttonSize}
                onClick={handleCancel}
                disabled={disabled}
              >
                {cancelLabel}
              </Button>
              <Button
                variant="primary"
                theme="primary"
                size={config.buttonSize}
                onClick={handleSave}
                disabled={disabled || (maxLength ? currentLength > maxLength : false)}
              >
                {saveLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div
            className={`
              ${config.text}
              ${config.inputSize === 'sm' ? 'px-3 py-2.5' : config.inputSize === 'md' ? 'px-4 py-3' : 'px-4 py-3.5'}
              border border-neutral-200 rounded-lg bg-neutral-50
              font-mono text-neutral-700
              whitespace-pre-wrap break-words
              min-h-[${minRows * 24}px]
            `.trim().replace(/\s+/g, ' ')}
            style={{ minHeight: `${minRows * 24}px` }}
          >
            {value || (
              <span className="text-neutral-400 italic">{placeholder}</span>
            )}
          </div>

          {footer && <div className="mt-1">{footer}</div>}
        </div>
      )}
    </div>
  );
};
