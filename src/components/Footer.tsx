import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number }[]>([]);

  const handleRocketClick = () => {
    if (isLaunching) return;

    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 40 - 20,
    }));
    setParticles(newParticles);
    setIsLaunching(true);

    // Scroll to top after delay
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);

    // Reset after animation
    setTimeout(() => {
      setIsLaunching(false);
      setParticles([]);
    }, 1500);
  };

  return (
    <footer className="py-16 border-t border-border relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center">
                <span className="font-mono text-sm font-bold">E</span>
              </div>
              <span className="font-mono text-lg font-bold">E-WEEK 2026</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The premier entrepreneurship week at BITS Pilani.
              <br />
              February 9-15, 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About E-Week</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Register</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold mb-4">CONNECT</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>eweek@bits-pilani.ac.in</li>
              <li>Instagram | Twitter | LinkedIn</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © 2026 E-Week, BITS Pilani. All rights reserved.
          </p>

          {/* Rocket Easter Egg */}
          <div className="mt-6 md:mt-0 relative">
            <motion.button
              onClick={handleRocketClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10"
              aria-label="Launch rocket to scroll to top"
            >
              <motion.svg
                width="40"
                height="60"
                viewBox="0 0 40 60"
                fill="none"
                className="cursor-pointer"
                animate={isLaunching ? { y: -1000 } : { y: 0 }}
                transition={{ duration: 1, ease: 'easeIn' }}
              >
                {/* Rocket Body */}
                <path
                  d="M20 5 L30 25 L30 45 L25 50 L25 40 L20 45 L15 40 L15 50 L10 45 L10 25 Z"
                  className={`transition-colors duration-300 ${
                    isLaunching ? 'fill-primary' : 'fill-none'
                  }`}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {/* Window */}
                <circle
                  cx="20"
                  cy="25"
                  r="5"
                  className={`transition-colors duration-300 ${
                    isLaunching ? 'fill-primary-foreground' : 'fill-none'
                  }`}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {/* Fins */}
                <path d="M10 35 L5 45 L10 45" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M30 35 L35 45 L30 45" stroke="currentColor" strokeWidth="2" fill="none" />
              </motion.svg>
            </motion.button>

            {/* Particles */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ opacity: 1, y: 0, x: particle.x }}
                  animate={{ opacity: 0, y: 100 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
