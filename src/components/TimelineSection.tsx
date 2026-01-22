import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

const events = [
  { date: 'JAN 21', title: 'REGISTRATIONS OPEN', scene: 'SCENE 01' },
  { date: 'JAN 31', title: 'WHAT DA FUKREY', scene: 'SCENE 02' },
  { date: 'FEB 02', title: 'CAREER FAIR INTERVIEWS', scene: 'SCENE 03' },
  { date: 'FEB 03', title: 'ONE RED PAPERCLIP', scene: 'SCENE 04', slug: 'dehack' },
  { date: 'FEB 04', title: 'WOLF OF DALAL STREET', scene: 'SCENE 05', slug: 'dehack' },
  { date: 'FEB 04', title: 'DEHACK', scene: 'SCENE 06', slug: 'dehack' },
  { date: 'FEB 06', title: 'HOW TO TRAIN YOUR DELIVERY TEAM', scene: 'SCENE 07', slug: 'dehack' },
  { date: 'FEB 06', title: 'MOVIE SCREENING', scene: 'SCENE 08' },
  { date: 'FEB 06', title: 'BEDROCK AUCTION', scene: 'SCENE 09', slug: 'bedrock' },
  { date: 'FEB 07', title: 'MISIRLOU : A KNIVES OUT MYSTERY', scene: 'SCENE 10', slug: 'dehack' },
  { date: 'FEB 07', title: 'DEHACK SUBMISSIONS', scene: 'SCENE 11', slug: 'dehack' },
  { date: 'FEB 08', title: 'BEDROCK', scene: 'SCENE 12', slug: 'bedrock' },
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="showtime" className="py-24 relative overflow-hidden" ref={containerRef}>
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
          — INNOVATION UNLEASHED —
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
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isMobile ? 40 : 60, 
                ease: "linear",
              },
            }}
            className="flex gap-0 py-1 bg-secondary/20 w-max cursor-grab active:cursor-grabbing"
          >
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-64 md:w-80 transition-all duration-300 ${activeIndex === index ? 'scale-105 z-10' : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <div
                  className={`border-2 p-6 h-52 flex flex-col justify-between transition-all duration-300 relative ${activeIndex === index
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
                      className={`font-mono text-sm ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'
                        }`}
                    >
                      {event.date}
                    </span>
                    <h3
                      className={`font-mono text-2xl font-bold mt-2 ${activeIndex === index ? 'text-primary' : 'text-foreground'
                        }`}
                    >
                      {event.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm"></p>
                    {/* Film frame number */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className={`h-px flex-1 ${activeIndex === index ? 'bg-primary/50' : 'bg-border'}`} />
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}/{events.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Sprocket Holes */}
          <div className="h-6 bg-secondary/50 relative overflow-hidden">
            <div className="absolute inset-0 flex justify-around items-center px-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-3 rounded-sm transition-colors ${activeIndex >= 0 ? 'bg-primary/30' : 'bg-background'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSection;