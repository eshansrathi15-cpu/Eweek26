import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, Award, Users, Briefcase, HelpCircle, Layers } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";

const BedrockPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const faqs = [
    { q: "What is Bedrock?", a: "The premier marketing and business strategy challenge of E-WEEK, focusing on revenue generation." },
    { q: "Is it a team event?", a: "Yes, teams of 3-5 members compete to build the most profitable business models." },
    { q: "How are we judged?", a: "Evaluation is based on your marketing strategy and brand scalability." },
    { q: "Who can participate?", a: "Any BITSian with an interest in marketing, sales, and business development." }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
      <WaveformBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Command Center
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-primary/30 bg-primary/5 text-primary font-mono text-xs tracking-widest uppercase">
              <Target className="w-4 h-4" /> Campaign_Active
            </div>
            <h1 className="text-7xl md:text-9xl font-mono font-bold mb-8 tracking-tighter uppercase">
              BED<span className="text-primary">ROCK</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-sans leading-relaxed">
              The C'Not Takeover. Marketing. Profit. Glory.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary/20 text-center">
              <div className="border border-primary/20 p-4">
                <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-xl font-mono font-bold block text-foreground">30+</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Teams</span>
              </div>
              <div className="border border-primary/20 p-4">
                <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-xl font-mono font-bold block text-foreground">₹5L+</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Revenue</span>
              </div>
              <div className="border border-primary/20 p-4">
                <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-xl font-mono font-bold block text-foreground">1</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Champion</span>
              </div>
            </div>
          </motion.div>

          <div className="border-2 border-primary/20 bg-black/40 p-8 rounded-sm backdrop-blur-md relative">
            <h3 className="text-primary font-mono mb-6 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Briefcase className="w-5 h-5" /> PROJECT_BRIEF
            </h3>
            <div className="space-y-6 font-mono text-sm text-muted-foreground border-l-2 border-primary/30 pl-4">
              <p>Execute a real-world marketing takeover. Optimize for profit. Outperform the competition through strategy.</p>
              <Button className="w-full bg-primary text-black font-bold uppercase py-6">
                Establish Connection
              </Button>
            </div>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="max-w-4xl">
          <h2 className="text-3xl font-mono font-bold text-primary mb-10 italic tracking-tighter">// BUSINESS_QUERY</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants} className="border-l border-primary/20 pl-6 pb-4">
                <h4 className="text-foreground font-mono text-sm font-bold uppercase mb-2 tracking-tighter">
                  {faq.q}
                </h4>
                <p className="text-muted-foreground text-sm font-sans">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BedrockPage;