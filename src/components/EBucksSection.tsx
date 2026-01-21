import { motion, useMotionValue, useTransform, useAnimation, useMotionTemplate } from 'framer-motion';
import { Coins, Trophy, ChevronLeft, ChevronRight, Sparkles, DollarSign, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const EBucksSection = () => {
  const cards = [
    {
      title: "WHAT ARE E-BUCKS?",
      description: "Your golden ticket to Bedrock! Players can earn E-Bucks by participating in and winning events.",
      icon: <Coins className="w-8 h-8 text-primary" />,
    },
    {
      title: "BEDROCK ACCESS",
      description: "By the end of the week, the team with the most cumulative E-Bucks can cash them in for a chance to dominate C'Not!",
      icon: <Trophy className="w-8 h-8 text-primary" />,
    }
  ];

  const Card = ({ card, index }: { card: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const sheenControls = useAnimation();
    
    // Core motion values for tracking mouse position relative to center
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // 3D Tilt Transformations
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    // This creates the "Oil Spill" effect that follows the cursor reactively
    const background = useMotionTemplate`
      radial-gradient(
        circle at ${x}px ${y}px, 
        rgba(255, 0, 255, 0.25) 0%, 
        rgba(0, 255, 255, 0.2) 25%, 
        rgba(255, 255, 0, 0.1) 50%, 
        transparent 80%
      )
    `;
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Center-align the coordinate system for the tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      x.set(mouseX); // For the gradient center
      y.set(mouseY); // For the gradient center
      
      // We use the offset from center for the rotation
      const rotateXVal = (e.clientY - (rect.top + centerY));
      const rotateYVal = (e.clientX - (rect.left + centerX));
      // Manual set isn't needed here if we rely on the useTransform above, 
      // but ensuring the values update the transform:
      x.set(mouseX - centerX);
      y.set(mouseY - centerY);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    const handleTap = async () => {
      await sheenControls.start({
        left: ["-100%", "200%"],
        transition: { duration: 0.5, ease: "easeInOut" }
      });
      sheenControls.set({ left: "-100%" });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.97 }}
        onTap={handleTap}
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
        className="relative p-10 border border-white/10 group hover:border-primary/40 cursor-pointer transition-all duration-700 bg-zinc-950 rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] h-full flex flex-col justify-between"
      >
        {/* IRIDESCENT OIL SPILL LAYER */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: background,
          }}
        />

        {/* CLICK SHEEN FLASH */}
        <motion.div
          animate={sheenControls}
          initial={{ left: "-100%" }}
          className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[35deg] pointer-events-none z-30"
        />

        {/* CHIP & CONTACTLESS */}
        <div className="flex justify-between items-start relative z-10 mb-10">
          <div className="w-14 h-11 bg-gradient-to-br from-yellow-600 via-yellow-200 to-yellow-700 rounded-lg relative overflow-hidden shadow-inner border border-black/20">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 border border-black/10" />
            <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-black/40" />
            <div className="absolute left-1/2 top-0 w-[0.5px] h-full bg-black/40" />
            <div className="absolute inset-2 border border-black/10 rounded-sm" />
          </div>
          
          <div className="flex gap-1 opacity-20 mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 h-6 border-r-2 border-white rounded-full" style={{ transform: `skewX(-15deg)` }} />
            ))}
          </div>
        </div>

        {/* CARD CONTENT */}
        <div className="relative z-10 flex-grow">
          <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
            {card.icon}
          </div>
          <h3 className="text-xl font-mono font-bold mb-4 tracking-[0.25em] text-zinc-100 uppercase">
            {card.title}
          </h3>
          <p className="text-zinc-400 font-sans text-sm leading-relaxed antialiased">
            {card.description}
          </p>
        </div>

        {/* BOTTOM AESTHETIC STRIP */}
        <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-end relative z-10">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-white/20 tracking-[4px] uppercase">
              Electronic Use Only
            </span>
            <span className="font-mono text-xs text-white/40 tracking-[2px]">
              E-WEEK 2026 MEMBER
            </span>
          </div>
          
          <div className="flex -space-x-3 opacity-40">
            <div className="w-8 h-8 rounded-full bg-zinc-600 border border-white/10" />
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="ebucks" className="py-24 relative px-6 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <ChevronLeft className="w-3 h-3 text-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">The Digital Mint</span>
            <ChevronRight className="w-3 h-3 text-primary" />
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-mono font-bold text-center tracking-tighter text-foreground">
            E-<span className="text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">BUCKS</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-10">
          <div className="w-full md:w-[420px]">
            <Card card={cards[0]} index={0} />
          </div>
          
          <div className="hidden md:flex md:items-center">
            <motion.div
              animate={{ x: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-8 h-8 text-white/20" />
            </motion.div>
          </div>

          <div className="w-full md:w-[420px]">
            <Card card={cards[1]} index={1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EBucksSection;