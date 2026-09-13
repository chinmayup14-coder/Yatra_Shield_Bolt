import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
};

export function TrustScoreRing({ value, size = 200, strokeWidth = 14, className = '', label = 'TRUST SCORE' }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayValue / 100) * circumference;

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-navy-500/30"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#trustGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E08E45" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-extrabold text-navy-700 tracking-tight">
            {displayValue}
            <span className="text-2xl font-bold text-navy-300">/100</span>
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs font-bold tracking-[0.2em] text-navy-400 uppercase">{label}</p>
    </div>
  );
}
