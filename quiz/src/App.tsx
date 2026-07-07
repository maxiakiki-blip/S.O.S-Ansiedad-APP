import { useEffect, useState } from 'react';
import { QUESTIONS } from './quiz.config';
import type { QuizPersistedState, ScreenId } from './types';
import { loadState, saveState, savePendingLead, loadPendingLead, clearPendingLead } from './lib/storage';
import { initTracking, trackEvent, trackCustom } from './lib/track';
import { computeResult } from './lib/scoring';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { InterstitialScreen } from './components/InterstitialScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { EmailGateScreen } from './components/EmailGateScreen';
import { ResultScreen } from './components/ResultScreen';
import { AmbientBackground } from './components/AmbientBackground';

const QUESTION_IDS = QUESTIONS.map((q) => q.id);

function nextAfterQuestion(questionId: string): ScreenId {
  const map: Record<string, ScreenId> = {
    q1: 'q2',
    q2: 'q3',
    q3: 'q4',
    q4: 'q5',
    q5: 'interstitial',
    q6: 'q7',
    q7: 'loading',
  };
  return map[questionId] ?? 'loading';
}

function prevQuestion(questionId: string): ScreenId | null {
  const idx = QUESTION_IDS.indexOf(questionId);
  if (idx <= 0) return null;
  return QUESTION_IDS[idx - 1] as ScreenId;
}

export default function App() {
  const [state, setState] = useState<QuizPersistedState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    initTracking();
    if (state.screen === 'intro') {
      trackEvent('ViewContent');
    }

    const pending = loadPendingLead();
    if (pending) {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pending),
      })
        .then((res) => {
          if (res.ok) clearPendingLead();
        })
        .catch(() => {
          // segue pendente para a próxima tentativa
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(patch: Partial<QuizPersistedState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function handleStart() {
    trackEvent('QuizStart');
    update({ screen: 'q1' });
  }

  function handleAnswer(questionId: string, optionId: string) {
    const step = QUESTION_IDS.indexOf(questionId) + 1;
    trackCustom('QuizStep', { step });
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [questionId]: optionId },
      screen: nextAfterQuestion(questionId),
    }));
  }

  function handleBack(questionId: string) {
    const prev = prevQuestion(questionId);
    if (prev) update({ screen: prev });
  }

  function handleInterstitialContinue() {
    update({ screen: 'q6' });
  }

  function handleLoadingDone() {
    update({ screen: 'emailGate' });
  }

  function handleEmailSubmit(email: string, consent: boolean) {
    trackEvent('Lead');
    update({ screen: 'result', email, consent });

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, consent, src: 'quizsos' }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
      })
      .catch(() => {
        savePendingLead({ email, consent, src: 'quizsos' });
      });
  }

  const { screen } = state;

  function renderScreen() {
    if (screen === 'intro') {
      return <IntroScreen onStart={handleStart} />;
    }

    if (screen === 'interstitial') {
      return <InterstitialScreen q5OptionId={state.answers.q5 ?? 'c'} onContinue={handleInterstitialContinue} />;
    }

    if (screen === 'loading') {
      return <LoadingScreen onDone={handleLoadingDone} />;
    }

    if (screen === 'emailGate') {
      return <EmailGateScreen onSubmit={handleEmailSubmit} />;
    }

    if (screen === 'result') {
      const { profile, score, band } = computeResult(state.answers);
      return <ResultScreen profile={profile} score={score} band={band} />;
    }

    const question = QUESTIONS.find((q) => q.id === screen);
    if (!question) {
      return <IntroScreen onStart={handleStart} />;
    }

    return (
      <QuestionScreen
        key={question.id}
        question={question}
        index={QUESTION_IDS.indexOf(question.id)}
        total={QUESTION_IDS.length}
        selectedOptionId={state.answers[question.id]}
        onAnswer={(optionId) => handleAnswer(question.id, optionId)}
        onBack={question.id === 'q1' ? undefined : () => handleBack(question.id)}
      />
    );
  }

  return (
    <>
      <AmbientBackground />
      <div key={screen} className="screen-enter">
        {renderScreen()}
      </div>
    </>
  );
}
