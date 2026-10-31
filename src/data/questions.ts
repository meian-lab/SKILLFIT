import type { BaseQuestion, IntroOption } from '../types';

export const introOptions: IntroOption[] = [
  {
    id: 'programming',
    label: 'Programming & Software Track',
    subtitle: 'Building web apps, writing code, backend logic & problem solving',
    iconName: 'Terminal',
  },
  {
    id: 'creative',
    label: 'Creative & Design Track',
    subtitle: 'UI/UX interface design, branding, 2D animation, AR/VR & games',
    iconName: 'Palette',
  },
  {
    id: 'not_sure',
    label: 'Not sure yet / Open to both',
    subtitle: 'I want to see what naturally fits my strengths best',
    iconName: 'HelpCircle',
  },
];

export const questions: BaseQuestion[] = [
  // ── Part A: Reasoning (scores Code) ──────────────────────────────────
  {
    id: 1,
    part: 'A',
    partLabel: 'Part A · Logic & Algorithmic Reasoning',
    title: 'A machine follows these rules:',
    subtitle: '“If the number is even, halve it. If it is odd, subtract 1. Stop when you reach 0.”\nYou start at 6. How many steps until it stops?',
    testsSkill: 'Following execution rules step by step',
    options: [
      { id: '3', label: '3 steps' },
      { id: '4', label: '4 steps' },
      { id: '5', label: '5 steps' },
      { id: '6', label: '6 steps' },
    ],
  },
  {
    id: 2,
    part: 'A',
    partLabel: 'Part A · Logic & Conditions',
    title: 'Event Entry Conditions',
    subtitle: '“To enter an event you need a ticket, AND you must also be over 18 OR be with a parent.” Who gets in?',
    testsSkill: 'Evaluating boolean conditions (AND / OR logic)',
    options: [
      { id: 'ade', label: 'Ade: no ticket, age 25' },
      { id: 'bola', label: 'Bola: has ticket, age 15, alone' },
      { id: 'chi', label: 'Chi: has ticket, age 15, with a parent' },
      { id: 'dayo', label: 'Dayo: no ticket, age 12, with a parent' },
    ],
  },
  {
    id: 3,
    part: 'A',
    partLabel: 'Part A · Edge Cases & Bug Hunting',
    title: 'School App Pass Rule',
    subtitle: 'A school app has the rule: “A score of 50 or more passes.” A student with exactly 50 failed, but a student with 51 passed. What is the most likely mistake?',
    testsSkill: 'Detecting boundary and edge-case errors from evidence',
    options: [
      { id: 'wrong_op', label: 'The app checks “more than 50” instead of “50 or more”' },
      { id: 'less_than', label: 'The app checks “less than 50”' },
      { id: 'two_digits', label: 'The app can’t read two-digit numbers' },
      { id: 'typed_wrong', label: 'The student’s score was typed in wrongly' },
    ],
  },

  // ── Part B: Visual Reasoning (scores Creative) ────────────────────────
  {
    id: 4,
    part: 'B',
    partLabel: 'Part B · Visual Contrast & Accessibility',
    title: 'Which button would be hardest for most people to read?',
    subtitle: 'Look closely at the contrast between the button background and the “Pay now” text.',
    image: '/images/q4_buttons.png',
    testsSkill: 'Visual contrast sensitivity & accessibility awareness',
    options: [
      { id: 'btn_a', label: 'Button A (Royal Blue with White text)' },
      { id: 'btn_b', label: 'Button B (Deep Navy with White text)' },
      { id: 'btn_c', label: 'Button C (Light Gray with Pale Gray text)' },
      { id: 'btn_d', label: 'Button D (Warm Orange with Navy text)' },
    ],
  },
  {
    id: 5,
    part: 'B',
    partLabel: 'Part B · Spatial Reasoning & Rotation',
    title: 'Which option is the same shape, just turned around?',
    subtitle: 'Look at the Original shape at the top. Find the one that is rotated around (not flipped like a mirror).',
    image: '/images/q5_blocks.png',
    testsSkill: '2D/3D spatial mental rotation',
    options: [
      { id: 'pattern_a', label: 'Option A' },
      { id: 'pattern_b', label: 'Option B' },
      { id: 'pattern_c', label: 'Option C' },
      { id: 'pattern_d', label: 'Option D' },
    ],
  },
  {
    id: 6,
    part: 'B',
    partLabel: 'Part B · Visual Hierarchy & UX',
    title: 'Which screen makes it clearer what to do next?',
    subtitle: 'Both mobile screens contain the exact same payment information.',
    image: '/images/q6_screens.png',
    testsSkill: 'Visual hierarchy, CTA emphasis, and information design',
    options: [
      { id: 'screen_a', label: 'Screen A (Clear heading, focal price, single prominent action button)' },
      { id: 'screen_b', label: 'Screen B (Three identical outline buttons with uniform visual weight)' },
    ],
  },

  // ── Part C: Knowledge (1 pt Code, 1 pt Creative) ──────────────────────
  {
    id: 7,
    part: 'C',
    partLabel: 'Part C · Computational Knowledge (Code)',
    title: 'Variable Assignment in Sequence',
    subtitle: '“x is set to 5.\nThen y is set to x + 2.\nThen x is changed to 1.\nWhat is y now?”',
    testsSkill: 'Understanding sequential variable states & memory',
    options: [
      { id: '3', label: '3' },
      { id: '7', label: '7' },
      { id: '5', label: '5' },
      { id: '1', label: '1' },
      { id: 'unsure', label: 'I haven’t seen this before' },
    ],
  },
  {
    id: 8,
    part: 'C',
    partLabel: 'Part C · Design Knowledge (Creative)',
    title: 'In design and product development, what is a “wireframe”?',
    subtitle: 'Select the definition that accurately describes a wireframe.',
    testsSkill: 'Familiarity with foundational product design vocabulary',
    options: [
      { id: 'rough_sketch', label: 'A rough sketch of a screen’s layout' },
      { id: 'metal_frame', label: 'A metal frame used in 3D printing' },
      { id: 'final_version', label: 'The final polished version of a design' },
      { id: 'animation_type', label: 'A type of character animation' },
      { id: 'unsure', label: 'I haven’t seen this before' },
    ],
  },

  // ── Part D: Fit (Preferences & Frustration Tolerance) ──────────────────
  {
    id: 9,
    part: 'D',
    partLabel: 'Part D · Intrinsic Interest (Pick Exactly 2)',
    title: 'You have three uninterrupted free hours.',
    subtitle: 'Which two projects would you genuinely enjoy tackling the most? (Select your top 2)',
    testsSkill: 'Intrinsic work passion',
    multiSelect: true,
    maxSelections: 2,
    options: [
      { id: 'game_character', label: 'Make a game character walk and animate smoothly', trackTarget: 'creative' },
      { id: 'calc_bug', label: 'Find out why a calculator app gives wrong answers', trackTarget: 'code' },
      { id: 'redesign_app', label: 'Redesign a school app so it looks modern and beautiful', trackTarget: 'creative' },
      { id: 'quiz_engine', label: 'Build a quiz engine that scores people automatically', trackTarget: 'code' },
    ],
  },
  {
    id: 10,
    part: 'D',
    partLabel: 'Part D · Frustration Tolerance & Mindset',
    title: 'Which would you rather live with?',
    subtitle: 'Both challenges take two hours. Which type of friction would you rather work through?',
    testsSkill: 'Resilience against domain-specific obstacles',
    options: [
      {
        id: 'bug_hunt',
        label: 'Two hours hunting one tiny mistake in the logic that breaks everything',
        description: 'Demands patience, step-by-step tracing, and stubborn analytical grit.',
        trackTarget: 'code',
      },
      {
        id: 'design_tweak',
        label: 'Two hours tweaking something that still doesn’t look right, with nobody agreeing whether it’s good',
        description: 'Demands aesthetic persistence, empathy, and dealing with subjective feedback.',
        trackTarget: 'creative',
      },
    ],
  },
];

export const ANSWER_KEYS: Record<number, string> = {
  1: '4',              // Q1 Code +1
  2: 'chi',            // Q2 Code +1
  3: 'wrong_op',       // Q3 Code +1
  4: 'btn_c',          // Q4 Creative +1
  5: 'pattern_b',      // Q5 Creative +1 (rotated)
  6: 'screen_a',       // Q6 Creative +1
  7: '7',              // Q7 Code +1
  8: 'rough_sketch',   // Q8 Creative +1
};
