import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket, Star, Zap, Trophy, X, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";

import { EVENT_SHEET_MAP } from "@/lib/constants";
import { useGoogleLogin } from '@react-oauth/google';


const EVENT_DETAILS: Record<string, { description: string; prize: string }> = {
  "MISSION: POSSIBLE?": {
    description: "Suggest solutions to problems. You decide what the problem is. ANC cats bothering you? No Diet Coke in your vendi? Pitch your solutions and raise real capital from the student body.",
    prize: "TBA"
  },
  "WOLF OF DALAL STREET": {
    description: "Durex making diapers? Prove you can pitch the impossible and snag a spot on BITS' very own stock market. Market your stocks, trash talk competitors and collect E-Bucks to bag the highest IPO! Test your market instincts and trading skills in this intense simulation.",
    prize: "TBA"
  },
  "HOW TO TRAIN YOUR DELIVERY TEAM": {
    description: "Take over ANC & Looters to master logistics and operations! Optimize delivery routes, manage resources and team up for maximum sales!",
    prize: "TBA"
  },
  "MISIRLOU: A KNIVES OUT MYSTERY": {
    description: "Challenge yourself to a fusion of two classic events on campus—an escape room and a treasure hunt—but with a twist. The slowest team will be eliminated each round. Make your escape before time runs out.",
    prize: "TBA"
  },
  "ONE RED PAPERCLIP": {
    description: "One lone paperclip, infinite possibilities. Trade your way up and prove that the ultimate prize is just a few deals away. How far can you go?",
    prize: "TBA"
  },
  "WHAT DA FUKREY": {
    description: "Tired of your wingies? Sell them. Navigate the ultimate trading challenge where strategy meets negotiation in this high-stakes marketplace.",
    prize: "TBA"
  }
};

