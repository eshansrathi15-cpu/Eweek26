import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, Award, Users, Briefcase, Zap, ShoppingCart, Gavel, Flame, HelpCircle, Film } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";
const BedrockPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const features = [{
    icon: <Gavel className="w-5 h-5" />,
    title: "The Auction",
    desc: "13 Teams. Limited Restaurants. Bid high or go home hungry."
  }, {
    icon: <Zap className="w-5 h-5" />,
    title: "Market Chaos",
    desc: "Sell food, execute tasks, and dominate the C'Not economy."
  }, {
    icon: <Award className="w-5 h-5" />,
    title: "The Stakes",
    desc: "₹20,000+ prize pool."
  }];
  const stripboardItems = [{
    scene: "01",
    title: "C'NOT_TAKEOVER",
    label: "Restaurant_View"
  }, {
    scene: "02",
    title: "AUCTION_PIT",
    label: "Market_Open"
  }, {
    scene: "03",
    title: "SQUAD",
    label: "Team_Deployment"
  }, {
    scene: "04",
    title: "NIGHT_SHIFT",
    label: "Operational_Chaos"
  }, {
    scene: "05",
    title: "KAMAL'S_OPS",
    label: "Supply_Chain"
  }, {
    scene: "06",
    title: "FINAL_TALLY",
    label: "Profit_Declaration"
  }];
  return <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain font-mono">
      <WaveformBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">
        
        {/* Navigation */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Exit_Theatre
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }}>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs tracking-widest uppercase">
              <Target className="w-4 h-4" /> Market_Volatility: HIGH
            </div>
            <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter uppercase">
              BED<span className="text-primary">ROCK</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-sans leading-relaxed">
              The C'Not Takeover. 13 teams. One goal: Absolute Market Dominance. 
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary/20 text-center">
              <div className="border border-primary/20 p-4 bg-secondary/10">
                <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-2xl font-bold block text-foreground tracking-tighter">13</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Elite_Teams</span>
              </div>
              <div className="border border-primary/20 p-4 bg-secondary/10">
                <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-2xl font-bold block text-foreground tracking-tighter">1 Day</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Selling_Ops</span>
              </div>
              <div className="border border-primary/20 p-4 bg-primary/10">
                <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-2xl font-bold block text-foreground tracking-tighter">₹20K+</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Grand_Prize</span>
              </div>
            </div>
          </motion.div>

          {/* Auction Terminal Visual */}
          <div className="border-2 border-primary/20 bg-black/60 p-8 rounded-sm backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 text-[8px] text-primary/20 rotate-90 tracking-widest">SECURE_SERVER_v4.2</div>
             <h3 className="text-primary mb-6 flex items-center gap-2 uppercase tracking-widest font-bold">
              <ShoppingCart className="w-5 h-5" /> ACTIVE_AUCTION_LOG
            </h3>
            <div className="space-y-4 text-xs opacity-80 border-l-2 border-primary/30 pl-4">
              <p className="text-green-400 font-bold tracking-tighter">{">"} TEAM_ALPHA bid ₹12,000 on REDI_1</p>
              <p className="text-muted-foreground">{">"} SYSTEM: New problem statement uploaded for Day 2</p>
              <p className="text-yellow-400">{">"} WARNING: High traffic detected at ANC Circle</p>
              <p className="text-primary animate-pulse">{">"} WAITING FOR NEXT BID...</p>
              <Button className="w-full bg-primary text-black font-bold uppercase py-6 mt-6 tracking-widest hover:bg-primary/80 transition-all">
                Team Questionnaire
              </Button>
            </div>
          </div>
        </div>

        {/* Mechanics Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {features.map((f, i) => <motion.div key={i} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: i * 0.1
        }} className="p-8 border border-primary/20 bg-secondary/5 group hover:border-primary/50 transition-all">
              <div className="text-primary mb-4">{f.icon}</div>
              <h4 className="text-lg font-bold uppercase mb-2 tracking-tighter">{f.title}</h4>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{f.desc}</p>
            </motion.div>)}
        </div>

        {/* What Is Bedrock Section */}
        <div className="mb-40">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} className="border-l-4 border-primary/40 pl-8 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-8 text-primary">
              What Is Bedrock?
            </h2>
            <div className="space-y-6 text-muted-foreground font-sans leading-relaxed max-w-4xl">
              <p className="text-lg md:text-xl">
                What if you got the chance to run your favorite restaurant at C'not? 
                You've had countless dinners there but it's time we turn the tables around!
              </p>
              <p className="text-lg md:text-xl">
                CEL brings to you, BEDROCK-the flagship event of E-Week 2024. 
                It's your chance to make your own team with creative, street smart and those jugaadu friends 
                to manage a restaurant at C'not. Imagine running Sharma's or Kamal's for a day and going crazy 
                with the marketing just to clock in the maximum revenue.
              </p>
              <p className="text-lg md:text-xl">
                Apart from a tonne of fun, memories and laughter, you stand a chance to win a cash prize of{" "}
                <span className="inline-block px-4 py-2 bg-primary text-black font-bold text-2xl md:text-3xl tracking-tight border-2 border-primary animate-pulse">
                  ₹20,000/-
                </span>
                .{" "}
                <span className="text-primary font-bold">You C'not miss this!</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* FILM STRIPBOARD SECTION */}
        <div className="relative -mx-6">
          <div className="flex items-center gap-4 mb-8 px-6">
            <Film className="text-primary w-5 h-5" />
            <h2 className="text-4xl font-bold tracking-tighter uppercase">BEDROCK RECAP</h2>
            <div className="h-px flex-1 bg-primary/20 ml-4" />
            <span className="text-xs text-muted-foreground tracking-[0.3em]">RECAP_v2025</span>
          </div>
          
          <div className="flex overflow-x-auto gap-1 px-6 pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory border-t border-b border-primary/10 bg-secondary/5 py-12">
            {stripboardItems.map((item, i) => <div key={i} className="flex-none w-[300px] md:w-[400px] snap-center group cursor-pointer">
                <div className="relative aspect-[16/9] border border-primary/20 bg-black overflow-hidden mb-4">
                  <div className="absolute top-2 left-2 text-[10px] text-primary/40 font-mono tracking-widest">SCENE {item.scene}</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] opacity-30 group-hover:opacity-100 transition-opacity">
                      IMAGE_DATA_PENDING
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-4 flex justify-between px-1 opacity-20">
                     {[...Array(12)].map((_, j) => <div key={j} className="w-2 h-2 bg-primary mt-1" />)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-between px-1 opacity-20">
                     {[...Array(12)].map((_, j) => <div key={j} className="w-2 h-2 bg-primary mb-1" />)}
                  </div>
                </div>
                <div className="px-1 flex justify-between items-start font-mono">
                   <div>
                      <h5 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h5>
                      <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">{item.label}</p>
                   </div>
                   <span className="text-[10px] text-primary italic opacity-0 group-hover:opacity-100 transition-opacity">
                      VIEW_RECAP &gt;&gt;
                   </span>
                </div>
              </div>)}
          </div>
        </div>

      </div>
    </div>;
};
export default BedrockPage;