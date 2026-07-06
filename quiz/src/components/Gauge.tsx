import { OVERLOAD_BAND_LABEL, type OverloadBand } from '../quiz.config';

interface GaugeProps {
  score: number;
  band: OverloadBand;
}

const SIZE = 160;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Gauge({ score, band }: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const isIntensa = band === 'intensa';
  const strokeColor = isIntensa ? 'var(--color-danger)' : 'var(--color-violet)';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Sobrecarga percebida: ${clamped}%, ${OVERLOAD_BAND_LABEL[band]}`}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--color-violet-light)" strokeOpacity={0.25} strokeWidth={STROKE} />
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
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text x="50%" y="47%" textAnchor="middle" fontSize="32" fontFamily="var(--font-display)" fill={strokeColor}>
          {clamped}%
        </text>
        <text x="50%" y="64%" textAnchor="middle" fontSize="14" fontFamily="var(--font-body)" fill="var(--color-navy)">
          {OVERLOAD_BAND_LABEL[band]}
        </text>
      </svg>
    </div>
  );
}
