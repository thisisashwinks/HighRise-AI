'use client';

export function FeedbackButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSepob_tzZ4ZvHZvpaHpgcblGnceppleWI_4Ja7aEh0v2kvqfA/viewform"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: '#6938EF',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px',
        fontWeight: '500',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#5a2dd4';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#6938EF';
      }}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
      <span>Feedback</span>
    </a>
  );
}
