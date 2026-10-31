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
  trackTarget: 'code' | 'creative' | 'both';
  category: string;
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
  codeScore: number;       // total points earned
  codeMax: number;         // maximum possible points
  creativeScore: number;   // total points earned
  creativeMax: number;     // maximum possible points
  codePercent: number;     // 0 - 100
  creativePercent: number; // 0 - 100
  gap: number;
  recommendation: TrackId;
  introLeaning: string;
  disagreesWithIntro: boolean;
}
