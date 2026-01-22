import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

const events = [
  { name: 'HOW TO TRAIN YOUR DELIVERY TEAM', desc: 'Take over ANC & Looters!', rating: 'PG', category: 'EVENT' },
  { name: 'WHAT DA FUKREY', desc: 'Tired of your wingies? Sell them. Join the community here, no regstrations required!', rating: 'G', category: 'EVENT' },
  { name: 'WOLF OF DALAL STREET', desc: 'Build your company, bet on the IPO!', rating: 'PG', category: 'EVENT' },
  { name: 'MISIRLOU : A KNIVES OUT MYSTERY', desc: 'Elementary, my dear Watson.', rating: 'G', category: 'EVENT' },
  { name: 'MISSION:POSSIBLE?', desc: 'Raise capital to fund your solutions to campus problems. Join the community here, no registrations required!', rating: 'R', category: 'EVENT' },
  { name: 'ONE RED PAPERCLIP', desc: 'Trade your way up, starting from a single paperclip.', rating: 'G', category: 'EVENT' },
];

interface EventsGridProps {
  onEventClick?: (event: typeof events[0]) => void;
}

const EventsGrid = ({ onEventClick }: EventsGridProps) => {
  return (
    <section className="py-24">
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
            >
              {/* ADD 'event-tile' class and data attributes here: */}
              <div
                className="border-2 border-foreground p-6 h-56 flex flex-col justify-between transition-all duration-300 cursor-pointer group-hover:bg-primary group-hover:border-primary relative overflow-hidden event-tile"
                data-title={event.name}
                data-desc={event.desc}
                onClick={() => onEventClick?.(event)}
              >
                {/* Movie rating badge */}
                <div className="absolute top-3 right-3 w-8 h-8 border border-current flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold group-hover:text-primary-foreground transition-colors">
                    {event.rating}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-mono font-bold mt-2 text-foreground group-hover:text-primary-foreground transition-colors">
                    {event.name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors mb-3">
                    {event.desc}
                  </p>
                  {/* Showtime style footer */}
                  {event.name !== "WHAT DA FUKREY" && event.name !== "MISSION:POSSIBLE?" && (
                    <div className="flex items-center gap-2 pt-3 border-t border-border group-hover:border-primary-foreground/30 transition-colors">
                      <span className="text-xs font-mono font-bold text-primary group-hover:text-primary-foreground transition-colors">
                        REGISTER HERE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;