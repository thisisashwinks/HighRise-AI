'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchProvider } from '@/components/SearchProvider';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserAvatarDropdown } from '@/components/UserAvatarDropdown';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navItems: Array<{ href: string; label: string; comingSoon?: boolean }> = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/inspirations', label: 'Inspirations' },
  { href: '#', label: 'Prototypes', comingSoon: true },
  { href: '/guidelines', label: 'Agent Guidelines' },
];

export function TopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthEnabled } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="HighRise AI Home"
          >
            <span className="flex-shrink-0 rounded-lg p-1.5 transition-colors duration-200 group-hover:opacity-90">
              <svg
                width="28"
                height="28"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--color-accent)]"
                aria-hidden
              >
                <path
                  d="M12.7375 5.33333L13.2642 4.16667L14.4308 3.64C14.6908 3.52 14.6908 3.15333 14.4308 3.03333L13.2642 2.50667L12.7375 1.33333C12.6175 1.07333 12.2508 1.07333 12.1308 1.33333L11.6042 2.5L10.4308 3.02667C10.1708 3.14667 10.1708 3.51333 10.4308 3.63333L11.5975 4.16L12.1242 5.33333C12.2442 5.59333 12.6175 5.59333 12.7375 5.33333ZM7.43083 6.33333L6.37083 4C6.1375 3.48 5.39083 3.48 5.1575 4L4.0975 6.33333L1.76417 7.39333C1.24417 7.63333 1.24417 8.37333 1.76417 8.60667L4.0975 9.66667L5.1575 12C5.3975 12.52 6.1375 12.52 6.37083 12L7.43083 9.66667L9.76417 8.60667C10.2842 8.36667 10.2842 7.62667 9.76417 7.39333L7.43083 6.33333ZM12.1242 10.6667L11.5975 11.8333L10.4308 12.36C10.1708 12.48 10.1708 12.8467 10.4308 12.9667L11.5975 13.4933L12.1242 14.6667C12.2442 14.9267 12.6108 14.9267 12.7308 14.6667L13.2575 13.5L14.4308 12.9733C14.6908 12.8533 14.6908 12.4867 14.4308 12.3667L13.2642 11.84L12.7375 10.6667C12.6175 10.4067 12.2442 10.4067 12.1242 10.6667Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <span className="block text-lg font-semibold tracking-tight" style={{ color: 'var(--color-text)' }}>
                HighRise AI
              </span>
              <span className="block text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                Component Documentation
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <SearchProvider />
            <nav className="hidden sm:flex items-center gap-1" aria-label="Main">
              {navItems.map(({ href, label, comingSoon }) => {
                const isActive = !comingSoon && (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));
                if (comingSoon) {
                  return (
                    <span
                      key={label}
                      className="relative px-3 py-2 text-sm font-medium rounded-md cursor-not-allowed"
                      style={{ color: 'var(--color-text-subtle)' }}
                      title="Coming soon"
                    >
                      {label}
                      <span className="ml-1 text-[10px] uppercase tracking-wider opacity-80">Soon</span>
                    </span>
                  );
                }
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                    style={{
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-md"
                        style={{ backgroundColor: 'var(--color-accent-soft)', opacity: 0.4 }}
                        aria-hidden
                      />
                    )}
                    <span className="relative">{label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] focus-visible:ring-[var(--color-accent)]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {isAuthEnabled && (
                user ? (
                  <UserAvatarDropdown user={user} />
                ) : (
                  <Link
                    href="/auth/sign-in"
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'white',
                    }}
                  >
                    Sign in
                  </Link>
                )
              )}
              <button
                type="button"
                className="sm:hidden p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div
            className="sm:hidden border-t py-3 flex flex-col gap-1"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {navItems.map(({ href, label, comingSoon }) => {
              const isActive = !comingSoon && (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));
              if (comingSoon) {
                return (
                  <span
                    key={label}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed"
                    style={{ color: 'var(--color-text-subtle)' }}
                  >
                    {label} <span className="text-[10px] uppercase tracking-wider">(Coming soon)</span>
                  </span>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium"
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    backgroundColor: isActive ? 'var(--color-accent-soft)' : 'transparent',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
