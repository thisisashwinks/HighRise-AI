'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { UsabilityVariant, GuidedFlow, GuidedTask, GuidedQuestion } from '@/types/usability';

function authHeaders(session: { access_token: string } | null): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) h.Authorization = `Bearer ${session.access_token}`;
  return h;
}

const DEFAULT_GUIDED_FLOW: GuidedFlow = {
  tasks: [],
  questions_pre: [],
  questions_post: [],
  template: null,
};

export default function NewTestPage() {
  const router = useRouter();
  const { session, user, loading: authLoading, isAuthEnabled } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState<'employee' | 'customer'>('employee');
  const [variants, setVariants] = useState<UsabilityVariant[]>([{ url: '', label: 'V1' }]);
  const [guidedFlow, setGuidedFlow] = useState<GuidedFlow>(DEFAULT_GUIDED_FLOW);
  const [template, setTemplate] = useState<'variant_comparison' | 'single_prototype' | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxVariants = audience === 'customer' ? 1 : 10;
  const minVariants = 1;

  const addVariant = () => {
    if (variants.length >= maxVariants) return;
    setVariants((v) => [...v, { url: '', label: `V${v.length + 1}` }]);
  };

  const removeVariant = (i: number) => {
    if (variants.length <= minVariants) return;
    setVariants((v) => v.filter((_, idx) => idx !== i));
  };

  const updateVariant = (i: number, field: 'url' | 'label', value: string) => {
    setVariants((v) => v.map((x, idx) => (idx === i ? { ...x, [field]: value } : x)));
  };

  const applyTemplate = () => {
    if (template === 'variant_comparison') {
      setGuidedFlow({
        tasks: [{ id: crypto.randomUUID(), text: 'Try each variant and compare them.' }],
        questions_pre: [{ id: crypto.randomUUID(), question: 'What are you looking for in this prototype?', type: 'text' }],
        questions_post: [
          { id: crypto.randomUUID(), question: 'Which variant do you prefer?', type: 'text' },
          { id: crypto.randomUUID(), question: 'Rate functionality (1-5)', type: 'rating' },
          { id: crypto.randomUUID(), question: 'Rate animations (1-5)', type: 'rating' },
        ],
        template: 'variant_comparison',
      });
    } else if (template === 'single_prototype') {
      setGuidedFlow({
        tasks: [{ id: crypto.randomUUID(), text: 'Complete the main flow (e.g. add to cart, or sign up).' }],
        questions_pre: [],
        questions_post: [
          { id: crypto.randomUUID(), question: 'Was anything confusing?', type: 'text' },
          { id: crypto.randomUUID(), question: 'How would you rate the experience (1-5)?', type: 'rating' },
        ],
        template: 'single_prototype',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    const validVariants = variants.filter((v) => v.url.trim());
    if (audience === 'customer' && validVariants.length !== 1) {
      setError('Customer tests must have exactly one prototype URL.');
      return;
    }
    if (audience === 'employee' && (validVariants.length < 1 || validVariants.length > 10)) {
      setError('Employee tests must have 1–10 variants.');
      return;
    }
    if (!session && isAuthEnabled) {
      setError('Please sign in first.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/usability/tests', {
        method: 'POST',
        headers: authHeaders(session),
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          audience,
          variants: validVariants,
          guided_flow: guidedFlow,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create test');
        setSubmitting(false);
        return;
      }
      router.push(`/prototypes/tests/${data.test.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || (isAuthEnabled && !user)) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
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
          { label: 'New test' },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
        Create a test
      </h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Add one or more prototype URLs (Figma, Lovable, or any link). For customers use a single variant; for the team you can add up to 10 to compare.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Checkout flow comparison"
          required
          fullWidth
        />
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this test about?"
            className="w-full rounded-lg border px-4 py-2 text-sm min-h-[80px]"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Audience
          </label>
          <select
            value={audience}
            onChange={(e) => {
              const v = e.target.value as 'employee' | 'customer';
              setAudience(v);
              if (v === 'customer') setVariants((prev) => (prev.length > 1 ? [prev[0]] : prev));
            }}
            className="rounded-lg border px-4 py-2 text-sm"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          >
            <option value="employee">HighLevel team (multiple variants)</option>
            <option value="customer">Customer (single prototype)</option>
          </select>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Prototype variants (URL + label)
            </label>
            {variants.length < maxVariants && (
              <button type="button" onClick={addVariant} className="text-sm" style={{ color: 'var(--color-accent)' }}>
                + Add variant
              </button>
            )}
          </div>
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input
                value={v.url}
                onChange={(e) => updateVariant(i, 'url', e.target.value)}
                placeholder="https://figma.com/... or https://..."
                fullWidth
              />
              <Input
                value={v.label}
                onChange={(e) => updateVariant(i, 'label', e.target.value)}
                placeholder="Label"
                className="w-24"
              />
              {variants.length > minVariants && (
                <button type="button" onClick={() => removeVariant(i)} className="text-red-600 text-sm">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Guided flow (optional)
          </label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as typeof template)}
            className="rounded-lg border px-4 py-2 text-sm mr-2"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          >
            <option value="">No template</option>
            <option value="variant_comparison">Variant comparison (team)</option>
            <option value="single_prototype">Single prototype (customer)</option>
          </select>
          <Button type="button" variant="secondary" size="sm" onClick={applyTemplate}>
            Apply template
          </Button>
          {(guidedFlow.tasks.length > 0 || guidedFlow.questions_pre.length > 0 || guidedFlow.questions_post.length > 0) && (
            <div className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {guidedFlow.tasks.length > 0 && <p>Tasks: {guidedFlow.tasks.length}</p>}
              {guidedFlow.questions_pre.length > 0 && <p>Pre-questions: {guidedFlow.questions_pre.length}</p>}
              {guidedFlow.questions_post.length > 0 && <p>Post-questions: {guidedFlow.questions_post.length}</p>}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm" style={{ color: 'var(--color-error, #dc2626)' }}>
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Button type="submit" theme="primary" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create test'}
          </Button>
          <Link href="/prototypes/dashboard">
            <Button type="button" variant="secondary">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