const Tickets = () => {
  const { user, isAuthenticated } = useAuth();
  const { registeredEvents, addRegisteredEvent, isLoading: isCheckingStatus } = useRegistrationStatus();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [learnMoreEvent, setLearnMoreEvent] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Login flow
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        const credential = {
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        };

        localStorage.setItem('user', JSON.stringify(credential));
        window.location.reload();
      } catch (error) {
        console.error("Login Failed", error);
        toast.error("Login failed. Please try again.");
      }
    },
    onError: () => toast.error("Google Login failed."),
  });


  const events = [
    { id: 1, name: "MISSION: POSSIBLE?", type: "Crowdfunding", prize: "$$$" },
    { id: 2, name: "WHAT DA FUKREY", type: "Online Game", prize: "$$$" },
    { id: 3, name: "WOLF OF DALAL STREET", type: "Trading Sim", prize: "$$$" },
    { id: 4, name: "HOW TO TRAIN YOUR DELIVERY TEAM", type: "Ops Challenge", prize: "$$$" },
    { id: 5, name: "MISIRLOU: A KNIVES OUT MYSTERY", type: "Exploration", prize: "$$$" },
    { id: 6, name: "ONE RED PAPERCLIP", type: "Logistics Challenge", date: "", prize: "$$$" },
  ];

  const isEventRegistered = (eventName: string) => {
    const sheetName = EVENT_SHEET_MAP[eventName];
    return registeredEvents.includes(sheetName);
  };

  const handleRegisterClick = (eventName: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first', {
        description: 'You need to be logged in to register for events.'
      });
      return;
    }

    if (isEventRegistered(eventName)) {
      toast.info('Already registered', {
        description: `You have already registered for ${eventName}.`
      });
      return;
    }

    setSelectedEvent(eventName);
  };

  const handleConfirmRegistration = async () => {
    if (!selectedEvent || !user) return;

    setIsSubmitting(true);
    try {
      const sheetName = EVENT_SHEET_MAP[selectedEvent];

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheet_name: sheetName,
          row_data: [
            new Date().toISOString(),
            user.name,
            user.email,
            selectedEvent,
            'Individual Registration'
          ]
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Registration successful!', {
          description: `You have been registered for ${selectedEvent}.`
        });
        addRegisteredEvent(sheetName);
        setSelectedEvent(null);
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
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain font-mono">

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex justify-between items-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Premiere
          </Link>

          {user ? (
            <div className="flex items-center gap-3 bg-secondary/10 px-4 py-2 rounded-full border border-primary/20">
              <span className="text-xs uppercase tracking-widest text-primary font-bold hidden md:block">
                {user.name}
              </span>
              {user.picture ? (
                <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full border-2 border-primary/50" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => googleLogin()}
              className="bg-primary text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
            >
              LOGIN
            </Button>
          )}
        </motion.div>


        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-4">
          <Ticket className="text-primary w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">EVENT_TICKETS</h1>
        </div>

        {/* Notice Banner - Now as Subheading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-l-4 border-primary bg-primary/5 p-4 backdrop-blur-sm"
        >
          <p className="text-sm md:text-base font-mono text-primary uppercase tracking-[0.2em] leading-relaxed font-bold">
            {">"} Please register for DEHACK and BEDROCK on their individual event pages
          </p>
        </motion.div>

        {/* Event List */}
        <div className="space-y-4">
          {events.map((event, i) => {
            const isRegistered = isEventRegistered(event.name);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group border border-primary/20 bg-secondary/5 p-6 md:p-8 hover:bg-primary/10 transition-all flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-transparent hover:border-l-primary"
              >
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-primary tracking-[0.3em] uppercase mb-2 font-bold">
                    <Star className="w-3 h-3" /> {event.type}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{event.name}</h3>
                  <div className="flex gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2 uppercase font-semibold"><Zap className="w-3 h-3" /> {event.date}</span>
                    <span className="flex items-center gap-2 uppercase font-semibold"><Trophy className="w-3 h-3 text-yellow-500" /> {event.prize}</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <Button
                    onClick={() => setLearnMoreEvent(event.name)}
                    variant="outline"
                    className="w-full md:w-auto font-bold uppercase py-5 px-8 tracking-widest border-primary/30 text-primary hover:bg-primary/20 transition-all text-sm"
                  >
                    <Info className="w-4 h-4 mr-2" /> LEARN_MORE
                  </Button>
                  {event.name === "WHAT DA FUKREY" || event.name === "MISSION: POSSIBLE?" ? (
                    <a
                      href="javascript:void(0)"
                      onClick={(e) => e.preventDefault()}
                      className="w-full md:w-auto font-bold uppercase py-5 px-8 tracking-widest transition-transform shadow-[0_0_20px_rgba(147,245,255,0.2)] text-sm bg-primary text-black hover:scale-105 inline-flex items-center justify-center cursor-pointer"
                    >
                      COMING SOON
                    </a>
                  ) : (
                    <Button
                      onClick={() => handleRegisterClick(event.name)}
                      className={`w-full md:w-auto font-bold uppercase py-5 px-8 tracking-widest transition-transform shadow-[0_0_20px_rgba(147,245,255,0.2)] text-sm ${isRegistered
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-primary text-black hover:scale-105'
                        }`}
                      disabled={isRegistered || isCheckingStatus}
                    >
                      {isRegistered ? (
                        <span className="flex items-center gap-2"><Check className="w-5 h-5" /> REGISTERED</span>
                      ) : (
                        'REGISTER_NOW'
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Learn More Modal */}
      <AnimatePresence>
        {learnMoreEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setLearnMoreEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-background border-2 border-primary/30 p-8 film-grain"
            >
              <button
                onClick={() => setLearnMoreEvent(null)}
                className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-primary mb-2">
                  {learnMoreEvent}
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  EVENT_DETAILS_v1.0
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    {EVENT_DETAILS[learnMoreEvent]?.description}
                  </p>
                </div>

                <div className="border-2 border-primary bg-primary/10 p-6 text-center">
                  <p className="text-xs text-primary uppercase tracking-widest mb-2 font-bold">
                    PRIZE POOL
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                    {EVENT_DETAILS[learnMoreEvent]?.prize}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setLearnMoreEvent(null)}
                className="w-full bg-primary text-black font-bold uppercase tracking-widest hover:bg-primary/80 py-6"
              >
                CLOSE
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-background border-2 border-primary/30 p-8 film-grain"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-tighter text-primary mb-2">
                  CONFIRM_REGISTRATION
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  SECURE_FORM_v2.1
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Event</p>
                  <p className="text-lg font-bold text-primary">{selectedEvent}</p>
                </div>
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Registering As</p>
                  <p className="text-foreground font-mono">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <div className="border border-primary/20 bg-primary/5 p-3 rounded-sm">
                  <p className="text-[10px] md:text-xs font-mono text-primary uppercase tracking-widest leading-relaxed">
                    {">"} You'll be emailed a community link upon registering!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setSelectedEvent(null)}
                  variant="outline"
                  className="flex-1 border-primary/30 text-foreground uppercase tracking-widest"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmRegistration}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-black font-bold uppercase tracking-widest hover:bg-primary/80 disabled:opacity-50"
                >
                  {isSubmitting ? 'REGISTERING...' : 'CONFIRM'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tickets;
