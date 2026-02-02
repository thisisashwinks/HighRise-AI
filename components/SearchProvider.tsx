'use client';

import { useState, useEffect } from 'react';
import { Search } from './Search';

export function SearchProvider() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // ESC to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors min-w-[200px] sm:min-w-[240px]"
        aria-label="Search (Cmd+K)"
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden md:inline text-left flex-1">Search components, examples...</span>
        <span className="md:hidden">Search</span>
        <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs font-semibold text-neutral-500 bg-white border border-neutral-200 rounded flex-shrink-0">
          ⌘K
        </kbd>
      </button>
      <Search isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
