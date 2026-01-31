import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

export const events = [
  { name: 'HOW TO TRAIN YOUR DELIVERY TEAM', desc: 'Take over ANC & Looters to master logistics and operations! Optimize delivery routes, manage resources and team up with up to 6 people for maximum sales!', rating: 'PG', category: 'EVENT', slug: 'delivery-team' },
  { name: 'WOLF OF DALAL STREET', desc: 'Colgate making candy? Prove you can pitch the impossible and snag a spot on our very own stock market. Register with a team of 1-5 your stocks, trash-talk competitors and bag the highest IPO! Test your market instincts and skill in this intense simulation.', rating: 'PG', category: 'EVENT', slug: 'wolf-of-dalal' },
  { name: 'MISIRLOU: A KNIVES OUT MYSTERY', desc: '"Challenge yourself to a fusion of two classic events on campus—an escape room and a treasure hunt—but with a twist. The slowest team will be eliminated each round. Make your escape before time runs out.', rating: 'G', category: 'EVENT', slug: 'misirlou' },
  { name: 'ONE RED PAPERCLIP', desc: 'One lone paperclip, infinite possibilities. Trade your way up and prove that the ultimate prize is just a few deals away. How far can you go?', rating: 'G', category: 'EVENT', slug: 'red-paperclip' },
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
          <p className="text-muted-foreground text-center mb-10 md:mb-16 max-w-xl mx-auto font-mono text-xs md:text-sm tracking-wider">
            — SELECT YOUR FEATURE —
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                className="border-2 border-foreground p-4 md:p-6 h-48 md:h-56 flex flex-col justify-between transition-all duration-300 cursor-pointer group-hover:bg-primary group-hover:border-primary relative overflow-hidden event-tile"
                data-title={event.name}
                data-desc={event.desc}
                onClick={() => onEventClick?.(event)}
              >
                {/* Movie rating badge */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-8 md:h-8 border border-current flex items-center justify-center">
                  <span className="text-[9px] md:text-[10px] font-mono font-bold group-hover:text-primary-foreground transition-colors">
                    {event.rating}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-mono font-bold mt-1 md:mt-2 text-foreground group-hover:text-primary-foreground transition-colors pr-12">
                    {event.name}
                  </h3>
                </div>

                <div>
                  <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors mb-2 md:mb-3 line-clamp-2 md:line-clamp-none">
                    {event.desc}
                  </p>
                  {/* Showtime style footer */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border group-hover:border-primary-foreground/30 transition-colors">
                    <span className="text-xs font-mono font-bold text-primary group-hover:text-primary-foreground transition-colors">
                      REGISTER HERE
                    </span>
                  </div>
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