import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated logo / brain icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            {/* Neural network SVG loader */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <motion.circle
                cx="40" cy="10" r="6"
                fill="#00D4FF"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.circle
                cx="10" cy="55" r="6"
                fill="#7C3AED"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle
                cx="70" cy="55" r="6"
                fill="#7C3AED"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
              <motion.circle
                cx="25" cy="35" r="4"
                fill="#00D4FF"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
              <motion.circle
                cx="55" cy="35" r="4"
                fill="#00D4FF"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              {/* Lines */}
              <motion.line x1="40" y1="16" x2="25" y2="31" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.5"
                animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.line x1="40" y1="16" x2="55" y2="31" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.5"
                animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
              <motion.line x1="25" y1="39" x2="10" y2="49" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5"
                animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
              <motion.line x1="25" y1="39" x2="70" y2="49" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5"
                animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
              <motion.line x1="55" y1="39" x2="70" y2="49" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5"
                animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
              <motion.line x1="55" y1="39" x2="10" y2="49" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5"
                animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
            </svg>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Srivatsan <span className="text-neon-blue">M.K.</span>
            </h1>
            <p className="text-sm text-white/50 font-mono tracking-widest">
              AI & ML DEVELOPER
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
