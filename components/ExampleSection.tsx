'use client';

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { MediaModalDialog } from './MediaModalDialog';

interface ExampleSectionProps {
  title: string;
  description?: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  children?: React.ReactNode;
}

export const ExampleSection: React.FC<ExampleSectionProps> = ({
  title,
  description,
  images,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>('');

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImageSrc(src);
    setSelectedImageAlt(alt);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImageSrc('');
    setSelectedImageAlt('');
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
      {description && (
        <p className="text-neutral-700 mb-4 text-sm">{description}</p>
      )}
      {images && images.length > 0 && (
        <div className="space-y-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
              <div 
                className="relative w-full cursor-pointer" 
                style={{ minHeight: '200px' }}
                onClick={() => handleImageClick(image.src, image.alt)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
                />
              </div>
              {image.caption && (
                <p className="px-4 py-2 text-sm text-neutral-600 bg-neutral-50 border-t border-neutral-200">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {children && <div className="mt-4">{children}</div>}

      {/* Media Modal */}
      <MediaModalDialog
        mediaType="image"
        mediaUrl={selectedImageSrc}
        mediaAlt={selectedImageAlt}
        title={title}
        description={description}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

