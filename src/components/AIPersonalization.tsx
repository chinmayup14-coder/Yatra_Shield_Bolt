import { IMAGES } from '@/data';
import { Reveal } from '@/components/Reveal';
import { Sliders, Brain, Users, Sparkles, ArrowDown } from 'lucide-react';

const STEPS = [
  { label: 'Your Preferences', icon: Sliders },
  { label: 'AI Analysis', icon: Brain },
  { label: 'Guide Matching', icon: Users },
  { label: 'Personalized Recommendations', icon: Sparkles },
];

const PREFERENCES = [
  'Where you want to go',
  'How far you want to explore',
  'Languages you prefer',
  'Your interests',
  'Places you already know',
  'Your visual travel preferences',
];

export function AIPersonalization() {
  return (
    <section id="ai-match" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Photo collage */}
          <Reveal>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-card h-[280px]">
                    <img src={IMAGES.kerala} alt="Kerala backwaters" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-card h-[200px]">
                    <img src={IMAGES.goldenTemple} alt="Golden Temple" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-card h-[200px]">
                    <img src={IMAGES.himalayas} alt="Himalayas" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-card h-[280px]">
                    <img src={IMAGES.varanasiSunset} alt="Varanasi sunset" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Floating AI badge */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 glass-dark rounded-2xl p-4 shadow-card hidden sm:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-saffron-500/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-saffron-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">AI Engine</p>
                    <p className="text-white/50 text-xs">Analyzing preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div>
            <Reveal>
              <p className="text-saffron-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">AI Personalization</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-700 leading-tight tracking-tight text-balance">
                Your Journey. Your Interests. Your Guide.
              </h2>
              <p className="mt-4 text-lg text-navy-400 leading-relaxed">
                YATRA SHIELD learns what matters to you — and finds the guide who matches.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {PREFERENCES.map((pref, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 bg-surface rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-saffron-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-navy-600">{pref}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Flow diagram */}
            <Reveal delay={250}>
              <div className="mt-10 p-6 bg-navy-700 rounded-2xl shadow-card">
                <div className="flex flex-col gap-3">
                  {STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-saffron-500/15 flex-shrink-0">
                        <step.icon className="w-5 h-5 text-saffron-400" />
                      </div>
                      <span className="text-white font-semibold text-sm flex-1">{step.label}</span>
                      {i < STEPS.length - 1 && (
                        <ArrowDown className="w-4 h-4 text-white/30 absolute" style={{ marginTop: '28px' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
