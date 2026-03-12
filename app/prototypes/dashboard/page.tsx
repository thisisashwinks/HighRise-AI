'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import type { UsabilityTest } from '@/types/usability';

function authHeaders(session: { access_token: string } | null): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) h.Authorization = `Bearer ${session.access_token}`;
  return h;
}

export default function PrototypesDashboardPage() {
  const router = useRouter();
  const { user, session, loading: authLoading, isAuthEnabled } = useAuth();
  const [tests, setTests] = useState<UsabilityTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthEnabled && !user) {
      router.push(`/auth/sign-in?redirect=${encodeURIComponent('/prototypes/dashboard')}`);
      return;
    }
    if (!user || !session) return;
    (async () => {
      try {
        const res = await fetch('/api/usability/tests', { headers: authHeaders(session) });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load tests');
          return;
        }
        setTests(data.tests ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load tests');
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, isAuthEnabled, user, session, router]);

  if (authLoading || (isAuthEnabled && !user)) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Prototypes', href: '/prototypes' },
          { label: 'Dashboard' },
        ]}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
            My tests
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Create and manage usability tests. Invite colleagues or customers and view their feedback.
          </p>
        </div>
        <Link href="/prototypes/tests/new">
          <Button theme="primary">Create test</Button>
        </Link>
      </div>
      {error && (
        <p className="mb-4 text-sm" style={{ color: 'var(--color-error, #dc2626)' }}>
          {error}
        </p>
      )}
      {loading ? (
        <p style={{ color: 'var(--color-text-muted)' }}>Loading tests…</p>
      ) : tests.length === 0 ? (
        <div
          className="rounded-lg border border-dashed p-12 text-center"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <p className="mb-4">No tests yet.</p>
          <Link href="/prototypes/tests/new">
            <Button theme="primary">Create your first test</Button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {tests.map((test) => (
            <li key={test.id}>
              <Link
                href={`/prototypes/tests/${test.id}`}
                className="block p-4 rounded-lg border transition-colors hover:border-[var(--color-accent)]"
                style={{
                  backgroundColor: 'var(--color-surface-elevated)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                  {test.title}
                </span>
                <span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {test.audience === 'employee' ? 'Team' : 'Customer'} · {test.variants.length} variant
                  {test.variants.length !== 1 ? 's' : ''}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
