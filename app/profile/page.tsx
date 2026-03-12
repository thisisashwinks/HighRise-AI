'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { InspirationGrid } from '@/components/inspirations/InspirationGrid';
import { InspirationModal } from '@/components/inspirations/InspirationModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { UploadMetadata } from '@/types/upload';
import { Loader2, ImageIcon } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthEnabled } = useAuth();
  const [inspirations, setInspirations] = useState<UploadMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInspiration, setSelectedInspiration] = useState<UploadMetadata | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMyUploads = useCallback(async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `/api/inspirations?limit=200&uploader_email=${encodeURIComponent(user.email)}&_t=${Date.now()}`,
        { cache: 'no-store' }
      );
      const data = await res.json();
      const list = (data.success && data.uploads) ? (data.uploads as UploadMetadata[]) : [];
      setInspirations(list);
    } catch {
      setInspirations([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!isAuthEnabled) {
      setLoading(false);
      return;
    }
    if (!authLoading && !user) {
      router.replace('/auth/sign-in');
      return;
    }
    if (user?.email) {
      fetchMyUploads();
    } else {
      setLoading(false);
    }
  }, [authLoading, user, isAuthEnabled, router, fetchMyUploads]);

  if (authLoading || (!user && isAuthEnabled)) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-accent)' }} />
      </div>
    );
  }

  if (!isAuthEnabled) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Sign-in is not configured.</p>
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'User';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Profile' },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
          My uploads
        </h1>
        <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
          {displayName} · {inspirations.length} inspiration{inspirations.length !== 1 ? 's' : ''}
        </p>
        <Link
          href="/inspirations/upload"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <ImageIcon className="w-4 h-4" />
          Upload new
        </Link>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden animate-pulse"
              style={{
                backgroundColor: 'var(--color-surface-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="aspect-video w-full" style={{ backgroundColor: 'var(--color-border)' }} />
              <div className="p-4 space-y-2">
                <div className="h-4 rounded w-3/4" style={{ backgroundColor: 'var(--color-border)' }} />
                <div className="h-3 rounded w-full" style={{ backgroundColor: 'var(--color-border)' }} />
              </div>
            </div>
          ))}
        </div>
      ) : inspirations.length === 0 ? (
        <div
          className="rounded-xl border border-dashed py-16 text-center"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface-muted)',
          }}
        >
          <p className="text-base font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
            No uploads yet
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-subtle)' }}>
            Share your first design inspiration with the team.
          </p>
          <Link
            href="/inspirations/upload"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <ImageIcon className="w-4 h-4" />
            Upload
          </Link>
        </div>
      ) : (
        <>
          <InspirationGrid
            inspirations={inspirations}
            onInspirationClick={(insp) => {
              setSelectedInspiration(insp);
              setModalOpen(true);
            }}
            loading={false}
          />
          <InspirationModal
            inspiration={selectedInspiration}
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedInspiration(null);
            }}
          />
        </>
      )}
    </div>
  );
}
