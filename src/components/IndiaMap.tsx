import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { MAP_MARKERS } from '@/data';
import { MapPin } from 'lucide-react';

type Category = 'all' | 'popular' | 'unexplored' | 'unesco' | 'g20';

const CATEGORY_CONFIG: { id: Category; label: string; color: string; dotClass: string }[] = [
  { id: 'all', label: 'All Destinations', color: 'text-navy-600', dotClass: 'bg-navy-400' },
  { id: 'popular', label: 'Popular', color: 'text-saffron-600', dotClass: 'bg-saffron-500' },
  { id: 'unexplored', label: 'Unexplored', color: 'text-green-600', dotClass: 'bg-green-500' },
  { id: 'unesco', label: 'UNESCO Heritage', color: 'text-blue-600', dotClass: 'bg-blue-500' },
  { id: 'g20', label: 'G20 Recognized', color: 'text-purple-600', dotClass: 'bg-purple-500' },
];

const CATEGORY_DOT_COLORS: Record<string, string> = {
  popular: 'bg-saffron-500',
  unexplored: 'bg-green-500',
  unesco: 'bg-blue-500',
  g20: 'bg-purple-500',
};

const CATEGORY_PULSE_COLORS: Record<string, string> = {
  popular: 'bg-saffron-500/30',
  unexplored: 'bg-green-500/30',
  unesco: 'bg-blue-500/30',
  g20: 'bg-purple-500/30',
};

