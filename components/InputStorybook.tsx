'use client';

import React, { useState } from 'react';
import { Input } from './Input';

export const InputStorybook: React.FC = () => {
  const [size, setSize] = useState<'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg'>('md');
  const [variant, setVariant] = useState<'default' | 'leading-icon' | 'leading-dropdown' | 'trailing-dropdown' | 'leading-text' | 'payment' | 'tags' | 'trailing-button' | 'phone'>('default');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [tags, setTags] = useState<Array<{ id: string; label: string }>>([
    { id: '1', label: 'Private' },
    { id: '2', label: 'Projects' },
  ]);

  const handleTagRemove = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Controls Panel */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Controls</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as typeof size)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="3xs">3XS (24px)</option>
              <option value="2xs">2XS (28px)</option>
              <option value="xs">XS (32px)</option>
              <option value="sm">SM (36px)</option>
              <option value="md">MD (40px)</option>
              <option value="lg">LG (44px)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Variant</label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="default">Default</option>
              <option value="leading-icon">Leading Icon</option>
              <option value="leading-dropdown">Leading Dropdown</option>
              <option value="trailing-dropdown">Trailing Dropdown</option>
              <option value="leading-text">Leading Text</option>
              <option value="payment">Payment</option>
              <option value="tags">Tags</option>
              <option value="trailing-button">Trailing Button</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={error}
                onChange={(e) => setError(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-neutral-700">Error</span>
            </label>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-neutral-700">Disabled</span>
            </label>
          </div>
        </div>
      </div>

      {/* Component Preview */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Preview</h3>
        <div className="space-y-4">
          {variant === 'default' && (
            <Input
              size={size}
              placeholder="gohighlevel.com"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              errorMessage={error ? 'This field is required' : undefined}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'leading-icon' && (
            <Input
              size={size}
              placeholder="gohighlevel.com"
              leadingIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'leading-dropdown' && (
            <Input
              size={size}
              placeholder="+1 (000) 000-0000"
              leadingDropdown={{
                options: [
                  { label: 'US +1', value: '+1' },
                  { label: 'UK +44', value: '+44' },
                  { label: 'India +91', value: '+91' },
                ],
                value: '+1',
                onChange: (val) => console.log('Changed to:', val),
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'trailing-dropdown' && (
            <Input
              size={size}
              placeholder="1,000.00"
              trailingDropdown={{
                options: [
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' },
                  { label: 'GBP', value: 'GBP' },
                ],
                value: 'USD',
                onChange: (val) => console.log('Changed to:', val),
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'leading-text' && (
            <Input
              size={size}
              placeholder="www.gohighlevel.com"
              leadingText="https://"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'payment' && (
            <Input
              size={size}
              placeholder="Card number"
              trailingIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'tags' && (
            <Input
              size={size}
              placeholder="Add users"
              tags={tags}
              onTagRemove={handleTagRemove}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'trailing-button' && (
            <Input
              size={size}
              placeholder="www.gohighlevel.com"
              trailingButton={{
                label: 'Copy',
                onClick: () => console.log('Copied!'),
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}

          {variant === 'phone' && (
            <Input
              size={size}
              placeholder="(000) 000-0000"
              leadingDropdown={{
                options: [
                  { label: 'US +1', value: '+1' },
                  { label: 'UK +44', value: '+44' },
                  { label: 'India +91', value: '+91' },
                ],
                value: '+1',
                onChange: (val) => console.log('Changed to:', val),
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error}
              disabled={disabled}
              fullWidth
            />
          )}
        </div>
      </div>

      {/* Code Preview */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Code</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`<Input
  size="${size}"
  variant="${variant}"
  placeholder="${variant === 'leading-text' ? 'www.gohighlevel.com' : variant === 'leading-dropdown' || variant === 'phone' ? '+1 (000) 000-0000' : variant === 'trailing-dropdown' ? '1,000.00' : variant === 'payment' ? 'Card number' : variant === 'tags' ? 'Add users' : 'gohighlevel.com'}"
  ${variant === 'leading-icon' ? 'leadingIcon={<Icon />}' : ''}
  ${variant === 'leading-dropdown' || variant === 'phone' ? 'leadingDropdown={{ options: [...], value: "+1", onChange: (val) => {} }}' : ''}
  ${variant === 'trailing-dropdown' ? 'trailingDropdown={{ options: [...], value: "USD", onChange: (val) => {} }}' : ''}
  ${variant === 'leading-text' ? 'leadingText="https://"' : ''}
  ${variant === 'payment' ? 'trailingIcon={<CardIcon />}' : ''}
  ${variant === 'tags' ? 'tags={tags} onTagRemove={handleTagRemove}' : ''}
  ${variant === 'trailing-button' ? 'trailingButton={{ label: "Copy", onClick: () => {} }}' : ''}
  error={${error}}
  disabled={${disabled}}
  fullWidth
/>`}</code>
        </pre>
      </div>
    </div>
  );
};

