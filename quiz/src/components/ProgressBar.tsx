interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex-1 h-1.5 rounded-full bg-violet-light/25 overflow-hidden">
          <div
            className="h-full rounded-full bg-violet transition-transform duration-500 ease-out origin-left"
            style={{ transform: i < current ? 'scaleX(1)' : 'scaleX(0)' }}
          />
        </div>
      ))}
    </div>
  );
}
