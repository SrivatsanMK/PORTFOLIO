import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiShieldCheck, HiExternalLink, HiBadgeCheck } from 'react-icons/hi';
import { certifications } from '../../data/certifications';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Certifications: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">Verified</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Certifications <span className="text-neon-blue">&amp; Badges</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{ y: -8, borderColor: 'rgba(0,212,255,0.5)' }}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 shadow-card overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: idx % 2 === 0
                    ? 'radial-gradient(circle at top left, rgba(0,212,255,0.08), transparent 60%)'
                    : 'radial-gradient(circle at top left, rgba(124,58,237,0.08), transparent 60%)',
                }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                {/* Issuer Logo placeholder */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: idx % 2 === 0
                      ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))'
                      : 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))',
                    border: idx % 2 === 0 ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(124,58,237,0.3)',
                  }}
                >
                  <HiBadgeCheck
                    size={24}
                    className={idx % 2 === 0 ? 'text-neon-blue' : 'text-neon-purple'}
                  />
                </div>

                {/* Category badge */}
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${
                    idx % 2 === 0
                      ? 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue'
                      : 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple'
                  }`}
                >
                  {cert.category}
                </span>
              </div>

              {/* Title & Issuer */}
              <div className="relative z-10 mb-4">
                <h3 className="font-display font-bold text-white text-lg leading-snug mb-1 group-hover:text-neon-blue transition-colors">
                  {cert.title}
                </h3>
                <p className="text-white/50 text-sm font-mono">{cert.issuer}</p>
                <p className="text-white/30 text-xs mt-1">{cert.date}</p>
              </div>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="relative z-10 mb-4 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white/30 text-xs font-mono">Credential ID</p>
                  <p className="text-white/60 text-xs font-mono mt-0.5">{cert.credentialId}</p>
                </div>
              )}

              {/* Action */}
              {cert.verifyUrl && (
                <div className="relative z-10 flex items-center justify-end pt-4 border-t border-white/10">
                  <motion.a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-xs font-medium transition-all"
                  >
                    <HiExternalLink size={13} />
                    Verify
                  </motion.a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
