import { useEffect, useRef, useState } from 'react';
import { COPY } from '../quiz.config';
import { trackEvent } from '../lib/track';
import { IconLockShield } from './illustrations';

export function OfferSection() {
  const { offer } = COPY;
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    function measure() {
      ticking = false;
      const viewportH = window.innerHeight;
      const sectionTop = sectionRef.current?.getBoundingClientRect().top ?? Infinity;
      const ctaRect = ctaRef.current?.getBoundingClientRect();
      const ctaInView = ctaRect ? ctaRect.bottom > 0 && ctaRect.top < viewportH : true;
      setSectionVisible(sectionTop < viewportH);
      setCtaVisible(ctaInView);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const showSticky = sectionVisible && !ctaVisible;

  function handleCheckoutClick() {
    trackEvent('InitiateCheckout');
  }

  return (
    <>
      <section ref={sectionRef} id="oferta" className="mt-10 pt-8 border-t border-navy/10">
        <h2 className="font-display text-2xl font-semibold text-navy mb-3 text-center">{offer.title}</h2>
        <p className="text-navy/85 leading-relaxed mb-6 text-center">{offer.text}</p>

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
          <ul className="space-y-3 mb-4">
            {offer.stack.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-light/25 text-violet flex items-center justify-center text-xs">
                  ✓
                </span>
                <span className="text-navy/85 flex-1">{item.label}</span>
                <span className="text-navy/60 font-semibold whitespace-nowrap">{item.value}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-navy/10 pt-4 flex items-baseline justify-between">
            <span className="text-navy/50 line-through text-sm">{offer.totalCrossedOut}</span>
            <span className="font-display text-2xl font-semibold text-navy">{offer.totalHighlighted}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-1 flex-wrap">
          {['Pix', 'Cartão em até 12x', 'Boleto'].map((method) => (
            <span key={method} className="text-xs text-navy/70 bg-white rounded-full px-3 py-1 shadow-sm">
              {method}
            </span>
          ))}
        </div>
        <p className="text-center text-xs text-navy/60 mb-6">{offer.urgencyLine}</p>

        <a
          ref={ctaRef}
          href={offer.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCheckoutClick}
          className="block w-full text-center min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-4 px-6 active:scale-[0.99] transition-transform mb-3"
        >
          {offer.ctaLabel}
        </a>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-navy/60 mb-6">
          <IconLockShield className="w-3.5 h-3.5 flex-shrink-0" />
          {offer.guarantee}
        </p>

        <p className="text-center text-sm">
          <a href={offer.secondaryLinkUrl} target="_blank" rel="noopener noreferrer" className="underline text-navy/70">
            {offer.secondaryLinkLabel}
          </a>
        </p>
      </section>

      <div
        className={`fixed inset-x-0 bottom-0 z-20 px-4 pb-4 pt-3 bg-cream/95 backdrop-blur border-t border-navy/10 transition-transform duration-300 ${
          showSticky ? '' : 'pointer-events-none'
        }`}
        style={{ transform: showSticky ? 'translateY(0)' : 'translateY(100%)' }}
        aria-hidden={!showSticky}
      >
        <a
          href={offer.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCheckoutClick}
          tabIndex={showSticky ? 0 : -1}
          className="block max-w-md mx-auto text-center min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-3.5 px-6 active:scale-[0.99] transition-transform"
        >
          {offer.ctaLabel}
        </a>
      </div>
    </>
  );
}
