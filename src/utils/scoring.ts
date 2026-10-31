import type { AssessmentResult, TrackId } from '../types';
import { ANSWER_KEYS } from '../data/questions';

export function calculateAssessment(
  answers: Record<number, string | string[]>,
  introLeaning: string
): AssessmentResult {
  let codeScore = 0;
  let creativeScore = 0;

  // Q1 - Q3 (Code reasoning, 1pt each)
  if (answers[1] === ANSWER_KEYS[1]) codeScore += 1;
  if (answers[2] === ANSWER_KEYS[2]) codeScore += 1;
  if (answers[3] === ANSWER_KEYS[3]) codeScore += 1;

  // Q4 - Q6 (Creative visual reasoning, 1pt each)
  if (answers[4] === ANSWER_KEYS[4]) creativeScore += 1;
  if (answers[5] === ANSWER_KEYS[5]) creativeScore += 1;
  if (answers[6] === ANSWER_KEYS[6]) creativeScore += 1;

  // Q7 (Code knowledge, 1pt)
  if (answers[7] === ANSWER_KEYS[7]) codeScore += 1;

  // Q8 (Creative knowledge, 1pt)
  if (answers[8] === ANSWER_KEYS[8]) creativeScore += 1;

  // Q9 (Fit project preferences: 1pt per pick, up to 2)
  const q9Answers = (Array.isArray(answers[9]) ? answers[9] : []) as string[];
  for (const choice of q9Answers) {
    if (choice === 'calc_bug' || choice === 'quiz_engine') {
      codeScore += 1;
    } else if (choice === 'game_character' || choice === 'redesign_app') {
      creativeScore += 1;
    }
  }

  // Q10 (Fit frustration tolerance: 2pts to selected side)
  if (answers[10] === 'bug_hunt') {
    codeScore += 2;
  } else if (answers[10] === 'design_tweak') {
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

  // Check disagreement with initial leaning
  const disagreesWithIntro =
    (introLeaning === 'programming' && recommendation === 'creative') ||
    (introLeaning === 'creative' && recommendation === 'programming');

  return {
    codeScore,
    creativeScore,
    gap,
    recommendation,
    introLeaning,
    disagreesWithIntro,
  };
}
