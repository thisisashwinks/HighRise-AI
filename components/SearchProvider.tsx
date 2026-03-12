'use client';

import { useState, useEffect } from 'react';
import { Search } from './Search';
import { SearchContextProvider } from '@/contexts/SearchContext';

export function SearchProvider({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <SearchContextProvider openSearch={() => setIsOpen(true)}>
      {children ?? null}
      <Search isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </SearchContextProvider>
  );
}
