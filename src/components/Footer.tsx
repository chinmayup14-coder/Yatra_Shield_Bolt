import { Shield } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Platform',
    links: ['Find Guides', 'Explore Destinations', 'My Trips', 'Safety Center'],
  },
  {
    title: 'For Guides',
    links: ['Become a Guide', 'Verification', 'Guide Dashboard', 'Guide Resources'],
  },
  {
    title: 'Company',
    links: ['About', 'How It Works', 'Contact', 'Privacy', 'Terms'],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Shield className="w-7 h-7 text-saffron-500" strokeWidth={2.2} />
              <span className="text-white font-extrabold text-lg tracking-tight">
                YATRA<span className="text-saffron-400"> SHIELD</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              "Travel India. Trust the Journey."
            </p>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              Connecting travellers with verified local guides, personalized through AI and ranked through trust.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-saffron-400 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            Made for safer and smarter tourism in India
          </p>
          <p className="text-white/30 text-xs">
            (c) {new Date().getFullYear()} YATRA SHIELD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
