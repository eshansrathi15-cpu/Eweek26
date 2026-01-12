import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket, Star, Zap, Trophy, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Map event names to sheet tab names
const EVENT_SHEET_MAP: Record<string, string> = {
  "DEHACK": "DEHACK",
  "BEDROCK": "BEDROCK",
  "WOLF OF DALAL STREET": "WOLF_DALAL",
  "HOW TO TRAIN YOUR DELIVERY TEAM": "DELIVERY_TEAM",
  "HANGOVER: THE TREASURE HUNT": "HANGOVER",
  "ONE RED PAPERCLIP": "RED_PAPERCLIP",
};

const Tickets = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const events = [
    { id: 1, name: "DEHACK", type: "Hackathon", date: "Feb 11-16", prize: "₹1L+" },
    { id: 2, name: "BEDROCK", type: "Market War", date: "Feb 09-15", prize: "₹50K+" },
    { id: 3, name: "WOLF OF DALAL STREET", type: "Trading Sim", date: "Feb 10", prize: "₹25K+" },
    { id: 4, name: "HOW TO TRAIN YOUR DELIVERY TEAM", type: "Ops Challenge", date: "Feb 12", prize: "₹15K+" },
    { id: 5, name: "HANGOVER: THE TREASURE HUNT", type: "Exploration", date: "Feb 13", prize: "₹20K+" },
    { id: 6, name: "ONE RED PAPERCLIP", type: "Logistics Challenge", date: "Feb 14", prize: "Priceless" },
  ];

  const handleRegisterClick = (eventName: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first', {
        description: 'You need to be logged in to register for events.'
      });
      return;
    }

    if (registeredEvents.includes(eventName)) {
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
        setRegisteredEvents([...registeredEvents, selectedEvent]);
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Premiere
          </Link>
        </motion.div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Ticket className="text-primary w-8 h-8" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">EVENT_TICKETS</h1>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border border-primary/20 bg-secondary/5 p-8 hover:bg-primary/10 transition-all flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-transparent hover:border-l-primary"
            >
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-primary tracking-[0.3em] uppercase mb-2 font-bold">
                  <Star className="w-3 h-3" /> {event.type}
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{event.name}</h3>
                <div className="flex gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 uppercase font-semibold"><Zap className="w-3 h-3" /> {event.date}</span>
                  <span className="flex items-center gap-2 uppercase font-semibold"><Trophy className="w-3 h-3 text-yellow-500" /> {event.prize}</span>
                </div>
              </div>
              <Button
                onClick={() => handleRegisterClick(event.name)}
                className={`w-full md:w-auto font-bold uppercase py-8 px-12 tracking-widest transition-transform shadow-[0_0_20px_rgba(147,245,255,0.2)] ${registeredEvents.includes(event.name)
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-primary text-black hover:scale-105'
                  }`}
                disabled={registeredEvents.includes(event.name)}
              >
                {registeredEvents.includes(event.name) ? (
                  <span className="flex items-center gap-2"><Check className="w-5 h-5" /> REGISTERED</span>
                ) : (
                  'REGISTER_NOW'
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

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
