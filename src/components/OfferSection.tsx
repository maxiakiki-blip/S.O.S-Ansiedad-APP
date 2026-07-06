import { COPY } from '../quiz.config';
import { trackEvent } from '../lib/track';

export function OfferSection() {
  const { offer } = COPY;

  function handleCheckoutClick() {
    trackEvent('InitiateCheckout');
  }

  return (
    <section id="oferta" className="mt-10 pt-8 border-t border-navy/10">
      <h2 className="font-display text-2xl font-semibold text-navy mb-3 text-center">{offer.title}</h2>
      <p className="text-navy/85 leading-relaxed mb-6 text-center">{offer.text}</p>

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
        <ul className="space-y-3 mb-4">
          {offer.stack.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-navy/85">{item.label}</span>
              <span className="text-navy/60 font-semibold whitespace-nowrap">{item.value}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-navy/10 pt-4 flex items-baseline justify-between">
          <span className="text-navy/50 line-through text-sm">{offer.totalCrossedOut}</span>
          <span className="font-display text-2xl font-semibold text-navy">{offer.totalHighlighted}</span>
        </div>
      </div>

      <p className="text-center text-sm text-navy/70 mb-1">{offer.paymentLine}</p>
      <p className="text-center text-xs text-navy/60 mb-6">{offer.urgencyLine}</p>

      <a
        href={offer.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCheckoutClick}
        className="block w-full text-center min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-4 px-6 active:scale-[0.99] transition-transform mb-3"
      >
        {offer.ctaLabel}
      </a>

      <p className="text-center text-xs text-navy/60 mb-6">{offer.guarantee}</p>

      <p className="text-center text-sm">
        <a href={offer.secondaryLinkUrl} target="_blank" rel="noopener noreferrer" className="underline text-navy/70">
          {offer.secondaryLinkLabel}
        </a>
      </p>
    </section>
  );
}
