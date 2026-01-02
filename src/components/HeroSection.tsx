import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-6xl mx-auto"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-mono font-bold leading-none tracking-tighter text-foreground"
        >
          E-WEEK
          <br />
          <span className="text-primary text-shadow-glow">2026</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-xl md:text-2xl font-sans text-muted-foreground tracking-wide"
        >
          THE BLOCKBUSTER EVENT.
        </motion.p>

        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 inline-block"
        >
          <div className="bg-primary text-primary-foreground px-6 py-3 font-mono text-lg md:text-xl font-bold">
            FEB 09 - 15
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="default" size="lg" className="text-lg px-8 py-6">
            GET TICKETS
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Play className="w-5 h-5 mr-2" />
            VIEW TRAILER
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
