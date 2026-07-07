import { COPY } from '../quiz.config';
import { Footer } from './Footer';
import { MeditationIllustration } from './illustrations';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const { intro } = COPY;
  return (
    <div className="flex flex-col min-h-[100dvh] px-6 py-10">
      <div className="flex-1 flex flex-col justify-center text-center max-w-md mx-auto w-full">
        <div className="w-56 mx-auto mb-4">
          <MeditationIllustration className="w-full h-auto" />
        </div>
        <p className="font-body text-xs font-semibold tracking-wide text-violet uppercase mb-3">{intro.eyebrow}</p>
        <h1 className="font-display text-3xl font-semibold text-navy mb-4 leading-tight">{intro.title}</h1>
        <p className="text-navy/80 mb-8 leading-relaxed">{intro.subtitle}</p>
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-4 px-6 active:scale-[0.99] transition-transform"
        >
          {intro.cta}
        </button>
        <p className="text-xs text-navy/60 mt-3">{intro.microcopy}</p>
      </div>
      <div className="max-w-md mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
}
