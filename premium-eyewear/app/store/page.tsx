import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function StoreLocatorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter mb-4">
            Find Our Store
          </h1>
          <p className="text-gray-500 text-lg">
            Visit us at our flagship location for a personalized eye-check
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Store Details */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Sunrise Optical - Main Branch
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Shop No. 12, Ground Floor, Noida One Building, <br />
                    Sector 62, Noida, Uttar Pradesh - 201301
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl flex items-center gap-3">
                <Clock className="text-yellow-500" />
                <div>
                  <p className="font-bold">Opening Hours</p>
                  <p className="text-sm text-gray-500">10:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl flex items-center gap-3">
                <Phone className="text-yellow-500" />
                <div>
                  <p className="font-bold">Call Us</p>
                  <p className="text-sm text-gray-500">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all">
              <Navigation size={20} /> Get Directions on Maps
            </button>
          </div>

          {/* Map Section */}
          <div className="h-[450px] bg-gray-200 dark:bg-zinc-800 rounded-[2rem] overflow-hidden relative group">
            {/* Yahan aap Google Maps ka Embed link daal sakti hain */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0463137955566!2d77.36531397550186!3d28.62892977566952!2m3!1f0!2f0!3f0!3m2!1i1024!2m7!4f13.1!3m3!1m2!1s0x390cf17c469f8c15%3A0x633908866503c533!2sNoida%20One%20Building!5e0!3m2!1sen!2sin!4v1715456789012!3m2!1sen!2sin!4v1715456789012"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
