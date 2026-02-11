'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { InspirationGrid } from '@/components/inspirations/InspirationGrid';
import { Leaderboard } from '@/components/inspirations/Leaderboard';
import { StorageWarning } from '@/components/inspirations/StorageWarning';
import { UploadModal } from '@/components/inspirations/UploadModal';
import { InspirationModal } from '@/components/inspirations/InspirationModal';
import { UploadDisabled } from '@/components/inspirations/UploadDisabled';
import { UploadMetadata, UploadFormData, FeatureFlags, UsageStats } from '@/types/upload';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Confetti from 'react-confetti';

const SESSION_UPLOADS_KEY = 'inspirations_session_uploads';

function getSessionUploads(): UploadMetadata[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(SESSION_UPLOADS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UploadMetadata[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function addSessionUpload(upload: UploadMetadata): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getSessionUploads();
    if (list.some(u => u.id === upload.id)) return;
    list.push(upload);
    sessionStorage.setItem(SESSION_UPLOADS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function pruneSessionUploads(serverIds: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getSessionUploads().filter(u => !serverIds.has(u.id));
    sessionStorage.setItem(SESSION_UPLOADS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

/** Merge server list with uploads stored in session (so they always show after tab switch/refetch). */
function mergeWithSessionUploads(serverList: UploadMetadata[]): UploadMetadata[] {
  const session = getSessionUploads();
  const byId = new Map<string, UploadMetadata>();
  for (const u of serverList) byId.set(u.id, u);
  for (const u of session) {
    if (!byId.has(u.id)) byId.set(u.id, u);
  }
  const merged = Array.from(byId.values()).sort((a, b) => b.timestamp - a.timestamp);
  pruneSessionUploads(new Set(serverList.map(u => u.id)));
  return merged;
}

function InspirationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inspirations, setInspirations] = useState<UploadMetadata[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedInspiration, setSelectedInspiration] = useState<UploadMetadata | null>(null);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [uploadSuccessId, setUploadSuccessId] = useState<string | null>(null);

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
      if (data.success) {
        const serverList = (data.uploads || []) as UploadMetadata[];
        setInspirations(mergeWithSessionUploads(serverList));
      }
    } catch (error) {
      console.error('Failed to fetch inspirations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch('/api/leaderboard?limit=10', { cache: 'no-store' });
      const data = await response.json();
      if (data.success) setLeaderboard(data.entries);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  const fetchFeatureStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/features/status');
      const data = await response.json();
      if (data.success) {
        setFeatureFlags(data.flags);
        setUsageStats(data.usage);
      }
    } catch (error) {
      console.error('Failed to fetch feature status:', error);
    }
  }, []);

  useEffect(() => {
    fetchInspirations();
    fetchLeaderboard();
    fetchFeatureStatus();
  }, [fetchInspirations, fetchLeaderboard, fetchFeatureStatus]);

  useEffect(() => {
    const onFocus = () => {
      fetchInspirations();
      fetchLeaderboard();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchInspirations, fetchLeaderboard]);

  const handleUploadSubmit = async (formData: UploadFormData): Promise<{ success: boolean; uploadId?: string; error?: string }> => {
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
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setIsUploadModalOpen(false);

        const newUpload = data.upload as UploadMetadata | undefined;
        if (newUpload) {
          addSessionUpload(newUpload);
          setInspirations(prev => (prev.some(u => u.id === newUpload.id) ? prev : [newUpload, ...prev]));
        }

        await fetchInspirations();
        await fetchLeaderboard();

        if (data.uploadId && newUpload) {
          setSelectedInspiration(newUpload);
          setIsInspirationModalOpen(true);
          router.push(`/inspirations?id=${data.uploadId}`, { scroll: false });
        }

        return { success: true, uploadId: data.uploadId };
      } else {
        return { success: false, error: data.error || 'Upload failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Upload failed' };
    }
  };

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
          { label: 'Inspirations' },
        ]}
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Design Inspirations</h1>
          <p className="text-lg text-neutral-700">
            Component examples and design patterns shared by the team
          </p>
        </div>
        {featureFlags !== null && !featureFlags.uploads.enabled ? (
          <Button
            variant="secondary"
            theme="neutral"
            disabled
            leadingIcon={<Upload className="w-5 h-5" />}
          >
            Upload Disabled
          </Button>
        ) : (
          <Button
            variant="primary"
            theme="primary"
            onClick={() => setIsUploadModalOpen(true)}
            leadingIcon={<Upload className="w-5 h-5" />}
          >
            Upload
          </Button>
        )}
      </div>

      {/* Storage Warning */}
      {usageStats && <StorageWarning usage={usageStats} />}

      {/* Upload Disabled Message */}
      {featureFlags && !featureFlags.uploads.enabled && (
        <div className="mb-6">
          <UploadDisabled
            message={featureFlags.uploads.message}
            reason={featureFlags.uploads.reason}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <InspirationGrid
            inspirations={inspirations}
            onInspirationClick={handleInspirationClick}
            loading={loading}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Leaderboard entries={leaderboard} loading={leaderboardLoading} />
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
      />

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
