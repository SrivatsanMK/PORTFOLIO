// ============================================================
// Global TypeScript Types for Srivatsan M.K. Portfolio
// ============================================================

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  primaryMetric?: string;
  features?: string[];
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  icon?: string;
  color?: string;
  description?: string;
}

export type SkillCategory = 'Programming' | 'AI/ML' | 'Frameworks' | 'Database' | 'Cloud' | 'Tools';

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  type: 'internship' | 'job' | 'freelance';
  description: string;
  achievements: Achievement[];
  tech: string[];
}

export interface Achievement {
  label: string;
  metric?: string;
  icon?: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  category: string;
  badge?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
