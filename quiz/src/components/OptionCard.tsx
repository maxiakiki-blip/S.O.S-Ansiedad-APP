import type { ComponentType } from 'react';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: ComponentType<{ className?: string }>;
}

export function OptionCard({ label, selected, onSelect, icon: Icon }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={label}
      aria-pressed={selected}
      className={`w-full min-h-[56px] text-left px-4 py-4 rounded-2xl bg-white shadow-sm border-2 transition-all duration-200 flex items-center gap-3 ${
        selected ? 'border-violet shadow-md' : 'border-transparent'
      }`}
    >
      {Icon && (
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${
            selected ? 'bg-violet text-white' : 'bg-violet-light/20 text-violet'
          }`}
        >
          <Icon className="w-5 h-5" />
        </span>
      )}
      <span className="font-body text-navy text-base leading-snug flex-1">{label}</span>
      {selected && (
        <span className="animate-check-pop flex-shrink-0 w-6 h-6 rounded-full bg-violet text-white flex items-center justify-center text-sm">
          ✓
        </span>
      )}
    </button>
  );
}
