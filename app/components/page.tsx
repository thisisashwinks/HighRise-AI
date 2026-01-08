import Link from 'next/link';
import { componentRegistry, comingSoonComponents } from '@/data/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function ComponentsPage() {
  const components = componentRegistry;
  const comingSoon = comingSoonComponents;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components' },
        ]}
      />
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">All Components</h1>
      
      {/* Regular Components */}
      {components.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="mb-2">
                <span className="badge badge-neutral">{component.category}</span>
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                {component.name}
              </h2>
              <p className="text-sm text-neutral-700">{component.description}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Coming Soon Components */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Coming Soon</h2>
        {comingSoon.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoon.map((component) => (
              <div
                key={component.name}
                className="card card-coming-soon"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="badge badge-neutral">{component.category}</span>
                  <span className="badge badge-primary">Coming Soon</span>
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  {component.name}
                </h2>
                <p className="text-sm text-neutral-700">{component.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-sm">No components coming soon at the moment.</p>
        )}
      </section>
    </div>
  );
}

