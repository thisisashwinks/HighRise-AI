'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { ReplayViewer } from '@/components/usability/ReplayViewer';
import type { UsabilitySessionEvent, UsabilityComment } from '@/types/usability';

function authHeaders(session: { access_token: string } | null): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) h.Authorization = `Bearer ${session.access_token}`;
  return h;
}

export default function SessionReplayPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId as string;
  const sessionId = params?.sessionId as string;
  const { session, user, loading: authLoading, isAuthEnabled } = useAuth();
  const [events, setEvents] = useState<UsabilitySessionEvent[]>([]);
  const [comments, setComments] = useState<UsabilityComment[]>([]);
  const [sessionMeta, setSessionMeta] = useState<{ invite_email: string; variant_index: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthEnabled && !user) {
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(`/prototypes/tests/${testId}/sessions/${sessionId}`)}`);
      return;
    }
    if (!session || !testId || !sessionId) return;
    (async () => {
      try {
        const [eventsRes, commentsRes, sessionsRes] = await Promise.all([
          fetch(`/api/usability/tests/${testId}/sessions/${sessionId}/events`, { headers: authHeaders(session) }),
          fetch(`/api/usability/tests/${testId}/sessions/${sessionId}/comments`, { headers: authHeaders(session) }),
          fetch(`/api/usability/tests/${testId}/sessions`, { headers: authHeaders(session) }),
        ]);
        const eventsData = await eventsRes.json();
        const commentsData = await commentsRes.json();
        const sessionsData = await sessionsRes.json();
        if (eventsRes.ok) setEvents(eventsData.events ?? []);
        if (commentsRes.ok) setComments(commentsData.comments ?? []);
        if (sessionsRes.ok) {
          const s = (sessionsData.sessions ?? []).find((x: { id: string }) => x.id === sessionId);
          if (s) setSessionMeta({ invite_email: s.invite_email, variant_index: s.variant_index });
        }
        if (!eventsRes.ok && !commentsRes.ok) setError(eventsData.error || commentsData.error || 'Failed to load');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, isAuthEnabled, user, session, testId, sessionId, router]);

  if (authLoading || (isAuthEnabled && !user)) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      </div>
    );
  }

  if (loading && events.length === 0 && comments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading session…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Prototypes', href: '/prototypes' },
          { label: 'Dashboard', href: '/prototypes/dashboard' },
          { label: 'Test', href: `/prototypes/tests/${testId}` },
          { label: sessionMeta ? `${sessionMeta.invite_email} — Session` : 'Session' },
        ]}
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Session replay
        </h1>
        {sessionMeta && (
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {sessionMeta.invite_email} · Variant {sessionMeta.variant_index + 1}
          </p>
        )}
      </div>
      {error && (
        <p className="mb-4 text-sm" style={{ color: 'var(--color-error, #dc2626)' }}>
          {error}
        </p>
      )}
      {events.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            Recording
          </h2>
          <ReplayViewer events={events} width={800} height={500} />
        </section>
      )}
      {events.length === 0 && (
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          No recording for this session (e.g. prototype was opened in a new tab).
        </p>
      )}
      <section>
        <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          Comments ({comments.length})
        </h2>
        {comments.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            No comments.
          </p>
        ) : (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className="p-3 rounded-lg border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface-elevated)',
                }}
              >
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  at ({Math.round(c.x)}, {Math.round(c.y)})
                  {(c.width > 0 || c.height > 0) && ` · area ${Math.round(c.width)}×${Math.round(c.height)}`}
                </p>
                <p style={{ color: 'var(--color-text)' }}>{c.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Link href={`/prototypes/tests/${testId}`} className="inline-block mt-6">
        <Button variant="secondary">Back to test</Button>
      </Link>
    </div>
  );
}
