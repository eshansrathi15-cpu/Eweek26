import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';
const Footer = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [particles, setParticles] = useState<{
    id: number;
    x: number;
  }[]>([]);
  const handleRocketClick = () => {
    if (isLaunching) return;

    // Generate particles
    const newParticles = Array.from({
      length: 20
    }, (_, i) => ({
      id: i,
      x: Math.random() * 40 - 20
    }));
    setParticles(newParticles);
    setIsLaunching(true);

    // Scroll to top after delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 300);

    // Reset after animation
    setTimeout(() => {
      setIsLaunching(false);
      setParticles([]);
    }, 1500);
  };
  return <footer className="py-16 border-t border-border relative bg-background">
      {/* Film credits style border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-6">
        <Film className="w-6 h-6 text-muted-foreground" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* End Credits Style */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="text-center mb-12">
          <p className="text-xs font-mono text-muted-foreground tracking-widest mb-2">— THE END —</p>
          <p className="text-sm text-muted-foreground">No events were harmed in the making of this website.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Film className="w-6 h-6 text-primary" />
              <div>
                <span className="font-mono text-lg font-bold">E-WEEK 2026</span>
                <p className="text-muted-foreground tracking-widest font-sans text-xs">A CEL Production</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              The premier entrepreneurship week.
              <br />
              February 9-15, 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold mb-4 text-sm tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About E-Week</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Register</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold mb-4 text-sm tracking-wider">CONNECT</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>eweekpilani@gmail.com</li>
              <li className="flex gap-3">
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                
                
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-xs font-mono">
            © 2026 E-WEEK, BITS PILANI. ALL RIGHTS RESERVED.
          </p>

          {/* Rocket Easter Egg */}
          <div className="mt-6 md:mt-0 relative">
            <motion.button onClick={handleRocketClick} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} className="relative z-10 group" aria-label="Launch rocket to scroll to top">
              <motion.svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="cursor-pointer" animate={isLaunching ? {
              y: -1000
            } : {
              y: 0
            }} transition={{
              duration: 1,
              ease: 'easeIn'
            }}>
                {/* Rocket Body */}
                <path d="M20 5 L30 25 L30 45 L25 50 L25 40 L20 45 L15 40 L15 50 L10 45 L10 25 Z" className={`transition-colors duration-300 ${isLaunching ? 'fill-primary' : 'fill-none group-hover:fill-primary/20'}`} stroke="currentColor" strokeWidth="2" />
                {/* Window */}
                <circle cx="20" cy="25" r="5" className={`transition-colors duration-300 ${isLaunching ? 'fill-primary-foreground' : 'fill-none'}`} stroke="currentColor" strokeWidth="2" />
                {/* Fins */}
                <path d="M10 35 L5 45 L10 45" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M30 35 L35 45 L30 45" stroke="currentColor" strokeWidth="2" fill="none" />
              </motion.svg>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                LAUNCH
              </span>
            </motion.button>

            {/* Particles */}
            <AnimatePresence>
              {particles.map(particle => <motion.div key={particle.id} initial={{
              opacity: 1,
              y: 0,
              x: particle.x
            }} animate={{
              opacity: 0,
              y: 100
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.8
            }} className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full" />)}
            </AnimatePresence>
          </div>
        </div>

        {/* Credits roll style */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">DIRECTED & PRODUCED BY CEL • SCREENPLAY BY THE E-WEEK TEAM</p>
        </div>
      </div>
    </footer>;
};
export default Footer;