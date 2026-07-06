declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
let initialized = false;

function ensureInit(): boolean {
  if (typeof window === 'undefined' || !window.fbq) return false;
  if (!PIXEL_ID) return false;
  if (!initialized) {
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    initialized = true;
  }
  return true;
}

export function trackEvent(event: string): void {
  if (!ensureInit() || !window.fbq) return;
  window.fbq('track', event);
}

export function trackCustom(event: string, params?: Record<string, unknown>): void {
  if (!ensureInit() || !window.fbq) return;
  window.fbq('trackCustom', event, params);
}

export function initTracking(): void {
  ensureInit();
}
