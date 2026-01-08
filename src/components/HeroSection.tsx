import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';
const HeroSection = () => {
  return <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 spotlight vignette">
      {/* Cinema Curtain Accents */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-red-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-red-950/20 to-transparent pointer-events-none" />

      <motion.div initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.2
    }} className="text-center max-w-6xl mx-auto">
        {/* "Now Showing" Badge */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/50 bg-primary/10">
          <ChevronLeft className="w-4 h-4 text-primary fill-primary" />
          <span className="font-mono text-sm text-primary tracking-widest">CEL Presents</span>
          <ChevronRight className="w-4 h-4 text-primary fill-primary" />
        </motion.div>

        {/* Main Title */}
        <motion.h1 initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 1,
        delay: 0.4
      }} className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-mono font-bold leading-none tracking-tighter text-foreground">
          E-WEEK
          <br />
          <span className="text-primary text-shadow-glow">2026</span>
        </motion.h1>

        {/* Subtitle with film rating style */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.8
      }} className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-muted-foreground" />
          <p className="text-xl md:text-2xl font-sans text-muted-foreground tracking-wide font-normal">
            The Director's Cut  
          </p>
          <div className="h-px w-12 bg-muted-foreground" />
        </motion.div>

        {/* Date Badge - Movie Ticket Style */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 1
      }} className="mt-8 inline-flex items-center">
          <div className="ticket-perf w-3 h-16 bg-primary" />
          <div className="bg-primary text-primary-foreground px-8 py-4 font-mono relative">
            <div className="text-xs opacity-70 mb-1">​Theater Timing </div>
            <div className="text-xl md:text-2xl font-bold tracking-wider">FEB 09 - 15</div>
            <div className="text-xs opacity-70 mt-1">BITS PILANI</div>
          </div>
          <div className="ticket-perf w-3 h-16 bg-primary" />
        </motion.div>

        {/* Star Rating */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 1.1
      }} className="mt-4 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
          <span className="ml-2 text-sm text-muted-foreground font-mono">5.0 / 5.0</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 1.2
      }} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" size="lg" className="text-lg px-8 py-6">
            GET TICKETS
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Play className="w-5 h-5 mr-2" />
            WATCH TRAILER
          </Button>
        </motion.div>

        {/* Credits line */}
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 1.4
      }} className="mt-8 text-xs text-muted-foreground font-mono tracking-wider">
          PRESENTED & PRODUCED BY CEL
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 1.5
    }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }} className="">
          
        </motion.div>
      </motion.div>
    </section>;
};
export default HeroSection;
