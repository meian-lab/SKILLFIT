import type { Scores } from '../types';
import { tracks } from '../data/tracks';
import type { Track } from '../types';

export function calculateScores(answers: Record<number, string>, questions: { id: number; options: { id: string; logicalDelta: number; creativeDelta: number; subScores: { systemicProblemSolving: number; visualSpatialIntuition: number; logicPatternRecognition: number; storytellingLayoutDesign: number } }[] }[]): Scores {
  let logical = 0;
  let creative = 0;
  const subScores = { systemicProblemSolving: 0, visualSpatialIntuition: 0, logicPatternRecognition: 0, storytellingLayoutDesign: 0 };

  for (const q of questions) {
    const answerId = answers[q.id];
    if (!answerId) continue;
    const opt = q.options.find(o => o.id === answerId);
    if (!opt) continue;
    logical += opt.logicalDelta;
    creative += opt.creativeDelta;
    subScores.systemicProblemSolving += opt.subScores.systemicProblemSolving;
    subScores.visualSpatialIntuition += opt.subScores.visualSpatialIntuition;
    subScores.logicPatternRecognition += opt.subScores.logicPatternRecognition;
    subScores.storytellingLayoutDesign += opt.subScores.storytellingLayoutDesign;
  }

  return { logical, creative, subScores };
}

export function getRecommendedTrack(scores: Scores): Track {
  const total = scores.logical + scores.creative;
  if (total === 0) return tracks.hybrid;

  const creativeRatio = scores.creative / total;
  const logicalRatio = scores.logical / total;

  if (creativeRatio >= 0.68) return tracks.creative;
  if (logicalRatio >= 0.68) return tracks.programming;
  return tracks.hybrid;
}

export function getMatchPercent(scores: Scores): { creative: number; logical: number } {
  const total = scores.logical + scores.creative;
  if (total === 0) return { creative: 50, logical: 50 };
  return {
    creative: Math.round((scores.creative / total) * 100),
    logical: Math.round((scores.logical / total) * 100),
  };
}

