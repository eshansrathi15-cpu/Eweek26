import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Cpu, Zap, Shield, Trophy, Calendar, Clock, MapPin, MessageSquare, HelpCircle, ChevronRight, Layers, Code, Lightbulb, Radio, X, BookOpen, ScrollText } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Dehack = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    user,
    isAuthenticated
  } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showRulebook, setShowRulebook] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [captainId, setCaptainId] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      toast.error('Please login first', {
        description: 'You need to be logged in to register for events.'
      });
      return;
    }
    setCaptainName(user?.name || '');
    setCaptainEmail(user?.email || '');
    setShowModal(true);
  };

  const handleNumMembersChange = e => {
    const inputValue = e.target.value;
    setNumMembers(inputValue);
    if (inputValue !== '') {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue > 0) {
        const membersCount = Math.max(0, numValue - 1);
        setTeamMembers(Array(membersCount).fill(null).map(() => ({
          name: '',
          id: '',
          phone: ''
        })));
      }
    } else {
      setTeamMembers([]);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async () => {
    // FIXED: Removed !captainId from validation logic because it doesn't exist in the form
    if (!teamName || !captainPhone) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const membersData = teamMembers.map((m: any) => `${m.name} (${m.id}) [${m.phone}]`).join(', ');
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sheet_name: 'DEHACK',
          // FIXED: Used captainEmail in place of captainId to ensure data integrity in the sheet
          row_data: [new Date().toISOString(), teamName, captainName, captainEmail, captainEmail, captainPhone, numMembers, membersData]
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Registration successful!', {
          description: 'Your team has been registered for DEHACK.'
        });
        setShowModal(false);
        setTeamName('');
        setCaptainId('');
        setCaptainPhone('');
        setNumMembers('');
        setTeamMembers([]);
      } else {
        toast.error('Registration failed', {
          description: data.error
        });
      }
    } catch (error) {
      toast.error('Registration failed', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
  const dehackTimeline = [{
    date: "22nd January",
    task: "Registration Begins & Website goes live",
    status: "LAUNCH"
  }, {
    date: "4th February",
    task: "DeHack kicks off, with hackathon brief and problem solving begins.",
    status: "KICKOFF"
  }, {
    date: "5th February",
    task: "Problem solving, Workshop & solving sprints",
    status: "IN_PROGRESS"
  }, {
    date: "6th February",
    task: "Problem solving, Workshop & solving sprints",
    status: "IN_PROGRESS"
  }, {
    date: "7th February",
    task: "Submission day.",
    status: "FINAL_PUSH"
  }];

  return <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
    <WaveformBackground />

    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
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
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-24">
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
            Build the future with BITS Pilani's flagship 4 day hackathon where engineering meets entrepreneurship.
          </p>

          {/* LOGISTICS GRID */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/20">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                <Calendar className="w-4 h-4" /> Timeline
              </div>
              <span className="text-2xl font-mono font-bold">FEB 4-7</span>
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
          }} className="mt-8 md:mt-12 p-6 md:p-8 border-2 border-primary bg-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy size={80} className="md:w-32 md:h-32" />
            </div>
            <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-2 font-bold">TOTAL_STAKES</p>
            <h2 className="text-4xl md:text-7xl font-mono font-black text-foreground tracking-tighter">$$$<span className="text-primary"></span>
            </h2>
            <p className="text-muted-foreground font-mono text-[10px] md:text-sm mt-2">Plus Incubation Opportunities, Cash Prizes.</p>
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
          <h3 className="text-primary font-mono mb-4 md:mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5" /> DEHACK_MANIFESTO.txt
          </h3>
          <div className="space-y-4 md:space-y-6 font-mono text-xs md:text-sm">
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-primary font-bold mb-1">01. THE PROBLEM</p>
              <p className="text-muted-foreground">Innovation is trapped in theory. Great ideas lack the grit of a prototype.</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-primary font-bold mb-1">02. THE CHALLENGE</p>
              <p className="text-muted-foreground">96 Hours. Zero to founder in one weekend.</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-primary font-bold mb-1">03. THE OUTPUT</p>
              <p className="text-muted-foreground">Functional prototypes.The transition from student to builder.</p>
            </div>
          </div>
          <Button onClick={handleOpenModal} className="w-full mt-8 md:mt-10 bg-primary text-black hover:bg-primary/90 font-bold tracking-widest uppercase py-5 md:py-6 text-base md:text-lg">
            Claim Your Spot
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
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <div onClick={() => setShowTimeline(true)} className="p-6 md:p-8 border border-border bg-secondary/5 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-pointer">
            <div className="text-primary mb-4"><Code /></div>
            <h4 className="text-foreground font-mono font-bold uppercase mb-2 tracking-tight">Timeline</h4>
            <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Status: PENDING_MANIFEST...</p>
            <p className="text-sm text-muted-foreground mt-4">Find how Dehack fits into E-Week.</p>
          </div>
          <div onClick={() => setShowRulebook(true)} className="p-6 md:p-8 border border-border bg-secondary/5 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-pointer">
            <div className="text-primary mb-4"><Lightbulb /></div>
            <h4 className="text-foreground font-mono font-bold uppercase mb-2 tracking-tight">Rulebook</h4>
            <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Status: PENDING_MANIFEST...</p>
            <p className="text-sm text-muted-foreground mt-4">Plus FAQs.</p>
          </div>
          <div className="p-6 md:p-8 border border-border bg-secondary/5 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-wait">
            <div className="text-primary mb-4"><Zap /></div>
            <h4 className="text-foreground font-mono font-bold uppercase mb-2 tracking-tight">Dehack Website</h4>
            <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Status: PENDING_MANIFEST...</p>
            <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Timeline Modal */}
    <AnimatePresence>
      {showTimeline && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl" onClick={() => setShowTimeline(false)}>
        <motion.div initial={{
          scale: 0.5,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 20,
            stiffness: 300
          }
        }} exit={{
          scale: 0.5,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="relative w-full max-w-lg bg-background border-2 border-primary/50 p-10 film-grain shadow-2xl">
          <button onClick={() => setShowTimeline(false)} className="absolute top-6 right-6 text-primary hover:rotate-90 transition-transform duration-200">
            <X className="w-6 h-6" />
          </button>

          <div className="mb-10 text-center font-mono">
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-primary mb-2 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8" /> TIMELINE
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em]">
              DEHACK_OPERATIONS_HUB
            </p>
          </div>

          <div className="space-y-12">
            {dehackTimeline.map((item, idx) => <div key={idx} className="flex gap-6 border-l border-primary/30 pl-6 relative font-mono">
              <div className="absolute -left-[16px] top-0 w-8 h-8 bg-background border border-primary/50 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-primary font-bold text-xl tracking-tighter uppercase">{item.date}</span>
                  <span className="text-[8px] border border-primary/20 px-2 py-0.5 text-muted-foreground uppercase tracking-widest">{item.status}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.task}</p>
              </div>
            </div>)}
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>

    {/* Rulebook Modal */}
    <AnimatePresence>
      {showRulebook && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl" onClick={() => setShowRulebook(false)}>
        <motion.div initial={{
          scale: 0.5,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 20,
            stiffness: 300
          }
        }} exit={{
          scale: 0.5,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-background border-2 border-primary/50 p-12 film-grain shadow-2xl custom-scrollbar">
          <button onClick={() => setShowRulebook(false)} className="absolute top-6 right-6 text-primary hover:rotate-90 transition-transform duration-200">
            <X className="w-6 h-6" />
          </button>

          <div className="mb-12 text-center font-mono">
            <h2 className="text-5xl font-bold uppercase tracking-tighter text-primary mb-4 flex items-center justify-center gap-4">
              <BookOpen className="w-10 h-10" /> OFFICIAL RULEBOOK
            </h2>
            <p className="text-[12px] text-muted-foreground uppercase tracking-[0.6em] border-y border-primary/20 py-2 inline-block">
              PROTOCOL_DOCKET_v.2025
            </p>
          </div>

          <div className="space-y-10 font-mono text-sm text-muted-foreground leading-relaxed">
            <section className="border-l-4 border-primary/40 pl-6 py-2">
              <h3 className="text-primary font-bold text-lg mb-4 uppercase tracking-widest">1. Team Formation & Eligibility</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Teams may have 1–5 participants.</li>
                <li>One person registers the team and lists all members; limited flexibility to substitute members before the hackathon starts.</li>
                <li>Each participant may be part of only one team.</li>
                <li>No team changes are allowed once the hackathon begins.</li>
                <li>Teams must choose one track only.</li>
                <li>All participants must follow the event code of conduct.</li>
              </ul>
            </section>

            <section className="border-l-4 border-primary/40 pl-6 py-2">
              <h3 className="text-primary font-bold text-lg mb-4 uppercase tracking-widest">2. Track Selection & Problem Definition</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Solutions must align with the chosen track.</li>
                <li>Teams must define their own problem statement, except in the Company Sponsorship track.</li>
                <li>Problems must be real or plausible and scoped appropriately for the hackathon timeline.</li>
                <li>Track switching is not allowed once development begins.</li>
                <li>Track-specific rules and guidelines must be followed.</li>
                <li>Organizers may reassign projects to a more suitable track if required.</li>
                <li>Teams may work on existing or common ideas; innovation is not mandatory.</li>
                <li>Judging will focus on the quality of execution, not novelty alone.</li>
              </ul>
            </section>

            <section className="border-l-4 border-primary/40 pl-6 py-2">
              <h3 className="text-primary font-bold text-lg mb-4 uppercase tracking-widest">3. Development & Build Rules</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>All work must be done during the official hackathon period.</li>
                <li>Open-source tools, APIs, frameworks, templates, and AI tools are allowed with proper attribution.</li>
                <li>Starter kits and boilerplates are permitted; fully pre-built projects are not.</li>
                <li>Teams must understand and explain every part of their solution.</li>
                <li>Projects must comply with ethical, legal, and data-privacy standards.</li>
                <li>Any hardware used must be safe and organizer-approved.</li>
                <li>Plagiarism or misrepresentation will result in disqualification.</li>
              </ul>
            </section>

            <section className="border-l-4 border-primary/40 pl-6 py-2">
              <h3 className="text-primary font-bold text-lg mb-4 uppercase tracking-widest">4. Submission Requirements</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>All projects must be submitted before the deadline.</li>
                <li>Submissions must include: Project name and track, Problem statement, Solution overview, Demo link or live demo, Document showing iterations, MVP.</li>
                <li>Incomplete submissions will not be evaluated (partially built products may still be considered).</li>
                <li>Teams are responsible for ensuring their demo works at submission time.</li>
                <li>Submission format details will be shared in advance.</li>
                <li>Late submissions will not be accepted.</li>
              </ul>
            </section>

            <section className="border-l-4 border-primary/40 pl-6 py-2">
              <h3 className="text-primary font-bold text-lg mb-4 uppercase tracking-widest">5. Conduct, Ethics & Disqualification</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Participants must behave respectfully at all times.</li>
                <li>Harassment, discrimination, or disruptive behavior is strictly prohibited.</li>
                <li>Solutions must not promote harm, hate, or illegal activity.</li>
                <li>Attempts to manipulate judging are forbidden.</li>
                <li>Rule violations may lead to warnings or disqualification.</li>
                <li>Organizers may remove any participant or team at their discretion.</li>
                <li>Disqualified teams forfeit prize eligibility.</li>
              </ul>
            </section>
          </div>

          <div className="mt-16 p-6 bg-primary/10 border-2 border-primary/30 text-lg text-primary font-bold uppercase tracking-widest text-center font-mono">
            "VALIDATED IDEAS TO SCALABLE PRODUCTS"
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>

    {/* Registration Modal */}
    <AnimatePresence>
      {showModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
        <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary/30 p-8 film-grain">
          <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-primary mb-2">
              SIGN_UP_YOUR_SQUAD
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              TEAM UP WITH UP TO 5 PEOPLE.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                1. Team Name
              </label>
              <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono" placeholder="Enter team name..." />
            </div>

            <div className="border-l-2 border-primary/30 pl-6 space-y-4">
              <p className="text-xs text-primary uppercase tracking-widest font-bold">CAPTAIN DETAILS</p>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  2. Captain - Name (from Google)
                </label>
                <input type="text" value={captainName} readOnly className="w-full bg-black/60 border border-primary/30 px-4 py-3 text-foreground/70 cursor-not-allowed font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  3. Captain - Email (from Google)
                </label>
                <input type="email" value={captainEmail} readOnly className="w-full bg-black/60 border border-primary/30 px-4 py-3 text-foreground/70 cursor-not-allowed font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  4. Captain - Phone Number
                </label>
                <input type="tel" value={captainPhone} onChange={e => setCaptainPhone(e.target.value)} className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono" placeholder="Enter phone number..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                5. Number of Team Members (5 Including Captain)
              </label>
              <input type="number" min="1" value={numMembers} onChange={handleNumMembersChange} className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono" placeholder="Enter number (max 5)..." />
            </div>

            {teamMembers.map((member, index) => <div key={index} className="border-l-2 border-primary/30 pl-6 space-y-4">
              <p className="text-xs text-primary uppercase tracking-widest font-bold">
                MEMBER {index + 2} DETAILS
              </p>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  {6 + index * 3}. Team Member {index + 2} - Name
                </label>
                <input type="text" value={member.name} onChange={e => handleMemberChange(index, 'name', e.target.value)} className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono" placeholder="Enter name..." />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  {7 + index * 3}. Team Member {index + 2} - BITS Email
                </label>
                <input type="text" value={member.id} onChange={e => handleMemberChange(index, 'id', e.target.value)} className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono" placeholder="Enter BITS Email..." />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  {8 + index * 3}. Team Member {index + 2} - Phone Number
                </label>
                <input type="tel" value={member.phone} onChange={e => handleMemberChange(index, 'phone', e.target.value)} className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono" placeholder="Enter phone number..." />
              </div>
            </div>)}

            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-primary text-black font-bold uppercase py-6 mt-8 tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50">
              {isSubmitting ? 'SUBMITTING...' : 'FINALISE'}
            </Button>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </div>;
};
export default Dehack;