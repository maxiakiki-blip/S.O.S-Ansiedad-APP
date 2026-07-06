import { COPY } from '../quiz.config';

export function Footer() {
  const { footer } = COPY;
  return (
    <footer className="mt-10 pt-6 border-t border-navy/10 text-xs text-navy/70 leading-relaxed space-y-3">
      {footer.lines.map((line, idx) =>
        line === '' ? <br key={idx} /> : <p key={idx}>{line}</p>
      )}
      <p>
        Suporte: <a href={`mailto:${footer.supportEmail}`} className="underline">{footer.supportEmail}</a>
        {' · '}
        <a href={footer.privacyUrl} className="underline">
          {footer.privacyLinkLabel}
        </a>
      </p>
    </footer>
  );
}
