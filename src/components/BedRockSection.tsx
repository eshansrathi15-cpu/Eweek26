import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Award } from 'lucide-react';

const BedRockSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // Create a grid of 24 blocks for a full-screen build effect
  const blocks = Array.from({ length: 24 });

  const handleAssemble = () => {
    setIsGenerating(true);
    // 1.8 seconds for the world to "generate"
    setTimeout(() => {
      navigate("/bedrock");
    }, 1800);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20">
      {/* MINECRAFT BLOCK TRANSITION */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4">
              {blocks.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -800, rotateY: 90, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    rotateY: 0, 
                    opacity: 1,
                    transition: { 
                      delay: i * 0.04, 
                      type: "spring", 
                      damping: 12, 
                      stiffness: 90 
                    }
                  }}
                  className="w-20 h-20 md:w-32 md:h-32 bg-[#444] border-b-8 border-r-8 border-black relative"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), 
                                      linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222)`,
                    backgroundSize: '12px 12px',
                    backgroundPosition: '0 0, 6px 6px'
                  }}
                >
                  {/* Bedrock pixel highlight */}
                  <div className="absolute inset-0 border-t-4 border-l-4 border-white/5" />
                </motion.div>
              ))}
            </div>
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute bottom-12 font-mono text-primary text-xl font-bold tracking-[0.4em]"
            >
              GENERATING_BEDROCK...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Restored Original Award Design */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
            <div className="aspect-square border-4 border-primary p-1 relative">
              <div className="w-full h-full bg-background border-2 border-primary/50 flex flex-col items-center justify-center relative">
                <Crown className="w-32 h-32 text-primary" strokeWidth={1} />
                <div className="mt-6 text-center font-mono">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Award For</p>
                  <p className="text-lg font-bold text-primary mt-1 uppercase tracking-tighter">Best Business</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Best Picture Nominee</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-mono font-bold text-primary mb-6">BEDROCK</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">The C'Not Takeover. Marketing. Profit. Glory.</p>

            <div className="grid grid-cols-3 gap-4 mb-10 text-center">
              {[{ icon: Users, label: 'TEAMS', value: '30+' }, { icon: TrendingUp, label: 'REVENUE', value: '₹5L+' }, { icon: Crown, label: 'CHAMPION', value: '1' }].map((stat, i) => (
                <div key={i} className="p-4 border border-primary/30 bg-primary/5">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-mono font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleAssemble} 
              variant="default" 
              size="lg" 
              className="text-lg bg-primary text-black hover:bg-primary/90 font-mono font-bold px-8 py-6 tracking-widest uppercase"
              disabled={isGenerating}
            >
              {isGenerating ? "BUILDING..." : "ASSEMBLE TEAM"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BedRockSection;