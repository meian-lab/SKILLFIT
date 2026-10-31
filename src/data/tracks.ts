import type { Track } from '../types';

export const tracks: Record<string, Track> = {
  creative: {
    id: 'creative',
    name: 'Creative Track',
    tagline: 'Graphics · UI/UX · Animation · AR/VR · Game Dev',
    emoji: '🎨',
    color: '#FF9640',
    bgColor: 'bg-amber-50',
    roles: ['Graphics Designer', 'UI/UX Designer', '2D Animator', 'AR/VR Developer', 'Game Developer'],
    modules: ['Graphics Design', 'UI/UX Design', '2D Animation', 'AR/VR Development', 'Game Development'],
  },
  programming: {
    id: 'programming',
    name: 'Programming Track',
    tagline: 'HTML/CSS · React · JavaScript · App Dev · Python',
    emoji: '💻',
    color: '#2B5FFF',
    bgColor: 'bg-blue-50',
    roles: ['Software Developer', 'Frontend Developer', 'Mobile App Developer', 'Python Engineer', 'Full-Stack Developer'],
    modules: ['Software Development', 'HTML/CSS', 'React/Tailwind', 'JavaScript', 'App Dev', 'Python'],
  },
  preteen: {
    id: 'preteen',
    name: 'Preteen Dev Track',
    tagline: 'Coding Basics · Robotics · Graphics · Animation',
    emoji: '🤖',
    color: '#10b981',
    bgColor: 'bg-emerald-50',
    roles: ['Junior Coder', 'Robotics Explorer', 'Young Animator', 'Junior Designer'],
    modules: ['Coding', 'Programming Basics', 'Robotics for Kids', 'Graphics Design', 'Animation'],
  },
  hybrid: {
    id: 'hybrid',
    name: 'Full-Stack Dual Track',
    tagline: 'Software Dev · UI/UX · React · Graphics · Python',
    emoji: '🚀',
    color: '#6366f1',
    bgColor: 'bg-indigo-50',
    roles: ['Full-Stack Developer', 'UI/UX Engineer', 'Product Designer & Developer', 'Frontend Engineer'],
    modules: ['Software Development', 'UI/UX Design', 'React/Tailwind', 'JavaScript', 'Python'],
  },
};
