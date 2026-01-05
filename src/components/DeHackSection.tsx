import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Terminal, Clock, Film, DollarSign, Rocket } from 'lucide-react';

const DeHackSection = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  // Create 8 smoke particles for the plume
  const smokeParticles = Array.from({ length: 8 });

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      navigate("/dehack");
    }, 1800);
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="relative flex flex-col items-center">
              {/* THE SMOKE PLUME: Particles that stay behind the rocket */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                {smokeParticles.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      y: [0, 200], 
                      opacity: [0, 0.8, 0], 
                      scale: [0.5, 2.5],
                      filter: ["blur(0px)", "blur(12px)"]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.2 + (i * 0.1), 
                      ease: "easeOut" 
                    }}
                    className="absolute w-12 h-12 bg-primary/20 rounded-full"
                    style={{ left: `${(Math.random() - 0.5) * 40}px` }}
                  />
                ))}
              </div>

              {/* THE ROCKET: Accelerating Upward */}
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ 
                  y: [300, 0, -800], 
                  opacity: [0, 1, 1],
                  scale: [0.8, 1, 1.2]
                }}
                transition={{ 
                  duration: 1.8, 
                  ease: "easeIn" 
                }}
                className="text-primary relative z-10"
              >
                <Rocket size={100} className="-rotate-45" />
                
                {/* Engine Glow */}
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-16 bg-primary blur-xl rounded-full opacity-50"
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                className="mt-20 font-mono text-primary text-sm tracking-[0.8em] uppercase font-bold"
              >
                Ignition_Confirmed
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 100% RESTORED ORIGINAL DESIGN (REMAINING CODE UNTOUCHED) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i} 
            initial={{ x: '-100%' }} 
            animate={{ x: '100%' }} 
            transition={{ duration: 0.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 5 }} 
            className="h-px bg-primary absolute" 
            style={{ top: `${i * 5}%` }} 
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Film className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Feature Presentation</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-mono font-bold text-foreground mb-6">DE<span className="animate-glitch">HACK</span></h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">Build. Break. Innovate.</p>
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground font-mono text-sm uppercase">5 Days</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-foreground font-mono text-sm uppercase">₹1L+ Prizes</span>
              </div>
            </div>
            <Button onClick={handleLaunch} variant="outline" size="lg" className="text-lg group" disabled={isLaunching}>
              <Terminal className="w-5 h-5 mr-2" />
              <span className="group-hover:text-primary transition-colors uppercase font-bold">Initialize</span>
              <motion.span className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
            </Button>
          </motion.div>

          {/* Director's Monitor Style (Untouched) */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="aspect-square border-2 border-foreground relative overflow-hidden bg-background">
              <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 text-xs font-mono text-muted-foreground uppercase">Live Feed</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground space-y-2 overflow-hidden p-6 pt-12">
                {['> initializing...', '> loading participants...', '> BUILD MODE ACTIVATED'].map((line, i) => (
                  <p key={i} className={line.includes('ACTIVATED') ? 'text-primary font-bold' : ''}>{line}</p>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-xs text-primary/70">TC 00:00:00:00</div>
              <div className="absolute top-8 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeHackSection;