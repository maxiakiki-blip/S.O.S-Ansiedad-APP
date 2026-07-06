interface OptionCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionCard({ label, selected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={label}
      aria-pressed={selected}
      className={`w-full min-h-[56px] text-left px-5 py-4 rounded-2xl bg-white shadow-sm border-2 transition-colors duration-150 flex items-center justify-between gap-3 ${
        selected ? 'border-violet' : 'border-transparent'
      }`}
    >
      <span className="font-body text-navy text-base leading-snug">{label}</span>
      {selected && (
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet text-white flex items-center justify-center text-sm">
          ✓
        </span>
      )}
    </button>
  );
}
