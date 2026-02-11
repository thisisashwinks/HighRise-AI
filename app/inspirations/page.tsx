'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { InspirationGrid } from '@/components/inspirations/InspirationGrid';
import { InspirationModal } from '@/components/inspirations/InspirationModal';
import { UploadMetadata } from '@/types/upload';
import { Breadcrumbs } from '@/components/Breadcrumbs';

function InspirationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inspirations, setInspirations] = useState<UploadMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInspiration, setSelectedInspiration] = useState<UploadMetadata | null>(null);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);

  // Check for inspiration ID in URL
  useEffect(() => {
    const inspirationId = searchParams.get('id');
    if (inspirationId && inspirations.length > 0) {
      const inspiration = inspirations.find(i => i.id === inspirationId);
      if (inspiration) {
        setSelectedInspiration(inspiration);
        setIsInspirationModalOpen(true);
      }
    }
  }, [searchParams, inspirations]);

  const fetchInspirations = useCallback(async () => {
    try {
      const response = await fetch('/api/inspirations?limit=100', { cache: 'no-store' });
      const data = await response.json();
      const list = (data.success ? (data.uploads || []) : []) as UploadMetadata[];
      setInspirations(list);
    } catch (error) {
      console.error('Failed to fetch inspirations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInspirations();
  }, [fetchInspirations]);

  useEffect(() => {
    const onFocus = () => fetchInspirations();
    const onVisibilityChange = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') fetchInspirations();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [fetchInspirations]);

  const handleInspirationClick = (inspiration: UploadMetadata) => {
    setSelectedInspiration(inspiration);
    setIsInspirationModalOpen(true);
    router.push(`/inspirations?id=${inspiration.id}`, { scroll: false });
  };

  const handleCloseInspirationModal = () => {
    setIsInspirationModalOpen(false);
    setSelectedInspiration(null);
    router.push('/inspirations', { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Inspirations' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Design Inspirations</h1>
        <p className="text-lg text-neutral-700 mb-4">
          Component examples and design patterns shared by the team
        </p>
        <blockquote className="border-l-4 border-primary-500 bg-primary-50/50 text-neutral-700 py-3 px-4 rounded-r-md not-italic">
          You’ll be able to upload your own inspirations here in a future update.
        </blockquote>
      </div>

      <div className="grid grid-cols-1">
        <InspirationGrid
          inspirations={inspirations}
          onInspirationClick={handleInspirationClick}
          loading={loading}
        />
      </div>

      {/* Inspiration Detail Modal */}
      <InspirationModal
        inspiration={selectedInspiration}
        isOpen={isInspirationModalOpen}
        onClose={handleCloseInspirationModal}
      />
    </div>
  );
}

export default function InspirationsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </div>
      </div>
    }>
      <InspirationsPageContent />
    </Suspense>
  );
}
