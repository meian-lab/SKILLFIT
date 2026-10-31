export type TrackId = 'programming' | 'creative' | 'borderline';

export interface IntroOption {
  id: string;
  label: string;
  subtitle: string;
  iconName: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  trackTarget?: 'code' | 'creative';
}

export interface BaseQuestion {
  id: number;
  part: 'A' | 'B' | 'C' | 'D';
  partLabel: string;
  title: string;
  subtitle?: string;
  image?: string;
  testsSkill: string;
  multiSelect?: boolean;
  maxSelections?: number;
  options: QuestionOption[];
}

export interface Track {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  emoji: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  roles: string[];
  modules: string[];
  keyTools: string[];
  whyYouFit: string;
}

export interface AssessmentResult {
  codeScore: number;       // max 8
  creativeScore: number;   // max 8
  gap: number;
  recommendation: TrackId;
  introLeaning: string;
  disagreesWithIntro: boolean;
}
