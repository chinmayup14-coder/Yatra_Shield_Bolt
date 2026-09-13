import { Reveal } from '@/components/Reveal';
import { Shield, MapPin, AlertOctagon, Phone, UserCheck, ClipboardList } from 'lucide-react';

const CARDS = [
  { icon: Shield, title: 'Emergency Assistance', description: 'One-tap SOS connects you to local emergency services and your trusted contacts instantly.', variant: 'emergency' },
  { icon: MapPin, title: 'Live Trip Sharing', description: 'Share your real-time location and itinerary with family so they always know you are safe.', variant: 'default' },
  { icon: AlertOctagon, title: 'Report a Scam', description: 'Encountered a scam or unfair practice? Report it and help protect fellow travellers.', variant: 'warning' },
  { icon: Phone, title: 'Tourist Helplines', description: 'Direct access to national and state-level tourist helpline numbers, 24/7.', variant: 'default' },
  { icon: UserCheck, title: 'Guide Information', description: 'View full verification details, trust score and traveller reviews for any guide.', variant: 'default' },
  { icon: ClipboardList, title: 'Report an Issue', description: 'Flag safety concerns, route problems or guide misconduct for immediate review.', variant: 'default' },
];

export function SafetyCenter() {
  return (
    <section id="safety" className="relative bg-navy-800 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-red-500/30 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-[0.15em] uppercase mb-4">
              <Shield className="w-3.5 h-3.5" />
              YATRA SHIELD Safety Center
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight text-balance">
              Travel Safe. Travel Smart.
            </h2>
            <p className="mt-4 text-lg text-white/55 leading-relaxed">
              Every tool you need to stay protected on your journey — from emergency assistance to real-time trip sharing.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const isEmergency = card.variant === 'emergency';
            const isWarning = card.variant === 'warning';
            return (
              <Reveal key={card.title} delay={i * 70}>
                <div
                  className={`group h-full p-6 rounded-2xl border transition-all duration-300 ${
                    isEmergency
                      ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50 hover:bg-red-500/15'
                      : isWarning
                      ? 'bg-white/5 border-white/10 hover:border-red-400/30 hover:bg-white/8'
                      : 'bg-white/5 border-white/10 hover:border-saffron-400/30 hover:bg-white/8'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors ${
                      isEmergency
                        ? 'bg-red-500/20 group-hover:bg-red-500/30'
                        : isWarning
                        ? 'bg-red-500/10 group-hover:bg-red-500/20'
                        : 'bg-saffron-500/15 group-hover:bg-saffron-500/25'
                    }`}
                  >
                    <card.icon
                      className={`w-6 h-6 ${
                        isEmergency ? 'text-red-400' : isWarning ? 'text-red-300' : 'text-saffron-400'
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {card.title}
                    {isEmergency && (
                      <span className="ml-2 text-[10px] font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded-full align-middle">
                        SOS
                      </span>
                    )}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
