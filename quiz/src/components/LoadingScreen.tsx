import { useEffect, useState } from 'react';
import { COPY } from '../quiz.config';

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const { messages, durationMs } = COPY.loading;
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const stepMs = durationMs / messages.length;
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, messages.length - 1));
    }, stepMs);
    const timeout = setTimeout(onDone, durationMs);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center px-6 text-center">
      <div className="w-10 h-10 border-4 border-violet-light border-t-violet rounded-full animate-spin mb-6" />
      <p className="font-body text-navy/80">{messages[messageIndex]}</p>
    </div>
  );
}
