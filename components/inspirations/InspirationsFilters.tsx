'use client';

import React, { useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { UploadMetadata } from '@/types/upload';

export type FilterState = {
  search: string;
  product: string;
  role: string;
  mediaType: string;
};

const MEDIA_LABELS: Record<string, string> = {
  image: 'Image',
  video: 'Video',
  gif: 'GIF',
  link: 'Link',
};

interface InspirationsFiltersProps {
  inspirations: UploadMetadata[];
  filter: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
}

export function InspirationsFilters({
  inspirations,
  filter,
  onFilterChange,
}: InspirationsFiltersProps) {
  const { products, roles } = useMemo(() => {
    const productSet = new Set<string>();
    const roleSet = new Set<string>();
    inspirations.forEach((i) => {
      if (i.product) productSet.add(i.product);
      if (i.role) roleSet.add(i.role);
    });
    return {
      products: Array.from(productSet).sort(),
      roles: Array.from(roleSet).sort(),
    };
  }, [inspirations]);

  const hasActiveFilters =
    filter.search.trim() !== '' ||
    filter.product !== '' ||
    filter.role !== '' ||
    filter.mediaType !== '';

  const clearFilters = () => {
    onFilterChange({
      search: '',
      product: '',
      role: '',
      mediaType: '',
    });
  };

  return (
    <div
      className="rounded-xl p-4 space-y-4"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          Filters
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-accent)' }}
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative lg:col-span-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: 'var(--color-text-subtle)' }}
          />
          <input
            type="search"
            placeholder="Search title, description…"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-accent)]"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
            aria-label="Search inspirations"
          />
        </div>
        <select
          value={filter.product}
          onChange={(e) => onFilterChange({ product: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-accent)]"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
          aria-label="Filter by product"
        >
          <option value="">All products</option>
          {products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={filter.role}
          onChange={(e) => onFilterChange({ role: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-accent)]"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
          aria-label="Filter by role"
        >
          <option value="">All roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={filter.mediaType}
          onChange={(e) => onFilterChange({ mediaType: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-accent)]"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
          aria-label="Filter by type"
        >
          <option value="">All types</option>
          {(['image', 'video', 'gif', 'link'] as const).map((t) => (
            <option key={t} value={t}>
              {MEDIA_LABELS[t] ?? t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function filterInspirations(
  list: UploadMetadata[],
  filter: FilterState
): UploadMetadata[] {
  const q = filter.search.trim().toLowerCase();
  return list.filter((i) => {
    if (q) {
      const match =
        i.title?.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        i.uploaderName?.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filter.product && i.product !== filter.product) return false;
    if (filter.role && i.role !== filter.role) return false;
    if (filter.mediaType && i.mediaType !== filter.mediaType) return false;
    return true;
  });
}
