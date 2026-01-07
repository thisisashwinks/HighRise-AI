'use client';

import React, { useState } from 'react';
import { Tab, TabItem } from './Tab';

export const TabStorybook: React.FC = () => {
  const [type, setType] = useState<'line' | 'segment' | 'no-border'>('line');
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
  const [iconOnly, setIconOnly] = useState(false);
  const [justifyContent, setJustifyContent] = useState(false);

  const sampleTabs: TabItem[] = [
    {
      id: 'tab1',
      label: 'Profile',
      icon: iconOnly ? '👤' : undefined,
      badge: iconOnly ? undefined : '3',
      removable: true,
    },
    {
      id: 'tab2',
      label: 'Settings',
      icon: iconOnly ? '⚙️' : undefined,
      removable: true,
    },
    {
      id: 'tab3',
      label: 'Messages',
      icon: iconOnly ? '💬' : undefined,
      badge: iconOnly ? undefined : '12',
      dropdown: [
        { label: 'Mark as read', onClick: () => console.log('Mark as read') },
        { label: 'Archive', onClick: () => console.log('Archive') },
      ],
    },
    {
      id: 'tab4',
      label: 'Notifications',
      icon: iconOnly ? '🔔' : undefined,
      disabled: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Controls Panel */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Controls</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'line' | 'segment' | 'no-border')}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="line">Line</option>
              <option value="segment">Segment</option>
              <option value="no-border">No Border</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Placement</label>
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value as 'top' | 'bottom' | 'left' | 'right')}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl' | '2xl')}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="sm">SM</option>
              <option value="md">MD</option>
              <option value="lg">LG</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
            </select>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={iconOnly}
                onChange={(e) => setIconOnly(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-neutral-700">Icon Only</span>
            </label>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={justifyContent}
                onChange={(e) => setJustifyContent(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-neutral-700">Full Width</span>
            </label>
          </div>
        </div>
      </div>

      {/* Component Preview */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Preview</h3>
        <div className={`${placement === 'left' || placement === 'right' ? 'flex' : ''} border border-neutral-200 rounded-lg p-4 bg-neutral-50`}>
          {placement === 'left' && (
            <div className="flex-shrink-0 mr-4">
              <Tab
                tabs={sampleTabs}
                type={type}
                placement={placement}
                size={size}
                iconOnly={iconOnly}
                justifyContent={justifyContent}
                onTabChange={(id) => console.log('Tab changed:', id)}
                onTabRemove={(id) => console.log('Tab removed:', id)}
              />
            </div>
          )}
          {placement === 'top' && (
            <Tab
              tabs={sampleTabs}
              type={type}
              placement={placement}
              size={size}
              iconOnly={iconOnly}
              justifyContent={justifyContent}
              onTabChange={(id) => console.log('Tab changed:', id)}
              onTabRemove={(id) => console.log('Tab removed:', id)}
            />
          )}
          {placement === 'bottom' && (
            <>
              <div className="mb-4 p-4 bg-white rounded border border-neutral-200 min-h-[200px]">
                <p className="text-neutral-600 text-sm">Content area</p>
              </div>
              <Tab
                tabs={sampleTabs}
                type={type}
                placement={placement}
                size={size}
                iconOnly={iconOnly}
                justifyContent={justifyContent}
                onTabChange={(id) => console.log('Tab changed:', id)}
                onTabRemove={(id) => console.log('Tab removed:', id)}
              />
            </>
          )}
          {placement === 'right' && (
            <div className="flex">
              <div className="flex-1 p-4 bg-white rounded border border-neutral-200 min-h-[200px]">
                <p className="text-neutral-600 text-sm">Content area</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <Tab
                  tabs={sampleTabs}
                  type={type}
                  placement={placement}
                  size={size}
                  iconOnly={iconOnly}
                  justifyContent={justifyContent}
                  onTabChange={(id) => console.log('Tab changed:', id)}
                  onTabRemove={(id) => console.log('Tab removed:', id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Preview */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Code</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`<Tab
  tabs={[
    { id: 'tab1', label: 'Profile', badge: '3', removable: true },
    { id: 'tab2', label: 'Settings', removable: true },
    { id: 'tab3', label: 'Messages', badge: '12' },
  ]}
  type="${type}"
  placement="${placement}"
  size="${size}"
  iconOnly={${iconOnly}}
  justifyContent={${justifyContent}}
  onTabChange={(id) => console.log('Tab changed:', id)}
  onTabRemove={(id) => console.log('Tab removed:', id)}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};

