'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PrototypeViewer } from '@/components/usability/PrototypeViewer';
import { SessionRecorder } from '@/components/usability/SessionRecorder';
import { CommentToolbar } from '@/components/usability/CommentToolbar';
import type { UsabilityTest, GuidedFlow, GuidedQuestion } from '@/types/usability';

type Step = 'loading' | 'intro' | 'prototype' | 'post' | 'done';

interface ResolvedSession {
  invite: { id: string; email: string; status: string };
  test: UsabilityTest;
}

export default function TesterPage() {
  const params = useParams();
  const sessionToken = params?.sessionToken as string;
  const containerRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>('loading');
  const [session, setSession] = useState<ResolvedSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [feedbackSessionId, setFeedbackSessionId] = useState<string | null>(null);
  const [preAnswers, setPreAnswers] = useState<Record<string, string>>({});
  const [postAnswers, setPostAnswers] = useState<Record<string, string>>({});
  const [recordingEnabled, setRecordingEnabled] = useState(true);

  useEffect(() => {
    if (!sessionToken) {
      setError('Invalid link.');
      setStep('done');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/usability/session?token=${encodeURIComponent(sessionToken)}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Invalid or expired link.');
          setStep('done');
          return;
        }
        setSession({ invite: data.invite, test: data.test });
        setStep('intro');
      } catch (e) {
        setError('Failed to load.');
        setStep('done');
      }
    })();
  }, [sessionToken]);

  const startPrototype = async () => {
    if (!session) return;
    try {
      const res = await fetch('/api/usability/feedback-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_token: sessionToken, variant_index: variantIndex }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start');
      setFeedbackSessionId(data.feedback_session.id);
      setStep('prototype');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start');
    }
  };

  const finishPrototype = async () => {
    if (!feedbackSessionId) {
      setStep('post');
      return;
    }
    try {
      await fetch('/api/usability/feedback-session/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_token: sessionToken,
          feedback_session_id: feedbackSessionId,
        }),
      });
    } catch (_) {}
    setStep('post');
  };

  const submitPostAndDone = async () => {
    if (!feedbackSessionId) {
      setStep('done');
      return;
    }
    try {
      await fetch('/api/usability/feedback-session/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_token: sessionToken,
          feedback_session_id: feedbackSessionId,
          answers: { ...preAnswers, ...postAnswers },
        }),
      });
    } catch (_) {}
    setStep('done');
  };

  const gf = session?.test?.guided_flow;
  const hasPre = gf && (gf.questions_pre?.length ?? 0) > 0;
  const hasPost = gf && (gf.questions_post?.length ?? 0) > 0;
  const hasTasks = gf && (gf.tasks?.length ?? 0) > 0;

  if (step === 'loading') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
        Loading…
      </div>
    );
  }

  if (step === 'done' && error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Thank you
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Your feedback has been submitted. You can close this page.
        </p>
      </div>
    );
  }

  if (step === 'intro' && session) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {session.test.title}
        </h1>
        {session.test.description && (
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            {session.test.description}
          </p>
        )}
        {hasTasks && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              What to do
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {session.test.guided_flow.tasks.map((t) => (
                <li key={t.id}>{t.text}</li>
              ))}
            </ul>
          </div>
        )}
        {hasPre && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              Quick questions
            </h2>
            {session.test.guided_flow.questions_pre.map((q) => (
              <div key={q.id} className="mb-3">
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                  {q.question}
                </label>
                <Input
                  value={preAnswers[q.id] ?? ''}
                  onChange={(e) => setPreAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                  fullWidth
                />
              </div>
            ))}
          </div>
        )}
        {session.test.variants.length > 1 && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
              Which variant do you want to try first?
            </label>
            <select
              value={variantIndex}
              onChange={(e) => setVariantIndex(Number(e.target.value))}
              className="rounded-lg border px-4 py-2 text-sm w-full"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
              }}
            >
              {session.test.variants.map((v, i) => (
                <option key={i} value={i}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <Button theme="primary" onClick={startPrototype}>
          Start prototype
        </Button>
      </div>
    );
  }

  if (step === 'prototype' && session && feedbackSessionId) {
    const variant = session.test.variants[variantIndex];
    if (!variant) return null;
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto p-4">
          <div className="relative w-full" style={{ minHeight: '70vh' }}>
            <PrototypeViewer url={variant.url} containerRef={containerRef}>
              {recordingEnabled && (
                <SessionRecorder
                  feedbackSessionId={feedbackSessionId}
                  sessionToken={sessionToken}
                  enabled={true}
                  containerRef={containerRef}
                />
              )}
              <CommentToolbar
                sessionToken={sessionToken}
                feedbackSessionId={feedbackSessionId}
                containerRef={containerRef}
                enabled={true}
              />
            </PrototypeViewer>
          </div>
          <div className="mt-4 flex gap-2">
            <Button theme="primary" onClick={finishPrototype}>
              I&apos;m done — continue to questions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'post' && session) {
    const questions = session.test.guided_flow?.questions_post ?? [];
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          A few more questions
        </h2>
        {questions.length === 0 ? (
          <Button theme="primary" onClick={submitPostAndDone}>
            Submit
          </Button>
        ) : (
          <>
            {questions.map((q: GuidedQuestion) => (
              <div key={q.id} className="mb-4">
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                  {q.question}
                </label>
                {q.type === 'rating' ? (
                  <select
                    value={postAnswers[q.id] ?? ''}
                    onChange={(e) => setPostAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    className="rounded-lg border px-3 py-2 text-sm"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                    }}
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    value={postAnswers[q.id] ?? ''}
                    onChange={(e) => setPostAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    fullWidth
                  />
                )}
              </div>
            ))}
            <Button theme="primary" onClick={submitPostAndDone}>
              Submit
            </Button>
          </>
        )}
      </div>
    );
  }

  return null;
}
