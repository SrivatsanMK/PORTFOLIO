import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Web Developer Intern',
    company: 'Infidata Technologies',
    location: 'India',
    period: 'April 2024 – May 2024',
    startDate: 'April 2024',
    endDate: 'May 2024',
    type: 'internship',
    description:
      'Contributed to full-stack web development projects, focusing on automation tools that streamlined internal operations. Designed and implemented an automated subject allocation system that significantly reduced administrative overhead and improved dashboard performance.',
    achievements: [
      { label: 'Automated Subject Allocation System', metric: 'Eliminated manual scheduling', icon: '🤖' },
      { label: 'Reduced Administrative Workload', metric: '85% reduction', icon: '📉' },
      { label: 'Improved Dashboard Efficiency', metric: '40% improvement', icon: '⚡' },
      { label: 'Increased Application Performance', metric: '35% faster', icon: '🚀' },
      { label: 'Reduced Page Load Time', metric: '3.2s → 1.8s', icon: '⏱️' },
    ],
    tech: ['Python', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Flask'],
  },
];
