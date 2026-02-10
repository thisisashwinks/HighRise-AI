'use client';

import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSubComponents } from '@/data/components';
import { MediaModalDialog } from '@/components/MediaModalDialog';

interface Example {
  title: string;
  description: string;
  code?: string;
  media?: {
    type: 'image';
    url: string;
    alt: string;
  };
  tags?: string[];
}

export const CheckboxOverviewDocumentation: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedDescription, setSelectedDescription] = useState<string>('');

  const handleImageClick = (src: string, alt: string, title: string, description: string) => {
    setSelectedImageSrc(src);
    setSelectedImageAlt(alt);
    setSelectedTitle(title);
    setSelectedDescription(description);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImageSrc('');
    setSelectedImageAlt('');
    setSelectedTitle('');
    setSelectedDescription('');
  };
  const subComponents = getSubComponents('Checkbox');
  const mainComponent = {
    name: 'Checkbox',
    category: 'Form',
    description: 'A versatile checkbox component supporting multiple sizes, states, and configurations. Includes support for checked, indeterminate, and error states with comprehensive interactive feedback.',
    href: '/components/checkbox/checkbox',
  };

  const examples: Example[] = [
    {
      title: 'Checkbox with Label',
      description: 'A checkbox component with a clear label positioned next to the checkbox. This pattern provides immediate context about what the checkbox controls and improves accessibility and usability. Labels help users understand the purpose of each checkbox option.',
      media: {
        type: 'image',
        url: '/examples/checkbox/Checkbox with Label.png',
        alt: 'Checkbox component with label',
      },
      tags: ['label', 'accessibility', 'usability'],
    },
    {
      title: 'Checkbox Group',
      description: 'Multiple checkboxes organized in a group layout, allowing users to select multiple options from a related set. This pattern is ideal for preferences, settings, or any scenario where multiple selections are allowed. The group provides visual consistency and clear organization.',
      media: {
        type: 'image',
        url: '/examples/checkbox/Checkbox Group.png',
        alt: 'Checkbox group component',
      },
      tags: ['group', 'multiple-selection', 'organization'],
    },
    {
      title: 'Checkbox Cards',
      description: 'Card-based checkbox components that provide visual distinction and additional context for each option. This pattern is ideal for plan selection, feature toggles, or any scenario where options need more prominence and visual separation. Cards can include icons, descriptions, and additional information.',
      media: {
        type: 'image',
        url: '/examples/checkbox/Checkbox Cards.png',
        alt: 'Checkbox cards component',
      },
      tags: ['cards', 'visual', 'prominent', 'feature-selection'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Checkbox' },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="mb-2">
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
            Form
          </span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Checkbox</h1>
        <p className="text-lg text-neutral-700 leading-relaxed">
          A comprehensive set of checkbox components for selecting one or multiple options. Includes the base Checkbox component, Checkbox Card for visual distinction, and Checkbox Group for managing multiple selections.
        </p>
      </header>

      {/* Component Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Components</h2>
        <p className="text-neutral-700 mb-6">
          The Checkbox component group includes the following variants. Each variant has its own detailed documentation page.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main component card */}
          <Link
            href={mainComponent.href}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="mb-2">
              <span className="badge badge-neutral">{mainComponent.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              {mainComponent.name}
            </h3>
            <p className="text-sm text-neutral-700">{mainComponent.description}</p>
          </Link>

          {/* Sub-component cards */}
          {subComponents.map((subComponent) => (
            <Link
              key={subComponent.name}
              href={subComponent.href}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="mb-2">
                <span className="badge badge-neutral">{subComponent.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {subComponent.name}
              </h3>
              <p className="text-sm text-neutral-700">{subComponent.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Examples Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Examples</h2>
        <p className="text-neutral-700 mb-6">
          See how checkbox components are used in real-world scenarios. Each example shows a different use case with context about where and why the component is applied.
        </p>
        <div className="columns-1 md:columns-2 gap-6" style={{ columnGap: '1.5rem' }}>
          {examples.map((example, index) => (
            <div key={index} className="break-inside-avoid mb-6 border border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
              {/* Media Section */}
              {example.media && (
                <div className="relative bg-neutral-50 border-b border-neutral-200">
                  <div 
                    className="relative w-full bg-neutral-50 cursor-pointer"
                    onClick={() => handleImageClick(example.media!.url, example.media!.alt || example.title, example.title, example.description)}
                  >
                    <img
                      src={example.media.url}
                      alt={example.media.alt || example.title}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
              
              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{example.title}</h3>
                <p className="text-sm text-neutral-700 mb-4">{example.description}</p>
                
                {example.code && (
                  <div className="mb-4">
                    <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                )}
                
                {example.tags && example.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {example.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Modal */}
      <MediaModalDialog
        mediaType="image"
        mediaUrl={selectedImageSrc}
        mediaAlt={selectedImageAlt}
        title={selectedTitle}
        description={selectedDescription}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
