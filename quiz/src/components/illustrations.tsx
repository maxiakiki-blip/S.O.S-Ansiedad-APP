// Ilustraciones e íconos custom en SVG inline — cálidos, abstractos, sin fotos de stock ni rostros realistas.
// Paleta: navy (linework), violet/violetLight (acentos), cream (fondo).

export function MeditationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} role="presentation" aria-hidden="true">
      <circle cx="160" cy="110" r="92" fill="var(--color-violet-light)" opacity="0.14" />
      <path
        d="M60 118 C60 75, 100 60, 160 60 C220 60, 260 75, 260 118"
        fill="none"
        stroke="var(--color-violet-light)"
        strokeWidth="2"
        opacity="0.55"
      />
      <path
        d="M40 132 C40 78, 92 56, 160 56 C228 56, 280 78, 280 132"
        fill="none"
        stroke="var(--color-violet)"
        strokeWidth="2"
        opacity="0.35"
      />
      {/* cuerpo sentado, silueta simple */}
      <path
        d="M160 92 a20 20 0 1 0 0.01 0 Z"
        fill="var(--color-navy)"
      />
      <path
        d="M118 178 C118 140, 138 118, 160 118 C182 118, 202 140, 202 178
           C202 178, 182 190, 160 190 C138 190, 118 178, 118 178 Z"
        fill="var(--color-violet)"
      />
      <path
        d="M96 178 C96 168, 112 156, 128 154 C124 166, 122 176, 124 184 C112 184, 100 182, 96 178 Z"
        fill="var(--color-navy)"
        opacity="0.9"
      />
      <path
        d="M224 178 C224 168, 208 156, 192 154 C196 166, 198 176, 196 184 C208 184, 220 182, 224 178 Z"
        fill="var(--color-navy)"
        opacity="0.9"
      />
      <path d="M118 190 C136 200, 184 200, 202 190 L202 178 C182 190, 138 190, 118 178 Z" fill="var(--color-navy)" />
    </svg>
  );
}

export function CalmButterflyIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} role="presentation" aria-hidden="true">
      <circle cx="110" cy="110" r="100" fill="var(--color-violet-light)" opacity="0.12" />
      <path
        d="M108 60 C70 30, 20 40, 20 90 C20 130, 60 140, 100 116 Z"
        fill="var(--color-violet)"
        opacity="0.9"
      />
      <path
        d="M108 60 C70 30, 20 40, 20 90 C20 130, 60 140, 100 116 Z"
        fill="none"
        stroke="var(--color-navy)"
        strokeWidth="1.5"
        opacity="0.25"
      />
      <path
        d="M112 60 C150 30, 200 40, 200 90 C200 130, 160 140, 120 116 Z"
        fill="var(--color-violet-light)"
        opacity="0.9"
      />
      <path
        d="M108 120 C74 138, 40 132, 38 160 C36 184, 66 192, 96 168 Z"
        fill="var(--color-violet)"
        opacity="0.7"
      />
      <path
        d="M112 120 C146 138, 180 132, 182 160 C184 184, 154 192, 124 168 Z"
        fill="var(--color-violet-light)"
        opacity="0.7"
      />
      <path d="M110 55 C107 90, 107 140, 110 168" fill="none" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 58 C104 50, 96 46, 90 48" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" />
      <path d="M110 58 C116 50, 124 46, 130 48" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface IconProps {
  className?: string;
}

export function IconBreath({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M12 21c-4-2.5-6-5.8-6-9a6 6 0 0 1 12 0c0 3.2-2 6.5-6 9Z" />
      <path d="M9 12c1-1.2 5-1.2 6 0" />
    </svg>
  );
}

export function IconSpiral({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7a5 5 0 1 0 5 5" />
      <path d="M12 11a1 1 0 1 0 1 1" />
    </svg>
  );
}

export function IconShieldAlert({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHeartPulse({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.5 20c-3.8-2.4-8-6-8-10.2A4.3 4.3 0 0 1 8.8 5.4 4.7 4.7 0 0 1 12.5 7a4.7 4.7 0 0 1 3.7-1.6 4.3 4.3 0 0 1 4.3 4.4c0 4.2-4.2 7.8-8 10.2Z" />
      <path d="M6 12h2.5l1.5-3 2 6 1.5-3H16" />
    </svg>
  );
}

export function IconGrounding({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v7" />
      <path d="M12 10c-2 0-5-1-6-4 3-1 6 0 6 4Z" />
      <path d="M12 10c2 0 5-1 6-4-3-1-6 0-6 4Z" />
      <path d="M8 21c0-5 1.8-8 4-8s4 3 4 8" />
    </svg>
  );
}

export function IconButterfly({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6c-1.5-2.2-6-3-6.5.5-.4 3 2.4 4.7 6.5 3.3" />
      <path d="M12 6c1.5-2.2 6-3 6.5.5.4 3-2.4 4.7-6.5 3.3" />
      <path d="M12 9.8c-1.2 1.4-4.6 1.9-4.9 4.7-.3 2.4 1.9 3.7 4.9 1.8" />
      <path d="M12 9.8c1.2 1.4 4.6 1.9 4.9 4.7.3 2.4-1.9 3.7-4.9 1.8" />
      <path d="M12 6v11" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18.5 14.2A7.6 7.6 0 0 1 9.8 5.5a7.8 7.8 0 1 0 8.7 8.7Z" />
    </svg>
  );
}

export function IconCompass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" />
    </svg>
  );
}

export function IconLockShield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <rect x="9.3" y="11" width="5.4" height="4.2" rx="1" />
      <path d="M10.3 11V9.6a1.7 1.7 0 0 1 3.4 0V11" />
    </svg>
  );
}
