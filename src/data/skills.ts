import { Skill, SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  'Programming',
  'AI/ML',
  'Frameworks',
  'Database',
  'Cloud',
  'Tools',
];

export const skills: Skill[] = [
  // Programming
  { name: 'Python', level: 92, category: 'Programming', color: '#3776AB', description: 'Primary language for AI/ML development, scripting, and automation' },
  { name: 'JavaScript', level: 78, category: 'Programming', color: '#F7DF1E', description: 'Web development and frontend interactivity' },
  { name: 'Java', level: 70, category: 'Programming', color: '#ED8B00', description: 'Object-oriented programming and enterprise applications' },
  { name: 'C', level: 65, category: 'Programming', color: '#A8B9CC', description: 'Systems programming and foundational algorithms' },

  // AI/ML
  { name: 'Machine Learning', level: 88, category: 'AI/ML', color: '#00D4FF', description: 'Supervised/unsupervised learning, model training and evaluation' },
  { name: 'Deep Learning', level: 84, category: 'AI/ML', color: '#7C3AED', description: 'Neural networks, CNNs, RNNs, and Transformers' },
  { name: 'Computer Vision', level: 90, category: 'AI/ML', color: '#00D4FF', description: 'Image classification, object detection, segmentation' },
  { name: 'YOLO', level: 88, category: 'AI/ML', color: '#FF6B6B', description: 'Real-time object detection with YOLOv5/v8' },
  { name: 'NLP', level: 75, category: 'AI/ML', color: '#4ECDC4', description: 'Text processing, sentiment analysis, language models' },

  // Frameworks
  { name: 'TensorFlow', level: 82, category: 'Frameworks', color: '#FF6F00', description: 'Deep learning model development and deployment' },
  { name: 'PyTorch', level: 79, category: 'Frameworks', color: '#EE4C2C', description: 'Research-oriented deep learning framework' },
  { name: 'Scikit-Learn', level: 87, category: 'Frameworks', color: '#F7931E', description: 'Classical ML algorithms and pipelines' },
  { name: 'Flask', level: 83, category: 'Frameworks', color: '#000000', description: 'Lightweight Python web framework for ML APIs' },
  { name: 'React', level: 72, category: 'Frameworks', color: '#61DAFB', description: 'Component-based UI development' },
  { name: 'Node.js', level: 65, category: 'Frameworks', color: '#339933', description: 'Server-side JavaScript runtime' },

  // Database
  { name: 'MySQL', level: 80, category: 'Database', color: '#4479A1', description: 'Relational database design and optimization' },
  { name: 'MongoDB', level: 72, category: 'Database', color: '#47A248', description: 'NoSQL document-based database' },

  // Cloud
  { name: 'AWS', level: 68, category: 'Cloud', color: '#FF9900', description: 'EC2, S3, Lambda, SageMaker for ML workloads' },
  { name: 'Firebase', level: 75, category: 'Cloud', color: '#FFCA28', description: 'Real-time database, auth, and hosting' },
  { name: 'Oracle Cloud', level: 60, category: 'Cloud', color: '#F80000', description: 'Cloud infrastructure and services' },

  // Tools
  { name: 'Git', level: 85, category: 'Tools', color: '#F05032', description: 'Version control and collaborative development' },
  { name: 'GitHub', level: 85, category: 'Tools', color: '#181717', description: 'Repository hosting and CI/CD workflows' },
  { name: 'Postman', level: 78, category: 'Tools', color: '#FF6C37', description: 'API testing and documentation' },
  { name: 'VS Code', level: 92, category: 'Tools', color: '#007ACC', description: 'Primary IDE for development' },
];

// For the 3D sphere — all skill names
export const skillSphereWords = skills.map((s) => s.name);
