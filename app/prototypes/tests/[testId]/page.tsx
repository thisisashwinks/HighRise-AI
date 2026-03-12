'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import type { UsabilityTest } from '@/types/usability';

type FeedbackSessionWithMeta = {
  id: string;
  invite_id: string;
  variant_index: number;
  started_at: string;
  ended_at: string | null;
  invite_email: string;
  invite_status: string;
};

function authHeaders(session: { access_token: string } | null): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) h.Authorization = `Bearer ${session.access_token}`;
  return h;
}

export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId as string;
  const { session, user, loading: authLoading, isAuthEnabled } = useAuth();
  const [test, setTest] = useState<UsabilityTest | null>(null);
  const [sessions, setSessions] = useState<FeedbackSessionWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthEnabled && !user) {
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(`/prototypes/tests/${testId}`)}`);
      return;
    }
    if (!user || !session || !testId) return;
    (async () => {
      try {
        const [testRes, sessionsRes] = await Promise.all([
          fetch(`/api/usability/tests/${testId}`, { headers: authHeaders(session) }),
          fetch(`/api/usability/tests/${testId}/sessions`, { headers: authHeaders(session) }),
        ]);
        const testData = await testRes.json();
        const sessionsData = await sessionsRes.json();
        if (!testRes.ok) {
          setError(testData.error || 'Failed to load test');
          setLoading(false);
          return;
        }
        setTest(testData.test);
        setSessions(sessionsData.sessions ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, isAuthEnabled, user, session, testId, router]);

  if (authLoading || (isAuthEnabled && !user)) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      </div>
    );
  }

  if (loading && !test) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading test…</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Test not found.</p>
        <Link href="/prototypes/dashboard">
          <Button variant="secondary" className="mt-4">Back to dashboard</Button>
        </Link>
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
          { label: test.title },
        ]}
      />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            {test.title}
          </h1>
          {test.description && (
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {test.description}
            </p>
          )}
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {test.audience === 'employee' ? 'Team' : 'Customer'} · {test.variants.length} variant(s)
          </p>
        </div>
        <Link href={`/prototypes/tests/${testId}/invite`}>
          <Button theme="primary">Invite testers</Button>
        </Link>
      </div>
      {error && (
        <p className="mb-4 text-sm" style={{ color: 'var(--color-error, #dc2626)' }}>
          {error}
        </p>
      )}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
          Feedback sessions
        </h2>
        {sessions.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            No sessions yet. Invite testers and share the link — when they complete the test, sessions will appear here with replay and comments.
          </p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/prototypes/tests/${testId}/sessions/${s.id}`}
                  className="block p-3 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--color-surface-elevated)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <span className="font-medium">{s.invite_email}</span>
                  <span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Variant {s.variant_index + 1} · {s.invite_status} · {new Date(s.started_at).toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Link href="/prototypes/dashboard">
        <Button variant="secondary">Back to dashboard</Button>
      </Link>
    </div>
  );
}
