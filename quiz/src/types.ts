export type ScreenId = 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'interstitial' | 'q6' | 'q7' | 'loading' | 'emailGate' | 'result';

export type QuizAnswers = Record<string, string>;

export interface QuizPersistedState {
  screen: ScreenId;
  answers: QuizAnswers;
  email: string;
  consent: boolean;
}

export interface PendingLead {
  email: string;
  consent: boolean;
  src: 'quizsos';
}
