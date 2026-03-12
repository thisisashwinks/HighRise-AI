'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchProvider } from '@/components/SearchProvider';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserAvatarDropdown } from '@/components/UserAvatarDropdown';
import { useSearchOpen } from '@/contexts/SearchContext';
import {
  Home,
  Layout,
  Lightbulb,
  FileText,
  Moon,
  Sun,
  Search,
  FlaskConical,
} from 'lucide-react';

const mainNavItems: Array<{ href: string; label: string; icon: React.ComponentType<{ className?: string }>; comingSoon?: boolean }> = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/components', label: 'Components', icon: Layout },
  { href: '/inspirations', label: 'Inspirations', icon: Lightbulb },
  { href: '#', label: 'Prototypes', icon: FlaskConical, comingSoon: true },
  { href: '/guidelines', label: 'Agent Guidelines', icon: FileText },
];

const SIDEBAR_WIDTH = 260;

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { openSearch } = useSearchOpen();

  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 flex h-full flex-col border-r"
        style={{
          width: SIDEBAR_WIDTH,
          backgroundColor: 'var(--color-surface-elevated)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Logo */}
        <div className="flex h-14 shrink-0 items-center gap-3 border-b px-4" style={{ borderColor: 'var(--color-border)' }}>
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="HighRise AI Home">
            <span className="flex-shrink-0 rounded-lg p-1.5" style={{ color: 'var(--color-accent)' }}>
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12.7375 5.33333L13.2642 4.16667L14.4308 3.64C14.6908 3.52 14.6908 3.15333 14.4308 3.03333L13.2642 2.50667L12.7375 1.33333C12.6175 1.07333 12.2508 1.07333 12.1308 1.33333L11.6042 2.5L10.4308 3.02667C10.1708 3.14667 10.1708 3.51333 10.4308 3.63333L11.5975 4.16L12.1242 5.33333C12.2442 5.59333 12.6175 5.59333 12.7375 5.33333ZM7.43083 6.33333L6.37083 4C6.1375 3.48 5.39083 3.48 5.1575 4L4.0975 6.33333L1.76417 7.39333C1.24417 7.63333 1.24417 8.37333 1.76417 8.60667L4.0975 9.66667L5.1575 12C5.3975 12.52 6.1375 12.52 6.37083 12L7.43083 9.66667L9.76417 8.60667C10.2842 8.36667 10.2842 7.62667 9.76417 7.39333L7.43083 6.33333ZM12.1242 10.6667L11.5975 11.8333L10.4308 12.36C10.1708 12.48 10.1708 12.8467 10.4308 12.9667L11.5975 13.4933L12.1242 14.6667C12.2442 14.9267 12.6108 14.9267 12.7308 14.6667L13.2575 13.5L14.4308 12.9733C14.6908 12.8533 14.6908 12.4867 14.4308 12.3667L13.2642 11.84L12.7375 10.6667C12.6175 10.4067 12.2442 10.4067 12.1242 10.6667Z" fill="currentColor" />
              </svg>
            </span>
            <span className="truncate text-base font-semibold" style={{ color: 'var(--color-text)' }}>
              HighRise AI
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="shrink-0 p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={openSearch}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
            style={{
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface-muted)',
              border: '1px solid var(--color-border)',
            }}
            aria-label="Search (⌘K)"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden sm:inline rounded px-1.5 py-0.5 text-xs font-medium" style={{ backgroundColor: 'var(--color-surface-elevated)', color: 'var(--color-text-subtle)' }}>⌘K</kbd>
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-visible py-3 px-3" aria-label="Main">
          <ul className="space-y-0.5">
            {mainNavItems.map(({ href, label, icon: Icon, comingSoon }) => {
              const isActive = !comingSoon && (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));
              const content = (
                <>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{label}</span>
                  {comingSoon && (
                    <span className="text-[10px] font-medium uppercase tracking-wider shrink-0" style={{ color: 'var(--color-text-subtle)' }}>
                      Soon
                    </span>
                  )}
                </>
              );
              return (
                <li key={label}>
                  {comingSoon ? (
                    <span
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium cursor-not-allowed"
                      style={{ color: 'var(--color-text-subtle)' }}
                      title="Coming soon"
                    >
                      {content}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                      style={{
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        backgroundColor: isActive ? 'var(--color-accent-soft)' : 'transparent',
                      }}
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: theme + auth — always visible so profile/sign-in show on Vercel even if auth env is unset */}
        <div className="shrink-0 border-t p-3 space-y-2 overflow-visible" style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          {user ? (
            <div className="px-1">
              <UserAvatarDropdown user={user} />
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="flex items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              Sign in
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
