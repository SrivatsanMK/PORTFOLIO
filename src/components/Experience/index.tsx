import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiBriefcase, HiCheckCircle } from 'react-icons/hi';
import { experiences } from '../../data/experience';

const Experience: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      {/* Accent */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">My Journey</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Work <span className="text-neon-blue">Experience</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent md:-translate-x-px" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative flex md:items-center mb-12 md:mb-16"
            >
              {/* Timeline node */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-neon-blue border-2 border-background shadow-neon-blue z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>

              {/* Card — Right side (or full on mobile) */}
              <div className="ml-14 md:ml-0 md:w-1/2 md:pl-12">
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.4)' }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 shadow-card"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <HiBriefcase className="text-neon-blue" size={16} />
                        <span className="text-xs text-neon-blue font-mono font-medium uppercase tracking-wider">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-white text-xl">{exp.role}</h3>
                      <p className="text-neon-blue font-semibold mt-0.5">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{exp.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <h4 className="text-white/40 text-xs font-mono uppercase tracking-wider mb-3">Key Achievements</h4>
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: idx * 0.2 + i * 0.08 + 0.4 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-neon-blue/5 border border-neon-blue/10 hover:border-neon-blue/30 transition-all group"
                      >
                        <span className="text-lg leading-none mt-0.5">{achievement.icon}</span>
                        <div>
                          <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                            {achievement.label}
                          </p>
                          {achievement.metric && (
                            <p className="text-neon-blue text-xs font-mono font-medium mt-0.5">
                              {achievement.metric}
                            </p>
                          )}
                        </div>
                        <HiCheckCircle className="text-neon-blue/50 ml-auto flex-shrink-0 mt-0.5 group-hover:text-neon-blue transition-colors" size={16} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50 text-xs font-mono hover:text-white hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Future / Open to Work node */}
          <div className="relative flex md:items-center">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-2 border-neon-purple bg-background animate-pulse z-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="ml-14 md:ml-0 md:w-1/2 md:pl-12"
            >
              <div className="px-4 py-2 rounded-lg border border-dashed border-neon-purple/40 text-neon-purple/70 text-sm font-mono inline-block">
                🎯 Next Chapter — Open to Opportunities
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
