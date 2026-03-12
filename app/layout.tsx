import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { FeedbackButton } from './components/FeedbackButton';
import { AppSidebar } from '@/components/AppSidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SearchProvider } from '@/components/SearchProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'HighRise AI – Component Documentation',
  description: 'Documentation for HighLevel HighRise AI product and design components',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

const SIDEBAR_WIDTH = 260;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('highrise-theme');var m=window.matchMedia('(prefers-color-scheme: dark)');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);else if(m.matches)document.documentElement.setAttribute('data-theme','dark');})();`,
          }}
        />
      </head>
      <body className={`${dmSans.className} min-h-screen antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <SearchProvider>
              <AppSidebar />
              <main
                className="min-h-screen flex flex-col"
                style={{
                  marginLeft: SIDEBAR_WIDTH,
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                {children}
              </main>
              <FeedbackButton />
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
