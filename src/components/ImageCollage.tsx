import { IMAGES } from '@/data';
import { Reveal } from '@/components/Reveal';

const COLLAGE = [
  { src: IMAGES.tajMahal, alt: 'Taj Mahal', className: 'col-span-2 row-span-2 h-full', label: 'Taj Mahal' },
  { src: IMAGES.varanasi, alt: 'Varanasi Ghats', className: 'col-span-1 row-span-1 h-full', label: 'Varanasi' },
  { src: IMAGES.hawaMahal2, alt: 'Hawa Mahal', className: 'col-span-1 row-span-1 h-full', label: 'Hawa Mahal' },
  { src: IMAGES.kerala2, alt: 'Kerala Backwaters', className: 'col-span-1 row-span-1 h-full', label: 'Kerala' },
  { src: IMAGES.goldenTemple2, alt: 'Golden Temple', className: 'col-span-1 row-span-1 h-full', label: 'Golden Temple' },
  { src: IMAGES.himalayas2, alt: 'Himalayas', className: 'col-span-1 row-span-1 h-full', label: 'Himalayas' },
  { src: IMAGES.goa2, alt: 'Goa', className: 'col-span-1 row-span-1 h-full', label: 'Goa' },
  { src: IMAGES.indiaGate, alt: 'India Gate', className: 'col-span-2 row-span-1 h-full', label: 'India Gate' },
];

export function ImageCollage() {
  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-saffron-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">India's Diversity</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-700 leading-tight tracking-tight text-balance">
              One Country. Thousands of Journeys.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-4 grid-rows-3 gap-3 lg:gap-4 h-[500px] lg:h-[600px]">
            {COLLAGE.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden shadow-card group ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <span className="absolute bottom-3 left-3 text-white/90 text-xs font-bold tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
