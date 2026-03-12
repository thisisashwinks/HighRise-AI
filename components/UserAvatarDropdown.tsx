'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { User as UserIcon, LogOut, ChevronDown } from 'lucide-react';

interface UserAvatarDropdownProps {
  user: User;
}

export function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      const t = setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
      return () => {
        clearTimeout(t);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [open]);

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'User';
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push('/');
  };

  return (
    <div className="relative w-full" ref={ref} style={{ overflow: 'visible' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] focus-visible:ring-[var(--color-accent)] w-full justify-center sm:justify-start"
        style={{
          backgroundColor: open ? 'var(--color-accent-soft)' : 'var(--color-surface-muted)',
          color: 'var(--color-text)',
        }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shrink-0"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'white',
          }}
        >
          {initial}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 bottom-full mb-2 w-56 rounded-xl py-1 shadow-lg z-[100]"
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
          role="menu"
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
              {displayName}
            </p>
            <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {user.email}
            </p>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:opacity-90 block"
            style={{ color: 'var(--color-text)' }}
            role="menuitem"
          >
            <UserIcon className="h-4 w-4 flex-shrink-0 inline" style={{ color: 'var(--color-text-muted)' }} />
            Profile
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 focus:outline-none hover:opacity-90 text-left"
            style={{ color: 'var(--color-text)' }}
            role="menuitem"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
