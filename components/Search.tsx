'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchableItem, searchItems } from '@/lib/search-data';
import { buildFullSearchIndex } from '@/data/search-data';
import {
  getRecentSearches,
  addRecentSearch,
  getMostViewedItems,
  trackItemView,
  type RecentSearch,
  type ViewedItem,
} from '@/lib/search-history';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [searchIndex, setSearchIndex] = useState<SearchableItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [mostViewed, setMostViewed] = useState<ViewedItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSearchIndex(buildFullSearchIndex());
      setQuery('');
      setSelectedIndex(0);
      // Load recent searches and most viewed
      setRecentSearches(getRecentSearches());
      setMostViewed(getMostViewedItems());
      // Focus input after a short delay to ensure it's rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchItems(query, searchIndex);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, searchIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (item: SearchableItem) => {
    // Track item view
    trackItemView(item);
    // Add to recent searches if it was a search query
    if (query.trim()) {
      addRecentSearch(query);
    }
    router.push(item.href);
    onClose();
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    inputRef.current?.focus();
  };

  const handleMostViewedClick = (item: ViewedItem) => {
    // Find the item in search index and navigate
    const foundItem = searchIndex.find(i => i.id === item.itemId);
    if (foundItem) {
      handleSelect(foundItem);
    } else {
      // Fallback: navigate directly
      router.push(item.href);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 bg-black/20 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-neutral-200 w-full max-w-4xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-200">
          <svg
            className="w-5 h-5 text-neutral-400 flex-shrink-0"
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
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components, examples, and documentation..."
            className="flex-1 outline-none text-neutral-900 placeholder-neutral-400"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors ${
                      index === selectedIndex ? 'bg-neutral-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {item.type === 'component' && (
                          <div className="w-8 h-8 rounded bg-primary-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        )}
                        {item.type === 'example' && (
                          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {item.type === 'figma' && (
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-neutral-900 truncate">{item.title}</h3>
                          {/* Show type label */}
                          {item.type === 'example' && (
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex-shrink-0">
                              Example
                            </span>
                          )}
                          {item.type === 'figma' && (
                            <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded flex-shrink-0">
                              Figma Documentation
                            </span>
                          )}
                          {/* Show component name prominently for examples and figma */}
                          {item.componentName && (
                            <span className="text-xs font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded flex-shrink-0">
                              {item.componentName}
                            </span>
                          )}
                          {item.category && item.type === 'component' && (
                            <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded flex-shrink-0">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 line-clamp-1">{item.description}</p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.slice(0, 3).map((tag, tagIdx) => (
                              <span
                                key={tagIdx}
                                className="text-xs text-neutral-500 bg-neutral-50 px-1.5 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-neutral-500">No results found for &quot;{query}&quot;</p>
                <p className="text-sm text-neutral-400 mt-2">Try different keywords or check spelling</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!query.trim() && (
          <div className="px-4 py-6 max-h-[60vh] overflow-y-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-neutral-700">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecentSearchClick(search.query)}
                      className="px-3 py-1.5 text-sm text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-neutral-400"
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
                      {search.query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Most Viewed/Searched */}
            {mostViewed.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-neutral-700">Most Viewed</h3>
                </div>
                <div className="space-y-1">
                  {mostViewed.map((item) => (
                    <button
                      key={item.itemId}
                      onClick={() => handleMostViewedClick(item)}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="flex-shrink-0">
                        {item.type === 'component' && (
                          <div className="w-6 h-6 rounded bg-primary-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        )}
                        {item.type === 'example' && (
                          <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {item.type === 'figma' && (
                          <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-neutral-900 truncate">{item.title}</span>
                          {item.componentName && (
                            <span className="text-xs text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded flex-shrink-0">
                              {item.componentName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-xs text-neutral-400">
                        {item.count}x
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Default empty state if no history */}
            {recentSearches.length === 0 && mostViewed.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-neutral-500 mb-2">Start typing to search...</p>
                <p className="text-sm text-neutral-400">Search for components, examples, or documentation</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
