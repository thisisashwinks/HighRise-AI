'use client';

import React from 'react';
import { InspirationCard } from './InspirationCard';
import { UploadMetadata } from '@/types/upload';

interface InspirationGridProps {
  inspirations: UploadMetadata[];
  onInspirationClick?: (inspiration: UploadMetadata) => void;
  loading?: boolean;
}

export const InspirationGrid: React.FC<InspirationGridProps> = ({
  inspirations,
  onInspirationClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden animate-pulse"
            style={{
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-elevated)',
            }}
          >
            <div className="w-full aspect-video" style={{ backgroundColor: 'var(--color-border)' }} />
            <div className="p-4 space-y-2">
              <div className="h-4 rounded w-3/4" style={{ backgroundColor: 'var(--color-border)' }} />
              <div className="h-3 rounded w-full" style={{ backgroundColor: 'var(--color-border)' }} />
              <div className="h-3 rounded w-2/3" style={{ backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (inspirations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="mb-2" style={{ color: 'var(--color-text-muted)' }}>No inspirations yet</p>
        <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
          Be the first to upload a component inspiration!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inspirations.map((inspiration) => (
        <InspirationCard
          key={inspiration.id}
          inspiration={inspiration}
          onClick={() => onInspirationClick?.(inspiration)}
        />
      ))}
    </div>
  );
};
