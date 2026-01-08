'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from './ImageModal';

interface GeneralPattern {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

interface GeneralPatternsSectionProps {
  patterns: GeneralPattern[];
}

export const GeneralPatternsSection: React.FC<GeneralPatternsSectionProps> = ({
  patterns,
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
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          General Pattern Examples
        </h2>
        <p className="text-lg text-neutral-700 mb-8 max-w-3xl">
          Explore common AI-powered patterns and interactions that can be applied
          across different components and contexts. These patterns demonstrate
          best practices for integrating AI capabilities into user interfaces.
        </p>
        <div className="space-y-6">
          {patterns.map((pattern, index) => (
            <div
              key={index}
              className="card p-0 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="p-6 pb-4">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {pattern.title}
                </h3>
                <p className="text-neutral-700 text-sm mb-4">
                  {pattern.description}
                </p>
              </div>
              <div className="relative w-full bg-neutral-50 border-t border-neutral-200">
                <div className="relative w-full" style={{ minHeight: '400px' }}>
                  <Image
                    src={pattern.image.src}
                    alt={pattern.image.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    draggable={false}
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ImageModal
        imageSrc={selectedImageSrc}
        imageAlt={selectedImageAlt}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
