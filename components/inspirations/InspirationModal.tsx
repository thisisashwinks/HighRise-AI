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
          <DialogTitle className="text-xl sm:text-2xl flex-1">{inspiration.title}</DialogTitle>
          {subProduct && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg border border-neutral-200 shrink-0">
              <span className="text-sm font-medium text-neutral-700">{mainProduct}</span>
              <span className="text-neutral-400">|</span>
              <span className="text-sm text-neutral-600">{subProduct}</span>
            </div>
          )}
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Media */}
          <div className="relative w-full aspect-video bg-neutral-100 rounded-lg overflow-hidden">
            {inspiration.mediaType === 'link' ? (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                  <a
                    href={inspiration.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
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
              <p className="text-neutral-700 whitespace-pre-wrap">{inspiration.description}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Uploaded by</p>
                <p className="text-sm font-medium text-neutral-900">{inspiration.uploaderName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Product</p>
                <p className="text-sm font-medium text-neutral-900">{inspiration.product}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <div>
                <p className="text-xs text-neutral-500">Karma Points</p>
                <p className="text-sm font-medium text-neutral-900">{inspiration.karmaPoints}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Date</p>
                <p className="text-sm font-medium text-neutral-900">
                  {formatDate(inspiration.timestamp)}
                </p>
              </div>
            </div>
          </div>

          {/* Link */}
          {inspiration.linkUrl && (
            <div className="pt-4 border-t border-neutral-200">
              <a
                href={inspiration.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
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
