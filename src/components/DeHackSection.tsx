import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Terminal, Clock, Film, DollarSign, Rocket, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// --- MATRIX ANIMATION COMPONENT ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    // CHANGED: Shifted from Matrix Green to Cyber Blue (#00d2ff)
    const color = "#00d2ff"; 
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$<>/-+*=%";
    const characters = charSet.split("");

    const draw = () => {
      // Create a trailing effect with semi-transparent black
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after hitting bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const DeHackSection = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [captainId, setCaptainId] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const smokeParticles = Array.from({ length: 8 });

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      navigate("/dehack");
    }, 1800);
  };

  const handleOpenModal = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfchPf5RNBt0-ymzQjWUTv5g7Owcl2OqxQGZyGOXOrpkXj3-Q/viewform', '_blank');
  };

  const handleNumMembersChange = (e) => {
    const inputValue = e.target.value;
    setNumMembers(inputValue);

    if (inputValue !== '') {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue > 0) {
        const membersCount = Math.max(0, numValue - 1);
        setTeamMembers(Array(membersCount).fill(null).map(() => ({ name: '', id: '', phone: '' })));
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
    // FIXED: Removed !captainId from validation logic
    if (!teamName || !captainPhone) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const membersData = teamMembers.map((m: any) => `${m.name} (${m.id}) [${m.phone}]`).join(', ');

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
            captainEmail, // FIXED: Sending Email as ID since ID input doesn't exist
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

  return (
    <section id="dehack" className="py-24 relative overflow-hidden">
      <AnimatePresence>
        {isLaunching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                {smokeParticles.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0, scale: 0.5 }}
                    animate={{
                      y: [0, 200],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 2.5],
                      filter: ["blur(0px)", "blur(12px)"]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + (i * 0.1),
                      ease: "easeOut"
                    }}
                    className="absolute w-12 h-12 bg-primary/20 rounded-full"
                    style={{ left: `${(Math.random() - 0.5) * 40}px` }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{
                  y: [300, 0, -800],
                  opacity: [0, 1, 1],
                  scale: [0.8, 1, 1.2]
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeIn"
                }}
                className="text-primary relative z-10"
              >
                <Rocket size={100} className="-rotate-45" />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-16 bg-primary blur-xl rounded-full opacity-50"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                className="mt-20 font-mono text-primary text-sm tracking-[0.8em] uppercase font-bold"
              >
                Ignition_Confirmed
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 5 }}
            className="h-px bg-primary absolute"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Film className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Feature Presentation</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-mono font-bold text-foreground mb-6">DE<span className="animate-glitch">HACK</span></h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">Build. Break. Innovate.</p>
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground font-mono text-sm uppercase">4 Days</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-foreground font-mono text-sm uppercase">PRIZES WORTH UPTO ₹50,000</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleLaunch} variant="outline" size="lg" className="text-lg group" disabled={isLaunching}>
                <Terminal className="w-5 h-5 mr-2" />
                <span className="group-hover:text-primary transition-colors uppercase font-bold">Initialize Research</span>
                <motion.span className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </Button>
              <Button onClick={handleOpenModal} variant="outline" size="lg" className="text-lg group border-primary bg-primary/10 hover:bg-primary/20">
                <Rocket className="w-5 h-5 mr-2 text-primary" />
                <span className="text-primary uppercase font-bold">REGISTER HERE</span>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="aspect-square border-2 border-foreground relative overflow-hidden bg-background">
              <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2 z-20">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 text-xs font-mono text-muted-foreground uppercase">Live Feed</span>
              </div>
              
              <div className="absolute inset-0 pt-8">
                <MatrixRain />
              </div>

              <div className="absolute bottom-4 right-4 font-mono text-xs text-primary/70 z-20 bg-background/50 px-1">TC 00:00:00:00</div>
              <div className="absolute top-8 left-0 w-8 h-8 border-t-4 border-l-4 border-primary z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary z-20" />
            </div>
          </motion.div>
        </div>
      </div>

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
                  TEAM_REGISTRATION
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
                      4. Captain - Phone Number
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
                    5. Number of Team Members (Including Captain)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={numMembers}
                    onChange={handleNumMembersChange}
                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                    placeholder="Enter number (max 5)..."
                  />
                </div>

                {teamMembers.map((member: any, index: number) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-6 space-y-4">
                    <p className="text-xs text-primary uppercase tracking-widest font-bold">
                      MEMBER {index + 2} DETAILS
                    </p>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                        {6 + index * 3}. Team Member {index + 2} - Name
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
                        {7 + index * 3}. Team Member {index + 2} - BITS Email
                      </label>
                      <input
                        type="text"
                        value={member.id}
                        onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                        className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                        placeholder="Enter BITS Email..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                        {8 + index * 3}. Team Member {index + 2} - Phone Number
                      </label>
                      <input
                        type="tel"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                        placeholder="Enter phone number..."
                      />
                    </div>
                  </div>
                ))}

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-primary text-black font-bold uppercase py-6 mt-8 tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT_REGISTRATION'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DeHackSection;