import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useIOView } from 'react-intersection-observer';
import { stats, achievementCards } from '../../data/achievements';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface StatBigCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  index: number;
}

const StatBigCard: React.FC<StatBigCardProps> = ({ value, label, suffix, prefix, index }) => {
  const { ref, inView } = useIOView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className="relative text-center p-8 rounded-2xl overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: index % 2 === 0
            ? 'radial-gradient(circle at center, rgba(0,212,255,0.08), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(124,58,237,0.08), transparent 70%)',
        }}
      />
      <div
        className="text-5xl font-bold font-display mb-2"
        style={{ color: index % 2 === 0 ? '#00D4FF' : '#7C3AED' }}
      >
        {inView ? (
          <>
            {prefix}
            <CountUp end={value} duration={2.5} delay={index * 0.15} />
            {suffix}
          </>
        ) : (
          `${prefix || ''}0${suffix || ''}`
        )}
      </div>
      <div className="text-white/60 text-sm font-medium">{label}</div>
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">Milestones</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Achievements &amp; <span className="text-neon-blue">Impact</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <StatBigCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              prefix={stat.prefix}
              index={i}
            />
          ))}
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {achievementCards.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden cursor-default"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: `1px solid rgba(255,255,255,0.08)`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: `inset 0 0 40px ${achievement.color}15`,
                  border: `1px solid ${achievement.color}30`,
                }}
              />

              <div className="relative z-10">
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-medium"
                  style={{
                    color: achievement.color,
                    background: `${achievement.color}15`,
                    border: `1px solid ${achievement.color}30`,
                  }}
                >
                  {achievement.category}
                </span>
                <h3 className="mt-3 font-display font-bold text-white text-base group-hover:text-neon-blue transition-colors">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-white/50 text-sm leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
