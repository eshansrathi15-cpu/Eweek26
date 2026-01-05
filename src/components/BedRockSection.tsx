import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Link removed to stop yellow warning
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Award, Rocket } from 'lucide-react';

const BedRockSection = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      navigate("/bedrock");
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20">
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 400, opacity: 0 }}
              animate={{ y: [400, 0, -600], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeIn" }}
              className="text-[#93f5ff]"
            >
              <Rocket size={100} className="-rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="aspect-square border-4 border-primary p-1 relative">
                <div className="w-full h-full bg-background border-2 border-primary/50 flex flex-col items-center justify-center relative overflow-hidden">
                  <Crown className="w-32 h-32 text-primary relative z-10" strokeWidth={1} />
                  <div className="mt-6 text-center">
                    <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Award For</p>
                    <p className="text-lg font-mono font-bold text-primary mt-1 uppercase">Best Business</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Best Picture Nominee</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-mono font-bold text-primary mb-6">BEDROCK</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">The C'Not Takeover. Marketing. Profit. Glory.</p>
            <Button 
              onClick={handleLaunch} 
              variant="default" 
              size="lg" 
              className="text-lg bg-primary text-black hover:bg-primary/90 font-mono font-bold px-8 py-6 tracking-widest uppercase"
              disabled={isLaunching}
            >
              {isLaunching ? "LAUNCHING..." : "ASSEMBLE TEAM"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BedRockSection;