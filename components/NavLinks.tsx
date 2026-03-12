'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const navItems: Array<{ href: string; label: string; comingSoon?: boolean }> = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/inspirations', label: 'Inspirations' },
  { href: '#', label: 'Prototypes', comingSoon: true },
  { href: '/guidelines', label: 'Guidelines' },
];

export function NavLinks() {
  const pathname = usePathname();
  const { user, signOut, isAuthEnabled } = useAuth();

  return (
    <div className="flex items-center gap-6">
      {navItems.map(({ href, label, comingSoon }) => {
        const isActive = !comingSoon && (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));
        if (comingSoon) {
          return (
            <span
              key={label}
              className="text-sm py-2 border-b-2 -mb-[1px] cursor-not-allowed text-neutral-500 border-transparent"
              title="Coming soon"
            >
              {label} (Coming soon)
            </span>
          );
        }
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
      {isAuthEnabled && (
        user ? (
          <button
            type="button"
            onClick={() => signOut()}
            className="text-sm text-neutral-700 hover:text-neutral-900 border-b-2 border-transparent py-2 -mb-[1px]"
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/auth/sign-in"
            className="text-sm text-neutral-700 hover:text-neutral-900 border-b-2 border-transparent py-2 -mb-[1px]"
          >
            Sign in
          </Link>
        )
      )}
    </div>
  );
}
