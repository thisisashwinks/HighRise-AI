// Utilities for managing search history and most viewed items

import { SearchableItem } from './search-data';

const RECENT_SEARCHES_KEY = 'highrise-search-recent';
const MOST_VIEWED_KEY = 'highrise-search-most-viewed';
const MAX_RECENT_SEARCHES = 5;
const MAX_MOST_VIEWED = 6;

export interface RecentSearch {
  query: string;
  timestamp: number;
}

export interface ViewedItem {
  itemId: string;
  count: number;
  lastViewed: number;
  title: string;
  href: string;
  type: 'component' | 'example' | 'figma';
  componentName?: string;
}

// Recent Searches
export function getRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!stored) return [];
    
    const searches: RecentSearch[] = JSON.parse(stored);
    return searches.slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  
  try {
    const searches = getRecentSearches();
    // Remove if already exists
    const filtered = searches.filter(s => s.query.toLowerCase() !== query.toLowerCase());
    // Add to beginning
    const updated = [
      { query: query.trim(), timestamp: Date.now() },
      ...filtered
    ].slice(0, MAX_RECENT_SEARCHES);
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Ignore errors
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Ignore errors
  }
}

// Most Viewed/Searched Items
export function getMostViewedItems(): ViewedItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(MOST_VIEWED_KEY);
    if (!stored) return [];
    
    const items: ViewedItem[] = JSON.parse(stored);
    // Sort by count (descending), then by last viewed (descending)
    return items
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return b.lastViewed - a.lastViewed;
      })
      .slice(0, MAX_MOST_VIEWED);
  } catch {
    return [];
  }
}

export function trackItemView(item: SearchableItem): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(MOST_VIEWED_KEY);
    const items: ViewedItem[] = stored ? JSON.parse(stored) : [];
    
    const existingIndex = items.findIndex(i => i.itemId === item.id);
    
    if (existingIndex >= 0) {
      // Update existing
      items[existingIndex].count += 1;
      items[existingIndex].lastViewed = Date.now();
      // Update title in case it changed
      items[existingIndex].title = item.title;
    } else {
      // Add new
      items.push({
        itemId: item.id,
        count: 1,
        lastViewed: Date.now(),
        title: item.title,
        href: item.href,
        type: item.type,
        componentName: item.componentName,
      });
    }
    
    localStorage.setItem(MOST_VIEWED_KEY, JSON.stringify(items));
  } catch {
    // Ignore errors
  }
}

export function clearMostViewedItems(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(MOST_VIEWED_KEY);
  } catch {
    // Ignore errors
  }
}
