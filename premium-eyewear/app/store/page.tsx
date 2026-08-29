'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function StoreLocatorPage() {
  const [copied, setCopied] = useState(false);

  const fullAddress =
    'SCO-17, Polo Ground Market, opp. Budha Dal Public School-Junior Wing, New Lal Bagh Colony, Patiala, Punjab 147001, India';

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'SCO-17, Polo Ground Market, Patiala, Punjab 147001, India',
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-widest border border-amber-300 shadow-sm">
            <Sparkles size={14} className="text-amber-600" /> Flagship Eyewear Experience
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Visit Our <span className="text-amber-600">Flagship Studio</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Walk in for a comprehensive computerised eye screening, premium
            frame fitting, and personal lens consulting.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: STORE INFOS & HERO IMAGE */}
          <div className="lg:col-span-6 space-y-6">
            {/* Store Showcase Image Card */}
            <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl group bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop"
                alt="Sunrise Flagship Store Showroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Floating Live Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-emerald-600 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Open Today • Closes 9:00 PM</span>
              </div>

              {/* Bottom Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h2 className="text-2xl font-black tracking-tight">
                  Sunrise
                </h2>
                <p className="text-xs text-zinc-200 font-medium">
                  Patiala Flagship Studio
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0 border border-amber-200/80">
                  <MapPin size={26} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900">Store Address</h3>
                    <button
                      onClick={handleCopyAddress}
                      className="flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    SCO-17, Polo Ground Market, opp. Budha Dal Public School-Junior Wing, <br />
                    New Lal Bagh Colony, Patiala, Punjab 147001, India
                  </p>
                </div>
              </div>
            </div>

            {/* Timing & Phone Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-200/80">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Store Hours
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    10:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

              <a
                href="tel:+919815532497"
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5 hover:border-slate-900 transition-colors group"
              >
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-200/80 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Phone Number
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    +91 98155 32497
                  </p>
                </div>
              </a>
            </div>

            {/* Action & Trust Highlights */}
            <div className="pt-2 space-y-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98]"
              >
                <Navigation size={20} />
                <span>Get Directions on Google Maps</span>
                <ExternalLink size={16} className="opacity-70" />
              </a>

              <div className="flex items-center justify-center gap-6 pt-2 text-slate-500 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-amber-600" /> Free Eye
                  Examination
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-amber-600" /> Instant
                  Frame Fitting
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: EMBEDDED GOOGLE MAP */}
          <div className="lg:col-span-6 h-[400px] sm:h-[500px] lg:h-[620px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative bg-white">
            <iframe
              src="https://maps.google.com/maps?q=SCO-17,%20Polo%20Ground%20Market,%20Patiala,%20Punjab%20147001,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunrise Store Map"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}