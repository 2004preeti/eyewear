import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sunrise Optical | Luxury Eyewear & Premium Lenses',
  description:
    'Discover handcrafted luxury eyeglasses, polarized sunglasses, and precision lenses with computerised eye testing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950`}
      >
        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="flex-grow pt-24 sm:pt-28">{children}</main>

        {/* Global Luxury Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
