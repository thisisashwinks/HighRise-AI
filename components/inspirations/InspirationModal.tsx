'use client';

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UploadMetadata } from '@/types/upload';
import { ExternalLink, Star, Calendar, User, Building2 } from 'lucide-react';

interface InspirationModalProps {
  inspiration: UploadMetadata | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InspirationModal: React.FC<InspirationModalProps> = ({
  inspiration,
  isOpen,
  onClose,
}) => {
  if (!inspiration) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Parse product to extract main product and sub-product
  const parseProduct = (product: string) => {
    if (product.includes(' - ')) {
      const [mainProduct, subProduct] = product.split(' - ');
      return { mainProduct, subProduct };
    }
    return { mainProduct: product, subProduct: null };
  };

  const { mainProduct, subProduct } = parseProduct(inspiration.product);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 pr-8">
          <DialogTitle className="text-xl sm:text-2xl flex-1" style={{ color: 'var(--color-text)' }}>{inspiration.title}</DialogTitle>
          {subProduct && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border shrink-0" style={{ backgroundColor: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{mainProduct}</span>
              <span style={{ color: 'var(--color-text-subtle)' }}>|</span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{subProduct}</span>
            </div>
          )}
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Media */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
            {inspiration.mediaType === 'link' ? (
              <div className="flex items-center justify-center h-full" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-accent)' }} />
                  <a
                    href={inspiration.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {inspiration.linkUrl}
                  </a>
                </div>
              </div>
            ) : inspiration.mediaType === 'video' ? (
              <video
                src={inspiration.mediaUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : inspiration.mediaUrl.startsWith('data:') ? (
              <img
                src={inspiration.mediaUrl}
                alt={inspiration.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={inspiration.mediaUrl}
                alt={inspiration.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                placeholder="empty"
              />
            )}
          </div>

          {/* Description */}
          {inspiration.description && (
            <div>
              <p className="whitespace-pre-wrap" style={{ color: 'var(--color-text-muted)' }}>{inspiration.description}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" style={{ color: 'var(--color-text-subtle)' }} />
              <div>
                <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>Uploaded by</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{inspiration.uploaderName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" style={{ color: 'var(--color-text-subtle)' }} />
              <div>
                <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>Product</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{inspiration.product}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <div>
                <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>Karma Points</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{inspiration.karmaPoints}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: 'var(--color-text-subtle)' }} />
              <div>
                <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>Date</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {formatDate(inspiration.timestamp)}
                </p>
              </div>
            </div>
          </div>

          {/* Link */}
          {inspiration.linkUrl && (
            <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <a
                href={inspiration.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium"
                style={{ color: 'var(--color-accent)' }}
              >
                <ExternalLink className="w-4 h-4" />
                View Source
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
