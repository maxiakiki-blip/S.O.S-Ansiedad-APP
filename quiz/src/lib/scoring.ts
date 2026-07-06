import { MAX_INTENSITY, QUESTIONS, TIEBREAK_ORDER, getOverloadBand, type OverloadBand, type ProfileCode } from '../quiz.config';
import type { QuizAnswers } from '../types';

const Q1_OPTION_TO_PROFILE: Record<string, ProfileCode | null> = {
  a: 'A',
  b: 'B',
  c: null, // "nos dois ao mesmo tempo" — no desempata sozinha
  d: 'C',
};

function findOption(questionId: string, optionId: string) {
  const question = QUESTIONS.find((q) => q.id === questionId);
  return question?.options.find((o) => o.id === optionId);
}

export function computeProfile(answers: QuizAnswers): ProfileCode {
  const totals: Record<ProfileCode, number> = { A: 0, B: 0, C: 0 };

  for (const question of QUESTIONS) {
    const chosenId = answers[question.id];
    const option = chosenId ? findOption(question.id, chosenId) : undefined;
    if (!option) continue;
    totals.A += option.pA;
    totals.B += option.pB;
    totals.C += option.pC;
  }

  const max = Math.max(totals.A, totals.B, totals.C);
  const tied = TIEBREAK_ORDER.filter((code) => totals[code] === max);

  if (tied.length === 1) return tied[0];

  const q1Profile = Q1_OPTION_TO_PROFILE[answers.q1] ?? null;
  if (q1Profile && tied.includes(q1Profile)) return q1Profile;

  return tied[0]; // tied já está ordenado A > B > C via TIEBREAK_ORDER
}

export function computeOverloadScore(answers: QuizAnswers): number {
  let totalIntensity = 0;
  for (const question of QUESTIONS) {
    const chosenId = answers[question.id];
    const option = chosenId ? findOption(question.id, chosenId) : undefined;
    if (!option) continue;
    totalIntensity += option.i;
  }
  return Math.round((totalIntensity / MAX_INTENSITY) * 100);
}

export function computeResult(answers: QuizAnswers): { profile: ProfileCode; score: number; band: OverloadBand } {
  const profile = computeProfile(answers);
  const score = computeOverloadScore(answers);
  const band = getOverloadBand(score);
  return { profile, score, band };
}
