import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiDownload, HiMail } from 'react-icons/hi';
import { FiArrowDown } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';

const Scene = lazy(() => import('../../three/Scene').then((m) => ({ default: m.Scene })));
const HologramCore = lazy(() => import('../../three/HologramCore').then((m) => ({ default: m.HologramCore })));

const Hero: React.FC = () => {
  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene type="hero" />
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-[#1a0533]/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left — Text */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span className="text-neon-blue text-sm font-mono font-medium tracking-wider">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-2">
                <span className="text-white">Srivatsan</span>
                <br />
                <span className="bg-gradient-to-r from-neon-blue via-cyan-300 to-neon-purple bg-clip-text text-transparent">
                  M.K.
                </span>
              </h1>
            </motion.div>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 mb-6 h-10 flex items-center"
            >
              <span className="text-white/60 text-xl font-mono mr-2">{'>'}</span>
              <TypeAnimation
                sequence={[
                  'Machine Learning Engineer', 2000,
                  'AI Developer', 2000,
                  'Computer Vision Enthusiast', 2000,
                  'Python Developer', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-neon-blue text-xl font-mono font-medium"
              />
              <span className="ml-1 text-neon-blue animate-pulse">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 text-lg leading-relaxed max-w-xl mb-8"
            >
              Building intelligent systems that solve real-world problems.
              Specialized in Computer Vision, Deep Learning, and AI-powered automation.
              Graduate of Sri Krishna Arts and Science College, Class of 2025.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="https://drive.google.com/file/d/19jgNtVQx4z21XWBLALjHkhMMBbNASn66/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-cyan-400 text-background font-bold text-sm shadow-neon-blue transition-all duration-300"
              >
                <HiDownload size={18} />
                Download Resume
              </motion.a>

              <motion.button
                onClick={handleContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neon-purple/50 bg-neon-purple/10 text-white font-semibold text-sm hover:border-neon-purple hover:bg-neon-purple/20 transition-all duration-300"
              >
                <HiMail size={18} />
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-8"
            >
              {[
                { value: '12+', label: 'Projects' },
                { value: '24+', label: 'Technologies' },
                { value: '93%', label: 'Best Accuracy' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold font-display text-neon-blue">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Interactive 3D AI Hologram Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              {/* Glow background */}
              <div className="absolute inset-0 rounded-full bg-neon-blue/10 blur-3xl scale-110 pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-neon-purple/5 blur-2xl scale-125 pointer-events-none" />

              {/* 3D Canvas for HologramCore */}
              <div className="absolute inset-0 w-full h-full z-10">
                <Canvas camera={{ position: [0, 0, 8.2], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D4FF" />
                  <Suspense fallback={null}>
                    <HologramCore />
                  </Suspense>
                </Canvas>
              </div>

              {/* Floating tech badges */}
              {[
                { label: 'Python', pos: 'top-12 left-10', color: 'border-[#3776AB]' },
                { label: 'YOLO', pos: 'top-12 right-10', color: 'border-neon-blue' },
                { label: 'TensorFlow', pos: 'bottom-12 left-8', color: 'border-[#FF6F00]' },
                { label: 'PyTorch', pos: 'bottom-12 right-8', color: 'border-[#EE4C2C]' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                  className={`absolute ${badge.pos} px-3 py-1.5 rounded-lg bg-surface/85 backdrop-blur-sm border ${badge.color} text-white text-xs font-mono font-medium shadow-card z-20 hover:border-neon-blue/50 hover:bg-surface transition-colors cursor-default`}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-neon-blue transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
