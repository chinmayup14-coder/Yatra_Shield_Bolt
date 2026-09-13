import { ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '@/data';
import { Reveal } from '@/components/Reveal';

export function Destinations() {
  return (
    <section id="destinations" className="relative bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-saffron-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">Discover India</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-700 leading-tight tracking-tight text-balance">
              India Has Stories. Find the Right Person to Tell Yours.
            </h2>
            <p className="mt-4 text-lg text-navy-400 leading-relaxed">
              From the spiritual ghats of Varanasi to the royal palaces of Jaipur — every destination has a story, and every story needs the right guide.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <Reveal key={dest.name} delay={i * 80}>
              <div className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer h-[360px]">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                    {dest.name.toUpperCase()}
                  </h3>
                  <p className="text-white/70 text-sm font-medium mb-4">
                    {dest.tags.join(' • ')}
                  </p>
                  <div className="flex items-center gap-2 text-saffron-400 font-semibold text-sm opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Explore Guides
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover border accent */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-saffron-400/40 transition-all duration-300 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
