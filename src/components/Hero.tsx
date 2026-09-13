import { ArrowRight, ShieldCheck, Sparkles, BadgeIndianRupee, Lock } from 'lucide-react';
import { IMAGES } from '@/data';

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Verified Guides' },
  { icon: Sparkles, label: 'AI-Powered Matching' },
  { icon: BadgeIndianRupee, label: 'Transparent Pricing' },
  { icon: Lock, label: 'Safer Travel' },
];

type HeroProps = {
  onExploreTraveller: () => void;
  onBecomeGuide: () => void;
};

export function Hero({ onExploreTraveller, onBecomeGuide }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-navy-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-saffron-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-navy-400/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-saffron-300 text-xs font-semibold tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-pulse" />
              AI-Powered Tourism Safety Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight text-balance">
              TRAVEL INDIA.
              <br />
              <span className="text-saffron-400">TRUST</span> THE JOURNEY.
            </h1>

            <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-xl text-pretty">
              YATRA SHIELD connects travellers with verified local guides, personalized through AI and ranked through trust, expertise and experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExploreTraveller}
                className="group inline-flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-navy-900 font-bold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-glow"
              >
                Explore as Traveller
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onBecomeGuide}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                Become a Guide
              </button>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <item.icon className="w-4 h-4 text-saffron-400" strokeWidth={2.2} />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editorial collage */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {/* Large image - Taj Mahal */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group h-[340px] lg:h-[420px] shadow-card">
                <img
                  src={IMAGES.tajMahal}
                  alt="Taj Mahal, Agra"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/90 text-sm font-bold tracking-wide">AGRA</span>
                </div>
              </div>

              {/* Varanasi */}
              <div className="relative rounded-2xl overflow-hidden group h-[160px] lg:h-[200px] shadow-card">
                <img
                  src={IMAGES.varanasi}
                  alt="Varanasi Ghats"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white/90 text-xs font-bold tracking-wide">VARANASI</span>
              </div>

              {/* Hawa Mahal */}
              <div className="relative rounded-2xl overflow-hidden group h-[160px] lg:h-[200px] shadow-card">
                <img
                  src={IMAGES.hawaMahal}
                  alt="Hawa Mahal, Jaipur"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white/90 text-xs font-bold tracking-wide">JAIPUR</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 glass-dark rounded-2xl px-5 py-3.5 shadow-card hidden sm:flex items-center gap-3 animate-float">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-saffron-500/20">
                <ShieldCheck className="w-5 h-5 text-saffron-400" />
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-tight">Trust Score</p>
                <p className="text-white/50 text-xs">Verified & Ranked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
