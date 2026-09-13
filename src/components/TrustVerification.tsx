import { Reveal } from '@/components/Reveal';
import { TrustScoreRing } from '@/components/TrustScoreRing';
import { Languages, BookOpen, Award, Star } from 'lucide-react';

const CARDS = [
  { icon: Languages, title: 'Language Verified', description: 'Language proficiency assessment' },
  { icon: BookOpen, title: 'Knowledge Assessed', description: 'Tourism, history and local knowledge' },
  { icon: Award, title: 'Experience Verified', description: 'Professional and guiding experience' },
  { icon: Star, title: 'Traveller Rated', description: 'Real traveller feedback' },
];

export function TrustVerification() {
  return (
    <section id="verification" className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-saffron-500/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-400/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-saffron-400 font-bold text-sm tracking-[0.2em] uppercase mb-3">Trust & Verification</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight text-balance">
              Not Every Guide Is the Same.
            </h2>
            <p className="mt-4 text-lg text-white/55 leading-relaxed">
              YATRA SHIELD helps travellers make informed choices through a structured guide verification and scoring system.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <div className="group h-full p-6 rounded-2xl glass-dark hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-saffron-500/15 mb-4 group-hover:bg-saffron-500/25 transition-colors">
                    <card.icon className="w-6 h-6 text-saffron-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1.5">{card.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Trust Score Ring */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <Reveal delay={200}>
              <div className="p-8 lg:p-10 rounded-3xl glass-dark text-center">
                <TrustScoreRing value={92} size={200} strokeWidth={14} label="YATRA SHIELD TRUST SCORE" />
                <p className="mt-5 text-white/50 text-sm max-w-xs mx-auto">
                  A composite score combining verification, knowledge, experience and traveller ratings.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
