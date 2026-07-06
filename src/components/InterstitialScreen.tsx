import { COPY, INTERSTITIAL_LINE_1, INTERSTITIAL_LINE_2 } from '../quiz.config';

interface InterstitialScreenProps {
  q5OptionId: string;
  onContinue: () => void;
}

export function InterstitialScreen({ q5OptionId, onContinue }: InterstitialScreenProps) {
  const line1 = INTERSTITIAL_LINE_1[q5OptionId] ?? INTERSTITIAL_LINE_1.c;

  return (
    <div className="flex flex-col min-h-[100dvh] px-6 py-10 justify-center">
      <div className="max-w-md mx-auto w-full text-center">
        <h2 className="font-display text-2xl font-semibold text-navy mb-6 leading-snug">{COPY.interstitial.title}</h2>
        <p className="text-navy/90 mb-4 leading-relaxed">{line1}</p>
        <p className="text-navy/80 mb-8 leading-relaxed">{INTERSTITIAL_LINE_2}</p>
        <button
          type="button"
          onClick={onContinue}
          className="w-full min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-4 px-6 active:scale-[0.99] transition-transform"
        >
          {COPY.interstitial.cta}
        </button>
      </div>
    </div>
  );
}
