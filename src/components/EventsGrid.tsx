import { motion } from 'framer-motion';
import { Ticket, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import RegistrationModal, { EventConfig } from '@/components/RegistrationModal';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface EventDef {
  name: string;
  category: string;
  desc: string;
  rating: string;
  isTeamEvent: boolean;
  config?: EventConfig;
  disableRegistration?: boolean;
}

const events: EventDef[] = [
  {
    name: 'HOW TO TRAIN YOUR DELIVERY TEAM',
    category: 'TECH',
    desc: 'Hands-on sessions with industry experts',
    rating: 'PG',
    isTeamEvent: true,
    config: {
      extraFields: []
    }
  },
  {
    name: 'WING TRADE',
    category: 'INNOVATION',
    desc: 'Rapid ideation competition',
    rating: 'G',
    isTeamEvent: true,
    disableRegistration: true
  },
  {
    name: 'WOLF OF DALAL STREET',
    category: 'INSIGHTS',
    desc: 'Leaders share their journey',
    rating: 'PG',
    isTeamEvent: false
  },
  {
    name: 'MOVIE SCREENING',
    category: 'BUSINESS',
    desc: 'Showcase your venture',
    rating: 'G',
    isTeamEvent: false,
    disableRegistration: true
  },
  {
    name: 'HANGOVER: THE TREASURE HUNT',
    category: 'COMPETITIVE',
    desc: 'Shortest code wins',
    rating: 'R',
    isTeamEvent: false
  },
  {
    name: 'ONE RED PAPERCLIP',
    category: 'CONNECT',
    desc: 'Build lasting connections',
    rating: 'G',
    isTeamEvent: false
  },
];

const EventsGrid = () => {
  const { user, login } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [registering, setRegistering] = useState<Record<string, boolean>>({});
  const [registered, setRegistered] = useState<Record<string, boolean>>({});

  const handleEventClick = async (event: EventDef) => {
    if (event.disableRegistration) return;

    // Special Case: Team Events still trigger Modal
    if (event.isTeamEvent) {
      setSelectedEvent(event.name);
      return;
    }

    // 1-Click Registration Flow
    if (!user) {
      login();
      return;
    }

    if (registered[event.name]) return;

    setRegistering(prev => ({ ...prev, [event.name]: true }));

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: event.name.replace(/\s+/g, '_').toUpperCase(),
          user: { name: user.name, email: user.email },
          registrationData: {
            interested: true,
            timestamp: new Date().toISOString()
          }
        })
      });

      if (res.ok) {
        setRegistered(prev => ({ ...prev, [event.name]: true }));
        toast.success(`Successfully registered for ${event.name}!`);
      } else {
        const d = await res.json();
        toast.error(`Registration failed: ${d.message}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    } finally {
      setRegistering(prev => ({ ...prev, [event.name]: false }));
    }
  };

  const selectedEventData = events.find(e => e.name === selectedEvent);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ticket className="w-6 h-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-center">
              NOW <span className="text-primary">PLAYING</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto font-mono text-sm tracking-wider">
            — SELECT YOUR FEATURE —
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const isRegistered = registered[event.name];
            const isLoading = registering[event.name];
            const isDisabled = event.disableRegistration;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
                onClick={() => handleEventClick(event)}
              >
                <div
                  className={`border-2 p-6 h-56 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden event-tile
                    ${isRegistered
                      ? 'border-primary bg-primary/10'
                      : 'border-foreground group-hover:bg-primary group-hover:border-primary'
                    }`}
                  data-title={event.name}
                  data-desc={event.desc}
                >
                  <div className="absolute top-3 right-3 w-8 h-8 border border-current flex items-center justify-center">
                    <span className={`text-[10px] font-mono font-bold transition-colors ${!isRegistered && 'group-hover:text-primary-foreground'}`}>
                      {event.rating}
                    </span>
                  </div>

                  <div>
                    <span className={`text-xs font-mono text-muted-foreground transition-colors tracking-widest ${!isRegistered && 'group-hover:text-primary-foreground/70'}`}>
                      {event.category}
                    </span>
                    <h3 className={`text-2xl font-mono font-bold mt-2 text-foreground transition-colors ${!isRegistered && 'group-hover:text-primary-foreground'}`}>
                      {event.name}
                    </h3>
                  </div>

                  <div>
                    <p className={`text-sm text-muted-foreground transition-colors mb-3 ${!isRegistered && 'group-hover:text-primary-foreground/80'}`}>
                      {event.desc}
                    </p>
                    <div className={`flex items-center gap-2 pt-3 border-t transition-colors ${isRegistered ? 'border-primary' : 'border-border group-hover:border-primary-foreground/30'}`}>
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-primary font-bold animate-pulse">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-[10px] font-mono uppercase">REGISTERING...</span>
                        </div>
                      ) : isRegistered ? (
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <Check className="w-4 h-4" />
                          <span className="text-[10px] font-mono uppercase">REGISTERED</span>
                        </div>
                      ) : (
                        <span className={`text-[10px] font-mono text-muted-foreground transition-colors ${!isDisabled && 'group-hover:text-primary-foreground/60'}`}>
                          {isDisabled ? "DETAILS COMING SOON" : "CLICK TO REGISTER"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <RegistrationModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventName={selectedEvent || ""}
        isTeamEvent={selectedEventData?.isTeamEvent || false}
        title={selectedEvent || ""}
        subtitle={selectedEventData?.category || "EVENT REGISTRATION"}
        config={selectedEventData?.config}
      />
    </section>
  );
};

export default EventsGrid;
