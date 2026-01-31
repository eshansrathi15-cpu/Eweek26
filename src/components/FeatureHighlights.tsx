import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const FeatureHighlights = () => {
  const highlight = {
    title: "CAREER FAIR",
    type: "NETWORKING",
    icon: <Briefcase className="w-5 h-5 text-primary" />,
    description: "Direct access to premiere startups. Submit your resumes, secure your internship and solidify your position in the ecosystem. Registrations opening soon!",
    date: "FEB 02"
  };

  const handleRegister = (title: string) => {
    console.log(`Registering for: ${title}`);
  };

  return (
    <section id="hits" className="py-24 relative z-10 font-mono">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Production Label - Centered */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/10 backdrop-blur-sm">
            <ChevronLeft className="w-3 h-3 text-primary fill-primary" />
            <span className="text-[9px] text-primary tracking-[0.4em] uppercase font-bold">ON THE HOUSE</span>
            <ChevronRight className="w-3 h-3 text-primary fill-primary" />
          </div>
        </motion.div>

        {/* UPDATED HEADING - Centered and Renamed */}
        <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-16 text-foreground text-center"> <span className="text-primary text-shadow-glow">HIGHLIGHTS</span>
        </motion.h2>

        <div className="flex justify-center">
          <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="group border border-primary/20 bg-background/40 backdrop-blur-md p-12 min-h-[400px] max-w-2xl flex flex-col justify-between hover:bg-primary/5 transition-all duration-500 border-l-4 border-l-primary/50 hover:border-l-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <Star className="w-5 h-5 text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] text-primary tracking-[0.3em] uppercase mb-6 font-bold">
                  {highlight.icon} {highlight.type}
                </div>
                <h3 className="text-4xl font-bold tracking-tighter mb-4 text-foreground group-hover:text-primary transition-all uppercase">
                  {highlight.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 font-sans">
                  {highlight.description}
                </p>
                
                {/* New Action Button */}
                <Button 
                  onClick={() => handleRegister(highlight.title)}
                  className="bg-[#7DF9FF] hover:bg-[#5ce6ee] text-black rounded-none 
                             font-bold tracking-[0.2em] text-xs py-6 px-8 transition-all
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none mb-10"
                >
                  EXPLORE OPPORTUNITIES
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Zap className="w-5 h-5 fill-primary" /> 
                  <span className="tracking-widest">{highlight.date}</span>
                </div>
                <div className="h-px flex-1 bg-primary/20" />
                <span className="text-[12px] text-muted-foreground tracking-tighter uppercase font-bold">
                  E-WEEK
                </span>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};
export default FeatureHighlights;