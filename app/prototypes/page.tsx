'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';

export default function PrototypesLandingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Prototypes' },
        ]}
      />
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Usability testing & prototype feedback
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
          Share prototypes, collect session recordings and comments, and guide testers with tasks and questions.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/prototypes/dashboard"
          className="block p-6 rounded-xl border-2 transition-colors hover:border-[var(--color-accent)]"
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            For HighLevel team
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Create tests with one or more prototype variants, add guided tasks and questions, invite colleagues or
            customers, and view session replays and comments.
          </p>
          <Button theme="primary" width="fill-container">
            Go to dashboard
          </Button>
        </Link>
        <div
          className="block p-6 rounded-xl border-2"
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            As a tester
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Use the link shared with you by email. You don’t need to sign up — open the link, follow the tasks, try the
            prototype, and leave comments.
          </p>
        </div>
      </div>
    </div>
  );
}
