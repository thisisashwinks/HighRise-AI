import Link from 'next/link';
import { componentRegistry } from '@/data/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function ComponentsPage() {
  const components = componentRegistry;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components' },
        ]}
      />
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">All Components</h1>
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
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              {component.name}
            </h2>
            <p className="text-sm text-neutral-700">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

