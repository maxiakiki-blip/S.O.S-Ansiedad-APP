interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full h-2 rounded-full bg-violet-light/30 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full bg-violet rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
