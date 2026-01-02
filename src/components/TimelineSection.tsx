import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const events = [
  { date: 'FEB 09', title: 'OPENING', description: 'Grand Opening Ceremony' },
  { date: 'FEB 10', title: 'DEHACK', description: '120-Hour Hackathon Begins' },
  { date: 'FEB 11', title: 'DEHACK', description: 'Build Phase' },
  { date: 'FEB 12', title: 'DEHACK', description: 'Innovation Sprint' },
  { date: 'FEB 13', title: 'DEHACK', description: 'Final Push' },
  { date: 'FEB 14', title: 'DEHACK', description: 'Demo Day' },
  { date: 'FEB 15', title: 'BEDROCK', description: 'The Grand Finale' },
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          THE <span className="text-primary">SCHEDULE</span>
        </h2>

        {/* Film Strip Container */}
        <div className="relative">
          {/* Top Sprocket Holes */}
          <div className="h-4 film-sprocket mb-2" />

          {/* Timeline Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-0 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-48 md:w-64 snap-center cursor-pointer transition-all duration-300 ${
                  activeIndex === index ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`border-2 p-6 h-48 flex flex-col justify-between transition-colors duration-300 ${
                    activeIndex === index
                      ? 'border-primary bg-primary/5'
                      : 'border-foreground bg-background'
                  }`}
                >
                  <div>
                    <span
                      className={`font-mono text-sm ${
                        activeIndex === index ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {event.date}
                    </span>
                    <h3
                      className={`font-mono text-2xl font-bold mt-2 ${
                        activeIndex === index ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Sprocket Holes */}
          <div
            className={`h-4 mt-2 transition-all duration-300 ${
              activeIndex >= 0 ? 'film-sprocket-active' : 'film-sprocket'
            }`}
          />
        </div>

        {/* Timeline Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                activeIndex === index ? 'bg-primary scale-125' : 'bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSection;
