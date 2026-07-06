import { useState } from 'react';
import { COPY } from '../quiz.config';

interface EmailGateScreenProps {
  onSubmit: (email: string, consent: boolean) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailGateScreen({ onSubmit }: EmailGateScreenProps) {
  const { emailGate } = COPY;
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed.length > 254 || !EMAIL_REGEX.test(trimmed)) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);
    onSubmit(trimmed, consent);
  }

  return (
    <div className="flex flex-col min-h-[100dvh] px-6 py-10 justify-center">
      <form className="max-w-md mx-auto w-full" onSubmit={handleSubmit} noValidate>
        <h2 className="font-display text-2xl font-semibold text-navy mb-3">{emailGate.title}</h2>
        <p className="text-navy/80 mb-5">{emailGate.text}</p>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailGate.placeholder}
          aria-label={emailGate.placeholder}
          maxLength={254}
          className="w-full min-h-[48px] rounded-2xl border-2 border-navy/15 bg-white px-4 py-3 mb-2 text-navy focus:border-violet outline-none"
        />
        {error && <p className="text-sm text-danger mb-2">{emailGate.errorInvalidEmail}</p>}
        <label className="flex items-start gap-3 mb-5 mt-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 accent-violet flex-shrink-0"
          />
          <span className="text-sm text-navy/80">{emailGate.consentLabel}</span>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="w-full min-h-[48px] bg-navy text-cream font-semibold rounded-2xl py-4 px-6 active:scale-[0.99] transition-transform disabled:opacity-70"
        >
          {emailGate.cta}
        </button>
        <p className="text-xs text-navy/60 mt-3">
          {emailGate.lgpdMicrocopy}{' '}
          <a href={emailGate.privacyUrl} className="underline">
            {emailGate.privacyLinkLabel}
          </a>
        </p>
      </form>
    </div>
  );
}
