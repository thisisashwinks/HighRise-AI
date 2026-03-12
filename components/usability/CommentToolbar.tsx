'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/Button';

interface CommentToolbarProps {
  sessionToken: string;
  feedbackSessionId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
}

type Mode = 'click' | 'comment';

export function CommentToolbar({
  sessionToken,
  feedbackSessionId,
  containerRef,
  enabled,
}: CommentToolbarProps) {
  const [mode, setMode] = useState<Mode>('click');
  const [commentText, setCommentText] = useState('');
  const [pendingComment, setPendingComment] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
        setMode((m) => (m === 'click' ? 'comment' : 'click'));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const submitComment = useCallback(
    async (x: number, y: number, width: number, height: number, text: string) => {
      if (!text.trim()) return;
      try {
        await fetch('/api/usability/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_token: sessionToken,
            feedback_session_id: feedbackSessionId,
            x,
            y,
            width,
            height,
            text: text.trim(),
          }),
        });
        setCommentText('');
        setPendingComment(null);
      } catch (e) {
        console.error('Failed to submit comment', e);
      }
    },
    [sessionToken, feedbackSessionId]
  );

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || mode !== 'comment' || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPendingComment({ x, y, width: 0, height: 0 });
    },
    [enabled, mode, containerRef]
  );

  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || mode !== 'comment' || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      dragRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, w: 0, h: 0 };
    },
    [enabled, mode, containerRef]
  );

  const handleContainerMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || mode !== 'comment' || !containerRef.current || !dragStart) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ex = e.clientX - rect.left;
      const ey = e.clientY - rect.top;
      const x = Math.min(dragStart.x, ex);
      const y = Math.min(dragStart.y, ey);
      const width = Math.abs(ex - dragStart.x);
      const height = Math.abs(ey - dragStart.y);
      setDragStart(null);
      dragRef.current = null;
      if (width > 5 || height > 5) {
        setPendingComment({ x, y, width, height });
      }
    },
    [enabled, mode, containerRef, dragStart]
  );

  if (!enabled) return null;

  return (
    <>
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-lg border shadow-lg"
        style={{
          backgroundColor: 'var(--color-surface-elevated)',
          borderColor: 'var(--color-border)',
        }}
      >
        <button
          type="button"
          onClick={() => setMode('click')}
          className={`px-3 py-1.5 rounded text-sm font-medium ${mode === 'click' ? 'ring-2' : ''}`}
          style={{
            backgroundColor: mode === 'click' ? 'var(--color-accent-soft)' : 'transparent',
            color: mode === 'click' ? 'var(--color-accent)' : 'var(--color-text-muted)',
          }}
        >
          Click
        </button>
        <button
          type="button"
          onClick={() => setMode('comment')}
          className={`px-3 py-1.5 rounded text-sm font-medium ${mode === 'comment' ? 'ring-2' : ''}`}
          style={{
            backgroundColor: mode === 'comment' ? 'var(--color-accent-soft)' : 'transparent',
            color: mode === 'comment' ? 'var(--color-accent)' : 'var(--color-text-muted)',
          }}
        >
          Comment (C)
        </button>
      </div>
      {pendingComment && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setPendingComment(null)}
        >
          <div
            className="max-w-md w-full p-4 rounded-lg border shadow-lg"
            style={{
              backgroundColor: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
              Add your comment
            </p>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Your feedback..."
              className="w-full rounded border px-3 py-2 text-sm min-h-[80px] mb-3"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                theme="primary"
                size="sm"
                onClick={() =>
                  submitComment(
                    pendingComment.x,
                    pendingComment.y,
                    pendingComment.width,
                    pendingComment.height,
                    commentText
                  )
                }
              >
                Save
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setPendingComment(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {mounted && containerRef.current && mode === 'comment' && enabled &&
        createPortal(
          <div
            className="absolute inset-0 z-10"
            style={{ pointerEvents: 'auto' }}
            onClick={handleContainerClick}
            onMouseDown={handleContainerMouseDown}
            onMouseUp={handleContainerMouseUp}
          />,
          containerRef.current
        )}
    </>
  );
}
