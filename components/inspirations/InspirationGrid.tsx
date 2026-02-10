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
            className="border border-neutral-200 rounded-lg overflow-hidden bg-white animate-pulse"
          >
            <div className="w-full aspect-video bg-neutral-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-full" />
              <div className="h-3 bg-neutral-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (inspirations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 mb-2">No inspirations yet</p>
        <p className="text-sm text-neutral-400">
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
