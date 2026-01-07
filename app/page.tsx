import Link from 'next/link';
import { componentRegistry } from '@/data/components';

export default function Home() {
  const components = componentRegistry;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          HighRise AI Component Documentation
        </h1>
        <p className="text-lg text-neutral-700 max-w-2xl">
          Comprehensive documentation for HighLevel HighRise AI product and design components.
          Focused on UX patterns, AI behavior, and accessibility guidelines.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Components</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="mb-2">
                <span className="badge badge-neutral">{component.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {component.name}
              </h3>
              <p className="text-sm text-neutral-700">{component.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-neutral-900 mb-3">About This Documentation</h2>
        <p className="text-neutral-700 mb-4">
          Each component documentation page follows a structured 11-section format covering:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 text-sm ml-4">
          <li>Header (name, category, description)</li>
          <li>When to Use</li>
          <li>When Not to Use / Anti-patterns</li>
          <li>Anatomy (numbered parts)</li>
          <li>Variants</li>
          <li>States</li>
          <li>Props / API Reference</li>
          <li>Usage Guidelines (Do / Don't)</li>
          <li>AI Considerations (for AI-related components)</li>
          <li>Accessibility</li>
          <li>Related Components</li>
        </ol>
      </section>
    </div>
  );
}

