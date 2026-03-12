'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Upload } from 'lucide-react';
import Confetti from 'react-confetti';
import { InspirationGrid } from '@/components/inspirations/InspirationGrid';
import { InspirationModal } from '@/components/inspirations/InspirationModal';
import { Leaderboard } from '@/components/inspirations/Leaderboard';
import {
  InspirationsFilters,
  filterInspirations,
  type FilterState,
} from '@/components/inspirations/InspirationsFilters';
import { UploadMetadata, LeaderboardEntry } from '@/types/upload';
import { Breadcrumbs } from '@/components/Breadcrumbs';

function InspirationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inspirations, setInspirations] = useState<UploadMetadata[]>([]);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedInspiration, setSelectedInspiration] = useState<UploadMetadata | null>(null);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiShownRef = useRef(false);
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    product: '',
    role: '',
    mediaType: '',
  });

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
      const url = `/api/inspirations?limit=100&_t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      const data = await response.json();
      const list = (data.success ? (data.uploads || []) : []) as UploadMetadata[];
      setInspirations(list);
    } catch (error) {
      console.error('Failed to fetch inspirations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const url = `/api/leaderboard?limit=50&_t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      const data = await response.json();
      setLeaderboardEntries((data.success && data.entries) ? data.entries : []);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInspirations();
  }, [fetchInspirations]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const idParam = searchParams.get('id');
  const uploadedParam = searchParams.get('uploaded');

  // After upload: show confetti overlay and refetch with cache bust so leaderboard updates
  useEffect(() => {
    if (uploadedParam === '1' && !confettiShownRef.current) {
      confettiShownRef.current = true;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      // Remove ?uploaded=1 from URL without reload (so refresh doesn't re-show confetti)
      const next = idParam ? `/inspirations?id=${idParam}` : '/inspirations';
      window.history.replaceState(null, '', next);
    }
  }, [uploadedParam, idParam]);

  // Refetch list + leaderboard when landing with ?id= or ?uploaded=1
  useEffect(() => {
    if (idParam || uploadedParam === '1') {
      setLeaderboardLoading(true);
      setLoading(true);
      fetchLeaderboard();
      fetchInspirations();
    }
  }, [idParam, uploadedParam, fetchLeaderboard, fetchInspirations]);

  useEffect(() => {
    const onFocus = () => {
      fetchInspirations();
      fetchLeaderboard();
    };
    const onVisibilityChange = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchInspirations();
        fetchLeaderboard();
      }
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [fetchInspirations, fetchLeaderboard]);

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

  const filteredInspirations = useMemo(
    () => filterInspirations(inspirations, filter),
    [inspirations, filter]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      {showConfetti && typeof window !== 'undefined' && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Inspirations' },
        ]}
      />

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
            Design Inspirations
          </h1>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Component examples and design patterns shared by the team
          </p>
        </div>
        <Link
          href="/inspirations/upload"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <Upload className="w-5 h-5 shrink-0" />
          <span>Upload</span>
        </Link>
      </div>

      <div className="mb-6">
        <InspirationsFilters
          inspirations={inspirations}
          filter={filter}
          onFilterChange={(next) => setFilter((f) => ({ ...f, ...next }))}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <InspirationGrid
            inspirations={filteredInspirations}
            onInspirationClick={handleInspirationClick}
            loading={loading}
          />
        </div>
        <div className="lg:col-span-1">
          <Leaderboard entries={leaderboardEntries} loading={leaderboardLoading} />
        </div>
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
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-accent)' }} />
        </div>
      </div>
    }>
      <InspirationsPageContent />
    </Suspense>
  );
}
