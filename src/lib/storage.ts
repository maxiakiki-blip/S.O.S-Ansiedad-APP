import type { PendingLead, QuizPersistedState } from '../types';

const STATE_KEY = 'sos_quiz_state';
const PENDING_LEAD_KEY = 'sos_quiz_pending_lead';

export const DEFAULT_STATE: QuizPersistedState = {
  screen: 'intro',
  answers: {},
  email: '',
  consent: false,
};

export function loadState(): QuizPersistedState {
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: QuizPersistedState): void {
  try {
    sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage indisponível (modo privado etc.) — segue sem persistência.
  }
}

export function clearState(): void {
  try {
    sessionStorage.removeItem(STATE_KEY);
  } catch {
    // no-op
  }
}

export function savePendingLead(lead: PendingLead): void {
  try {
    sessionStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(lead));
  } catch {
    // no-op
  }
}

export function loadPendingLead(): PendingLead | null {
  try {
    const raw = sessionStorage.getItem(PENDING_LEAD_KEY);
    return raw ? (JSON.parse(raw) as PendingLead) : null;
  } catch {
    return null;
  }
}

export function clearPendingLead(): void {
  try {
    sessionStorage.removeItem(PENDING_LEAD_KEY);
  } catch {
    // no-op
  }
}
