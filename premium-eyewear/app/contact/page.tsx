'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Send direct WhatsApp inquiry with the message
    const msg = `*New Contact Inquiry from Website:*\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone || 'N/A'}\n📧 *Email:* ${formData.email || 'N/A'}\n💬 *Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/919815532497?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-widest border border-amber-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            We're Here To Help
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Get In <span className="text-amber-600">Touch</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Have questions about frame fittings, lens powers, or home delivery? Connect directly with our eyewear experts.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 📍 LEFT COLUMN: CONTACT DETAILS */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/919815532497?text=Hello!%20I%20have%20an%20inquiry%20regarding%20eyewear."
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-emerald-500 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-emerald-200">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Instant Chat
                  </span>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Chat on WhatsApp
                  </h3>
                </div>
              </div>
              <p className="text-slate-800 text-sm font-semibold">
                +91 98155 32497
              </p>
              <span className="text-xs text-emerald-600 font-bold mt-2 inline-block">
                ⚡ Typically replies in 5 minutes →
              </span>
            </a>

            {/* Phone Call Card */}
            <a
              href="tel:+919815532497"
              className="group block bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-slate-900 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-slate-950 group-hover:text-white transition-colors border border-amber-200/80">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Voice Assistance
                  </span>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    Direct Phone Support
                  </h3>
                </div>
              </div>
              <p className="text-slate-800 text-sm font-semibold">
                +91 98155 32497
              </p>
              <span className="text-xs text-slate-500 font-medium mt-1 inline-block">
                Mon - Sun: 10:00 AM - 9:00 PM
              </span>
            </a>

            {/* Store Address Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
              <div className="flex items-start gap-4 mb-3">
                <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl shrink-0 border border-slate-200/80">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Flagship Showroom
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Sunrise Patiala
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium pt-1">
                    SCO-17, Polo Ground Market, opp. Budha Dal Public School-Junior Wing, New Lal Bagh Colony, Patiala, Punjab 147001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 📝 RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">
                  Quick Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-slate-900">
                  Send Us a Direct Inquiry
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Fill in your details and connect with our eyewear team instantly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-black text-emerald-800">
                    Inquiry Forwarded via WhatsApp!
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Thank you! Our eyewear consultant will assist you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Aman Sharma"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-2xl py-3 px-4 text-sm text-slate-900 outline-none transition-colors placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Phone / WhatsApp No.
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-2xl py-3 px-4 text-sm text-slate-900 outline-none transition-colors placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-2xl py-3 px-4 text-sm text-slate-900 outline-none transition-colors placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Your Message / Frame Inquiries *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Ask about specific frames, lens options, store visits, etc..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-2xl py-3 px-4 text-sm text-slate-900 outline-none transition-colors placeholder-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-slate-950/10 active:scale-95 text-sm uppercase tracking-wider"
                  >
                    <span>Submit & Chat on WhatsApp</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
