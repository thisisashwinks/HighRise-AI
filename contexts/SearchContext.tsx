'use client';

import React, { createContext, useContext } from 'react';

type SearchContextValue = {
  openSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchContextProvider({
  children,
  openSearch,
}: {
  children: React.ReactNode;
  openSearch: () => void;
}) {
  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchOpen(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    return { openSearch: () => {} };
  }
  return ctx;
}
