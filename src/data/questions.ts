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
  // ── Q1 (Code) ────────────────────────────────────────────────────────
  {
    id: 1,
    trackTarget: 'code',
    category: 'Algorithmic Thinking',
    title: 'Machine Execution Rule',
    subtitle: 'A machine follows these rules:\n“If the number is even, halve it. If it is odd, subtract 1. Stop when you reach 0.”\nYou start at 6. How many steps until it stops?',
    testsSkill: 'Following execution rules step by step (6 → 3 → 2 → 1 → 0)',
    options: [
      { id: '3', label: '3 steps' },
      { id: '4', label: '4 steps' },
      { id: '5', label: '5 steps' },
      { id: '6', label: '6 steps' },
    ],
  },

  // ── Q2 (Creative) ────────────────────────────────────────────────────
  {
    id: 2,
    trackTarget: 'creative',
    category: 'Color Psychology',
    title: 'App Atmosphere & Color Palette',
    subtitle: 'You are designing a meditation and sleep-aid mobile app. Which primary color palette best communicates calm, tranquility, and restfulness?',
    testsSkill: 'Color theory and emotional context in design',
    options: [
      { id: 'soft_blue', label: 'Soft muted blues, deep midnight indigos, and warm lavender' },
      { id: 'neon_yellow', label: 'Neon electric lime green and high-voltage yellow' },
      { id: 'stark_red', label: 'Aggressive crimson red and stark pitch black' },
      { id: 'bright_orange', label: 'Vibrant fluorescent orange and sharp bright cyan' },
    ],
  },

  // ── Q3 (Code) ────────────────────────────────────────────────────────
  {
    id: 3,
    trackTarget: 'code',
    category: 'Boolean Conditions',
    title: 'Event Entry Logic',
    subtitle: '“To enter an event you need a ticket, AND you must also be over 18 OR be accompanied by a parent.” Who gets in?',
    testsSkill: 'Evaluating boolean expressions (AND / OR logic)',
    options: [
      { id: 'ade', label: 'Ade: no ticket, age 25' },
      { id: 'bola', label: 'Bola: has ticket, age 15, alone' },
      { id: 'chi', label: 'Chi: has ticket, age 15, with a parent' },
      { id: 'dayo', label: 'Dayo: no ticket, age 12, with a parent' },
    ],
  },

  // ── Q4 (Creative - Visual Image) ─────────────────────────────────────
  {
    id: 4,
    trackTarget: 'creative',
    category: 'Visual Contrast & Readability',
    title: 'Which button would be hardest for most people to read?',
    subtitle: 'Look closely at the image above comparing the 4 buttons. Which one has poor contrast that harms readability?',
    image: '/images/q4_buttons.png',
    testsSkill: 'Visual contrast sensitivity & accessibility standards',
    options: [
      { id: 'btn_a', label: 'Button A (Royal Blue with crisp White text)' },
      { id: 'btn_b', label: 'Button B (Deep Navy with crisp White text)' },
      { id: 'btn_c', label: 'Button C (Light Gray with Pale Gray text)' },
      { id: 'btn_d', label: 'Button D (Warm Orange with Navy text)' },
    ],
  },

  // ── Q5 (Code) ────────────────────────────────────────────────────────
  {
    id: 5,
    trackTarget: 'code',
    category: 'Bug Detection & Edge Cases',
    title: 'School App Pass Rule Error',
    subtitle: 'A school app has the rule: “A score of 50 or more passes.” A student with exactly 50 failed, but a student with 51 passed. What is the most likely mistake?',
    testsSkill: 'Detecting boundary and off-by-one errors from system evidence',
    options: [
      { id: 'wrong_op', label: 'The app checks “more than 50” instead of “50 or more”' },
      { id: 'less_than', label: 'The app checks “less than 50”' },
      { id: 'two_digits', label: 'The app cannot read two-digit numbers' },
      { id: 'typed_wrong', label: 'The student’s score was typed in wrongly' },
    ],
  },

  // ── Q6 (Creative - Visual Image) ─────────────────────────────────────
  {
    id: 6,
    trackTarget: 'creative',
    category: 'Spatial Mental Rotation',
    title: 'Which option is the same shape, just turned around?',
    subtitle: 'Look at the Original shape at the top. Find the one that is rotated around (not flipped like a mirror).',
    image: '/images/q5_blocks.png',
    testsSkill: '2D/3D spatial reasoning for game dev, layouts & 3D art',
    options: [
      { id: 'pattern_a', label: 'Option A' },
      { id: 'pattern_b', label: 'Option B' },
      { id: 'pattern_c', label: 'Option C' },
      { id: 'pattern_d', label: 'Option D' },
    ],
  },

  // ── Q7 (Code) ────────────────────────────────────────────────────────
  {
    id: 7,
    trackTarget: 'code',
    category: 'Loops & Accumulators',
    title: 'Loop Multiplication',
    subtitle: 'A program runs a loop 3 times. A number starts at 1, and on each round it doubles (multiplies by 2). What is the number after 3 rounds?',
    testsSkill: 'Tracking loop iterations and exponential growth',
    options: [
      { id: '6', label: '6' },
      { id: '8', label: '8 (1 → 2 → 4 → 8)' },
      { id: '12', label: '12' },
      { id: '16', label: '16' },
    ],
  },

  // ── Q8 (Creative - Visual Image) ─────────────────────────────────────
  {
    id: 8,
    trackTarget: 'creative',
    category: 'Visual Hierarchy & UI Clarity',
    title: 'Which screen makes it clearer what to do next?',
    subtitle: 'Both mobile screens contain the exact same payment information. Which screen provides clearer direction?',
    image: '/images/q6_screens.png',
    testsSkill: 'Visual hierarchy, CTA emphasis, and information architecture',
    options: [
      { id: 'screen_a', label: 'Screen A (Clear heading, prominent price, single solid primary button)' },
      { id: 'screen_b', label: 'Screen B (Three identical outline buttons with uniform visual weight)' },
    ],
  },

  // ── Q9 (Code) ────────────────────────────────────────────────────────
  {
    id: 9,
    trackTarget: 'code',
    category: 'Variable State Tracking',
    title: 'Variable Assignment in Sequence',
    subtitle: '“x is set to 5.\nThen y is set to x + 2.\nThen x is changed to 1.\nWhat is y now?”',
    testsSkill: 'Sequential variable assignment and memory state',
    options: [
      { id: '3', label: '3' },
      { id: '7', label: '7 (y was computed before x changed)' },
      { id: '5', label: '5' },
      { id: '1', label: '1' },
      { id: 'unsure_code', label: 'I haven’t seen this before' },
    ],
  },

  // ── Q10 (Creative) ───────────────────────────────────────────────────
  {
    id: 10,
    trackTarget: 'creative',
    category: 'Design Vocabulary',
    title: 'Understanding Design Artifacts',
    subtitle: 'In user experience and digital product design, what is a “wireframe”?',
    testsSkill: 'Foundational UI/UX design workflow concepts',
    options: [
      { id: 'rough_sketch', label: 'A rough architectural sketch of a screen’s layout and structure' },
      { id: 'metal_frame', label: 'A metal skeletal frame used in 3D hardware manufacturing' },
      { id: 'final_version', label: 'The final pixel-perfect release version ready for app stores' },
      { id: 'animation_type', label: 'A specialized format for 3D character animation' },
      { id: 'unsure_creative', label: 'I haven’t seen this before' },
    ],
  },

  // ── Q11 (Code) ───────────────────────────────────────────────────────
  {
    id: 11,
    trackTarget: 'code',
    category: 'Algorithmic Search',
    title: 'Fast Search Strategy',
    subtitle: 'You need to find a person’s name in a printed directory of 1,000 pages sorted alphabetically. Which strategy is fastest?',
    testsSkill: 'Understanding binary search vs linear scanning efficiency',
    options: [
      { id: 'binary_split', label: 'Open to the middle, check if the name is before or after, and repeat with that half' },
      { id: 'linear_scan', label: 'Start from page 1 and read every single entry in order' },
      { id: 'random_flip', label: 'Flip to random pages repeatedly until you happen to find it' },
      { id: 'reverse_scan', label: 'Start from page 1,000 and read backward page by page' },
    ],
  },

  // ── Q12 (Creative) ───────────────────────────────────────────────────
  {
    id: 12,
    trackTarget: 'creative',
    category: 'Typography & Reading Comfort',
    title: 'Long-Form Mobile Typography',
    subtitle: 'When designing a mobile blog or news app with lengthy articles, which formatting makes reading most comfortable for users?',
    testsSkill: 'Typography, line height, scannability, and eye strain reduction',
    options: [
      { id: 'generous_spacing', label: 'Generous line spacing (leading), comfortable font size, and clear contrast' },
      { id: 'tight_small', label: 'Tiny compressed font packed tightly together to fit all text without scrolling' },
      { id: 'yellow_on_white', label: 'Light yellow text on a pure white background' },
      { id: 'all_caps', label: 'All-capital letters with zero paragraph breaks or margins' },
    ],
  },

  // ── Q13 (Code) ───────────────────────────────────────────────────────
  {
    id: 13,
    trackTarget: 'code',
    category: 'System Dependencies',
    title: 'Order Processing Dependency',
    subtitle: 'In an e-commerce or food delivery app, which step MUST succeed before the system can dispatch a rider to the vendor?',
    testsSkill: 'Preconditions, dependency trees, and sequential workflows',
    options: [
      { id: 'confirm_order', label: 'The customer’s payment and basket items are verified and confirmed' },
      { id: 'rate_driver', label: 'The customer rates the delivery driver 5 stars' },
      { id: 'print_tax', label: 'The accounting team prints an annual financial statement' },
      { id: 'delete_account', label: 'The user uninstalls the mobile app' },
    ],
  },

  // ── Q14 (Creative) ───────────────────────────────────────────────────
  {
    id: 14,
    trackTarget: 'creative',
    category: 'Accessible Interface Design',
    title: 'Color Blindness & Universal Cues',
    subtitle: 'Roughly 1 in 12 men has color vision deficiency (especially red-green). When designing a payment status alert, what is the best UX standard?',
    testsSkill: 'Inclusive design, accessibility (WCAG), and multi-modal feedback',
    options: [
      { id: 'icon_and_color', label: 'Pair colors with distinct icons (e.g. checkmark vs warning alert) and text labels' },
      { id: 'color_only', label: 'Rely solely on red and green circles with no icons or text' },
      { id: 'ignore_a11y', label: 'Ignore color accessibility because most users have standard vision' },
      { id: 'super_bright', label: 'Make the red and green shades as bright as neon lasers' },
    ],
  },

  // ── Q15 (Code) ───────────────────────────────────────────────────────
  {
    id: 15,
    trackTarget: 'code',
    category: 'Data Set Logic',
    title: 'Student Database Aggregation',
    subtitle: 'In a school database of 100 students: 60 are in Science and 40 are in Arts. 20 Science students play football, and 10 Arts students play football. How many total students play football?',
    testsSkill: 'Set theory, categorical filtering, and database queries',
    options: [
      { id: '20', label: '20' },
      { id: '30', label: '30 (20 + 10)' },
      { id: '70', label: '70' },
      { id: '90', label: '90' },
    ],
  },

  // ── Q16 (Creative) ───────────────────────────────────────────────────
  {
    id: 16,
    trackTarget: 'creative',
    category: 'Animation Principles',
    title: 'Character Physics & Animation',
    subtitle: 'In 2D character sprite animation and game design, what is the primary purpose of “squash and stretch”?',
    testsSkill: 'Foundational animation principles and natural movement',
    options: [
      { id: 'weight_momentum', label: 'Giving a character a sense of weight, impact, flexibility, and physical momentum' },
      { id: 'reduce_file', label: 'Compressing the graphic file size so the game downloads faster' },
      { id: 'erase_pixels', label: 'Erasing unwanted pixels from the background layer' },
      { id: '3d_mesh', label: 'Converting a 2D drawing directly into a 3D polygonal mesh' },
    ],
  },

  // ── Q17 (Code) ───────────────────────────────────────────────────────
  {
    id: 17,
    trackTarget: 'code',
    category: 'Comparison Operators',
    title: 'Discount Threshold Bug',
    subtitle: 'A store gives a discount on orders of $100 or higher. A customer spending exactly $100 did not receive the discount. What caused this bug?',
    testsSkill: 'Relational operator precision (> vs >=)',
    options: [
      { id: 'strictly_greater', label: 'The code checked “amount > 100” instead of “amount >= 100”' },
      { id: 'memory_leak', label: 'The computer ran out of memory while calculating percentages' },
      { id: 'odd_even', label: 'Discounts can only be calculated on odd dollar amounts' },
      { id: 'network_lag', label: 'The internet connection paused during checkout' },
    ],
  },

  // ── Q18 (Creative) ───────────────────────────────────────────────────
  {
    id: 18,
    trackTarget: 'creative',
    category: 'Cognitive Load & Composition',
    title: 'Reducing Homepage Friction',
    subtitle: 'A homepage has 14 different banners, popups, animated badges, and flashing tickers. Visitors quickly bounce without signing up. What is the best design fix?',
    testsSkill: 'Visual hierarchy, white space management, and cognitive load reduction',
    options: [
      { id: 'declutter_whitespace', label: 'Declutter the layout, introduce clean white space, and focus on one primary call-to-action' },
      { id: 'more_animations', label: 'Add 6 more animations to force visitors to look at every offer' },
      { id: 'flash_neon', label: 'Make all banners flash in rotating neon colors' },
      { id: 'auto_sound', label: 'Add loud auto-playing background music to capture attention' },
    ],
  },

  // ── Q19 (Both - Project Passion: Pick Top 2) ─────────────────────────
  {
    id: 19,
    trackTarget: 'both',
    category: 'Intrinsic Project Interest',
    title: 'Your Ideal Afternoon Build (Pick Top 2)',
    subtitle: 'You have three free hours to create whatever you want. Which TWO projects would you be most thrilled to build? (Select your top 2)',
    testsSkill: 'Real-world vocational passion',
    multiSelect: true,
    maxSelections: 2,
    options: [
      { id: 'game_character', label: 'Animate a 2D game character with smooth running and jumping movements', trackTarget: 'creative' },
      { id: 'calc_bug', label: 'Investigate and fix why an algorithm is producing incorrect financial totals', trackTarget: 'code' },
      { id: 'redesign_app', label: 'Redesign a community mobile app in Figma to look sleek, modern, and delightful', trackTarget: 'creative' },
      { id: 'quiz_engine', label: 'Build a backend quiz engine that scores submissions and generates automated reports', trackTarget: 'code' },
    ],
  },

  // ── Q20 (Both - Frustration Tolerance) ───────────────────────────────
  {
    id: 20,
    trackTarget: 'both',
    category: 'Frustration Resilience',
    title: 'Which Friction Would You Rather Endure?',
    subtitle: 'Both challenges take two hours. Which type of obstacle would you feel more determined and energized to solve?',
    testsSkill: 'Resilience against domain-specific debugging vs design iterations',
    options: [
      {
        id: 'bug_hunt',
        label: 'Hunting down one elusive typo or logic flaw in 500 lines of code that breaks the entire app',
        description: 'Demands patience, step-by-step trace logs, and stubborn analytical stamina.',
        trackTarget: 'code',
      },
      {
        id: 'design_tweak',
        label: 'Iterating through 10 variations of a screen layout that still doesn’t feel right, with conflicting feedback from users',
        description: 'Demands visual empathy, creative persistence, and intuitive refinement.',
        trackTarget: 'creative',
      },
    ],
  },
];

export const ANSWER_KEYS: Record<number, string> = {
  1: '4',                     // Q1 Code +1
  2: 'soft_blue',             // Q2 Creative +1
  3: 'chi',                   // Q3 Code +1
  4: 'btn_c',                 // Q4 Creative +1
  5: 'wrong_op',              // Q5 Code +1
  6: 'pattern_b',             // Q6 Creative +1
  7: '8',                     // Q7 Code +1
  8: 'screen_a',              // Q8 Creative +1
  9: '7',                     // Q9 Code +1
  10: 'rough_sketch',         // Q10 Creative +1
  11: 'binary_split',         // Q11 Code +1
  12: 'generous_spacing',     // Q12 Creative +1
  13: 'confirm_order',        // Q13 Code +1
  14: 'icon_and_color',       // Q14 Creative +1
  15: '30',                   // Q15 Code +1
  16: 'weight_momentum',      // Q16 Creative +1
  17: 'strictly_greater',     // Q17 Code +1
  18: 'declutter_whitespace', // Q18 Creative +1
};
