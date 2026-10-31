import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    title: 'Your Space, Your Style',
    subtitle: 'Customizing your phone or desktop...',
    type: 'choice',
    options: [
      {
        id: '1a', label: 'Colors & Layouts', icon: '🎨',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '1b', label: 'Folders & Structure', icon: '🗂️',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '1c', label: 'Both — Style + Function', icon: '⚡',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 2,
    title: 'Opening a New App...',
    subtitle: 'What catches your eye first?',
    type: 'choice',
    options: [
      {
        id: '2a', label: 'The Design & Colors', icon: '✨',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '2b', label: 'How Fast It Loads', icon: '🚀',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '2c', label: 'How Design Meets Features', icon: '🔗',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 3,
    title: 'Building for CIH',
    subtitle: 'Which role excites you most?',
    type: 'choice',
    options: [
      {
        id: '3a', label: 'Backend Systems', icon: '⚙️',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '3b', label: 'Screen Design & UI', icon: '🖼️',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '3c', label: 'Design + Code Both', icon: '🏗️',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 4,
    title: 'Free Afternoon',
    subtitle: 'What would you work on?',
    type: 'choice',
    options: [
      {
        id: '4a', label: 'Graphics & Posters', icon: '🖌️',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '4b', label: 'Puzzles & Spreadsheets', icon: '🧩',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '4c', label: 'Build a Real Tool', icon: '🛠️',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 5,
    title: 'Project Complete!',
    subtitle: 'What praise means most to you?',
    type: 'choice',
    options: [
      {
        id: '5a', label: '"Runs fast with zero bugs"', icon: '💻',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '5b', label: '"Beautiful colors & layout"', icon: '💅',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '5c', label: '"Solves the problem perfectly"', icon: '🏆',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 6,
    title: 'Learning Something New',
    subtitle: 'How do you prefer to start?',
    type: 'choice',
    options: [
      {
        id: '6a', label: 'Visual examples first', icon: '👁️',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '6b', label: 'Step-by-step guides', icon: '📋',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '6c', label: 'Just build & experiment', icon: '🔬',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 7,
    title: 'Favourite Apps',
    subtitle: 'Which type do you use most?',
    type: 'choice',
    options: [
      {
        id: '7a', label: 'Canva, Figma, Instagram', icon: '🎭',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '7b', label: 'Spreadsheets, Code editors', icon: '📊',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '7c', label: 'Interactive dashboards', icon: '📱',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  {
    id: 8,
    title: 'Your Goal at CIH',
    subtitle: 'What do you want to master?',
    type: 'choice',
    options: [
      {
        id: '8a', label: 'UI/UX Design & Figma', icon: '🖱️',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '8b', label: 'Coding & App Engines', icon: '⌨️',
        logicalDelta: 25, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 5, logicPatternRecognition: 25, storytellingLayoutDesign: 5 },
      },
      {
        id: '8c', label: 'Full Product from Scratch', icon: '🚀',
        logicalDelta: 15, creativeDelta: 15,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 15, visualSpatialIntuition: 15, logicPatternRecognition: 15, storytellingLayoutDesign: 15 },
      },
    ],
  },
  // ── Visual Questions from PDF ──────────────────────────────────────────
  {
    id: 9,
    title: 'Pick the Best Button',
    subtitle: 'Which "Pay Now" button feels most trustworthy?',
    type: 'image-buttons',
    options: [
      {
        id: '9a', label: 'A', icon: 'blue',
        logicalDelta: 5, creativeDelta: 20,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 20, logicPatternRecognition: 5, storytellingLayoutDesign: 20 },
      },
      {
        id: '9b', label: 'B', icon: 'navy',
        logicalDelta: 20, creativeDelta: 5,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 20, visualSpatialIntuition: 5, logicPatternRecognition: 20, storytellingLayoutDesign: 5 },
      },
      {
        id: '9c', label: 'C', icon: 'gray',
        logicalDelta: 10, creativeDelta: 10,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 10, visualSpatialIntuition: 10, logicPatternRecognition: 10, storytellingLayoutDesign: 10 },
      },
      {
        id: '9d', label: 'D', icon: 'orange',
        logicalDelta: 0, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 0, visualSpatialIntuition: 25, logicPatternRecognition: 0, storytellingLayoutDesign: 25 },
      },
    ],
  },
  {
    id: 10,
    title: 'Best Payment Screen?',
    subtitle: 'Which layout is easier for users?',
    type: 'image-layouts',
    options: [
      {
        id: '10a', label: 'A', icon: 'hierarchy',
        logicalDelta: 5, creativeDelta: 25,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 25, logicPatternRecognition: 5, storytellingLayoutDesign: 25 },
      },
      {
        id: '10b', label: 'B', icon: 'equal',
        logicalDelta: 20, creativeDelta: 10,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 20, visualSpatialIntuition: 10, logicPatternRecognition: 20, storytellingLayoutDesign: 10 },
      },
    ],
  },
  {
    id: 11,
    title: 'Match the Pattern',
    subtitle: 'Which shape matches the original?',
    type: 'image-patterns',
    options: [
      {
        id: '11a', label: 'A', icon: 'wrong1',
        logicalDelta: 5, creativeDelta: 10,
        workStyle: 'Visual Communicator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 10, logicPatternRecognition: 5, storytellingLayoutDesign: 10 },
      },
      {
        id: '11b', label: 'B', icon: 'wrong2',
        logicalDelta: 5, creativeDelta: 5,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 5, logicPatternRecognition: 5, storytellingLayoutDesign: 5 },
      },
      {
        id: '11c', label: 'C', icon: 'correct',
        logicalDelta: 25, creativeDelta: 15,
        workStyle: 'Independent Builder',
        subScores: { systemicProblemSolving: 25, visualSpatialIntuition: 15, logicPatternRecognition: 25, storytellingLayoutDesign: 10 },
      },
      {
        id: '11d', label: 'D', icon: 'wrong3',
        logicalDelta: 5, creativeDelta: 5,
        workStyle: 'Balanced Innovator',
        subScores: { systemicProblemSolving: 5, visualSpatialIntuition: 5, logicPatternRecognition: 5, storytellingLayoutDesign: 5 },
      },
    ],
  },
];

