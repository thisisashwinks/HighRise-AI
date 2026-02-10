'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/inspirations', label: 'Inspirations' },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
      {navItems.map(({ href, label }) => {
        const isActive =
          href === '/'
            ? pathname === '/'
            : pathname === href || pathname.startsWith(href + '/');

        return (
          <Link
            key={href}
            href={href}
            className={`text-sm transition-colors py-2 border-b-2 -mb-[1px] ${
              isActive
                ? 'text-primary-600 font-semibold border-primary-600'
                : 'text-neutral-700 hover:text-neutral-900 border-transparent'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
