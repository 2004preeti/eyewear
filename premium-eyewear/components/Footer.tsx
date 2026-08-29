import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* 1. Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 p-1.5 flex items-center justify-center border border-amber-500/20">
                <Image
                  src="/sunrise.png"
                  alt="Sunrise Optical Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black text-white tracking-tight">
                    SUNRISE
                  </span>
                  <span className="text-lg font-black text-amber-500 tracking-tight">
                    OPTICAL
                  </span>
                </div>
                <span className="text-[9px] tracking-widest text-slate-500 font-bold uppercase">
                  Luxury Eyewear Studio
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Hand-crafted eyewear frames, precision lenses, and computerised eye examinations for all face shapes. Clear vision meets timeless style.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919815532497"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-colors"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/store"
                className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors border border-slate-800"
              >
                Store Location
              </Link>
            </div>
          </div>

          {/* 2. Shop Categories */}
          <div>
            <h3 className="text-white font-extrabold text-xs uppercase tracking-widest mb-4">
              Eyewear
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/shop/all" className="hover:text-amber-400 transition-colors">
                  All Eyewear
                </Link>
              </li>
              <li>
                <Link href="/shop/eyeglasses" className="hover:text-amber-400 transition-colors">
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/shop/sunglasses" className="hover:text-amber-400 transition-colors">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/shop/computer" className="hover:text-amber-400 transition-colors">
                  Blue Cut Glasses
                </Link>
              </li>
              <li>
                <Link href="/shop/men" className="hover:text-amber-400 transition-colors">
                  Men Collection
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="hover:text-amber-400 transition-colors">
                  Women Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Customer Care */}
          <div>
            <h3 className="text-white font-extrabold text-xs uppercase tracking-widest mb-4">
              Assistance
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-amber-400 transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919815532497?text=Hello!%20I%20want%20to%20know%20about%20my%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Order Status (WhatsApp)
                </a>
              </li>
              <li>
                <Link href="/store" className="hover:text-amber-400 transition-colors">
                  Free Eye Power Checkup
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Flagship Studio */}
          <div>
            <h3 className="text-white font-extrabold text-xs uppercase tracking-widest mb-4">
              Visit Studio
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="leading-relaxed text-slate-300 font-medium">
                SCO-17, Polo Ground Market, opp. Budha Dal Public School-Junior Wing, Patiala, Punjab 147001
              </p>
              <p className="text-amber-400 font-bold">
                Daily: 10:00 AM - 9:00 PM
              </p>
              <p className="text-white font-semibold">
                Phone: +91 98155 32497
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sunrise Optical. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>100% Genuine Certified</span>
            <span>Made with Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
