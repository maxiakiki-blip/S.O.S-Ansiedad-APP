import { useState } from 'react';
import type { QuizQuestion } from '../quiz.config';
import { ProgressBar } from './ProgressBar';
import { OptionCard } from './OptionCard';
import { COPY } from '../quiz.config';

interface QuestionScreenProps {
  question: QuizQuestion;
  index: number; // 0-based overall index within the 7 questions
  total: number;
  selectedOptionId?: string;
  onAnswer: (optionId: string) => void;
  onBack?: () => void;
}

const SELECT_DELAY_MS = 250;

export function QuestionScreen({ question, index, total, selectedOptionId, onAnswer, onBack }: QuestionScreenProps) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  function handleSelect(optionId: string) {
    if (pendingId) return;
    setPendingId(optionId);
    setTimeout(() => onAnswer(optionId), SELECT_DELAY_MS);
  }

  const activeId = pendingId ?? selectedOptionId;

  return (
    <div className="flex flex-col min-h-[100dvh] px-6 py-8">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <div className="mb-6">
          {onBack && (
            <button type="button" onClick={onBack} className="text-sm text-navy/60 mb-3">
              {COPY.backLabel}
            </button>
          )}
          <p className="text-xs font-semibold text-navy/60 mb-2">
            Pergunta {index + 1} de {total}
          </p>
          <ProgressBar current={index + 1} total={total} />
        </div>
        <h2 className="font-display text-xl font-semibold text-navy mb-6 leading-snug">{question.title}</h2>
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <OptionCard
              key={option.id}
              label={option.label}
              selected={activeId === option.id}
              onSelect={() => handleSelect(option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
