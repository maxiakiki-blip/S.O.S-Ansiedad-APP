import { useEffect, useState } from 'react';
import { COPY } from '../quiz.config';

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const { messages, durationMs } = COPY.loading;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stepMs = durationMs / messages.length;
    const interval = setInterval(() => {
      setStage((s) => Math.min(s + 1, messages.length));
    }, stepMs);
    const timeout = setTimeout(onDone, durationMs);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeMessage = messages[Math.min(stage, messages.length - 1)];

  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center px-6 text-center">
      <div className="w-full max-w-xs flex flex-col gap-3 mb-8">
        {messages.map((_, i) => {
          const done = stage > i;
          const active = stage === i;
          return (
            <div key={i} className="h-2.5 rounded-full bg-violet-light/25 overflow-hidden relative">
              <div
                className={`h-full rounded-full bg-violet transition-transform duration-700 ease-out origin-left ${
                  active ? 'animate-gentle-pulse' : ''
                }`}
                style={{ transform: done || active ? 'scaleX(1)' : 'scaleX(0)' }}
              />
              {done && (
                <span className="absolute inset-0 flex items-center justify-end pr-2 text-white text-[10px]">✓</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="font-body text-navy/80">{activeMessage}</p>
    </div>
  );
}
