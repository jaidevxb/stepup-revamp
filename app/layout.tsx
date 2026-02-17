import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StepUp - Become a Product Developer',
  description: 'Transform from beginner to startup-ready Product Developer. Learn fullstack development and ship real products.',
  openGraph: {
    title: 'StepUp - Become a Product Developer',
    description: 'Transform from beginner to startup-ready Product Developer',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StepUp - Become a Product Developer',
    description: 'Transform from beginner to startup-ready Product Developer',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
