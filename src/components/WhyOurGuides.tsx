import { ShieldCheck, Languages, Award, Star, MapPin, Heart, Users, Clock, BadgeCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { TrustScoreRing } from '@/components/TrustScoreRing';

const REASONS = [
  {
    icon: BadgeCheck,
    title: 'Rigorously Verified',
    description: 'Every guide passes identity verification, background checks, and a multi-step approval process before they can accept bookings.',
  },
  {
    icon: Languages,
    title: 'Speak Your Language',
    description: 'Find guides fluent in Hindi, English, Tamil, Bengali, French and more — so nothing gets lost in translation.',
  },
  {
    icon: Award,
    title: 'Deep Local Knowledge',
    description: 'Our guides are assessed on history, culture, food, and hidden gems. They know the stories behind every monument, street and dish.',
  },
  {
    icon: Star,
    title: 'Rated by Real Travellers',
    description: 'Every booking ends with a genuine traveller review. You see real ratings and feedback before you ever make contact.',
  },
  {
    icon: MapPin,
    title: 'Born and Raised Locally',
    description: 'Our guides are from the places they show you. They grew up walking these streets, eating this food, and living this culture.',
  },
  {
    icon: Heart,
    title: 'Genuine Passion',
    description: 'These are not just professionals — they are people who love their city and want you to love it too. That difference shows.',
  },
  {
    icon: Users,
    title: 'Community Trusted',
    description: 'Join thousands of travellers who have explored India with our guides and come back with stories worth telling.',
  },
  {
    icon: Clock,
    title: 'Available When You Need',
    description: 'Flexible scheduling, last-minute bookings, and 24/7 support. Your journey does not wait, and neither do we.',
  },
];

const STATS = [
  { value: '1,200+', label: 'Verified Guides' },
  { value: '22', label: 'Destinations' },
  { value: '8', label: 'UNESCO Sites' },
  { value: '4.8/5', label: 'Average Rating' },
];

export function WhyOurGuides() {
  return (
    <section id="why-guides" className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-saffron-500/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-400/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-saffron-400 font-bold text-sm tracking-[0.2em] uppercase mb-3">Why YATRA SHIELD</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight text-balance">
              Why Choose Our Guides
            </h2>
            <p className="mt-4 text-lg text-white/55 leading-relaxed">
              Not every guide is the same. We hold ours to a standard that most platforms do not — because your journey deserves more than a brochure.
            </p>
          </div>
        </Reveal>

        {/* Stats bar */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl glass-dark">
                <p className="text-3xl lg:text-4xl font-extrabold text-saffron-400 tracking-tight">{stat.value}</p>
                <p className="mt-1 text-sm text-white/50 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 4) * 70}>
              <div className="group h-full p-6 rounded-2xl glass-dark hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-saffron-500/15 mb-4 group-hover:bg-saffron-500/25 transition-colors">
                  <reason.icon className="w-6 h-6 text-saffron-400" strokeWidth={2} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust score highlight */}
        <Reveal delay={200}>
          <div className="mt-16 grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-8 lg:p-10 rounded-3xl glass-dark">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-saffron-400" />
                <h3 className="text-white font-extrabold text-xl">The YATRA SHIELD Trust Score</h3>
              </div>
              <p className="text-white/55 leading-relaxed mb-6">
                Every guide earns a composite Trust Score from 0 to 100, combining four pillars: language proficiency, local knowledge, verified experience, and real traveller ratings. You see this score before you book — no guesswork, no surprises.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Language Proficiency', weight: '20%' },
                  { label: 'Local Knowledge Assessment', weight: '25%' },
                  { label: 'Verified Experience', weight: '25%' },
                  { label: 'Traveller Ratings', weight: '30%' },
                ].map((pillar) => (
                  <div key={pillar.label} className="flex items-center justify-between">
                    <span className="text-white/70 text-sm font-medium">{pillar.label}</span>
                    <span className="text-saffron-400 text-sm font-bold">{pillar.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 rounded-3xl glass-dark">
              <TrustScoreRing value={92} size={200} strokeWidth={14} label="YATRA SHIELD TRUST SCORE" />
              <p className="mt-5 text-white/50 text-sm text-center max-w-xs">
                A score you can trust, built from data — not just stars.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
