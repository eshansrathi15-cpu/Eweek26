import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import { useState } from 'react';
import RegistrationModal from '@/components/RegistrationModal';

const events = [
  { name: 'HOW TO TRAIN YOUR DELIVERY TEAM', category: 'TECH', desc: 'Hands-on sessions with industry experts', rating: 'PG', isTeamEvent: true },
  { name: 'WING TRADE', category: 'INNOVATION', desc: 'Rapid ideation competition', rating: 'G', isTeamEvent: true },
  { name: 'WOLF OF DALAL STREET', category: 'INSIGHTS', desc: 'Leaders share their journey', rating: 'PG', isTeamEvent: false },
  { name: 'MOVIE SCREENING', category: 'BUSINESS', desc: 'Showcase your venture', rating: 'G', isTeamEvent: false },
  { name: 'HANGOVER: THE TREASURE HUNT', category: 'COMPETITIVE', desc: 'Shortest code wins', rating: 'R', isTeamEvent: true },
  { name: 'ONE RED PAPERCLIP', category: 'CONNECT', desc: 'Build lasting connections', rating: 'G', isTeamEvent: false },
];

const EventsGrid = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleEventClick = (eventName: string) => {
    setSelectedEvent(eventName);
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
          {/* Section header with ticket icon */}
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
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
              onClick={() => handleEventClick(event.name)}
            >
              <div
                className="border-2 border-foreground p-6 h-56 flex flex-col justify-between transition-all duration-300 cursor-pointer group-hover:bg-primary group-hover:border-primary relative overflow-hidden event-tile"
                data-title={event.name}
                data-desc={event.desc}
              >
                {/* Movie rating badge */}
                <div className="absolute top-3 right-3 w-8 h-8 border border-current flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold group-hover:text-primary-foreground transition-colors">
                    {event.rating}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-primary-foreground/70 transition-colors tracking-widest">
                    {event.category}
                  </span>
                  <h3 className="text-2xl font-mono font-bold mt-2 text-foreground group-hover:text-primary-foreground transition-colors">
                    {event.name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors mb-3">
                    {event.desc}
                  </p>
                  {/* Showtime style footer */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border group-hover:border-primary-foreground/30 transition-colors">
                    <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary-foreground/60 transition-colors">
                      CLICK TO REGISTER
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <RegistrationModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventName={selectedEvent || ""}
        isTeamEvent={selectedEventData?.isTeamEvent || false}
        title={selectedEvent || ""}
        subtitle={selectedEventData?.category || "EVENT REGISTRATION"}
      />
    </section>
  );
};

export default EventsGrid;
