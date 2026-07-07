import type { QuizOption } from '../quiz.config';
import {
  IconBreath,
  IconSpiral,
  IconShieldAlert,
  IconHeartPulse,
  IconClock,
  IconMoon,
  IconCompass,
} from '../components/illustrations';

// Q5 (método já tentado) e Q7 (micro-compromisso) não pontuam perfil — ícone fixo por opção.
const Q5_ICONS: Record<string, typeof IconBreath> = {
  a: IconBreath,
  b: IconMoon,
  c: IconClock,
  d: IconCompass,
};

const Q7_ICONS: Record<string, typeof IconBreath> = {
  a: IconHeartPulse,
  b: IconCompass,
  c: IconClock,
};

export function getOptionIcon(questionId: string, optionId: string, option: QuizOption) {
  if (questionId === 'q5') return Q5_ICONS[optionId] ?? IconClock;
  if (questionId === 'q7') return Q7_ICONS[optionId] ?? IconClock;
  if (questionId === 'q4') return IconClock;

  const { pA, pB, pC } = option;
  const max = Math.max(pA, pB, pC);
  if (max === 0) return IconClock;
  if (pA === max) return IconHeartPulse;
  if (pB === max) return IconSpiral;
  return IconShieldAlert;
}
