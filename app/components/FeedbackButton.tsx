'use client';

export function FeedbackButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSepob_tzZ4ZvHZvpaHpgcblGnceppleWI_4Ja7aEh0v2kvqfA/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white no-underline shadow-lg transition-opacity hover:opacity-90"
      style={{
        backgroundColor: 'var(--color-accent)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
      <span>Feedback</span>
    </a>
  );
}
