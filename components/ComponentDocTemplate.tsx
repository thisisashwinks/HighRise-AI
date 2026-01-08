import React from 'react';
import { ComponentDocProps } from '@/types/documentation';
import { Breadcrumbs } from './Breadcrumbs';

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
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
            {category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">{name}</h1>
        <p className="text-lg text-neutral-700 leading-relaxed">{description}</p>
      </header>

      {/* Section 2: Figma Documentation Embed */}
      {figmaDocumentation && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">{figmaDocumentation.title}</h2>
          {figmaDocumentation.description && (
            <p className="text-neutral-700 mb-4">{figmaDocumentation.description}</p>
          )}
          <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <h4 className="text-sm font-medium text-neutral-700">Figma Design</h4>
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
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Examples</h2>
          <p className="text-neutral-700 mb-6">
            See how this component is used in real-world scenarios across different products. Each example shows a different use case with context about where and why the component is applied, and how these patterns could be adapted for HighLevel products.
          </p>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6" style={{ columnGap: '1.5rem' }}>
            {examples.map((example, index) => (
              <div key={index} className="break-inside-avoid mb-6 border border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
                {/* Media Section */}
                {example.media && (
                  <div className="relative bg-neutral-50 border-b border-neutral-200">
                    {example.media.type === 'video' ? (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <video
                          src={example.media.url}
                          poster={example.media.thumbnailUrl}
                          controls
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : example.media.type === 'gif' ? (
                      <div className="relative w-full bg-neutral-900">
                        <img
                          src={example.media.url}
                          alt={example.media.alt || example.title}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    ) : example.media.type === 'html' ? (
                      <div className="relative w-full" style={{ paddingBottom: '75%', height: 0, minHeight: '400px' }}>
                        <iframe
                          src={example.media.url}
                          className="absolute top-0 left-0 w-full h-full border-0"
                          title={example.media.alt || example.title}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full bg-neutral-50">
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
                    <h3 className="text-lg font-semibold text-neutral-900 pr-2">{example.title}</h3>
                    {example.productName && (
                      example.productUrl ? (
                        <a
                          href={example.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded transition-colors flex-shrink-0"
                        >
                          {example.productName}
                        </a>
                      ) : (
                        <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded flex-shrink-0">
                          {example.productName}
                        </span>
                      )
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-700 mb-4">{example.description}</p>
                  
                  {example.tags && example.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
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
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">When to Use</h2>
        <ul className="space-y-2 text-neutral-700">
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
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">When Not to Use</h2>
        <ul className="space-y-2 text-neutral-700">
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
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Anatomy</h2>
        <div className="space-y-4">
          {anatomy.map((item) => (
            <div key={item.number} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center mr-4 mt-1">
                {item.number}
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">{item.name}</h3>
                <p className="text-neutral-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Variants</h2>
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
              <h3 className="font-medium text-neutral-900 mb-1">{variant.name}</h3>
              <p className="text-neutral-700 text-sm">{variant.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: States */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">States</h2>
        <div className="space-y-3">
          {states.map((state, index) => (
            <div key={index} className="bg-neutral-50 rounded-lg p-4">
              <h3 className="font-medium text-neutral-900 mb-1">{state.name}</h3>
              <p className="text-neutral-700 text-sm">{state.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Props / API Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Props / API Reference</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold text-neutral-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-900">Default</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-900">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-mono text-sm text-primary-700">{prop.name}</td>
                  <td className="py-3 px-4 font-mono text-sm text-neutral-600">{prop.type}</td>
                  <td className="py-3 px-4 text-sm text-neutral-500">
                    {prop.default || <span className="text-neutral-400">—</span>}
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-700">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 10: Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Usage Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-700 mb-3 flex items-center">
              <span className="mr-2">✓</span> Do
            </h3>
            <ul className="space-y-2 text-neutral-700">
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
            <ul className="space-y-2 text-neutral-700">
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
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">AI Considerations</h2>
          <div className="space-y-6 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Invocation</h3>
              <p className="text-neutral-700 text-sm">{aiConsiderations.invocation}</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Latency Handling</h3>
              <p className="text-neutral-700 text-sm">{aiConsiderations.latency}</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Uncertainty & Errors</h3>
              <p className="text-neutral-700 text-sm">{aiConsiderations.uncertainty}</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Manual Override</h3>
              <p className="text-neutral-700 text-sm">{aiConsiderations.manualOverride}</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Context Passing</h3>
              <p className="text-neutral-700 text-sm">{aiConsiderations.context}</p>
            </div>
            {aiConsiderations.safety && (
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">Safety & Constraints</h3>
                <p className="text-neutral-700 text-sm">{aiConsiderations.safety}</p>
              </div>
            )}
            {aiConsiderations.dataVisibility && (
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">Data Visibility</h3>
                <p className="text-neutral-700 text-sm">{aiConsiderations.dataVisibility}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 12: Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Accessibility</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-neutral-900 mb-2">Keyboard Navigation</h3>
            <ul className="space-y-1 text-neutral-700 text-sm ml-4">
              {accessibility.keyboard.map((item, index) => (
                <li key={index} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 mb-2">Screen Reader Support</h3>
            <ul className="space-y-1 text-neutral-700 text-sm ml-4">
              {accessibility.screenReader.map((item, index) => (
                <li key={index} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 mb-2">ARIA Hints</h3>
            <ul className="space-y-1 text-neutral-700 text-sm ml-4">
              {accessibility.ariaHints.map((item, index) => (
                <li key={index} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 14: Related Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Related Components</h2>
        <div className="flex flex-wrap gap-2">
          {relatedComponents.map((component, index) => (
            <a
              key={index}
              href={`/components/${component.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium transition-colors"
            >
              {component}
            </a>
          ))}
        </div>
      </section>

      {/* Section 15: Component Playground - Coming Soon */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Component Playground</h2>
        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
          <div className="p-12 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-neutral-400"
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
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Coming Soon</h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              An interactive component playground where you can customize and test all component variants, sizes, and states in real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

