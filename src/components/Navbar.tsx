import { useEffect, useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Unexplored', href: '#unexplored' },
  { label: 'Heritage', href: '#heritage' },
  { label: 'G20', href: '#g20' },
  { label: 'Safety Center', href: '#safety' },
];

export function Navbar({ onExploreTraveller, onBecomeGuide }: { onExploreTraveller: () => void; onBecomeGuide: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/85 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-saffron-500/40 blur-lg group-hover:bg-saffron-500/60 transition-colors" />
            <Shield className="relative w-7 h-7 text-saffron-500" strokeWidth={2.2} />
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">
            YATRA<span className="text-saffron-400"> SHIELD</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onExploreTraveller}
            className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-4 py-2"
          >
            Explore as Traveller
          </button>
          <button
            onClick={onBecomeGuide}
            className="text-sm font-bold text-saffron-500 border border-saffron-500/50 hover:bg-saffron-500 hover:text-navy-900 px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-glow"
          >
            Become a Guide
          </button>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pt-4 pb-6 flex flex-col gap-1 bg-navy-900/95 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onExploreTraveller}
            className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
          >
            Explore as Traveller
          </button>
          <button
            onClick={() => { setMenuOpen(false); onBecomeGuide(); }}
            className="mt-2 text-sm font-bold text-saffron-500 border border-saffron-500/50 text-center px-5 py-3 rounded-xl"
          >
            Become a Guide
          </button>
        </div>
      </div>
    </header>
  );
}
