import Link from 'next/link';
import { componentRegistry } from '@/data/components';
import { Layout, ChevronRight } from 'lucide-react';

export default function ComponentsIndexPage() {
  const topLevel = componentRegistry.filter((c) => !c.parentGroup);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
        Components
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Select a component from the sidebar to view its documentation, or browse the list below.
      </p>
      <ul className="space-y-1">
        {topLevel.map((component) => {
          const subItems = componentRegistry.filter((c) => c.parentGroup === component.name);
          return (
            <li key={component.href}>
              <Link
                href={component.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <Layout className="h-4 w-4 shrink-0 opacity-60" />
                <span className="flex-1">{component.name}</span>
                <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
              </Link>
              {subItems.length > 0 && (
                <ul className="ml-6 mt-0.5 space-y-0.5 mb-2">
                  {subItems.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className="block rounded-md px-3 py-2 text-sm transition-colors"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
