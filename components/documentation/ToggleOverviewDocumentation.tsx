import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSubComponents } from '@/data/components';

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

export const ToggleOverviewDocumentation: React.FC = () => {
  const subComponents = getSubComponents('Toggle');
  const mainComponent = {
    name: 'Toggle',
    category: 'Form',
    description: 'A toggle switch component for binary on/off states and settings. Supports multiple sizes, states, optional labels, and error states with smooth animations.',
    href: '/components/toggle/toggle',
  };

  const examples: Example[] = [
    {
      title: 'Toggle with Label',
      description: 'A toggle switch component with a clear label positioned next to the toggle. This pattern provides immediate context about what the toggle controls and improves accessibility and usability. Labels help users understand the purpose of each toggle setting and make interactions more intuitive.',
      media: {
        type: 'image',
        url: '/examples/toggle/Toggle with Label.png',
        alt: 'Toggle switch component with label',
      },
      tags: ['label', 'accessibility', 'standard'],
    },
    {
      title: 'Toggle Group',
      description: 'Multiple toggle switches displayed together in a group, allowing users to manage multiple related settings in one place. Toggle groups are ideal for settings panels, configuration pages, or preference sections where multiple binary options need to be organized together. This pattern helps users understand relationships between settings and provides a cohesive control experience.',
      media: {
        type: 'image',
        url: '/examples/toggle/Toggle Group.png',
        alt: 'Toggle group with multiple toggle switches',
      },
      tags: ['group', 'settings', 'organization'],
    },
    {
      title: 'Toggle Cards',
      description: 'Card-based toggle components that provide visual distinction and additional context for each option. Toggle cards are ideal for options that need more prominence, such as feature toggles, plan selections, or settings that benefit from visual differentiation. The card format allows for richer content including icons, descriptions, and custom styling while maintaining the binary on/off functionality.',
      media: {
        type: 'image',
        url: '/examples/toggle/Toggle Cards.png',
        alt: 'Toggle card components with visual distinction',
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
          { label: 'Toggle' },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="mb-2">
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
            Form
          </span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Toggle</h1>
        <p className="text-lg text-neutral-700 leading-relaxed">
          A comprehensive set of toggle switch components for binary on/off states. Includes the base Toggle component, Toggle Switch Group for managing multiple toggles, and Toggle Card Group for visual distinction with cards.
        </p>
      </header>

      {/* Component Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Components</h2>
        <p className="text-neutral-700 mb-6">
          The Toggle component group includes the following variants. Each variant has its own detailed documentation page.
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
          See how toggle switch components are used in real-world scenarios. Each example shows a different use case with context about where and why the component is applied.
        </p>
        <div className="columns-1 md:columns-2 gap-6" style={{ columnGap: '1.5rem' }}>
          {examples.map((example, index) => (
            <div key={index} className="break-inside-avoid mb-6 border border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
              {/* Media Section */}
              {example.media && (
                <div className="relative bg-neutral-50 border-b border-neutral-200">
                  <div className="relative w-full bg-neutral-50">
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
    </div>
  );
};
