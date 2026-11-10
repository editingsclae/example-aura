import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'AURA Skincare — Pure Ingredients. Visible Results.',
  description: 'Elevated skincare made with clean ingredients and backed by science. Pure ingredients. Visible results.',
  openGraph: {
    title: 'AURA Skincare — Pure Ingredients. Visible Results.',
    description: 'Elevated skincare made with clean ingredients and backed by science.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA Skincare — Pure Ingredients. Visible Results.',
    description: 'Elevated skincare made with clean ingredients and backed by science.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="font-sans text-[#1c1a17] bg-white antialiased"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
