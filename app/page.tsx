'use client';

import Link from 'next/link';
import { Layout, Lightbulb, FileText, ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--color-accent)' }}>
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wider">Getting started</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4" style={{ color: 'var(--color-text)' }}>
          HighRise AI Documentation
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          A comprehensive guide to HighLevel&apos;s HighRise AI product: design components, patterns,
          and agent guidelines for building consistent, accessible, and user-centric AI experiences.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>
          What&apos;s in this doc
        </h2>

        <Link
          href="/components"
          className="group flex items-start gap-4 rounded-xl border p-5 transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface-elevated)',
          }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
            <Layout className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold mb-1 group-hover:underline" style={{ color: 'var(--color-text)' }}>
              Components
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              UI components with variants, states, and usage guidelines. Buttons, inputs, toggles,
              accordions, and more—each with examples and AI considerations.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 self-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: 'var(--color-accent)' }} />
        </Link>

        <Link
          href="/inspirations"
          className="group flex items-start gap-4 rounded-xl border p-5 transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface-elevated)',
          }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
            <Lightbulb className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold mb-1 group-hover:underline" style={{ color: 'var(--color-text)' }}>
              Inspirations
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Design examples and patterns shared by the team. Browse and upload component
              inspirations to keep the library growing.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 self-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: 'var(--color-accent)' }} />
        </Link>

        <Link
          href="/guidelines"
          className="group flex items-start gap-4 rounded-xl border p-5 transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface-elevated)',
          }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold mb-1 group-hover:underline" style={{ color: 'var(--color-text)' }}>
              Agent Guidelines
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Layout, typography, and copy guidelines for HighRise and HighRise AI. Use these in
              Cursor or other LLM projects so generated UI and copy stay consistent.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 self-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: 'var(--color-accent)' }} />
        </Link>
      </section>

      <p className="mt-12 text-sm" style={{ color: 'var(--color-text-subtle)' }}>
        Use the sidebar to navigate. Press <kbd className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border)' }}>⌘K</kbd> to search.
      </p>
    </div>
  );
}
