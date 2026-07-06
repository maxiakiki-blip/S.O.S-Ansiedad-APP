import { useEffect, useRef } from 'react';
import { COPY, OVERLOAD_BAND_LINE, PROFILES, PROTOCOL_FIXED_LINE, PROTOCOL_STEPS, type OverloadBand, type ProfileCode } from '../quiz.config';
import { Gauge } from './Gauge';
import { Footer } from './Footer';
import { OfferSection } from './OfferSection';
import { trackEvent } from '../lib/track';

interface ResultScreenProps {
  profile: ProfileCode;
  score: number;
  band: OverloadBand;
}

export function ResultScreen({ profile, score, band }: ResultScreenProps) {
  const profileContent = PROFILES[profile];
  const offerRef = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      trackEvent('QuizComplete');
      tracked.current = true;
    }
  }, []);

  function scrollToOffer() {
    offerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="flex flex-col px-6 py-10">
      <div className="max-w-md mx-auto w-full">
        <p className="font-body text-xs font-semibold tracking-wide text-violet uppercase mb-2 text-center">
          {COPY.result.eyebrow}
        </p>
        <h1 className="font-display text-2xl font-semibold text-navy mb-6 text-center">
          Seu perfil: {profileContent.name}
        </h1>

        <div className="flex justify-center mb-2">
          <Gauge score={score} band={band} />
        </div>
        <p className="text-center text-xs text-navy/60 mb-6">{COPY.result.scoreMicrocopy}</p>

        <p className="text-navy/90 text-center leading-relaxed mb-8">{OVERLOAD_BAND_LINE[band]}</p>

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">
          <h2 className="font-display text-lg font-semibold text-navy mb-3">{COPY.result.whatItMeansTitle}</h2>
          <p className="text-navy/85 leading-relaxed">{profileContent.whatItMeans}</p>
        </div>

        <h2 className="font-display text-lg font-semibold text-navy mb-4 text-center">{COPY.result.protocolTitle}</h2>
        <div className="flex flex-col gap-3 mb-3">
          {PROTOCOL_STEPS.map((step) => {
            const isAnchor = step.order === profileContent.anchorStep;
            return (
              <div
                key={step.order}
                className={`bg-white rounded-2xl shadow-sm p-4 border-2 ${isAnchor ? 'border-violet' : 'border-transparent'}`}
              >
                {isAnchor && (
                  <p className="text-xs font-semibold text-violet mb-1">{COPY.result.anchorBadge}</p>
                )}
                <p className="font-body font-semibold text-navy">
                  {step.order}. {step.title}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-navy/60 leading-relaxed mb-8">{PROTOCOL_FIXED_LINE}</p>

        <p className="text-navy/90 text-center leading-relaxed mb-8">{profileContent.bridgeLine}</p>

        <button
          type="button"
          onClick={scrollToOffer}
          className="w-full min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-4 px-6 active:scale-[0.99] transition-transform"
        >
          Ver minha oferta →
        </button>

        <div ref={offerRef}>
          <OfferSection />
        </div>

        <Footer />
      </div>
    </div>
  );
}
