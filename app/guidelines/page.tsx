'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GuidelinesAndAIUsageSection } from '@/components/GuidelinesAndAIUsageSection';
import { MediaModalDialog } from '@/components/MediaModalDialog';
import { Download, Loader2, FileText } from 'lucide-react';

export default function GuidelinesPage() {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const [selectedImageAlt, setSelectedImageAlt] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    fetch('/guidelines/HIGHRISE_LAYOUT_AND_COPY_GUIDELINES.md')
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleImageClick = (src: string, alt: string, title: string, description: string) => {
    setSelectedImageSrc(src);
    setSelectedImageAlt(alt);
    setSelectedTitle(title);
    setSelectedDescription(description);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImageSrc('');
    setSelectedImageAlt('');
    setSelectedTitle('');
    setSelectedDescription('');
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/guidelines/download');
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'highrise-layout-and-copy-guidelines.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // no-op
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Agent Guidelines' },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Agent Guidelines</h1>
        <p className="text-lg max-w-2xl mb-6" style={{ color: 'var(--color-text-muted)' }}>
          HighRise layout, typography, and copy guidelines for HighRise and HighRise AI. Use these in your Cursor (or other LLM) projects so generated UI and copy stay consistent.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-white font-medium rounded-lg disabled:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {downloading ? (
              <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
            ) : (
              <Download className="w-5 h-5 shrink-0" />
            )}
            <span>{downloading ? 'Preparing…' : 'Download guidelines (ZIP)'}</span>
          </button>
        </div>

        <div className="mt-8 p-5 rounded-xl max-w-3xl border" style={{ backgroundColor: 'var(--color-surface-elevated)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>How to use these files in your project</h2>
          <p className="mb-3" style={{ color: 'var(--color-text-muted)' }}>
            To have Cursor (or other LLMs) respect these layout and copy rules in your project, add both files to your repo:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm ml-2" style={{ color: 'var(--color-text-muted)' }}>
            <li>
              <strong style={{ color: 'var(--color-text)' }}>Markdown guidelines</strong> — Place <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>HIGHRISE_LAYOUT_AND_COPY_GUIDELINES.md</code> in your project root or a <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>docs/</code> folder so it can be referenced.
            </li>
            <li>
              <strong style={{ color: 'var(--color-text)' }}>Cursor rule</strong> — Place <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>HighRise-Layout-And-Copy.mdc</code> inside your <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>.cursor/rules/</code> directory. Cursor will apply this rule when <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>alwaysApply: true</code> is set (as in the file).
            </li>
            <li>
              Keep both files in the same relative layout (e.g. <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>.mdc</code> references the <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>.md</code> by name). If you put the markdown in <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>docs/</code>, either put the <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>.mdc</code> there too or update the path inside the <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>.mdc</code> file to point to the markdown (e.g. <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>../docs/HIGHRISE_LAYOUT_AND_COPY_GUIDELINES.md</code>).
            </li>
          </ol>
          <p className="text-sm mt-3" style={{ color: 'var(--color-text-subtle)' }}>
            Once both are in place, Cursor and other tools that read <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)' }}>.cursor/rules</code> will follow these guidelines when generating or editing UI and copy.
          </p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <FileText className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
          HighRise Layout & Copy Guidelines (preview)
        </h2>
        <div
          className="rounded-xl overflow-hidden border"
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className="overflow-y-auto px-8 py-10 max-h-[70vh] min-h-[320px]"
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-16" style={{ color: 'var(--color-text-subtle)' }}>
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <article className="prose max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-semibold mt-0 mb-4" style={{ color: 'var(--color-text)' }}>{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold mt-8 mb-3 pb-1 border-b" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold mt-6 mb-2" style={{ color: 'var(--color-text)' }}>{children}</h3>,
                    p: ({ children }) => <p className="mb-3" style={{ color: 'var(--color-text-muted)' }}>{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1" style={{ color: 'var(--color-text-muted)' }}>{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1" style={{ color: 'var(--color-text-muted)' }}>{children}</ol>,
                    li: ({ children }) => <li className="ml-2">{children}</li>,
                    table: ({ children }) => <div className="overflow-x-auto my-4"><table className="min-w-full rounded-lg border-collapse border" style={{ borderColor: 'var(--color-border)' }}>{children}</table></div>,
                    thead: ({ children }) => <thead style={{ backgroundColor: 'var(--color-surface-muted)' }}>{children}</thead>,
                    th: ({ children }) => <th className="border px-3 py-2 text-left text-sm font-medium" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>{children}</th>,
                    td: ({ children }) => <td className="border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>{children}</td>,
                    tr: ({ children }) => <tr>{children}</tr>,
                    strong: ({ children }) => <strong className="font-semibold" style={{ color: 'var(--color-text)' }}>{children}</strong>,
                    code: ({ children }) => <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-accent)' }}>{children}</code>,
                    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--color-accent)' }}>{children}</a>,
                    hr: () => <hr className="my-6" style={{ borderColor: 'var(--color-border)' }} />,
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </section>

      <GuidelinesAndAIUsageSection onImageClick={handleImageClick} />

      <MediaModalDialog
        mediaType="image"
        mediaUrl={selectedImageSrc}
        mediaAlt={selectedImageAlt}
        title={selectedTitle}
        description={selectedDescription}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
