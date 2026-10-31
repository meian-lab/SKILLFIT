import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './data/questions';
import { tracks } from './data/tracks';
import { calculateScores, getRecommendedTrack, getMatchPercent } from './utils/scoring';
import { ButtonDesignQuestion } from './components/ButtonDesignQuestion';
import { LayoutDesignQuestion } from './components/LayoutDesignQuestion';
import { PatternQuestion } from './components/PatternQuestion';

type Screen = 'splash' | 'quiz' | 'results';

const TOTAL = questions.length;

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[index];
  const progress = ((index) / TOTAL) * 100;

  function handleAnswer(optionId: string) {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    // Auto-advance after brief flash
    setTimeout(() => {
      if (index < TOTAL - 1) {
        setDirection(1);
        setIndex(i => i + 1);
      } else {
        setScreen('results');
      }
    }, 300);
  }

  function handleBack() {
    if (index > 0) {
      setDirection(-1);
      setIndex(i => i - 1);
    }
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setDirection(1);
    setScreen('splash');
  }

  const scores = calculateScores(answers, questions);
  const recommended = getRecommendedTrack(scores);
  const match = getMatchPercent(scores);

  // ── Splash ─────────────────────────────────────────────────────────────
  if (screen === 'splash') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 max-w-sm w-full"
        >
          <img src="/logo.png" alt="SkillFit" className="w-28 h-28 object-contain drop-shadow" />
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">SkillFit</h1>
            <p className="text-slate-500 mt-1 text-sm">Find your perfect tech track</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-500 bg-slate-50 rounded-2xl p-4 w-full text-left">
            <div className="flex items-center gap-2"><span>✅</span><span>11 quick questions</span></div>
            <div className="flex items-center gap-2"><span>🎯</span><span>Personalised track match</span></div>
            <div className="flex items-center gap-2"><span>⚡</span><span>Takes about 2 minutes</span></div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setScreen('quiz')}
            className="w-full py-4 bg-[#2B5FFF] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-300/40"
          >
            Start Assessment →
          </motion.button>
          <p className="text-xs text-slate-400">by meian.lab × Community Innovation Hub</p>
        </motion.div>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────
  if (screen === 'results') {
    const track = recommended;
    const allTracks = Object.values(tracks);

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 max-w-lg mx-auto w-full space-y-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Match</p>
            <div className="text-5xl">{track.emoji}</div>
            <h2 className="text-2xl font-black text-slate-900">{track.name}</h2>
            <p className="text-slate-500 text-sm">{track.tagline}</p>
          </motion.div>

          {/* Score bars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-3"
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Score Breakdown</p>
            {[
              { label: '🎨 Creative', val: match.creative, color: 'bg-[#FF9640]' },
              { label: '💻 Logical', val: match.logical, color: 'bg-[#2B5FFF]' },
            ].map(bar => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>{bar.label}</span><span>{bar.val}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.val}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className={`h-full ${bar.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Career roles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Career Paths</p>
            <div className="flex flex-wrap gap-2">
              {track.roles.map(role => (
                <span key={role} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* All tracks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">All Tracks at CIH</p>
            <div className="space-y-2">
              {allTracks.map(t => (
                <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl ${t.id === track.id ? 'bg-blue-50 border border-[#2B5FFF]/20' : 'bg-slate-50'}`}>
                  <span className="text-xl">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{t.name}</p>
                    <p className="text-xs text-slate-500 truncate">{t.tagline}</p>
                  </div>
                  {t.id === track.id && <span className="text-xs font-bold text-[#2B5FFF] shrink-0">Your Match</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Retake */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={restart}
            className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl text-sm"
          >
            ↩ Retake Assessment
          </motion.button>
        </div>
      </div>
    );
  }

  // ── Quiz ───────────────────────────────────────────────────────────────
  const selected = answers[question.id] ?? null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar + back */}
      <div className="px-4 pt-safe pt-4 pb-2 flex items-center gap-3">
        <button
          onClick={handleBack}
          disabled={index === 0}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 disabled:opacity-20 hover:bg-slate-100 transition-colors shrink-0"
        >
          ←
        </button>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2B5FFF] rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-xs font-bold text-slate-400 shrink-0 w-10 text-right">{index + 1}/{TOTAL}</span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-1 flex flex-col px-4 pt-6 pb-4 gap-6 max-w-lg mx-auto w-full"
          >
            {/* Question header */}
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">{question.title}</h2>
              {question.subtitle && (
                <p className="text-slate-400 text-sm">{question.subtitle}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex-1">
              {question.type === 'choice' && (
                <div className="flex flex-col gap-3">
                  {question.options.map(opt => (
                    <motion.button
                      key={opt.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt.id)}
                      className={`flex items-center gap-4 w-full p-4 rounded-2xl border-2 text-left transition-all duration-150
                        ${selected === opt.id
                          ? 'border-[#2B5FFF] bg-blue-50 shadow-md shadow-blue-200/50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                    >
                      <span className="text-2xl shrink-0">{opt.icon}</span>
                      <span className="font-semibold text-slate-800 text-sm leading-snug">{opt.label}</span>
                      {selected === opt.id && (
                        <div className="ml-auto w-6 h-6 bg-[#2B5FFF] rounded-full flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {question.type === 'image-buttons' && (
                <ButtonDesignQuestion
                  selected={selected}
                  onSelect={handleAnswer}
                />
              )}

              {question.type === 'image-layouts' && (
                <LayoutDesignQuestion
                  selected={selected}
                  onSelect={handleAnswer}
                />
              )}

              {question.type === 'image-patterns' && (
                <PatternQuestion
                  selected={selected}
                  onSelect={handleAnswer}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

