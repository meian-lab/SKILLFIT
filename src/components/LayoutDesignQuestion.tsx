// Q10 — Two payment screen layout mockups

interface LayoutDesignProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function LayoutDesignQuestion({ selected, onSelect }: LayoutDesignProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* Option A — Bold hierarchy */}
      <button
        onClick={() => onSelect('10a')}
        className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95
          ${selected === '10a'
            ? 'border-[#2B5FFF] shadow-lg shadow-blue-200/50 scale-[1.02]'
            : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
      >
        <span className="text-xs font-bold text-slate-400 self-start">A</span>
        {/* Phone mockup A */}
        <div className="w-full bg-slate-100 rounded-xl p-3 space-y-2 min-h-[180px] flex flex-col">
          <p className="text-[11px] font-extrabold text-slate-800 leading-tight">Pay school fees</p>
          <p className="text-sm font-extrabold text-slate-900">NGN 45,000</p>
          <p className="text-[10px] text-slate-500">Due 15 Nov</p>
          <div className="flex-1" />
          <div className="w-full py-2 bg-[#4F7EFF] rounded-lg text-white text-[11px] font-bold text-center">
            Pay now
          </div>
          <p className="text-[10px] text-slate-400 text-center">Save for later</p>
          <p className="text-[10px] text-slate-400 text-center">Cancel</p>
        </div>
        {selected === '10a' && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-[#2B5FFF] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>

      {/* Option B — Equal weight */}
      <button
        onClick={() => onSelect('10b')}
        className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95
          ${selected === '10b'
            ? 'border-[#2B5FFF] shadow-lg shadow-blue-200/50 scale-[1.02]'
            : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
      >
        <span className="text-xs font-bold text-slate-400 self-start">B</span>
        {/* Phone mockup B */}
        <div className="w-full bg-slate-100 rounded-xl p-3 space-y-2 min-h-[180px] flex flex-col">
          <p className="text-[11px] text-slate-700">Pay school fees</p>
          <p className="text-[11px] text-slate-700">NGN 45,000</p>
          <p className="text-[10px] text-slate-500">Due 15 Nov</p>
          <div className="flex-1" />
          {['Pay now', 'Save for later', 'Cancel'].map(label => (
            <div key={label} className="w-full py-2 border border-[#4F7EFF] rounded-lg text-[#4F7EFF] text-[10px] font-semibold text-center">
              {label}
            </div>
          ))}
        </div>
        {selected === '10b' && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-[#2B5FFF] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}

