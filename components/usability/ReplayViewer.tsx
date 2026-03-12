'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { UsabilitySessionEvent } from '@/types/usability';

interface ReplayViewerProps {
  events: UsabilitySessionEvent[];
  width?: number;
  height?: number;
  className?: string;
}

const CURSOR_SIZE = 12;
const CLICK_RADIUS = 20;
const CLICK_DURATION_MS = 400;

export function ReplayViewer({ events, width = 800, height = 500, className = '' }: ReplayViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const startMs = events[0]?.timestamp_ms ?? 0;
  const endMs = events.length > 0 ? (events[events.length - 1]?.timestamp_ms ?? 0) + 2000 : 10000;
  const durationMs = endMs - startMs;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || events.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentMs = startMs + time;
      let cursorX: number | null = null;
      let cursorY: number | null = null;
      const clicks: Array<{ x: number; y: number; t: number }> = [];

      for (let i = 0; i < events.length; i++) {
        const e = events[i];
        if (e.timestamp_ms > currentMs) break;
        if (e.event_type === 'mousemove' && e.x != null && e.y != null) {
          cursorX = e.x;
          cursorY = e.y;
        }
        if (e.event_type === 'click' && e.x != null && e.y != null) {
          clicks.push({ x: e.x, y: e.y, t: e.timestamp_ms });
        }
      }

      const now = Date.now();
      clicks.forEach((c) => {
        const elapsed = (currentMs - c.t) * (playing ? 1 : 0);
        if (elapsed < CLICK_DURATION_MS) {
          const alpha = 1 - elapsed / CLICK_DURATION_MS;
          ctx.beginPath();
          ctx.arc(c.x, c.y, CLICK_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 56, 239, ${alpha * 0.4})`;
          ctx.fill();
        }
      });

      if (cursorX != null && cursorY != null) {
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, CURSOR_SIZE / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 56, 239, 0.9)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- draw uses time for replay position
  }, [events, time, playing, width, height, startMs]);

  useEffect(() => {
    if (!playing) return;
    const start = Date.now();
    const startTime = time;
    const raf = () => {
      const elapsed = (Date.now() - start) * 0.5;
      const next = startTime + elapsed;
      if (next >= durationMs) {
        setTime(durationMs);
        setPlaying(false);
        return;
      }
      setTime(next);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- time is read at effect start only
  }, [playing, durationMs]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded border bg-neutral-100 max-w-full"
        style={{ borderColor: 'var(--color-border)' }}
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="text-sm px-3 py-1.5 rounded font-medium"
          style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min={0}
          max={durationMs}
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {Math.round(time / 1000)}s
        </span>
      </div>
    </div>
  );
}
