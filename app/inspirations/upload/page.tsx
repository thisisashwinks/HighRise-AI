'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadForm } from '@/components/inspirations/UploadForm';
import { UploadFormData } from '@/types/upload';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useAuth } from '@/contexts/AuthContext';

export default function UploadPage() {
  const router = useRouter();
  const { user, session, loading, isAuthEnabled } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (isAuthEnabled && !user) {
      router.replace(`/auth/sign-in?redirect=${encodeURIComponent('/inspirations/upload')}`);
    }
  }, [loading, isAuthEnabled, user, router]);

  const handleSubmit = async (formData: UploadFormData): Promise<{ success: boolean; uploadId?: string; error?: string }> => {
    try {
      const uploadFormData = new FormData();
      if (formData.file) {
        uploadFormData.append('file', formData.file);
      }
      if (formData.linkUrl) {
        uploadFormData.append('linkUrl', formData.linkUrl);
      }
      if (!isAuthEnabled) {
        uploadFormData.append('name', formData.name);
        uploadFormData.append('email', formData.email);
      }
      uploadFormData.append('product', formData.product);
      uploadFormData.append('role', formData.role);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description);

      const headers: Record<string, string> = {};
      if (session?.access_token) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }

      const response = await fetch('/api/inspirations', {
        method: 'POST',
        headers,
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        // Redirect immediately; confetti shows on Inspirations page overlay
        const redirectUrl = data.uploadId
          ? `/inspirations?id=${data.uploadId}&uploaded=1`
          : '/inspirations?uploaded=1';
        router.push(redirectUrl);
        return { success: true, uploadId: data.uploadId };
      } else {
        return { success: false, error: data.error || 'Upload failed' };
      }
    } catch (error: unknown) {
      return { success: false, error: error instanceof Error ? error.message : 'Upload failed' };
    }
  };

  if (isAuthEnabled && !user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Inspirations', href: '/inspirations' },
            { label: 'Upload' },
          ]}
        />
        <div className="mt-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
          {loading ? 'Checking sign-in…' : 'Redirecting to sign in…'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Inspirations', href: '/inspirations' },
          { label: 'Upload' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Upload Inspiration</h1>
        <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
          Share component examples and design patterns with the team
        </p>
      </div>

      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface-elevated)', borderColor: 'var(--color-border)' }}>
        <UploadForm
          onSubmit={handleSubmit}
          useAuthProfile={isAuthEnabled && !!user}
          authDisplayName={
            user?.user_metadata?.display_name ||
            user?.user_metadata?.username ||
            user?.email ||
            ''
          }
        />
      </div>
    </div>
  );
}
