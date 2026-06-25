import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useIOView } from 'react-intersection-observer';
import { HiAcademicCap, HiCode, HiLightBulb, HiCursorClick } from 'react-icons/hi';
import { stats } from '../../data/achievements';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface StatCardProps {
  stat: (typeof stats)[0];
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const { ref, inView } = useIOView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-neon-blue/30 hover:bg-neon-blue/5 transition-all duration-300 group"
    >
      <div className="text-3xl font-bold font-display text-neon-blue mb-1 group-hover:text-white transition-colors">
        {inView ? (
          <>
            {stat.prefix}
            <CountUp end={stat.value} duration={2} delay={index * 0.2} />
            {stat.suffix}
          </>
        ) : (
          `${stat.prefix || ''}0${stat.suffix || ''}`
        )}
      </div>
      <div className="text-sm text-white/50">{stat.label}</div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(to right, #00D4FF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">Get to Know</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            About <span className="text-neon-blue">Me</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-start mb-16"
        >
          {/* Left — Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center">
                  <HiLightBulb className="text-neon-blue" size={20} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg">Who I Am</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                I'm <span className="text-white font-semibold">Srivatsan M.K.</span>, an AI & Machine Learning Developer with a strong foundation in Computer Vision, Deep Learning, and Full-Stack Development. I specialize in building intelligent applications that solve real-world problems using Machine Learning, Artificial Intelligence, and Automation technologies.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                During my academic and internship experience, I developed AI-powered systems including a Traffic Accident Detection platform achieving 93% detection accuracy and an automated Subject Allocation System that reduced manual scheduling efforts by 85%. I enjoy transforming complex data into practical solutions that improve efficiency, accuracy, and user experience.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                I am passionate about Computer Vision, Generative AI, Deep Learning, and scalable software development, continuously exploring emerging technologies to build impactful AI-driven products.
              </p>
            </div>

            {/* Career Objective */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center">
                  <HiCursorClick className="text-neon-purple" size={20} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg">Career Objective</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                To secure a challenging AI & Machine Learning Developer role where I can apply my expertise in Machine Learning, Computer Vision, Deep Learning, and Software Development to create innovative AI-powered solutions. I aim to contribute to forward-thinking teams while continuously expanding my technical skills and industry knowledge.
              </p>
            </div>
          </motion.div>

          {/* Right — Education & Timeline */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Education */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center">
                  <HiAcademicCap className="text-neon-blue" size={20} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg">Education</h3>
              </div>
              <div className="relative pl-6 space-y-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple to-neon-blue" />
                
                {/* Diploma in AI & ML */}
                <div className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-neon-purple border-2 border-background animate-pulse" />
                  <div className="mb-1">
                    <h4 className="text-white font-semibold">Diploma in Artificial Intelligence & Machine Learning</h4>
                    <p className="text-neon-purple text-sm font-mono">IPCS Global</p>
                    <p className="text-white/60 text-xs mt-0.5">Coimbatore, Tamil Nadu</p>
                    <p className="text-white/40 text-xs mt-1 font-mono">Duration: April 2025 – February 2026</p>
                  </div>
                </div>

                {/* Bachelor of Science */}
                <div className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-neon-blue border-2 border-background" />
                  <div className="mb-1">
                    <h4 className="text-white font-semibold">Bachelor of Science in Computer Technology</h4>
                    <p className="text-neon-blue text-sm font-mono">Sri Krishna Arts and Science College</p>
                    <p className="text-white/40 text-xs mt-1 font-mono">Graduated: 2025</p>
                  </div>
                  <div className="text-white/60 text-sm mt-3">
                    <span className="text-white/80 font-semibold block mb-1">Relevant Areas:</span>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 list-disc pl-4 font-sans">
                      <li>Artificial Intelligence</li>
                      <li>Machine Learning</li>
                      <li>Computer Vision</li>
                      <li>Deep Learning</li>
                      <li>Software Engineering</li>
                      <li>Database Management Systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center">
                  <HiCode className="text-neon-purple" size={20} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
                  'Computer Vision', 'Object Detection', 'Generative AI',
                  'Natural Language Processing', 'MLOps', 'Automation Systems',
                  'Web Development', 'Cloud Computing', 'AI Research',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-mono hover:bg-neon-blue/20 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;