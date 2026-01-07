import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HighLevel – HighRise AI Component Documentation',
  description: 'Documentation for HighLevel HighRise AI product and design components',
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
              <div>
                <h1 className="text-xl font-bold text-neutral-900">HighRise AI</h1>
                <p className="text-sm text-neutral-600">Component Documentation</p>
              </div>
              <div className="flex gap-4">
                <a href="/" className="text-sm text-neutral-700 hover:text-neutral-900">
                  Home
                </a>
                <a href="/components" className="text-sm text-neutral-700 hover:text-neutral-900">
                  Components
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-neutral-50">
          {children}
        </main>
        <footer className="border-t border-neutral-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-sm text-neutral-600 text-center">
              HighLevel – HighRise AI Component Documentation
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

