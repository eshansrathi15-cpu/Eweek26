import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Cpu, Zap, Shield, Trophy, Calendar, Clock, MapPin, MessageSquare, HelpCircle, ChevronRight, Layers, Code, Lightbulb, Radio, X } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Dehack = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const handleNumMembersChange = (e) => {
    const inputValue = e.target.value;
    setNumMembers(inputValue);

    if (inputValue !== '') {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue > 0) {
        const membersCount = Math.max(0, numValue - 1);
        setTeamMembers(Array(membersCount).fill(null).map(() => ({ name: '', id: '' })));
      }
    } else {
      setTeamMembers([]);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async () => {
    if (!teamName || !captainId || !captainPhone) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const membersData = teamMembers.map((m: any) => `${m.name} (${m.id})`).join(', ');

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheet_name: 'DEHACK',
          row_data: [
            new Date().toISOString(),
            teamName,
            captainName,
            captainEmail,
            captainId,
            captainPhone,
            numMembers,
            membersData
          ]
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
        toast.error('Registration failed', { description: data.error });
      }
    } catch (error) {
      toast.error('Registration failed', { description: 'Please try again later.' });
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
          <Button onClick={handleOpenModal} className="w-full mt-10 bg-primary text-black hover:bg-primary/90 font-bold tracking-widest uppercase py-6 text-lg">
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

    {/* Registration Modal */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary/30 p-8 film-grain"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-primary mb-2">
                SIGN_UP_YOUR_SQUAD
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                SECURE_FORM_v2.1 // GO CRAZY
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                  1. Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                  placeholder="Enter team name..."
                />
              </div>

              <div className="border-l-2 border-primary/30 pl-6 space-y-4">
                <p className="text-xs text-primary uppercase tracking-widest font-bold">CAPTAIN DETAILS</p>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                    2. Captain - Name (from Google)
                  </label>
                  <input
                    type="text"
                    value={captainName}
                    readOnly
                    className="w-full bg-black/60 border border-primary/30 px-4 py-3 text-foreground/70 cursor-not-allowed font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                    3. Captain - Email (from Google)
                  </label>
                  <input
                    type="email"
                    value={captainEmail}
                    readOnly
                    className="w-full bg-black/60 border border-primary/30 px-4 py-3 text-foreground/70 cursor-not-allowed font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                    4. Captain - BITS ID
                  </label>
                  <input
                    type="text"
                    value={captainId}
                    onChange={(e) => setCaptainId(e.target.value)}
                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                    placeholder="Enter BITS ID..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                    5. Captain - Phone Number
                  </label>
                  <input
                    type="tel"
                    value={captainPhone}
                    onChange={(e) => setCaptainPhone(e.target.value)}
                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                    placeholder="Enter phone number..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                  6. Number of Team Members (Including Captain)
                </label>
                <input
                  type="number"
                  min="1"
                  value={numMembers}
                  onChange={handleNumMembersChange}
                  className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                  placeholder="Enter number..."
                />
              </div>

              {teamMembers.map((member, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-6 space-y-4">
                  <p className="text-xs text-primary uppercase tracking-widest font-bold">
                    MEMBER {index + 2} DETAILS
                  </p>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                      {7 + index * 2}. Team Member {index + 2} - Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                      placeholder="Enter name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                      {8 + index * 2}. Team Member {index + 2} - BITS ID
                    </label>
                    <input
                      type="text"
                      value={member.id}
                      onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                      className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                      placeholder="Enter BITS ID..."
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-bold uppercase py-6 mt-8 tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING...' : 'FINALISE'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>;
};
export default Dehack;