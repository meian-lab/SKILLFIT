import type { AssessmentResult, TrackId } from '../types';
import { ANSWER_KEYS } from '../data/questions';

export function calculateAssessment(
  answers: Record<number, string | string[]>,
  introLeaning: string
): AssessmentResult {
  let codeScore = 0;
  let creativeScore = 0;
  const maxPossible = 13; // 9 direct reasoning/knowledge + 2 project fit + 2 frustration resilience

  // Code objective reasoning & knowledge (Q1, 3, 5, 7, 9, 11, 13, 15, 17)
  [1, 3, 5, 7, 9, 11, 13, 15, 17].forEach((qId) => {
    if (answers[qId] === ANSWER_KEYS[qId]) {
      codeScore += 1;
    }
  });

  // Creative objective visual & design knowledge (Q2, 4, 6, 8, 10, 12, 14, 16, 18)
  [2, 4, 6, 8, 10, 12, 14, 16, 18].forEach((qId) => {
    if (answers[qId] === ANSWER_KEYS[qId]) {
      creativeScore += 1;
    }
  });

  // Q19 (Fit project preferences: 1pt per pick, up to 2)
  const q19Answers = (Array.isArray(answers[19]) ? answers[19] : []) as string[];
  for (const choice of q19Answers) {
    if (choice === 'calc_bug' || choice === 'quiz_engine') {
      codeScore += 1;
    } else if (choice === 'game_character' || choice === 'redesign_app') {
      creativeScore += 1;
    }
  }

  // Q20 (Frustration tolerance: 2pts to selected side)
  if (answers[20] === 'bug_hunt') {
    codeScore += 2;
  } else if (answers[20] === 'design_tweak') {
    creativeScore += 2;
  }

  const gap = codeScore - creativeScore;

  let recommendation: TrackId = 'borderline';
  if (gap >= 3) {
    recommendation = 'programming';
  } else if (gap <= -3) {
    recommendation = 'creative';
  } else {
    recommendation = 'borderline';
  }

  const disagreesWithIntro =
    (introLeaning === 'programming' && recommendation === 'creative') ||
    (introLeaning === 'creative' && recommendation === 'programming');

  const codePercent = Math.round((codeScore / maxPossible) * 100);
  const creativePercent = Math.round((creativeScore / maxPossible) * 100);

  return {
    codeScore,
    codeMax: maxPossible,
    creativeScore,
    creativeMax: maxPossible,
    codePercent,
    creativePercent,
    gap,
    recommendation,
    introLeaning,
    disagreesWithIntro,
  };
}
