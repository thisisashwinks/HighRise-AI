'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import type { SessionEventType } from '@/types/usability';

const THROTTLE_MS = 100;
const BATCH_SIZE = 50;
const BATCH_INTERVAL_MS = 5000;

interface SessionRecorderProps {
  feedbackSessionId: string;
  sessionToken: string;
  enabled: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function SessionRecorder({
  feedbackSessionId,
  sessionToken,
  enabled,
  containerRef,
}: SessionRecorderProps) {
  const startTimeRef = useRef<number>(Date.now());
  const bufferRef = useRef<Array<{ event_type: SessionEventType; x?: number; y?: number; timestamp_ms: number; scroll_y?: number }>>([]);
  const lastMoveRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const flush = useCallback(async () => {
    const buf = bufferRef.current;
    if (buf.length === 0) return;
    bufferRef.current = [];
    try {
      await fetch('/api/usability/session-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_token: sessionToken,
          feedback_session_id: feedbackSessionId,
          events: buf,
        }),
      });
    } catch (e) {
      bufferRef.current = buf.concat(bufferRef.current);
    }
  }, [feedbackSessionId, sessionToken]);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const container = containerRef.current;
    const getTimestamp = () => Math.round(Date.now() - startTimeRef.current);

    const push = (event: { event_type: SessionEventType; x?: number; y?: number; timestamp_ms: number; scroll_y?: number }) => {
      bufferRef.current.push(event);
      if (bufferRef.current.length >= BATCH_SIZE) flush();
    };

    const isInside = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isInside(e.clientX, e.clientY)) return;
      const now = Date.now();
      if (now - lastMoveRef.current < THROTTLE_MS) return;
      lastMoveRef.current = now;
      const rect = container.getBoundingClientRect();
      push({
        event_type: 'mousemove',
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp_ms: getTimestamp(),
      });
    };

    const onClick = (e: MouseEvent) => {
      if (!isInside(e.clientX, e.clientY)) return;
      const rect = container.getBoundingClientRect();
      push({
        event_type: 'click',
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp_ms: getTimestamp(),
      });
    };

    const onScroll = () => {
      push({
        event_type: 'scroll',
        timestamp_ms: getTimestamp(),
        scroll_y: window.scrollY,
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    const interval = setInterval(flush, BATCH_INTERVAL_MS);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      clearInterval(interval);
      flush();
    };
  }, [enabled, feedbackSessionId, sessionToken, flush, containerRef]);

  return null;
}
