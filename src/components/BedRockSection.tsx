import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Award } from 'lucide-react';

const BedRockSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // A 6x4 grid of blocks to cover the view
  const blocks = Array.from({ length: 24 });

  const handleAssemble = () => {
    setIsGenerating(true);
    setTimeout(() => {
      navigate("/bedrock");
    }, 1800);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20 font-mono">
      {/* COHESIVE BLUE BLOCK TRANSITION */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden"
          >
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-4">
              {blocks.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -1000, scale: 0, rotate: 45 }}
                  animate={{ 
                    y: 0, 
                    scale: 1,
                    rotate: 0,
                    transition: { 
                      delay: i * 0.04, 
                      type: "spring", 
                      damping: 15, 
                      stiffness: 120 
                    }
                  }}
                  // Using the signature Primary Blue (#93f5ff) with glass effect
                  className="w-20 h-20 md:w-32 md:h-32 bg-primary/20 border-2 border-primary shadow-[0_0_20px_rgba(147,245,255,0.3)] relative"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(147,245,255,0.1) 25%, transparent 25%, transparent 50%, rgba(147,245,255,0.1) 50%, rgba(147,245,255,0.1) 75%, transparent 75%, transparent)`,
                    backgroundSize: '20px 20px',
                  }}
                >
                  {/* Internal Glow for that "Bedrock" density */}
                  <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/50" />
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [0.95, 1, 0.95] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute bottom-16 text-primary font-bold text-2xl tracking-[0.6em] uppercase"
            >
              Constructing_World
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Award Trophy Style */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="order-2 lg:order-1"
          >
            <div className="aspect-square border-4 border-primary p-1 relative shadow-[0_0_30px_rgba(147,245,255,0.1)]">
              <div className="w-full h-full bg-background border-2 border-primary/30 flex flex-col items-center justify-center relative">
                <Crown className="w-32 h-32 text-primary" strokeWidth={1} />
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Award For</p>
                  <p className="text-xl font-bold text-primary mt-1 uppercase">Best Business</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs tracking-widest uppercase font-bold">Best Picture Nominee</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-primary mb-6 tracking-tighter">BEDROCK</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-sans">The C'Not Takeover. Marketing. Profit. Glory.</p>

            <div className="grid grid-cols-3 gap-4 mb-10 text-center">
              {[{ icon: Users, label: 'TEAMS', value: '30+' }, 
                { icon: TrendingUp, label: 'REVENUE', value: '₹5L+' }, 
                { icon: Crown, label: 'CHAMPION', value: '1' }
              ].map((stat, i) => (
                <div key={i} className="p-4 border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleAssemble} 
                variant="default" 
                size="lg" 
                className="text-lg bg-primary text-black hover:bg-primary/90 font-bold px-10 py-8 tracking-widest uppercase shadow-[0_0_20px_rgba(147,245,255,0.2)]"
                disabled={isGenerating}
              >
                {isGenerating ? "BUILDING..." : "ASSEMBLE TEAM"}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg border-2 border-primary text-primary hover:bg-primary/10 font-bold px-10 py-8 tracking-widest uppercase"
              >
                BOOK NOW
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BedRockSection;