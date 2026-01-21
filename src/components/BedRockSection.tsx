import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Award, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const BedRockSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Modal and form states
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [captainId, setCaptainId] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  // A 6x4 grid of blocks to cover the view
  const blocks = Array.from({ length: 24 });

  const handleAssemble = () => {
    setIsGenerating(true);
    setTimeout(() => {
      navigate("/bedrock");
    }, 1800);
  };

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      toast.error('Please login first', {
        description: 'You need to be logged in to register for events.'
      });
      return;
    }
    // Auto-fill captain details from Google login
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
    if (!teamName || !captainId || !captainPhone) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Format team members for sheet
      const membersData = teamMembers.map((m: any) => `${m.name} (${m.id}) [${m.phone}]`).join(', ');

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheet_name: 'BEDROCK',
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
          description: 'Your team has been registered for BEDROCK.'
        });
        setShowModal(false);
        // Reset form
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
    <section className="py-24 relative overflow-hidden bg-secondary/20 font-mono">
      {/* COHESIVE BLUE BLOCK TRANSITION */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden"
          >
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-4">
              {blocks.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -1000, scale: 0, rotate: 45 }}
                  animate={{
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      delay: i * 0.04,
                      type: "spring",
                      damping: 15,
                      stiffness: 120
                    }
                  }}
                  className="w-20 h-20 md:w-32 md:h-32 bg-primary/20 border-2 border-primary shadow-[0_0_20px_rgba(147,245,255,0.3)] relative"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(147,245,255,0.1) 25%, transparent 25%, transparent 50%, rgba(147,245,255,0.1) 50%, rgba(147,245,255,0.1) 75%, transparent 75%, transparent)`,
                    backgroundSize: '20px 20px',
                  }}
                >
                  <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/50" />
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.95, 1, 0.95] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute bottom-16 text-primary font-bold text-2xl tracking-[0.6em] uppercase"
            >
              Building
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Award Trophy Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-square border-4 border-primary p-1 relative shadow-[0_0_30px_rgba(147,245,255,0.1)]">
              <div className="w-full h-full bg-background border-2 border-primary/30 flex flex-col items-center justify-center relative">
                <Crown className="w-32 h-32 text-primary" strokeWidth={1} />
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Award For</p>
                  <p className="text-xl font-bold text-primary mt-1 uppercase">Best Business</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs tracking-widest uppercase font-bold">Best Picture Nominee</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-primary mb-6 tracking-tighter">BEDROCK</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-sans">The C'Not Takeover. Marketing. Profit. Glory.</p>

            <div className="grid grid-cols-3 gap-4 mb-10 text-center">
              {[{ icon: Users, label: 'TEAMS', value: '13' },
              { icon: TrendingUp, label: 'REVENUE', value: '₹10L+' },
              { icon: Crown, label: 'CHAMPION', value: '1' }
              ].map((stat, i) => (
                <div key={i} className="p-4 border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleAssemble}
                variant="default"
                size="lg"
                className="text-lg bg-primary text-black hover:bg-primary/90 font-bold px-10 py-8 tracking-widest uppercase shadow-[0_0_20px_rgba(147,245,255,0.2)]"
                disabled={isGenerating}
              >
                {isGenerating ? "BUILDING..." : "PLOT REVEAL"}
              </Button>
              <Button
                onClick={handleOpenModal}
                variant="outline"
                size="lg"
                className="text-lg border-2 border-primary text-primary hover:bg-primary/10 font-bold px-10 py-8 tracking-widest uppercase"
              >
                BOOK NOW
              </Button>
            </div>
          </motion.div>
        </div>
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
                  TEAM_REGISTRATION
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  SECURE_FORM_v2.1 // BROWNIE POINTS FOR COOLEST NAMES!
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

export default BedRockSection;