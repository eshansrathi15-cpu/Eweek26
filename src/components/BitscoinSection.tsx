import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Coins, TrendingUp, Trophy, ChevronLeft, ChevronRight, Sparkles, DollarSign, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const BitscoinSection = () => {
const cards = [
    {
title: "WHAT IS BITSCOIN?",
description: "BITSCOIN is E-Week's virtual currency. Earn it by participating in events, competing in challenges, and engaging with the festival. Use your BITSCOINS to bet on IPOs in Wolf of Dalal Street and multiply your wealth.",
icon: <Coins className="w-8 h-8 text-primary" />,
    },
    {
title: "BEDROCK ACCESS",
description: "The top earners secure a guaranteed spot in the elite Bedrock.",
icon: <Trophy className="w-8 h-8 text-primary" />,
    }
  ];

const Card = ({ card, index }: { card: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-8 border border-primary/30 group hover:border-primary transition-all duration-500 bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl h-full"
    >
      {/* Animated sparkles/coins */}
      {isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, 30, 60],
              y: [0, -30, -60],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3 }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, -40, -80],
              y: [0, -40, -80],
              rotate: [0, -180, -360]
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2, delay: 0.3 }}
            className="absolute top-8 left-8"
          >
            <Coins className="w-6 h-6 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, 35, 70],
              y: [0, 35, 70],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.1, delay: 0.6 }}
            className="absolute bottom-8 right-8"
          >
            <DollarSign className="w-5 h-5 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, -25, -50],
              y: [0, 25, 50],
              rotate: [0, -90, -180]
            }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.4, delay: 0.1 }}
            className="absolute bottom-12 left-12"
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
        </>
      )}
      
      {/* Holographic gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none rounded-2xl"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          background: isHovered 
            ? `radial-gradient(circle at ${x.get() + 200}px ${y.get() + 200}px, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.2) 40%, transparent 70%)`
            : 'none'
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Credit card shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />
      
      {/* Chip-like decoration */}
      <div className="absolute top-6 right-6 w-12 h-10 border border-primary/40 rounded-md bg-gradient-to-br from-primary/20 to-transparent" />
      
      <div className="mb-6 relative z-10">{card.icon}</div>
      <h3 className="text-2xl font-mono font-bold mb-4 tracking-wider text-foreground relative z-10">
        {card.title}
      </h3>
      <p className="text-muted-foreground font-sans leading-relaxed relative z-10">
        {card.description}
      </p>
    </motion.div>
  );
};

return (
/* Removed 'bg-background' to allow the WaveformBackground to be visible */
<section id="bitscoin" className="py-24 relative px-6 overflow-hidden bg-transparent">
{/* We keep the vignette but set it to pointer-events-none 
         so it doesn't block the mouse from interacting with the background grid.
      */}
<div className="absolute inset-0 pointer-events-none vignette opacity-30" />
<div className="max-w-6xl mx-auto relative z-10">
{/* Header */}
<div className="flex flex-col items-center mb-16">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="inline-flex items-center gap-2 mb-4 px-4 py-2 border border-primary/50 bg-primary/10 backdrop-blur-sm"
>
<ChevronLeft className="w-4 h-4 text-primary fill-primary" />
<span className="font-mono text-sm text-primary tracking-widest uppercase">The Economy</span>
<ChevronRight className="w-4 h-4 text-primary fill-primary" />
</motion.div>
<h2 className="text-6xl md:text-7xl font-mono font-bold text-center tracking-tighter text-foreground">
            BITS<span className="text-primary text-shadow-glow">COIN</span>
</h2>
<p className="mt-4 text-muted-foreground font-sans text-xl italic tracking-wide">
</p>
</div>
{/* Info Cards */}
<div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
<div className="w-full md:w-auto md:flex-1 md:max-w-md">
          <Card card={cards[0]} index={0} />
</div>
        
        {/* Arrow between cards */}
<motion.div
initial={{ opacity: 0, scale: 0 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.4 }}
className="hidden md:flex md:items-center"
>
<motion.div
animate={{ x: [0, 10, 0] }}
transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
>
<ArrowRight className="w-12 h-12 text-primary" />
</motion.div>
</motion.div>

<div className="w-full md:w-auto md:flex-1 md:max-w-md">
          <Card card={cards[1]} index={1} />
</div>
</div>
</div>
</section>
  );
};
export default BitscoinSection;