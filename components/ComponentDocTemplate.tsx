import React from 'react';
import { ComponentDocProps } from '@/types/documentation';
import { TabStorybook } from './TabStorybook';
import { InputStorybook } from './InputStorybook';

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
  examples,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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

      {/* Section 2: When to Use */}
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

      {/* Section 3: When Not to Use / Anti-patterns */}
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

      {/* Section 4: Anatomy */}
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

      {/* Section 5: Variants */}
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

      {/* Section 6: States */}
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

      {/* Section 7: Props / API Reference */}
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

      {/* Section 8: Usage Guidelines */}
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
              <span className="mr-2">✗</span> Don't
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

      {/* Section 9: AI Considerations */}
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

      {/* Section 10: Accessibility */}
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

      {/* Section 11: Examples */}
      {examples && examples.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Examples</h2>
          <div className="space-y-8">
            {examples.map((example, index) => (
              <div key={index} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{example.title}</h3>
                  {example.description && (
                    <p className="text-neutral-700 mb-4">{example.description}</p>
                  )}
                </div>

                {/* Storybook-style Interactive Component */}
                {example.interactive && (
                  <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                    {name === 'Tab' && <TabStorybook />}
                    {name === 'Input' && <InputStorybook />}
                  </div>
                )}

                {/* Figma Embed */}
                {example.figmaUrl && (
                  <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                    <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                      <h4 className="text-sm font-medium text-neutral-700">Figma Design</h4>
                      <a
                        href={example.figmaUrl}
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
                        src={`https://www.figma.com/embed?embed-host=share&url=${encodeURIComponent(example.figmaUrl)}${example.figmaNodeId ? `&node-id=${example.figmaNodeId}` : ''}`}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{ border: 'none' }}
                        allowFullScreen
                        title={example.title}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                
                {example.imageUrl && !example.figmaUrl && (
                  <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                    <img
                      src={example.imageUrl}
                      alt={example.title}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                {example.code && (
                  <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                    <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                      <h4 className="text-sm font-medium text-neutral-700">Code Example</h4>
                    </div>
                    <pre className="bg-neutral-900 text-neutral-100 p-4 overflow-x-auto">
                      <code className="text-sm">{example.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 12: Related Components */}
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
    </div>
  );
};

