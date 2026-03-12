'use client';

import React from 'react';
import Image from 'next/image';
import { UploadMetadata } from '@/types/upload';
import { Star, ExternalLink, Video as VideoIcon, Link as LinkIcon } from 'lucide-react';

interface InspirationCardProps {
  inspiration: UploadMetadata;
  onClick?: () => void;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  inspiration,
  onClick,
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
      style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface-elevated)',
      }}
    >
      {/* Media Preview */}
      <div className="relative w-full aspect-video overflow-hidden" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
        {inspiration.mediaType === 'link' ? (
          <div className="flex items-center justify-center h-full" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
            <LinkIcon className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
          </div>
        ) : inspiration.mediaType === 'video' ? (
          <>
            {inspiration.thumbnailUrl ? (
              <Image
                src={inspiration.thumbnailUrl}
                alt={inspiration.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="empty"
              />
            ) : (
              <div className="flex items-center justify-center h-full" style={{ backgroundColor: 'var(--color-border)' }}>
                <VideoIcon className="w-12 h-12" style={{ color: 'var(--color-text-subtle)' }} />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="rounded-full p-3 opacity-90" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
                <VideoIcon className="w-6 h-6" style={{ color: 'var(--color-text)' }} />
              </div>
            </div>
          </>
        ) : inspiration.mediaUrl.startsWith('data:') ? (
          <img
            src={inspiration.mediaUrl}
            alt={inspiration.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Image
            src={inspiration.mediaUrl}
            alt={inspiration.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="empty"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-2 transition-colors" style={{ color: 'var(--color-text)' }}>
          {inspiration.title}
        </h3>
        
        {inspiration.description && (
          <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
            {inspiration.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <div className="flex items-center gap-2">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>{inspiration.uploaderName}</span>
            <span>•</span>
            <span>{inspiration.product}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-medium">{inspiration.karmaPoints}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-subtle)', borderTopWidth: '1px' }}>
          <span>{formatDate(inspiration.timestamp)}</span>
          {inspiration.linkUrl && (
            <a
              href={inspiration.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              <ExternalLink className="w-3 h-3" />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
