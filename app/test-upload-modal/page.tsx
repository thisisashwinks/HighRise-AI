'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { UploadModal } from '@/components/inspirations/UploadModal';
import { UploadFormData } from '@/types/upload';

export default function TestUploadModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: UploadFormData) => {
    console.log('Form submitted with data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Upload would be submitted! Check console for data.');
    return { success: true, uploadId: 'test-123' };
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Test Upload Modal</h1>
        <p className="text-lg text-neutral-700">
          Click the button below to test if the upload modal opens correctly
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="primary"
          theme="primary"
          onClick={() => setIsOpen(true)}
        >
          Open Upload Modal
        </Button>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <p className="text-sm text-neutral-600">
            <strong>Test Instructions:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-neutral-600 mt-2 space-y-1">
            <li>Click the button above to open the modal</li>
            <li>Check if the modal appears with overlay</li>
            <li>Try clicking outside the modal to close it</li>
            <li>Try pressing Escape key to close it</li>
            <li>Check if the form fields are visible</li>
            <li>Try dragging a file into the upload area</li>
          </ul>
        </div>

        {isOpen && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700">
              ✓ Modal state is open. The modal should be visible above this message.
            </p>
          </div>
        )}
      </div>

      <UploadModal
        isOpen={isOpen}
        onClose={() => {
          console.log('Modal closed');
          setIsOpen(false);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
