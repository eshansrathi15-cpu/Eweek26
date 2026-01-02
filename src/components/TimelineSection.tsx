import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

const events = [
  { date: 'FEB 09', title: 'OPENING', description: 'Grand Opening Ceremony', scene: 'SCENE 01' },
  { date: 'FEB 10', title: 'DEHACK', description: '120-Hour Hackathon Begins', scene: 'SCENE 02' },
  { date: 'FEB 11', title: 'DEHACK', description: 'Build Phase', scene: 'SCENE 03' },
  { date: 'FEB 12', title: 'DEHACK', description: 'Innovation Sprint', scene: 'SCENE 04' },
  { date: 'FEB 13', title: 'DEHACK', description: 'Final Push', scene: 'SCENE 05' },
  { date: 'FEB 14', title: 'DEHACK', description: 'Demo Day', scene: 'SCENE 06' },
  { date: 'FEB 15', title: 'BEDROCK', description: 'The Grand Finale', scene: 'SCENE 07' },
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="showtime" className="py-24 relative overflow-hidden">
      {/* Film reel decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-8 film-holes opacity-30" />
      <div className="absolute right-0 top-0 bottom-0 w-8 film-holes opacity-30" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Section Header with Clapperboard */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Clapperboard className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-center">
            THE <span className="text-primary">SCHEDULE</span>
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-16 font-mono text-sm tracking-widest">
          — SEVEN DAYS OF INNOVATION —
        </p>

        {/* Film Strip Container */}
        <div className="relative">
          {/* Top Sprocket Holes */}
          <div className="h-6 bg-secondary/50 relative overflow-hidden">
            <div className="absolute inset-0 flex justify-around items-center px-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-background rounded-sm" />
              ))}
            </div>
          </div>

          {/* Timeline Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-0 overflow-x-auto scrollbar-hide py-1 snap-x snap-mandatory bg-secondary/20"
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
                  activeIndex === index ? 'scale-105 z-10' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`border-2 p-6 h-52 flex flex-col justify-between transition-all duration-300 relative ${
                    activeIndex === index
                      ? 'border-primary bg-primary/5'
                      : 'border-foreground/50 bg-background'
                  }`}
                >
                  {/* Scene number - film style */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-[10px] font-mono ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>
                      {event.scene}
                    </span>
                  </div>

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
                  
                  <div>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                    {/* Film frame number */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className={`h-px flex-1 ${activeIndex === index ? 'bg-primary/50' : 'bg-border'}`} />
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}/07
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Sprocket Holes */}
          <div className="h-6 bg-secondary/50 relative overflow-hidden">
            <div className="absolute inset-0 flex justify-around items-center px-4">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-3 rounded-sm transition-colors ${
                    activeIndex >= 0 ? 'bg-primary/30' : 'bg-background'
                  }`} 
                />
              ))}
            </div>
          </div>
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
