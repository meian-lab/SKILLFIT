import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Terminal,
  Palette,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  RotateCcw,
  Sparkles,
  Download,
  ChevronRight,
  Info,
  Shuffle
} from 'lucide-react';

import { questions, introOptions } from './data/questions';
import { tracks } from './data/tracks';
import { calculateAssessment } from './utils/scoring';
import type { AssessmentResult, BaseQuestion } from './types';

type Screen = 'splash' | 'intro' | 'quiz' | 'results';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Interleaves shuffled code and creative questions so they never appear in separate blocks
function getInterleavedQuestions(): BaseQuestion[] {
  const codePool = shuffleArray(questions.filter(q => q.trackTarget === 'code'));
  const creativePool = shuffleArray(questions.filter(q => q.trackTarget === 'creative'));
  const bothPool = shuffleArray(questions.filter(q => q.trackTarget === 'both'));

  const result: BaseQuestion[] = [];
  const maxPairs = Math.max(codePool.length, creativePool.length);

  for (let i = 0; i < maxPairs; i++) {
    // Alternate starting with code or creative on odd/even pairs
    if (i % 2 === 0) {
      if (codePool[i]) result.push(codePool[i]);
      if (creativePool[i]) result.push(creativePool[i]);
    } else {
      if (creativePool[i]) result.push(creativePool[i]);
      if (codePool[i]) result.push(codePool[i]);
    }
  }

  // Add the final capstone fit & friction questions (Q19 & Q20)
  result.push(...bothPool);
  return result;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [introLeaning, setIntroLeaning] = useState<string>('not_sure');
  const [quizQuestions, setQuizQuestions] = useState<BaseQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [direction, setDirection] = useState(1);
  const [copied, setCopied] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  async function triggerInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  }

  const activeQuestions = quizQuestions.length > 0 ? quizQuestions : questions;
  const currentQ = activeQuestions[currentQIndex] || questions[0];
  const totalQuestions = activeQuestions.length; // 20
  const progressPercent = ((currentQIndex + 1) / totalQuestions) * 100;

  function triggerConfetti() {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function handleStart() {
    setScreen('intro');
  }

  function handleIntroSelect(id: string) {
    setIntroLeaning(id);
    // Prepare fresh shuffled and interleaved question order
    const interleaved = getInterleavedQuestions();
    setQuizQuestions(interleaved);
    setAnswers({});
    setCurrentQIndex(0);
    setDirection(1);

    setTimeout(() => {
      setScreen('quiz');
    }, 250);
  }

  function handleSingleChoice(optionId: string) {
    const nextAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (currentQIndex < totalQuestions - 1) {
        setDirection(1);
        setCurrentQIndex(i => i + 1);
      } else {
        setScreen('results');
        triggerConfetti();
      }
    }, 280);
  }

  function handleMultiChoiceToggle(optionId: string) {
    const currentList = (Array.isArray(answers[currentQ.id])
      ? (answers[currentQ.id] as string[])
      : []) as string[];

    let updatedList: string[];
    if (currentList.includes(optionId)) {
      updatedList = currentList.filter(id => id !== optionId);
    } else {
      if (currentList.length >= (currentQ.maxSelections || 2)) {
        updatedList = [currentList[1], optionId];
      } else {
        updatedList = [...currentList, optionId];
      }
    }

    setAnswers({ ...answers, [currentQ.id]: updatedList });
  }

  function handleNextMulti() {
    const currentList = (answers[currentQ.id] as string[]) || [];
    if (currentList.length !== (currentQ.maxSelections || 2)) return;

    if (currentQIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentQIndex(i => i + 1);
    } else {
      setScreen('results');
      triggerConfetti();
    }
  }

  function handlePrev() {
    if (currentQIndex > 0) {
      setDirection(-1);
      setCurrentQIndex(i => i - 1);
    } else {
      setScreen('intro');
    }
  }

  function restartAssessment() {
    setAnswers({});
    setCurrentQIndex(0);
    setDirection(1);
    setIntroLeaning('not_sure');
    setQuizQuestions([]);
    setScreen('splash');
  }

  const result: AssessmentResult = calculateAssessment(answers, introLeaning);
  const matchedTrack =
    result.recommendation === 'programming'
      ? tracks.programming
      : result.recommendation === 'creative'
      ? tracks.creative
      : tracks.hybrid;

  function copySummary() {
    const text = `🎯 My SkillFit Assessment Result:
• Recommendation: ${matchedTrack.name}
• Code Score: ${result.codeScore}/${result.codeMax} (${result.codePercent}%)
• Creative Score: ${result.creativeScore}/${result.creativeMax} (${result.creativePercent}%)
• Gap: ${Math.abs(result.gap)} points (${result.gap >= 0 ? 'Code leading' : 'Creative leading'})
Completed 20-Question Shuffled Assessment via SkillFit by meian.lab x Community Innovation Hub`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: SPLASH
  // ──────────────────────────────────────────────────────────────────────────
  if (screen === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center space-y-6"
        >
          {/* Logo & Hub Branding */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2 shadow-inner">
              <img src="/logo.png" alt="SkillFit Logo" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#FF9640] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              v2.0
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2B5FFF] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Community Innovation Hub
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              SkillFit Assessment
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Programming vs Creative Track Placement
            </p>
          </div>

          {/* Quick Info Box */}
          <div className="w-full bg-slate-50/80 rounded-2xl p-4 text-left border border-slate-100 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2B5FFF] font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <div>
                <span className="font-bold text-slate-800">20 Shuffled Questions (~7 mins):</span> Dynamic alternating flow mixing algorithmic puzzles, visual perception, UI architecture, and project fit.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-[#FF9640] font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <div>
                <span className="font-bold text-slate-800">Shuffled & Interleaved:</span> No repetitive track blocks — every question alternates between code reasoning and visual design.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <div>
                <span className="font-bold text-slate-800">Fair & Comprehensive:</span> 10 Code questions & 10 Creative questions scored independently to discover your natural superpowers.
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full py-4 bg-[#2B5FFF] hover:bg-blue-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Start 20-Question Assessment
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {installPrompt && !isInstalled && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={triggerInstall}
              className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl text-xs border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#2B5FFF]" />
              Install SkillFit App
            </motion.button>
          )}

          <p className="text-[11px] text-slate-400">
            SkillFit places people. It never rejects them.
          </p>
        </motion.div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: INTRO (Unscored Leaning)
  // ──────────────────────────────────────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50/60 flex flex-col items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-[#2B5FFF]">
              Intro Question · Initial Preference
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Which track are you currently leaning toward?
            </h2>
            <p className="text-xs text-slate-500">
              This does not affect your score. It helps us compare your expectations with your actual assessment strengths!
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {introOptions.map(opt => {
              const isSelected = introLeaning === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleIntroSelect(opt.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 bg-white cursor-pointer ${
                    isSelected
                      ? 'border-[#2B5FFF] shadow-md shadow-blue-100 ring-2 ring-blue-500/10'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    opt.id === 'programming'
                      ? 'bg-blue-50 text-[#2B5FFF]'
                      : opt.id === 'creative'
                      ? 'bg-amber-50 text-[#FF9640]'
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {opt.id === 'programming' ? <Terminal className="w-5 h-5" /> : opt.id === 'creative' ? <Palette className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm leading-snug">{opt.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{opt.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 self-center" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: RESULTS
  // ──────────────────────────────────────────────────────────────────────────
  if (screen === 'results') {
    const isBorderline = result.recommendation === 'borderline';

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col py-6 px-4">
        <div className="max-w-lg mx-auto w-full space-y-5">
          {/* Top Recommendation Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-3xl p-6 sm:p-7 text-center border relative overflow-hidden bg-white shadow-sm ${
              isBorderline
                ? 'border-purple-200 shadow-purple-100'
                : result.recommendation === 'programming'
                ? 'border-blue-200 shadow-blue-100'
                : 'border-amber-200 shadow-amber-100'
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 bg-slate-100 text-slate-700">
              {matchedTrack.badge}
            </div>

            <div className="text-5xl mb-2">{matchedTrack.emoji}</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {matchedTrack.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
              {matchedTrack.tagline}
            </p>

            {/* If borderline, show specific guidance message from PDF */}
            {isBorderline && (
              <div className="mt-4 p-3.5 bg-purple-50 border border-purple-100 rounded-2xl text-left text-xs text-purple-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Dual-Talent / Hybrid Match:</span> Your Code and Creative scores are within {Math.abs(result.gap)} point(s) of each other. Rather than forcing you into a single silo, SkillFit recommends chatting with a facilitator to help you explore the Full-Stack Dual Track!
                </div>
              </div>
            )}
          </motion.div>

          {/* Gentle Note if Disagrees with Intro */}
          {result.disagreesWithIntro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3"
            >
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">Notice on Your Initial Choice:</p>
                <p className="mt-0.5 leading-relaxed">
                  You initially indicated you were leaning toward the{' '}
                  <span className="font-bold">
                    {result.introLeaning === 'programming' ? 'Programming Track' : 'Creative Track'}
                  </span>
                  , but your assessment revealed stronger objective aptitude for the{' '}
                  <span className="font-bold">{matchedTrack.name}</span>. We never switch your track automatically — let's have a chat with a facilitator to review your results together!
                </p>
              </div>
            </motion.div>
          )}

          {/* Score Breakdown Cards */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                20-Question Score Breakdown (Out of {result.codeMax})
              </h3>
              <span className="text-xs font-bold text-slate-500">
                Gap: {Math.abs(result.gap)} pts
              </span>
            </div>

            {/* Code Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#2B5FFF]" />
                  Programming & Logic
                </span>
                <span className="text-[#2B5FFF] font-black">
                  {result.codeScore} / {result.codeMax} ({result.codePercent}%)
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.codePercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-[#2B5FFF] rounded-full"
                />
              </div>
            </div>

            {/* Creative Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#FF9640]" />
                  Creative & Visual Design
                </span>
                <span className="text-[#FF9640] font-black">
                  {result.creativeScore} / {result.creativeMax} ({result.creativePercent}%)
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.creativePercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-[#FF9640] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Why You Fit & What You'll Learn */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Why You Fit This Track
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {matchedTrack.whyYouFit}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Core Modules at Community Innovation Hub
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedTrack.modules.map((mod: string) => (
                  <div key={mod} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Career Opportunities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {matchedTrack.roles.map((role: string) => (
                  <span key={role} className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2B5FFF] text-[11px] font-bold">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={copySummary}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Summary Copied to Clipboard!' : 'Share / Copy Assessment Summary'}
            </button>

            {installPrompt && !isInstalled && (
              <button
                onClick={triggerInstall}
                className="w-full py-3 bg-[#2B5FFF] hover:bg-blue-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Download className="w-4 h-4" />
                Install SkillFit App on Device
              </button>
            )}

            <button
              onClick={restartAssessment}
              className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl text-xs border border-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake 20-Question Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SCREEN: QUIZ (20 Shuffled Questions)
  // ──────────────────────────────────────────────────────────────────────────
  const selectedAnswer = answers[currentQ.id];
  const isMulti = currentQ.multiSelect;
  const multiAnswers = (Array.isArray(selectedAnswer) ? selectedAnswer : []) as string[];
  const multiIsFull = multiAnswers.length === (currentQ.maxSelections || 2);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Top Navigation & Progress Bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100 px-4 py-3">
        <div className="max-w-lg mx-auto w-full flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Question {currentQIndex + 1} of {totalQuestions}
            </span>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1 max-w-[200px]">
              <motion.div
                className="h-full bg-[#2B5FFF] rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <span className="text-xs font-black text-slate-400 w-8 text-right">
            {Math.round(progressPercent)}%
          </span>
        </div>
      </header>

      {/* Main Question Container */}
      <main className="flex-1 flex flex-col justify-center px-4 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Category / Skill Badge */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${
                currentQ.trackTarget === 'code'
                  ? 'bg-blue-50 text-[#2B5FFF]'
                  : currentQ.trackTarget === 'creative'
                  ? 'bg-amber-50 text-[#FF9640]'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                {currentQ.trackTarget === 'code' ? <Terminal className="w-3 h-3" /> : currentQ.trackTarget === 'creative' ? <Palette className="w-3 h-3" /> : <Shuffle className="w-3 h-3" />}
                {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {currentQ.title}
              </h2>
              {currentQ.subtitle && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {currentQ.subtitle}
                </p>
              )}
            </div>

            {/* Image (For Visual Questions) */}
            {currentQ.image && (
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 sm:p-3 shadow-sm flex items-center justify-center">
                <img
                  src={currentQ.image}
                  alt={`Question visual`}
                  className="max-h-64 sm:max-h-72 w-auto object-contain rounded-xl"
                />
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-1">
              {currentQ.options.map((opt, idx) => {
                const optLetter = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = isMulti
                  ? multiAnswers.includes(opt.id)
                  : selectedAnswer === opt.id;

                return (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (isMulti) {
                        handleMultiChoiceToggle(opt.id);
                      } else {
                        handleSingleChoice(opt.id);
                      }
                    }}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 bg-white cursor-pointer ${
                      isSelected
                        ? 'border-[#2B5FFF] bg-blue-50/50 shadow-md shadow-blue-100 ring-2 ring-blue-500/10'
                        : 'border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#2B5FFF] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {optLetter}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {opt.label}
                      </p>
                      {opt.description && (
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {opt.description}
                        </p>
                      )}
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#2B5FFF] shrink-0 self-center" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Multi-select confirmation button for Q19 */}
            {isMulti && (
              <div className="pt-2">
                <button
                  disabled={!multiIsFull}
                  onClick={handleNextMulti}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    multiIsFull
                      ? 'bg-[#2B5FFF] text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Confirm 2 Choices & Next ({multiAnswers.length}/2)
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
