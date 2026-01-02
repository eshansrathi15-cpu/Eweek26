import { motion } from 'framer-motion';

const events = [
  { name: 'WORKSHOP', category: 'TECH', desc: 'Hands-on sessions with industry experts' },
  { name: 'IDEATHON', category: 'INNOVATION', desc: 'Rapid ideation competition' },
  { name: 'PANEL TALK', category: 'INSIGHTS', desc: 'Leaders share their journey' },
  { name: 'STARTUP EXPO', category: 'BUSINESS', desc: 'Showcase your venture' },
  { name: 'CODE GOLF', category: 'COMPETITIVE', desc: 'Shortest code wins' },
  { name: 'NETWORKING', category: 'CONNECT', desc: 'Build lasting connections' },
];

const EventsGrid = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
            ALL <span className="text-primary">EVENTS</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Seven days packed with innovation, learning, and competition
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
              <div className="border-2 border-foreground p-6 h-48 flex flex-col justify-between transition-all duration-300 cursor-pointer group-hover:bg-primary group-hover:border-primary">
                <div>
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                    {event.category}
                  </span>
                  <h3 className="text-2xl font-mono font-bold mt-2 text-foreground group-hover:text-primary-foreground transition-colors">
                    {event.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                  {event.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;
