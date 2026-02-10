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

export const RadioOverviewDocumentation: React.FC = () => {
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
  const subComponents = getSubComponents('Radio');
  const mainComponent = {
    name: 'Radio',
    category: 'Form',
    description: 'A versatile radio button component supporting multiple sizes, states, and configurations. Used for single-selection scenarios where only one option can be selected from a group.',
    href: '/components/radio/radio',
  };

  const examples: Example[] = [
    {
      title: 'Radio with Label',
      description: 'A radio button component with a clear label positioned next to the radio button. This pattern provides immediate context about what the radio option represents and improves accessibility and usability. Labels help users understand the purpose of each radio option and make selections more intuitive.',
      media: {
        type: 'image',
        url: '/examples/radio/Radio with Label.png',
        alt: 'Radio button component with label',
      },
      tags: ['label', 'accessibility', 'standard'],
    },
    {
      title: 'Radio Group',
      description: 'A group of radio buttons displayed together, allowing users to select a single option from multiple choices. Radio groups ensure mutual exclusivity - selecting one option automatically deselects others. This pattern is ideal for forms requiring single-selection scenarios like payment methods, notification preferences, or plan selection.',
      media: {
        type: 'image',
        url: '/examples/radio/Radio Group.png',
        alt: 'Radio group with multiple options',
      },
      tags: ['group', 'selection', 'mutual-exclusive'],
    },
    {
      title: 'Radio Cards',
      description: 'Card-based radio buttons that provide visual distinction and additional context for each option. Radio cards are ideal for options that need more prominence, such as plan selection, feature choices, or settings that benefit from visual differentiation. The card format allows for richer content including icons, descriptions, and custom styling.',
      media: {
        type: 'image',
        url: '/examples/radio/Radio Cards.png',
        alt: 'Radio card components with visual distinction',
      },
      tags: ['cards', 'visual', 'enhanced'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Radio' },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="mb-2">
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
            Form
          </span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Radio</h1>
        <p className="text-lg text-neutral-700 leading-relaxed">
          A comprehensive set of radio button components for selecting a single option from multiple choices. Includes the base Radio component, Radio Card for visual distinction, and Radio Group for managing multiple options.
        </p>
      </header>

      {/* Component Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Components</h2>
        <p className="text-neutral-700 mb-6">
          The Radio component group includes the following variants. Each variant has its own detailed documentation page.
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
          See how radio button components are used in real-world scenarios. Each example shows a different use case with context about where and why the component is applied.
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
