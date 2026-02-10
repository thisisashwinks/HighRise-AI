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
      className="group cursor-pointer border border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
    >
      {/* Media Preview */}
      <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden">
        {inspiration.mediaType === 'link' ? (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-50 to-primary-100">
            <LinkIcon className="w-12 h-12 text-primary-400" />
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
              <div className="flex items-center justify-center h-full bg-neutral-200">
                <VideoIcon className="w-12 h-12 text-neutral-400" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="bg-white/90 rounded-full p-3">
                <VideoIcon className="w-6 h-6 text-neutral-900" />
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
        <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {inspiration.title}
        </h3>
        
        {inspiration.description && (
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {inspiration.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-700">{inspiration.uploaderName}</span>
            <span>•</span>
            <span>{inspiration.product}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{inspiration.karmaPoints}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
          <span>{formatDate(inspiration.timestamp)}</span>
          {inspiration.linkUrl && (
            <a
              href={inspiration.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 hover:text-primary-600 transition-colors"
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
