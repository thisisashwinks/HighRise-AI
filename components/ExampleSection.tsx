import React from 'react';
import Image from 'next/image';

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
              <div className="relative w-full" style={{ minHeight: '200px' }}>
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
    </div>
  );
};

