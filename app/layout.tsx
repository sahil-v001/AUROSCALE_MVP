import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auroscale Pulse — Instant AI Marketing & Overlap Audit Studio',
  description: 'Diagnose audience overlap, calculate duplicate bidding budget waste across Meta and Google, and generate high-converting creative briefs in 15 seconds.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#09090B] text-[#FAFAFA] antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
