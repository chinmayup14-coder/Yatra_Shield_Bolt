import { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { UNEXPLORED_PLACES, type PlaceInfo } from '@/data';
import { Reveal } from '@/components/Reveal';
import { PlaceDetail } from '@/components/PlaceDetail';

const VISIBLE_COUNT = 6;

export function UnexploredPlaces() {
  const [selected, setSelected] = useState<PlaceInfo | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? UNEXPLORED_PLACES : UNEXPLORED_PLACES.slice(0, VISIBLE_COUNT);

  return (
    <section id="unexplored" className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-saffron-500/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-400/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-saffron-400 font-bold text-sm tracking-[0.2em] uppercase mb-3">Beyond the Beaten Path</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight text-balance">
              India's Unexplored Wonders
            </h2>
            <p className="mt-4 text-lg text-white/55 leading-relaxed">
              The places most travellers never reach. Pristine, raw, and waiting for the right guide to show you the way.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((place, i) => (
            <Reveal key={place.name} delay={i * 80}>
              <div
                className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer h-[420px]"
                onClick={() => setSelected(place)}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/20 backdrop-blur-sm border border-saffron-400/30 text-saffron-300 text-xs font-bold tracking-wide">
                    <MapPin className="w-3 h-3" />
                    {place.state}
                  </span>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                    {place.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-2">
                    {place.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {place.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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

        {!showAll && UNEXPLORED_PLACES.length > VISIBLE_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-saffron-500 hover:bg-saffron-400 text-navy-900 font-bold text-sm transition-all duration-300"
            >
              Explore More Unexplored Places
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <PlaceDetail
        place={selected}
        badge="Unexplored Destination"
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
