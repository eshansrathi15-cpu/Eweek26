import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Coins, TrendingUp, Trophy, ChevronLeft, ChevronRight, Sparkles, DollarSign } from 'lucide-react';
import { useState } from 'react';

const BitscoinSection = () => {
const cards = [
    {
title: "PARTICIPATE",
description: "Engage in E-Week events to earn initial capital.",
icon: <Trophy className="w-8 h-8 text-primary" />,
    },
    {
title: "WOLF OF DALAL STREET",
description: "Bet your BITSCOINS on IPOs and multiply your net worth.",
icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
title: "BEDROCK ACCESS",
description: "The top earners secure a guaranteed spot in the elite Bedrock.",
icon: <Coins className="w-8 h-8 text-primary" />,
    }
  ];

const Card = ({ card, index }: { card: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
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
      className="relative p-8 border border-white/10 group hover:border-primary/50 transition-all duration-500 bg-black/20 backdrop-blur-md"
    >
      {/* Animated sparkles/coins */}
      {isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, 20, 40],
              y: [0, -20, -40]
            }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, -30, -60],
              y: [0, -30, -60]
            }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 0.2 }}
            className="absolute top-8 left-8"
          >
            <Coins className="w-5 h-5 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, 25, 50],
              y: [0, 25, 50]
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.4, delay: 0.4 }}
            className="absolute bottom-8 right-8"
          >
            <DollarSign className="w-4 h-4 text-primary" />
          </motion.div>
        </>
      )}
      
      {/* Light gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          background: isHovered 
            ? `radial-gradient(circle at ${x.get() + 150}px ${y.get() + 150}px, rgba(var(--primary-rgb, 0, 255, 255), 0.3), transparent 50%)`
            : 'none'
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Ticket Perforation effect - using transparent background to match the flow */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#050505] border border-white/10 rounded-full" />
      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#050505] border border-white/10 rounded-full" />
      <div className="mb-6">{card.icon}</div>
      <h3 className="text-xl font-mono font-bold mb-4 tracking-wider text-foreground">
        {card.title}
      </h3>
      <p className="text-muted-foreground font-sans leading-relaxed">
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
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{cards.map((card, index) => (
          <Card key={index} card={card} index={index} />
          ))}
</div>
</div>
</section>
  );
};
export default BitscoinSection;