'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { UsabilityTest, UsabilityInvite } from '@/types/usability';

function authHeaders(session: { access_token: string } | null): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) h.Authorization = `Bearer ${session.access_token}`;
  return h;
}

type InviteWithLink = UsabilityInvite & { link?: string };

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId as string;
  const { session, user, loading: authLoading, isAuthEnabled } = useAuth();
  const [test, setTest] = useState<UsabilityTest | null>(null);
  const [invites, setInvites] = useState<InviteWithLink[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdLinks, setCreatedLinks] = useState<InviteWithLink[]>([]);

  useEffect(() => {
    if (!authLoading && isAuthEnabled && !user) {
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(`/prototypes/tests/${testId}/invite`)}`);
      return;
    }
    if (!session || !testId) return;
    (async () => {
      const [testRes, invitesRes] = await Promise.all([
        fetch(`/api/usability/tests/${testId}`, { headers: authHeaders(session) }),
        fetch(`/api/usability/tests/${testId}/invites`, { headers: authHeaders(session) }),
      ]);
      const testData = await testRes.json();
      const invitesData = await invitesRes.json();
      if (testRes.ok) setTest(testData.test);
      if (invitesRes.ok) setInvites(invitesData.invites ?? []);
    })();
  }, [authLoading, isAuthEnabled, user, session, testId, router]);

  const addEmail = () => {
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed) return;
    setEmailList((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setEmailInput('');
  };

  const removeEmail = (email: string) => {
    setEmailList((prev) => prev.filter((e) => e !== email));
  };

  const sendInvites = async () => {
    if (emailList.length === 0) {
      setError('Add at least one email.');
      return;
    }
    setError(null);
    setSending(true);
    try {
      const res = await fetch('/api/usability/invites', {
        method: 'POST',
        headers: authHeaders(session),
        body: JSON.stringify({ test_id: testId, emails: emailList }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send invites');
        setSending(false);
        return;
      }
      setCreatedLinks(data.invites ?? []);
      setEmailList([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invites');
    } finally {
      setSending(false);
    }
  };

  if (authLoading || (isAuthEnabled && !user)) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Test not found.</p>
        <Link href="/prototypes/dashboard">
          <Button variant="secondary">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Prototypes', href: '/prototypes' },
          { label: 'Dashboard', href: '/prototypes/dashboard' },
          { label: test.title, href: `/prototypes/tests/${testId}` },
          { label: 'Invite' },
        ]}
      />
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
        Invite testers
      </h1>
      <p className="mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Add email addresses. Each person will get a unique magic link to open the test (no sign-up required). Copy the links below to share if email is not configured.
      </p>
      <div className="flex gap-2 mb-4">
        <Input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="colleague@company.com"
          fullWidth
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
        />
        <Button type="button" variant="secondary" onClick={addEmail}>
          Add
        </Button>
      </div>
      {emailList.length > 0 && (
        <div className="mb-4">
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Sending to: {emailList.join(', ')}
          </p>
          <Button theme="primary" onClick={sendInvites} disabled={sending}>
            {sending ? 'Sending…' : 'Send invites'}
          </Button>
          <button
            type="button"
            onClick={() => setEmailList([])}
            className="ml-2 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Clear
          </button>
        </div>
      )}
      {error && (
        <p className="mb-4 text-sm" style={{ color: 'var(--color-error, #dc2626)' }}>
          {error}
        </p>
      )}
      {createdLinks.length > 0 && (
        <div className="mt-6 p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
          <h3 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Invite links (copy and share)
          </h3>
          <ul className="space-y-2 text-sm">
            {createdLinks.map((inv) => (
              <li key={inv.id}>
                <span style={{ color: 'var(--color-text-muted)' }}>{inv.email}:</span>{' '}
                <code className="break-all" style={{ color: 'var(--color-accent)' }}>{(inv as InviteWithLink).link || `[link]`}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
      {invites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            Previously invited
          </h2>
          <ul className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {invites.map((inv) => (
              <li key={inv.id}>{inv.email} — {inv.status}</li>
            ))}
          </ul>
        </div>
      )}
      <Link href={`/prototypes/tests/${testId}`} className="inline-block mt-6">
        <Button variant="secondary">Back to test</Button>
      </Link>
    </div>
  );
}
