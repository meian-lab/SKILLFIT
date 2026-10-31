// Q11 — Block pattern spatial reasoning
// Original: dark navy F-shaped tetromino
// Options: 4 blue variations, correct answer is C

interface PatternQuestionProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

// Each pattern is a 4x4 boolean grid (true = filled block)
const ORIGINAL: boolean[][] = [
  [false, true,  true,  false],
  [false, true,  false, false],
  [true,  true,  false, false],
  [false, true,  false, false],
];

// A — wrong (extra block at bottom)
const PATTERN_A: boolean[][] = [
  [true,  true,  false, false],
  [false, true,  true,  false],
  [false, true,  false, false],
  [false, true,  false, false],
];

// B — wrong (different arrangement)
const PATTERN_B: boolean[][] = [
  [false, true,  false, false],
  [true,  true,  true,  false],
  [false, true,  false, false],
  [false, false, true,  false],
];

// C — CORRECT (reflected correctly)
const PATTERN_C: boolean[][] = [
  [false, true,  true,  false],
  [false, true,  false, false],
  [true,  true,  false, false],
  [false, true,  false, false],
];

// D — wrong (only 2 columns)
const PATTERN_D: boolean[][] = [
  [false, true,  true,  false],
  [false, true,  true,  false],
  [false, true,  false, false],
  [false, true,  false, false],
];

function Grid({ cells, color, small }: { cells: boolean[][], color: string, small?: boolean }) {
  const size = small ? 'w-5 h-5' : 'w-7 h-7';
  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(4, 1fr)` }}>
      {cells.map((row, r) =>
        row.map((filled, c) => (
          <div
            key={`${r}-${c}`}
            className={`${size} rounded-sm ${filled ? color : 'bg-transparent'}`}
          />
        ))
      )}
    </div>
  );
}

const OPTIONS = [
  { id: '11a', label: 'A', pattern: PATTERN_A },
  { id: '11b', label: 'B', pattern: PATTERN_B },
  { id: '11c', label: 'C', pattern: PATTERN_C },
  { id: '11d', label: 'D', pattern: PATTERN_D },
];

export function PatternQuestion({ selected, onSelect }: PatternQuestionProps) {
  return (
    <div className="w-full space-y-4">
      {/* Original pattern */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Original</span>
        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200">
          <Grid cells={ORIGINAL} color="bg-[#1e2d5a]" />
        </div>
      </div>

      {/* Four options */}
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95
              ${selected === opt.id
                ? 'border-[#2B5FFF] shadow-lg shadow-blue-200/50 bg-blue-50 scale-[1.02]'
                : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
          >
            <span className="text-xs font-bold text-slate-400 self-start">{opt.label}</span>
            <Grid cells={opt.pattern} color="bg-[#4F7EFF]" small />
            {selected === opt.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-[#2B5FFF] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

