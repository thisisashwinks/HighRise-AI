'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { componentRegistry, comingSoonComponents } from '@/data/components';
import { ChevronRight } from 'lucide-react';

const SECONDARY_SIDEBAR_WIDTH = 240;

export function ComponentsSidebar() {
  const pathname = usePathname();

  const flatList = componentRegistry.filter((c) => !c.parentGroup);

  return (
    <aside
      className="fixed left-[260px] top-0 z-30 flex h-full flex-col border-r overflow-y-auto"
      style={{
        width: SECONDARY_SIDEBAR_WIDTH,
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>
          Components
        </h2>
      </div>
      <nav className="flex-1 py-3 px-2" aria-label="Component list">
        <ul className="space-y-0.5">
          {flatList.map((component) => {
            const isActive = pathname === component.href || pathname.startsWith(component.href + '/');
            const subItems = componentRegistry.filter((c) => c.parentGroup === component.name);
            return (
              <li key={component.href}>
                <Link
                  href={component.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
                  style={{
                    color: isActive && !subItems.length ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    backgroundColor: isActive && !subItems.length ? 'var(--color-accent-soft)' : 'transparent',
                  }}
                >
                  <span className="flex-1 truncate">{component.name}</span>
                  {subItems.length > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />}
                </Link>
                {subItems.length > 0 && (
                  <ul className="ml-3 mt-0.5 space-y-0.5 border-l pl-2" style={{ borderColor: 'var(--color-border)' }}>
                    {subItems.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="block rounded-md px-2 py-1.5 text-sm transition-colors truncate"
                            style={{
                              color: subActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                              backgroundColor: subActive ? 'var(--color-accent-soft)' : 'transparent',
                            }}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
          {comingSoonComponents.length > 0 && (
            <li className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="px-3 mb-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>
                  Coming soon
                </h3>
              </div>
              <ul className="space-y-0.5" aria-label="Coming soon components">
                {comingSoonComponents.map((component) => (
                  <li key={component.name}>
                    <span
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-not-allowed block"
                      style={{ color: 'var(--color-text-subtle)' }}
                      title="Coming soon"
                    >
                      <span className="flex-1 truncate">{component.name}</span>
                      <span className="text-[9px] font-medium uppercase tracking-wider shrink-0" style={{ color: 'var(--color-text-subtle)', opacity: 0.8 }}>
                        Soon
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export const COMPONENTS_SECONDARY_SIDEBAR_WIDTH = SECONDARY_SIDEBAR_WIDTH;
