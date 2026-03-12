'use client';

import React, { useState, useRef } from 'react';

interface PrototypeViewerProps {
  url: string;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onIframeLoad?: () => void;
  onIframeError?: () => void;
  children?: React.ReactNode;
}

/** Renders prototype in iframe. If URL might block embedding, show "Open in new tab" fallback. */
export function PrototypeViewer({ url, className = '', containerRef, onIframeLoad, onIframeError, children }: PrototypeViewerProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    setLoaded(true);
    onIframeLoad?.();
  };

  const handleError = () => {
    setUseFallback(true);
    onIframeError?.();
  };

  if (useFallback) {
    return (
      <div
        className={`rounded-lg border flex flex-col items-center justify-center p-8 min-h-[400px] ${className}`}
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          This prototype can&apos;t be embedded. Open it in a new tab to try it, then return here to answer questions and add comments.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
        >
          Open in new tab
        </a>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative rounded-lg border overflow-hidden ${className}`}
      style={{ borderColor: 'var(--color-border)' }}
    >
      <iframe
        ref={iframeRef}
        src={url}
        title="Prototype"
        className="w-full min-h-[500px]"
        style={{ height: '70vh' }}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
      {children}
    </div>
  );
}
