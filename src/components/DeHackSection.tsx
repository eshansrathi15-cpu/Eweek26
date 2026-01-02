import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Terminal, Zap, Clock } from 'lucide-react';

const DeHackSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glitch Lines Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="h-px bg-primary absolute"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="text-primary font-mono text-sm">// MAIN EVENT</span>
            </div>

            <motion.h2
              className="text-6xl md:text-8xl font-mono font-bold text-foreground mb-6"
              whileHover={{ scale: 1.02 }}
            >
              DE<span className="animate-glitch">HACK</span>
            </motion.h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-sans">
              120 Hours. Build. Break. Innovate.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground">5 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-foreground">₹1L+ Prizes</span>
              </div>
            </div>

            <Button variant="outline" size="lg" className="text-lg group">
              <span className="group-hover:text-primary transition-colors">INITIALIZE</span>
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square border-2 border-foreground p-8 relative overflow-hidden">
              {/* Code Animation */}
              <div className="font-mono text-sm text-muted-foreground space-y-2 overflow-hidden">
                {[
                  '> initializing hackathon...',
                  '> loading participants: 500+',
                  '> allocating resources...',
                  '> starting timer: 120:00:00',
                  '> BUILD MODE ACTIVATED',
                  '',
                  'function innovate() {',
                  '  const ideas = [];',
                  '  while (time > 0) {',
                  '    ideas.push(create());',
                  '    iterate();',
                  '    break_things();',
                  '  }',
                  '  return revolution;',
                  '}',
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={line.includes('ACTIVATED') ? 'text-primary font-bold' : ''}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeHackSection;
