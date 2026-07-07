import { useEffect, useState } from 'react';
import { OVERLOAD_BAND_LABEL, type OverloadBand } from '../quiz.config';

interface GaugeProps {
  score: number;
  band: OverloadBand;
}

const SIZE = 176;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const COUNT_UP_MS = 900;

export function Gauge({ score, band }: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const isIntensa = band === 'intensa';
  const strokeColor = isIntensa ? 'var(--color-danger)' : 'var(--color-violet)';

  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / COUNT_UP_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * clamped));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped]);

  const offset = CIRCUMFERENCE * (1 - displayed / 100);
  const markerAngle = -90 + (displayed / 100) * 360;
  const markerRad = (markerAngle * Math.PI) / 180;
  const markerX = SIZE / 2 + RADIUS * Math.cos(markerRad);
  const markerY = SIZE / 2 + RADIUS * Math.sin(markerRad);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Sobrecarga percebida: ${clamped}%, ${OVERLOAD_BAND_LABEL[band]}`}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--color-violet-light)" strokeOpacity={0.22} strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
        {displayed > 1 && (
          <circle cx={markerX} cy={markerY} r={STROKE / 2 + 2} fill="var(--color-cream)" stroke={strokeColor} strokeWidth="3" />
        )}
        <text x="50%" y="46%" textAnchor="middle" fontSize="34" fontFamily="var(--font-display)" fontWeight="600" fill={strokeColor}>
          {displayed}%
        </text>
        <text x="50%" y="63%" textAnchor="middle" fontSize="14" fontFamily="var(--font-body)" fill="var(--color-navy)">
          {OVERLOAD_BAND_LABEL[band]}
        </text>
      </svg>
    </div>
  );
}
