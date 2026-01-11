import { useEffect, useState } from "react"; // Added useState
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Cpu, Zap, Shield, Trophy, Calendar, Clock, MapPin, MessageSquare, HelpCircle, ChevronRight, Layers, Code, Lightbulb, Radio, X } from "lucide-react"; // Added X
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";
import { useAuth } from "@/context/AuthContext";

const Dehack = () => {
  const { user, login } = useAuth();
  // FIX: Force scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Modal and form states
  const [showModal, setShowModal] = useState(false);



  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const faqs = [{
    q: "Who can participate?",
    a: "Open to all BITSians. Whether you are a first-year explorer or a final-year builder, you're welcome."
  }, {
    q: "Is it a team event?",
    a: "Yes, teams must consist of 3-5 members. Solo explorers can find teams during the networking mixer."
  }, {
    q: "What is the registration fee?",
    a: "Nil. Participation is fully sponsored, including high-speed workspace and technical resources."
  }, {
    q: "Do I need to know how to code?",
    a: "Not necessarily. Great ventures need designers, strategists, and visionaries, not just developers."
  }, {
    q: "What should I bring?",
    a: "Your laptop, chargers, a 'build-fast' mindset, and enough energy to last 54 hours."
  }, {
    q: "Can I use pre-existing code?",
    a: "The core prototype must be built during the 54-hour window, though libraries and frameworks are allowed."
  }, {
    q: "How does the judging work?",
    a: "Judging is conducted by a panel of esteemed Professors and industry veterans based on innovation and execution."
  }, {
    q: "Will there be mentors?",
    a: "Yes, we have technical experts and senior student mentors to guide your builds."
  }, {
    q: "What if I don't have an idea?",
    a: "We provide problem statements from our sponsors to get your gears turning."
  }, {
    q: "What happens at the end?",
    a: "Teams will present their working prototypes and slides to the judges in a final showcase."
  }];
  return <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
    <WaveformBackground />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      {/* Navigation */}
      <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Home
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
        }} transition={{
          duration: 0.8
        }}>
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-primary/30 bg-primary/5 text-primary font-mono text-xs tracking-widest uppercase">
            <Radio className="w-4 h-4" /> Directives Loaded
          </div>
          <h1 className="text-7xl md:text-9xl font-mono font-bold mb-8 tracking-tighter">
            DE<span className="text-primary animate-pulse">HACK</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-sans leading-relaxed">
            Talk is Cheap. Build the future with BITS Pilani's flagship 54-hour sprint where engineering meets entrepreneurship.
          </p>

          {/* LOGISTICS GRID */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/20">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                <Calendar className="w-4 h-4" /> Timeline
              </div>
              <span className="text-2xl font-mono font-bold">FEB 11-16</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> Operations_Base
              </div>
              <span className="text-2xl font-mono font-bold">5105, LTC</span>
            </div>
          </div>

          {/* HIGH-IMPACT PRIZE SECTION */}
          <motion.div initial={{
            scale: 0.9,
            opacity: 0
          }} whileInView={{
            scale: 1,
            opacity: 1
          }} className="mt-12 p-8 border-2 border-primary bg-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy size={120} />
            </div>
            <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-2 font-bold">TOTAL_STAKES</p>
            <h2 className="text-5xl md:text-7xl font-mono font-black text-foreground tracking-tighter">
              ₹1,00,000<span className="text-primary">+</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm mt-2">Plus Incubation Opportunities, Cash Prizes.</p>
          </motion.div>
        </motion.div>

        {/* Manifesto Terminal */}
        <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2
        }} className="border-2 border-primary/20 bg-black/40 p-8 rounded-sm backdrop-blur-md relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
          <h3 className="text-primary font-mono mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5" /> DEHACK_MANIFESTO.txt
          </h3>
          <div className="space-y-6 font-mono text-sm">
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-primary font-bold mb-1">01. THE PROBLEM</p>
              <p className="text-muted-foreground">Innovation is trapped in theory. Great ideas lack the grit of a prototype.</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-primary font-bold mb-1">02. THE CHALLENGE</p>
              <p className="text-muted-foreground">54 Hours. Zero to founder in one weekend.</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-primary font-bold mb-1">03. THE OUTPUT</p>
              <p className="text-muted-foreground">Functional prototypes. Project decks. The transition from student to builder.</p>
            </div>
          </div>
          <Button onClick={() => {
            if (user) setShowModal(true);
            else login();
          }} className="w-full mt-10 bg-primary text-black hover:bg-primary/90 font-bold tracking-widest uppercase py-6 text-lg">
            {user ? "Claim Your Spot" : "Login to Register"}
          </Button>
        </motion.div>
      </div>

      {/* EVENT TRACKS */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="mb-24">
        <h2 className="text-3xl font-mono font-bold text-primary mb-10 flex items-center gap-3 italic">
          <Layers className="w-6 h-6" /> // DEHACK_SUB_EVENTS
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            icon: <Code />,
            title: "The Build-Off",
            desc: "Core 54-hour sprint protocol. Locked-in building."
          }, {
            icon: <Lightbulb />,
            title: "Ideation Matrix",
            desc: "Workshop: Reframing problems into scalable solutions."
          }, {
            icon: <Zap />,
            title: "The Showcase",
            desc: "Final presentation to the panel of Professors. High stakes."
          }].map((ev, i) => <div key={i} className="p-8 border border-border bg-secondary/5 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-wait">
            <div className="text-primary mb-4">{ev.icon}</div>
            <h4 className="text-foreground font-mono font-bold uppercase mb-2 tracking-tight">{ev.title}</h4>
            <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Status: PENDING_MANIFEST...</p>
            <p className="text-sm text-muted-foreground mt-4">{ev.desc}</p>
          </div>)}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="max-w-4xl">
        <h2 className="text-3xl font-mono font-bold text-primary mb-10 flex items-center gap-3 italic">
          <HelpCircle className="w-6 h-6" /> // SYSTEM_QUERY_v2.3
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {faqs.map((faq, i) => <motion.div key={i} variants={itemVariants} className="border-l border-primary/20 pl-6 pb-4 group">
            <h4 className="text-foreground font-mono text-sm font-bold uppercase mb-2 group-hover:text-primary transition-colors tracking-tighter">
              {faq.q}
            </h4>
            <p className="text-muted-foreground text-sm font-sans leading-relaxed">
              {faq.a}
            </p>
          </motion.div>)}
        </div>
      </motion.div>
    </div>

    {/* Registration Modal - REPLACED */}
    <RegistrationModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      eventName="DEHACK"
      isTeamEvent={true}
      title="SIGN_UP_YOUR_SQUAD"
      subtitle="SECURE_FORM_v2.1 // GO CRAZY"
    />
  </div>;
};
export default Dehack;