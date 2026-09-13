import { useState } from 'react';
import { Globe, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { UNESCO_SITES, type PlaceInfo } from '@/data';
import { Reveal } from '@/components/Reveal';
import { PlaceDetail } from '@/components/PlaceDetail';

const VISIBLE_COUNT = 8;

export function HeritageSites() {
  const [selected, setSelected] = useState<PlaceInfo | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? UNESCO_SITES : UNESCO_SITES.slice(0, VISIBLE_COUNT);

  return (
    <section id="heritage" className="relative bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-700/10 text-navy-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              <Globe className="w-3.5 h-3.5" />
              UNESCO World Heritage
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-700 leading-tight tracking-tight text-balance">
              India's UNESCO Heritage Sites
            </h2>
            <p className="mt-4 text-lg text-navy-400 leading-relaxed">
              {UNESCO_SITES.length} extraordinary sites recognized by UNESCO for their outstanding universal value — from ancient temples to living ecosystems.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((site, i) => (
            <Reveal key={site.name} delay={(i % 4) * 70}>
              <div
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer"
                onClick={() => setSelected(site)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-sm text-saffron-300 text-xs font-bold">
                      <Calendar className="w-3 h-3" />
                      {site.inscribed}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-saffron-600 text-xs font-semibold mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {site.state}
                  </div>
                  <h3 className="text-lg font-extrabold text-navy-700 mb-2">{site.name}</h3>
                  <p className="text-navy-400 text-sm leading-relaxed line-clamp-3">
                    {site.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-saffron-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View history & book a guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {!showAll && UNESCO_SITES.length > VISIBLE_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-700 hover:bg-navy-600 text-white font-bold text-sm transition-all duration-300"
            >
              Explore More Heritage Sites
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <PlaceDetail
        place={selected}
        badge="UNESCO World Heritage"
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
