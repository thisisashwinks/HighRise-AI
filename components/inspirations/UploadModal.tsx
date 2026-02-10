'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { UploadForm } from './UploadForm';
import { UploadFormData } from '@/types/upload';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UploadFormData) => Promise<{ success: boolean; uploadId?: string; error?: string }>;
  initialData?: Partial<UploadFormData>;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const handleSubmit = async (data: UploadFormData) => {
    const result = await onSubmit(data);
    if (result.success) {
      // Don't close immediately - let the parent handle success (confetti, redirect, etc.)
      return result;
    }
    return result;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload to Design Inspiration</DialogTitle>
          <DialogDescription>
            Share component examples and design inspirations with the team. Your uploads help build our component library.
          </DialogDescription>
        </DialogHeader>
        <UploadForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
};
