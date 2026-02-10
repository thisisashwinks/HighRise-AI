'use client';

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type MediaType = 'image' | 'video' | 'gif' | 'html';

interface MediaModalDialogProps {
  mediaType: MediaType;
  mediaUrl: string;
  mediaAlt?: string;
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  thumbnailUrl?: string; // For videos
}

export const MediaModalDialog: React.FC<MediaModalDialogProps> = ({
  mediaType,
  mediaUrl,
  mediaAlt,
  title,
  description,
  isOpen,
  onClose,
  thumbnailUrl,
}) => {
  if (!mediaUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {(title || description) && (
          <DialogHeader className="px-6 pt-6 pb-4">
            {title && (
              <DialogTitle className="text-xl sm:text-2xl">{title}</DialogTitle>
            )}
            {description && (
              <p className="text-sm text-neutral-700 mt-2">{description}</p>
            )}
          </DialogHeader>
        )}
        
        <div className="px-6 pb-6">
          {mediaType === 'video' ? (
            <div className="relative w-full aspect-video bg-neutral-100 rounded-lg overflow-hidden">
              <video
                src={mediaUrl}
                poster={thumbnailUrl}
                controls
                className="w-full h-full object-contain"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : mediaType === 'gif' ? (
            <div className="relative w-full bg-neutral-100 rounded-lg overflow-hidden">
              <div className="relative w-full" style={{ minHeight: '400px' }}>
                <img
                  src={mediaUrl}
                  alt={mediaAlt || title || 'GIF'}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ) : mediaType === 'html' ? (
            <div className="relative w-full bg-neutral-100 rounded-lg overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: '75%', height: 0, minHeight: '500px' }}>
                <iframe
                  src={mediaUrl}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  title={mediaAlt || title || 'Interactive prototype'}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video bg-neutral-100 rounded-lg overflow-hidden">
              <Image
                src={mediaUrl}
                alt={mediaAlt || title || 'Image'}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
                placeholder="empty"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
