import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { FeedbackButton } from './components/FeedbackButton';
import { SearchProvider } from '@/components/SearchProvider';
import { NavLinks } from '@/components/NavLinks';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'HighLevel – HighRise AI Component Documentation',
  description: 'Documentation for HighLevel HighRise AI product and design components',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-neutral-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M12.7375 5.33333L13.2642 4.16667L14.4308 3.64C14.6908 3.52 14.6908 3.15333 14.4308 3.03333L13.2642 2.50667L12.7375 1.33333C12.6175 1.07333 12.2508 1.07333 12.1308 1.33333L11.6042 2.5L10.4308 3.02667C10.1708 3.14667 10.1708 3.51333 10.4308 3.63333L11.5975 4.16L12.1242 5.33333C12.2442 5.59333 12.6175 5.59333 12.7375 5.33333ZM7.43083 6.33333L6.37083 4C6.1375 3.48 5.39083 3.48 5.1575 4L4.0975 6.33333L1.76417 7.39333C1.24417 7.63333 1.24417 8.37333 1.76417 8.60667L4.0975 9.66667L5.1575 12C5.3975 12.52 6.1375 12.52 6.37083 12L7.43083 9.66667L9.76417 8.60667C10.2842 8.36667 10.2842 7.62667 9.76417 7.39333L7.43083 6.33333ZM12.1242 10.6667L11.5975 11.8333L10.4308 12.36C10.1708 12.48 10.1708 12.8467 10.4308 12.9667L11.5975 13.4933L12.1242 14.6667C12.2442 14.9267 12.6108 14.9267 12.7308 14.6667L13.2575 13.5L14.4308 12.9733C14.6908 12.8533 14.6908 12.4867 14.4308 12.3667L13.2642 11.84L12.7375 10.6667C12.6175 10.4067 12.2442 10.4067 12.1242 10.6667Z" fill="#6938EF"/>
                  </svg>
                  <div>
                    <h1 className="text-xl font-bold text-neutral-900 hover:text-neutral-700 cursor-pointer transition-colors">HighRise AI</h1>
                    <p className="text-sm text-neutral-600">Component Documentation</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <SearchProvider />
                <NavLinks />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-neutral-50">
          {children}
        </main>
        <FeedbackButton />
        <footer className="border-t border-neutral-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="/" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
                  Home
                </Link>
                <Link href="/components" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
                  Components
                </Link>
                <Link href="/inspirations" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
                  Inspirations
                </Link>
                <a 
                  href="https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=4-291896&p=f&t=AFyJUY9svQYTZNi0-11" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Figma Documentation File
                </a>
                <a 
                  href="https://forms.gle/RCDjJg4Uckt4a8Yp8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Feedback Form
                </a>
              </div>
            </div>
            <p className="text-sm text-neutral-600 text-center">
              HighLevel – HighRise AI Component Documentation
            </p>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

