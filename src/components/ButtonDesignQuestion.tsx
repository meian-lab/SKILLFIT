// Q9 — Four button style options rendered as actual styled buttons

interface ButtonDesignProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const BUTTONS = [
  { id: '9a', label: 'A', bg: 'bg-[#4F7EFF]', text: 'text-white', border: '', rounded: 'rounded-xl' },
  { id: '9b', label: 'B', bg: 'bg-[#1a2744]', text: 'text-white', border: '', rounded: 'rounded-xl' },
  { id: '9c', label: 'C', bg: 'bg-slate-100', text: 'text-slate-400', border: '', rounded: 'rounded-xl' },
  { id: '9d', label: 'D', bg: 'bg-[#F5A623]', text: 'text-[#1a2744]', border: '', rounded: 'rounded-xl' },
];

export function ButtonDesignQuestion({ selected, onSelect }: ButtonDesignProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {BUTTONS.map((btn) => (
        <button
          key={btn.id}
          onClick={() => onSelect(btn.id)}
          className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-150 active:scale-95
            ${selected === btn.id
              ? 'border-[#2B5FFF] shadow-lg shadow-blue-200/50 scale-[1.02]'
              : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
        >
          {/* Option label */}
          <span className="text-xs font-bold text-slate-400 self-start">{btn.label}</span>
          {/* The actual button visual */}
          <div className={`w-full py-3 px-4 ${btn.bg} ${btn.text} ${btn.rounded} text-sm font-bold text-center shadow-sm`}>
            Pay now
          </div>
          {/* Selected indicator */}
          {selected === btn.id && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-[#2B5FFF] rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

