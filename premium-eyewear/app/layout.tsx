import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// 1. Apne component ko import karein
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premium Optical | Modern Lenses & Sunglasses',
  description: 'Shop the best premium Optical, sunglasses, and frames online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col`}
      >
        {/* Yahan aapke saare pages load honge */}
        {children}

        {/* 2. Button ko yahan call kar dein */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
