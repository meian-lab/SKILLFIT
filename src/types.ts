export interface SubScores {
  systemicProblemSolving: number;
  visualSpatialIntuition: number;
  logicPatternRecognition: number;
  storytellingLayoutDesign: number;
}

export interface Option {
  id: string;
  label: string;
  icon: string; // emoji or lucide icon name
  logicalDelta: number;
  creativeDelta: number;
  subScores: SubScores;
  workStyle: string;
}

export interface Question {
  id: number;
  title: string;      // short — shown as heading
  subtitle?: string;  // optional one-liner context
  type: 'choice' | 'image-buttons' | 'image-layouts' | 'image-patterns';
  options: Option[];
}

export interface Track {
  id: 'creative' | 'programming' | 'preteen' | 'hybrid';
  name: string;
  tagline: string;
  emoji: string;
  color: string;       // hex
  bgColor: string;     // tailwind class
  roles: string[];
  modules: string[];
}

export interface Scores {
  logical: number;
  creative: number;
  subScores: SubScores;
}
