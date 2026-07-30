import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Make sure to install lucide-react

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Get In <span className="text-yellow-500">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have questions about our frames or need assistance with your order?
            Our team is ready to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold">Call or WhatsApp</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                +91 98765 43210
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold">Email Us</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                support@sunriseoptical.com
              </p>
            </div>
          </div>

          {/* Simple Contact Form UI */}
          <div className="bg-black dark:bg-white text-white dark:text-black p-8 md:p-10 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-white/30 dark:border-black/30 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent border-b border-white/30 dark:border-black/30 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-transparent border-b border-white/30 dark:border-black/30 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              ></textarea>
              <button className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
