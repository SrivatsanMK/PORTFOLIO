import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { skills, skillCategories, skillSphereWords } from '../../data/skills';
import { SkillSphere } from '../../three/SkillSphere';
import { SkillCategory } from '../../types';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categoryColors: Record<SkillCategory, string> = {
  'Programming': '#3776AB',
  'AI/ML': '#00D4FF',
  'Frameworks': '#7C3AED',
  'Database': '#47A248',
  'Cloud': '#FF9900',
  'Tools': '#F05032',
};

const categoryBg: Record<SkillCategory, string> = {
  'Programming': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  'AI/ML': 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  'Frameworks': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  'Database': 'bg-green-500/10 border-green-500/30 text-green-400',
  'Cloud': 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  'Tools': 'bg-red-500/10 border-red-500/30 text-red-400',
};

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  description?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, description }) => {
  const [hovered, setHovered] = useState(false);


  return (
    <motion.div
      variants={itemVariants}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
      {/* Tooltip */}
      {hovered && description && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-0 right-0 px-3 py-2 rounded-lg bg-surface border border-white/10 text-xs text-white/70 z-20 shadow-card backdrop-blur-sm"
        >
          {description}
        </motion.div>
      )}
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const grouped = skillCategories.reduce((acc, cat) => {
    acc[cat] = filteredSkills.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  return (
    <section id="skills" className="py-24 bg-surface relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">What I Know</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Technical <span className="text-neon-blue">Skills</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
        </motion.div>

        {/* Main grid: Sphere + Skills */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Skill Sphere */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10">
              <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent" />
              <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} color="#00D4FF" intensity={2} />
                <pointLight position={[-10, -10, -10]} color="#7C3AED" intensity={1} />
                <Suspense fallback={null}>
                  <SkillSphere words={skillSphereWords} radius={4.5} />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={false}
                />
              </Canvas>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">
                ← Drag to rotate →
              </div>
            </div>
          </motion.div>

          {/* Skills List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                  activeCategory === 'All'
                    ? 'bg-neon-blue/20 border-neon-blue/50 text-neon-blue'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                All
              </button>
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                    activeCategory === cat
                      ? `${categoryBg[cat]}`
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill Bars by Category */}
            <div className="space-y-6 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin">
              {skillCategories.map((cat) => {
                const catSkills = grouped[cat];
                if (!catSkills || catSkills.length === 0) return null;
                return (
                  <motion.div key={cat} variants={containerVariants} initial="hidden" animate="visible">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium border ${categoryBg[cat]}`}>
                        {cat}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {catSkills.map((skill) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          color={skill.color || categoryColors[skill.category]}
                          description={skill.description}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
