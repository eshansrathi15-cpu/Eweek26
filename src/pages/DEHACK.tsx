import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Cpu, Zap, Shield, Trophy } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";

const Dehack = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
      {/* Reusing the exact background from the home page */}
      <WaveformBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Navigation / Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Command Center
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-primary/30 bg-primary/5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Directives Loaded</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-mono font-bold mb-8 tracking-tighter">
              DE<span className="text-primary animate-pulse">HACK</span>
            </h1>
            
            {/* UPDATED HERO TEXT */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-sans leading-relaxed">
              Talk is Cheap. Build the future with BITS Pilani’s flagship 54-hour sprint where engineering meets entrepreneurship. We provide the mentorship, workshops, and no-code tools; you provide the next big disruption.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 border border-border bg-secondary/20 backdrop-blur-sm">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-mono text-sm font-bold">STAKES</h3>
                <p className="text-xs text-muted-foreground">High Intensity</p>
              </div>
              <div className="p-4 border border-border bg-secondary/20 backdrop-blur-sm">
                <Trophy className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-mono text-sm font-bold">REWARDS</h3>
                <p className="text-xs text-muted-foreground">₹1,00,000+ Pool</p>
              </div>
            </div>
          </motion.div>

          {/* Detailed Info / "Terminal" Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="border-2 border-primary/20 bg-black/40 p-8 rounded-sm backdrop-blur-md relative"
          >
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
            
            {/* UPDATED MANIFESTO TITLE */}
            <h3 className="text-primary font-mono mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> DEHACK_MANIFESTO.txt
            </h3>
            
            <div className="space-y-6 font-mono text-sm">
              <div className="border-l-2 border-primary/30 pl-4">
                <p className="text-primary font-bold mb-1">01. THE PROBLEM</p>
                {/* UPDATED PROBLEM TEXT */}
                <p className="text-muted-foreground">Innovation is trapped in theory. Great ideas lack the grit of a prototype and the clarity of a business case.</p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <p className="text-primary font-bold mb-1">02. THE CHALLENGE</p>
                {/* UPDATED CHALLENGE TEXT */}
                <p className="text-muted-foreground">54 Hours. Zero to founder in one weekend.</p>
              </div>

              <div className="border-l-2 border-primary/30 pl-4">
                <p className="text-primary font-bold mb-1">03. THE OUTPUT</p>
                {/* UPDATED OUTPUT TEXT */}
                <p className="text-muted-foreground">Functional prototypes. Investor-ready decks. Transition from student to builder.</p>
              </div>
            </div>

            <Button className="w-full mt-10 bg-primary text-black hover:bg-primary/90 font-bold tracking-widest uppercase py-6">
              Establish Connection
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dehack;