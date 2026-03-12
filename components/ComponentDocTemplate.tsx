'use client';

import { useState } from 'react';
import React from 'react';
import { ComponentDocProps } from '@/types/documentation';
import { Breadcrumbs } from './Breadcrumbs';
import { MediaModalDialog, MediaType } from './MediaModalDialog';

interface ComponentDocTemplateProps extends ComponentDocProps {}

export const ComponentDocTemplate: React.FC<ComponentDocTemplateProps> = ({
  name,
  category,
  description,
  whenToUse,
  whenNotToUse,
  anatomy,
  variants,
  states,
  props,
  usageGuidelines,
  aiConsiderations,
  accessibility,
  relatedComponents,
  figmaDocumentation,
  examples,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>('image');
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>('');
  const [selectedMediaAlt, setSelectedMediaAlt] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedDescription, setSelectedDescription] = useState<string>('');
  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState<string | undefined>(undefined);

  const handleMediaClick = (
    type: MediaType,
    url: string,
    alt: string,
    title: string,
    description: string,
    thumbnailUrl?: string
  ) => {
    setSelectedMediaType(type);
    setSelectedMediaUrl(url);
    setSelectedMediaAlt(alt);
    setSelectedTitle(title);
    setSelectedDescription(description);
    setSelectedThumbnailUrl(thumbnailUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMediaUrl('');
    setSelectedMediaAlt('');
    setSelectedTitle('');
    setSelectedDescription('');
    setSelectedThumbnailUrl(undefined);
  };

  return (
    <div className="docs-content max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: name },
        ]}
      />

      {/* Section 1: Header */}
      <header className="mb-12">
        <div className="mb-2">
          <span className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
            {category}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>{name}</h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
      </header>

      {/* Section 2: Figma Documentation Embed */}
      {figmaDocumentation && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>{figmaDocumentation.title}</h2>
          {figmaDocumentation.description && (
            <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>{figmaDocumentation.description}</p>
          )}
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
              <h4 className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Figma Design</h4>
              <a
                href={figmaDocumentation.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
              >
                <span>Open in Figma</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="relative" style={{ paddingBottom: '75%', height: 0, minHeight: '600px' }}>
              <iframe
                src={`https://www.figma.com/embed?embed-host=share&url=${encodeURIComponent(figmaDocumentation.figmaUrl)}${figmaDocumentation.figmaNodeId ? `&node-id=${figmaDocumentation.figmaNodeId}` : ''}`}
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 'none' }}
                allowFullScreen
                title={figmaDocumentation.title}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Examples - Use Cases */}
      {examples && examples.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>Examples</h2>
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            See how this component is used in real-world scenarios across different products. Each example shows a different use case with context about where and why the component is applied, and how these patterns could be adapted for HighLevel products.
          </p>
          <div className="columns-1 md:columns-2 gap-6" style={{ columnGap: '1.5rem' }}>
            {examples.map((example, index) => (
              <div key={index} className="break-inside-avoid mb-6 rounded-lg overflow-hidden border hover:shadow-lg transition-shadow" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
                {/* Media Section */}
                {example.media && (
                  <div className="relative border-b" style={{ backgroundColor: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
                    {example.media.type === 'video' ? (
                      <div 
                        className="relative w-full cursor-pointer" 
                        style={{ paddingBottom: '56.25%', height: 0 }}
                        onClick={() => handleMediaClick(
                          'video',
                          example.media!.url,
                          example.media!.alt || example.title,
                          example.title,
                          example.description,
                          example.media!.thumbnailUrl
                        )}
                      >
                        <video
                          src={example.media.url}
                          poster={example.media.thumbnailUrl}
                          controls={false}
                          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                          <div className="rounded-full p-3" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
                            <svg className="w-8 h-8" style={{ color: 'var(--color-text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : example.media.type === 'gif' ? (
                      <div 
                        className="relative w-full cursor-pointer"
                        style={{ backgroundColor: 'var(--color-surface-muted)' }}
                        onClick={() => handleMediaClick(
                          'gif',
                          example.media!.url,
                          example.media!.alt || example.title,
                          example.title,
                          example.description
                        )}
                      >
                        <img
                          src={example.media.url}
                          alt={example.media.alt || example.title}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    ) : example.media.type === 'html' ? (
                      <div 
                        className="relative w-full" 
                        style={{ paddingBottom: '75%', height: 0, minHeight: '400px' }}
                      >
                        <iframe
                          src={example.media.url}
                          className="absolute top-0 left-0 w-full h-full border-0"
                          title={example.media.alt || example.title}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                        {/* Expand button to open in modal */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMediaClick(
                              'html',
                              example.media!.url,
                              example.media!.alt || example.title,
                              example.title,
                              example.description
                            );
                          }}
                          className="absolute top-2 right-2 rounded-lg p-2 shadow-lg border transition-all z-10"
                          style={{ backgroundColor: 'var(--color-surface-elevated)', borderColor: 'var(--color-border)' }}
                          aria-label="Expand to fullscreen"
                          title="Expand to fullscreen"
                        >
                          <svg className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="relative w-full cursor-pointer"
                        style={{ backgroundColor: 'var(--color-surface-muted)' }}
                        onClick={() => handleMediaClick(
                          'image',
                          example.media!.url,
                          example.media!.alt || example.title,
                          example.title,
                          example.description
                        )}
                      >
                        <img
                          src={example.media.url}
                          alt={example.media.alt || example.title}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold pr-2" style={{ color: 'var(--color-text)' }}>{example.title}</h3>
                    {example.productName && (
                      example.productUrl ? (
                        <a
                          href={example.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium px-2 py-1 rounded transition-colors flex-shrink-0"
                          style={{ color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface-muted)' }}
                        >
                          {example.productName}
                        </a>
                      ) : (
                        <span className="text-xs font-medium px-2 py-1 rounded flex-shrink-0" style={{ color: 'var(--color-text-subtle)', backgroundColor: 'var(--color-surface-muted)' }}>
                          {example.productName}
                        </span>
                      )
                    )}
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>{example.description}</p>
                  
                  {example.code && (
                    <div className="mb-4">
                      <pre className="p-4 rounded-lg overflow-x-auto text-sm" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {example.tags && example.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {example.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ color: 'var(--color-text-subtle)', backgroundColor: 'var(--color-surface-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {example.highLevelApplication && (
                    <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                      <h4 className="text-xs font-semibold text-blue-900 mb-1">HighLevel Application</h4>
                      <p className="text-xs text-blue-800" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>{example.highLevelApplication}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: When to Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>When to Use</h2>
        <ul className="space-y-2" style={{ color: 'var(--color-text-muted)' }}>
          {whenToUse.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5: When Not to Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>When Not to Use</h2>
        <ul className="space-y-2" style={{ color: 'var(--color-text-muted)' }}>
          {whenNotToUse.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-600 mr-2">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 6: Anatomy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Anatomy</h2>
        <div className="space-y-4">
          {anatomy.map((item) => (
            <div key={item.number} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center mr-4 mt-1">
                {item.number}
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{item.name}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Variants</h2>
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
              <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{variant.name}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{variant.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: States */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>States</h2>
        <div className="space-y-3">
          {states.map((state, index) => (
            <div key={index} className="rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
              <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{state.name}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{state.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Props / API Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Props / API Reference</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Name</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Type</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Default</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={index} className="border-b hover:bg-[var(--color-surface-muted)]" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-3 px-4 font-mono text-sm text-primary-700">{prop.name}</td>
                  <td className="py-3 px-4 font-mono text-sm" style={{ color: 'var(--color-text-muted)' }}>{prop.type}</td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-subtle)' }}>
                    {prop.default || <span style={{ color: 'var(--color-text-subtle)' }}>—</span>}
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 10: Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Usage Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-700 mb-3 flex items-center">
              <span className="mr-2">✓</span> Do
            </h3>
            <ul className="space-y-2" style={{ color: 'var(--color-text-muted)' }}>
              {usageGuidelines.do.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-3 flex items-center">
              <span className="mr-2">✗</span> Don&apos;t
            </h3>
            <ul className="space-y-2" style={{ color: 'var(--color-text-muted)' }}>
              {usageGuidelines.dont.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 11: AI Considerations */}
      {aiConsiderations && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>AI Considerations</h2>
          <div className="space-y-6 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Invocation</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.invocation}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Latency Handling</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.latency}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Uncertainty & Errors</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.uncertainty}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Manual Override</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.manualOverride}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Context Passing</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.context}</p>
            </div>
            {aiConsiderations.safety && (
              <div>
                <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Safety & Constraints</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.safety}</p>
              </div>
            )}
            {aiConsiderations.dataVisibility && (
              <div>
                <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Data Visibility</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{aiConsiderations.dataVisibility}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 12: Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Accessibility</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Keyboard Navigation</h3>
            <ul className="space-y-1 text-sm ml-4" style={{ color: 'var(--color-text-muted)' }}>
              {accessibility.keyboard.map((item, index) => (
                <li key={index} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>Screen Reader Support</h3>
            <ul className="space-y-1 text-sm ml-4" style={{ color: 'var(--color-text-muted)' }}>
              {accessibility.screenReader.map((item, index) => (
                <li key={index} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>ARIA Hints</h3>
            <ul className="space-y-1 text-sm ml-4" style={{ color: 'var(--color-text-muted)' }}>
              {accessibility.ariaHints.map((item, index) => (
                <li key={index} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 14: Related Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Related Components</h2>
        <div className="flex flex-wrap gap-2">
          {relatedComponents.map((component, index) => (
            <a
              key={index}
              href={`/components/${component.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-muted)' }}
            >
              {component}
            </a>
          ))}
        </div>
      </section>

      {/* Section 15: Component Playground - Coming Soon */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Component Playground</h2>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
          <div className="p-12 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                style={{ color: 'var(--color-text-subtle)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Coming Soon</h3>
            <p className="max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              An interactive component playground where you can customize and test all component variants, sizes, and states in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Media Modal */}
      <MediaModalDialog
        mediaType={selectedMediaType}
        mediaUrl={selectedMediaUrl}
        mediaAlt={selectedMediaAlt}
        title={selectedTitle}
        description={selectedDescription}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        thumbnailUrl={selectedThumbnailUrl}
      />
    </div>
  );
};

