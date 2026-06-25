import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy-load below-fold sections for faster initial render
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loader display time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* Loading Screen */}
      <Loader isLoading={isLoading} />

      {/* Main App */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />

            <main>
              {/* Hero — eagerly loaded for fastest LCP */}
              <Hero />

              {/* Below-fold sections — lazy loaded */}
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Experience />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Projects />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Certifications />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Achievements />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