export function IndiaMap() {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [filter, setFilter] = useState<Category>('all');

  const visibleMarkers = MAP_MARKERS.filter((m) => filter === 'all' || m.category === filter);

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-saffron-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">Pan-India Network</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-700 leading-tight tracking-tight text-balance">
              Explore India With Confidence
            </h2>
            <p className="mt-4 text-lg text-navy-400 leading-relaxed">
              Verified guides across India's most iconic destinations. Filter by category and hover over a marker to see what's available.
            </p>
          </div>
        </Reveal>

        {/* Filter buttons */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORY_CONFIG.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                  filter === cat.id
                    ? 'border-navy-700 bg-navy-700 text-white'
                    : 'border-navy-100 bg-surface text-navy-500 hover:border-navy-200'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${cat.dotClass}`} />
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative max-w-4xl mx-auto">
            {/* Map container */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-surface rounded-3xl shadow-card overflow-hidden p-4 sm:p-8">
              {/* Realistic India outline SVG */}
              <svg
                viewBox="0 0 400 480"
                className="absolute inset-0 w-full h-full p-4 sm:p-8"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="indiaFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1A2550" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#0A1128" stopOpacity="0.04" />
                  </linearGradient>
                </defs>

                {/* India main landmass */}
                <path
                  d="M 168 18
                     C 180 14, 195 16, 205 22
                     L 220 18
                     C 235 16, 250 20, 258 28
                     L 270 22
                     C 282 18, 295 22, 302 32
                     L 312 28
                     C 322 26, 332 32, 335 42
                     L 340 52
                     C 345 62, 348 75, 344 88
                     L 338 98
                     C 332 108, 322 112, 312 110
                     L 302 108
                     C 296 112, 292 120, 294 128
                     L 298 138
                     C 302 148, 300 158, 292 164
                     L 280 168
                     C 272 170, 262 168, 258 162
                     L 252 156
                     C 246 160, 240 166, 238 174
                     L 240 186
                     C 244 198, 250 210, 252 222
                     L 254 238
                     C 256 252, 252 264, 244 272
                     L 236 282
                     C 230 290, 228 300, 232 310
                     L 238 322
                     C 244 334, 242 346, 234 354
                     L 226 362
                     C 220 370, 216 380, 218 390
                     L 222 402
                     C 226 414, 224 426, 216 434
                     L 208 442
                     C 200 448, 192 450, 184 446
                     L 178 438
                     C 174 428, 176 418, 182 410
                     L 188 398
                     C 192 388, 190 378, 184 372
                     L 176 364
                     C 170 356, 166 346, 168 336
                     L 172 324
                     C 174 314, 170 304, 162 300
                     L 152 296
                     C 144 292, 138 286, 136 278
                     L 134 268
                     C 132 258, 128 250, 122 246
                     L 112 240
                     C 104 236, 98 230, 96 222
                     L 94 210
                     C 92 200, 88 192, 82 188
                     L 72 182
                     C 64 176, 58 168, 56 158
                     L 54 146
                     C 52 136, 56 128, 64 124
                     L 74 120
                     C 82 116, 88 110, 90 102
                     L 92 92
                     C 94 82, 100 76, 110 74
                     L 122 72
                     C 132 70, 140 66, 146 60
                     L 154 48
                     C 160 38, 164 26, 168 18 Z"
                  fill="url(#indiaFill)"
                  stroke="#1A2550"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Gujarat peninsula detail */}
                <path
                  d="M 72 182
                     C 68 190, 62 198, 58 208
                     L 56 220
                     C 54 232, 58 242, 66 248
                     L 76 252
                     C 84 254, 92 250, 96 242
                     L 98 230
                     C 96 220, 92 210, 86 202
                     L 78 190 Z"
                  fill="url(#indiaFill)"
                  stroke="#1A2550"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Northeastern states (Arunachal Pradesh / NE bulge) */}
                <path
                  d="M 302 32
                     C 312 30, 322 34, 330 42
                     L 338 52
                     C 344 60, 348 70, 346 80
                     L 342 92
                     C 336 100, 326 104, 316 102
                     L 308 98
                     C 302 92, 298 84, 300 76
                     L 302 64
                     C 304 54, 302 44, 302 32 Z"
                  fill="url(#indiaFill)"
                  stroke="#1A2550"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Kashmir northern detail */}
                <path
                  d="M 168 18
                     C 160 12, 150 10, 140 14
                     L 128 20
                     C 120 26, 116 36, 120 46
                     L 126 54
                     C 134 58, 144 56, 152 50
                     L 160 40
                     C 166 30, 168 22, 168 18 Z"
                  fill="url(#indiaFill)"
                  stroke="#1A2550"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Sri Lanka (for geographic context) */}
                <path
                  d="M 200 452
                     C 196 456, 194 462, 196 468
                     L 200 474
                     C 204 476, 208 474, 210 470
                     L 212 462
                     C 210 456, 206 452, 200 452 Z"
                  fill="#1A2550"
                  fillOpacity="0.06"
                  stroke="#1A2550"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeLinejoin="round"
                />

                {/* State boundary lines (subtle) */}
                <g stroke="#1A2550" strokeOpacity="0.12" strokeWidth="0.8" fill="none" strokeLinecap="round">
                  <path d="M 130 50 L 200 55 L 270 50" />
                  <path d="M 120 100 L 180 105 L 250 100 L 310 95" />
                  <path d="M 100 150 L 160 155 L 220 150 L 280 145" />
                  <path d="M 95 200 L 150 205 L 210 200 L 260 195" />
                  <path d="M 110 250 L 170 255 L 230 250" />
                  <path d="M 140 300 L 200 305 L 240 300" />
                  <path d="M 170 350 L 200 355 L 220 350" />
                  <path d="M 185 400 L 200 405" />
                </g>
              </svg>

              {/* Markers */}
              {visibleMarkers.map((marker) => {
                const idx = MAP_MARKERS.indexOf(marker);
                return (
                  <div
                    key={`${marker.name}-${idx}`}
                    className="absolute"
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseEnter={() => setActiveMarker(idx)}
                    onMouseLeave={() => setActiveMarker(null)}
                    onClick={() => setActiveMarker(activeMarker === idx ? null : idx)}
                  >
                    {/* Pulse ring */}
                    <span className={`absolute inset-0 w-4 h-4 rounded-full ${CATEGORY_PULSE_COLORS[marker.category]} animate-[pulse-ring_2s_ease-out_infinite]`} />

                    {/* Dot */}
                    <button className={`relative w-3 h-3 rounded-full ${CATEGORY_DOT_COLORS[marker.category]} border-2 border-white shadow-md hover:scale-125 transition-transform cursor-pointer`} />

                    {/* Label */}
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-navy-600 whitespace-nowrap">
                      {marker.name}
                    </span>

                    {/* Popover */}
                    {activeMarker === idx && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-52 bg-navy-700 rounded-xl shadow-card p-4 z-20 animate-fade-in">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-saffron-400" />
                          <span className="text-white font-bold text-sm">{marker.name}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-2xl font-extrabold text-saffron-400">{marker.guides}</span>
                          <span className="text-white/50 text-xs">verified guides</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {marker.interests.map((interest) => (
                            <span
                              key={interest}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/70"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">
                          {CATEGORY_CONFIG.find((c) => c.id === marker.category)?.label}
                        </span>
                        {/* Arrow */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy-700 rotate-45" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {CATEGORY_CONFIG.filter((c) => c.id !== 'all').map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${cat.dotClass} border-2 border-white shadow-sm`} />
                  <span className="text-sm font-medium text-navy-500">{cat.label}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-navy-700">{MAP_MARKERS.length}</p>
                <p className="text-xs text-navy-400 font-medium">Total Destinations</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-saffron-500">
                  {MAP_MARKERS.reduce((sum, m) => sum + m.guides, 0)}
                </p>
                <p className="text-xs text-navy-400 font-medium">Verified Guides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-blue-500">
                  {MAP_MARKERS.filter((m) => m.category === 'unesco').length}
                </p>
                <p className="text-xs text-navy-400 font-medium">UNESCO Sites</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-green-500">
                  {MAP_MARKERS.filter((m) => m.category === 'unexplored').length}
                </p>
                <p className="text-xs text-navy-400 font-medium">Unexplored</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
