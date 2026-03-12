'use client';

import Link from 'next/link';

const mainLinks: Array<{ href: string; label: string; comingSoon?: boolean }> = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/inspirations', label: 'Inspirations' },
  { href: '#', label: 'Prototypes', comingSoon: true },
  { href: '/guidelines', label: 'Agent Guidelines' },
];

const externalLinks = [
  {
    href: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=4-291896&p=f&t=AFyJUY9svQYTZNi0-11',
    label: 'Figma Documentation',
  },
  {
    href: 'https://forms.gle/RCDjJg4Uckt4a8Yp8',
    label: 'Feedback Form',
  },
];

export function Footer() {
  return (
    <footer
      className="mt-20 border-t"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {mainLinks.map(({ href, label, comingSoon }) =>
              comingSoon ? (
                <span
                  key={label}
                  className="text-sm font-medium cursor-not-allowed"
                  style={{ color: 'var(--color-text-subtle)' }}
                  title="Coming soon"
                >
                  {label} (Coming soon)
                </span>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium transition-colors duration-150 hover:underline"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {label}
                </Link>
              )
            )}
            {externalLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors duration-150 hover:underline"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {label}
              </a>
            ))}
          </div>
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            HighRise AI · Component Documentation
          </p>
        </div>
      </div>
    </footer>
  );
}
