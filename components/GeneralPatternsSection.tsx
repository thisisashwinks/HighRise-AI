'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MediaModalDialog } from './MediaModalDialog';

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
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedDescription, setSelectedDescription] = useState<string>('');

  const handleImageClick = (src: string, alt: string, title: string, description: string) => {
    setSelectedImageSrc(src);
    setSelectedImageAlt(alt);
    setSelectedTitle(title);
    setSelectedDescription(description);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImageSrc('');
    setSelectedImageAlt('');
    setSelectedTitle('');
    setSelectedDescription('');
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
                <div 
                  className="relative w-full cursor-pointer" 
                  style={{ minHeight: '400px' }}
                  onClick={() => handleImageClick(pattern.image.src, pattern.image.alt, pattern.title, pattern.description)}
                >
                  <Image
                    src={pattern.image.src}
                    alt={pattern.image.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    draggable={false}
                    priority={index === 0}
                    placeholder="empty"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MediaModalDialog
        mediaType="image"
        mediaUrl={selectedImageSrc}
        mediaAlt={selectedImageAlt}
        title={selectedTitle}
        description={selectedDescription}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
