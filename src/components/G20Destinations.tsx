import { useState } from 'react';
import { ArrowRight, Award, MapPin } from 'lucide-react';
import { G20_DESTINATIONS, type PlaceInfo } from '@/data';
import { Reveal } from '@/components/Reveal';
import { PlaceDetail } from '@/components/PlaceDetail';

export function G20Destinations() {
  const [selected, setSelected] = useState<PlaceInfo | null>(null);

  return (
    <section id="g20" className="relative bg-surface py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-700/10 text-navy-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              <Award className="w-3.5 h-3.5" />
              G20 Recognized
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-700 leading-tight tracking-tight text-balance">
              G20 Recognized Destinations
            </h2>
            <p className="mt-4 text-lg text-navy-400 leading-relaxed">
              Destinations spotlighted during India's G20 presidency for their cultural, spiritual and sustainable tourism significance.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {G20_DESTINATIONS.map((dest, i) => (
            <Reveal key={dest.name} delay={i * 80}>
              <div
                className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer h-[400px]"
                onClick={() => setSelected(dest)}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-navy-900/10" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-sm border border-saffron-400/30 text-saffron-300 text-xs font-bold tracking-wide">
                    <Award className="w-3 h-3" />
                    {dest.significance}
                  </span>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-1.5 text-saffron-400 text-xs font-semibold mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {dest.state}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex items-center gap-2 text-saffron-400 font-semibold text-sm opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    View history & book a guide
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-saffron-400/40 transition-all duration-300 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <PlaceDetail
        place={selected}
        badge="G20 Recognized Destination"
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
