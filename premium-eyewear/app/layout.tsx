import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar'; // Navbar import kiya gaya
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
        {/* Navbar yahan globally dikhai dega */}
        <Navbar />

        {/* pt-24 se fixed header ke niche ka content hidden hone se bachega */}
        <main className="flex-grow pt-24 sm:pt-28">{children}</main>

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
