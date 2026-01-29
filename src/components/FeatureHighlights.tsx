import { motion } from 'framer-motion';
import { Briefcase, Film, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
const FeatureHighlights = () => {
  const highlights = [{
    title: "CAREER FAIR",
    type: "NETWORKING",
    icon: <Briefcase className="w-5 h-5 text-primary" />,
    description: "Direct access to premiere startups. Submit your applications, secure your internship and solidify your position in the ecosystem. Registrations opening soon!",
    date: "FEB 02"
  }, {
    title: "MOVIE SCREENING",
    type: "INTERMISSION",
    icon: <Film className="w-5 h-5 text-primary" />,
    description: "Live from the Rotunda! Get your squad and some popcorn for an open-air movie night, no registrations required!",
    date: "FEB 06"
  }];
  return (
    // Updated the ID below from "career-fair" to "hits" to match your Navbar link
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
        }} className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-16 text-foreground text-center">TRENDING <span className="text-primary text-shadow-glow">HITS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item, i) => <motion.div key={i} initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="group border border-primary/20 bg-background/40 backdrop-blur-md p-12 min-h-[400px] flex flex-col justify-between hover:bg-primary/5 transition-all duration-500 border-l-4 border-l-primary/50 hover:border-l-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <Star className="w-5 h-5 text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] text-primary tracking-[0.3em] uppercase mb-6 font-bold">
                  {item.icon} {item.type}
                </div>
                <h3 className="text-4xl font-bold tracking-tighter mb-4 text-foreground group-hover:text-primary transition-all uppercase">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 font-sans">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Zap className="w-5 h-5 fill-primary" /> 
                  <span className="tracking-widest">{item.date}</span>
                </div>
                <div className="h-px flex-1 bg-primary/20" />
                <span className="text-[12px] text-muted-foreground tracking-tighter uppercase font-bold">
                  BITS PILANI
                </span>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>
  );
};
export default FeatureHighlights;