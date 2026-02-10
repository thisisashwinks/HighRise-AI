'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UploadForm } from '@/components/inspirations/UploadForm';
import { UploadFormData } from '@/types/upload';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Confetti from 'react-confetti';
import { useState } from 'react';

export default function UploadPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (formData: UploadFormData): Promise<{ success: boolean; uploadId?: string; error?: string }> => {
    try {
      const uploadFormData = new FormData();
      if (formData.file) {
        uploadFormData.append('file', formData.file);
      }
      if (formData.linkUrl) {
        uploadFormData.append('linkUrl', formData.linkUrl);
      }
      uploadFormData.append('name', formData.name);
      uploadFormData.append('email', formData.email);
      uploadFormData.append('product', formData.product);
      uploadFormData.append('role', formData.role);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description);

      const response = await fetch('/api/inspirations', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        // Show confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        // Redirect to inspirations page with the uploaded content
        if (data.uploadId) {
          router.push(`/inspirations?id=${data.uploadId}`);
        } else {
          router.push('/inspirations');
        }

        return { success: true, uploadId: data.uploadId };
      } else {
        return { success: false, error: data.error || 'Upload failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Upload failed' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 0}
          height={typeof window !== 'undefined' ? window.innerHeight : 0}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Inspirations', href: '/inspirations' },
          { label: 'Upload' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Upload Inspiration</h1>
        <p className="text-lg text-neutral-700">
          Share component examples and design patterns with the team
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <UploadForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
