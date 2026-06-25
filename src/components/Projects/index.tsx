import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiTag } from 'react-icons/hi';
import { projects } from '../../data/projects';
import { Project } from '../../types';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const categoryColors: Record<string, string> = {
  'AI/ML': 'text-neon-blue border-neon-blue/30 bg-neon-blue/10',
  'Mobile': 'text-neon-purple border-neon-purple/30 bg-neon-purple/10',
  'Web': 'text-green-400 border-green-400/30 bg-green-400/10',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      variants={cardVariants}
      className="group font-sans"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-full rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-neon-blue/40 transition-all duration-300 shadow-card hover:shadow-neon-blue flex flex-col p-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top Header Row (Title and Category badge) */}
        <div className="flex items-start justify-between gap-4 mb-2.5">
          <h3 className="font-display font-bold text-white text-xl group-hover:text-neon-blue transition-colors leading-snug">
            {project.title}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border shrink-0 ${categoryColors[project.category] || 'text-white/50 border-white/10 bg-white/5'}`}
          >
            {project.category}
          </span>
        </div>

        {/* Primary Metric Badge */}
        {project.primaryMetric && (
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-mono font-semibold">
              {project.primaryMetric}
            </span>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-white/5 shrink-0 bg-surface">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-5 flex-grow">
            <h4 className="text-white/80 font-display font-semibold text-sm mb-2.5">Key Features:</h4>
            <ul className="space-y-2">
              {project.features.map((feat) => (
                <li key={feat} className="text-white/40 text-xs flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue/50 mt-1.5 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Header & Tags */}
        <div className="mb-6">
          <h4 className="text-white/80 font-display font-semibold text-sm mb-2.5">Technologies:</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-mono hover:text-white hover:border-white/20 transition-all cursor-default"
              >
                <HiTag size={10} className="text-neon-blue/70" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
            >
              <FiGithub size={15} />
              GitHub
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20 text-sm font-medium transition-all"
            >
              <FiExternalLink size={15} />
              Demo
            </motion.a>
          )}
        </div>

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(0,212,255,0.05)' }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">What I've Built</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Featured <span className="text-neon-blue">Projects</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            A collection of AI/ML projects demonstrating real-world applications of deep learning,
            computer vision, and automation.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/SrivatsanMK"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 font-medium text-sm transition-all"
          >
            <FiGithub size={18} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
