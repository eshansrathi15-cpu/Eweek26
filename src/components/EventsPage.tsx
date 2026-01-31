import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  date: string;
  venue: string;
  teams: string;
  prize: string;
  color: string;
}

const EventsPage = () => {
  const events: Event[] = [
    {
      title: "One Red Paperclip",
      description: "Trade your way to the top in this legendary bartering challenge. Starting with just one red paperclip, negotiate and strategize to climb the value chain. Can you turn the simplest item into something extraordinary?",
      date: "Feb 03, 2026",
      venue: "Main Arena",
      teams: "Individual",
      prize: "Mystery Prize",
      color: "cyan"
    },
    {
      title: "Misirlou: A Knives Out Mystery",
      description: "Step into a world of intrigue and deception. Solve the ultimate murder mystery using your deductive skills, teamwork, and attention to detail. Every clue matters in this thrilling whodunit experience.",
      date: "Feb 04, 2026",
      venue: "Mystery Hall",
      teams: "4-6 Members",
      prize: "Detective Badge",
      color: "cyan"
    },
    {
      title: "Wolf of Dalal Street",
      description: "Enter the high-stakes world of stock trading and financial strategy. Buy, sell, and dominate the market in this intense trading simulation. Fortune favors the bold—are you ready to become the Wolf?",
      date: "Feb 05, 2026",
      venue: "Trading Floor",
      teams: "2-4 Members",
      prize: "Cash Prize",
      color: "cyan"
    },
    {
      title: "How to Train Your Delivery Team",
      description: "Master the art of logistics and team coordination in this fast-paced delivery challenge. Optimize routes, manage resources, and ensure timely deliveries under pressure. Efficiency is the name of the game.",
      date: "Feb 06, 2026",
      venue: "Operations Center",
      teams: "3-5 Members",
      prize: "Efficiency Award",
      color: "cyan"
    }
  ];

  const handleRegister = (eventTitle: string) => {
    console.log(`Registering for: ${eventTitle}`);
  };

  // Animation component for One Red Paperclip - morphing objects
  const PaperclipAnimation = () => {
    const objects = ['📎', '🔑', '📱', '💎'];
    return (
      <div className="absolute -top-8 -right-8 w-16 h-16">
        {objects.map((obj, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center text-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              rotate: [0, 180, 360, 540],
            }}
            transition={{
              duration: 4,
              delay: i * 1,
              repeat: Infinity,
              repeatDelay: (objects.length - 1) * 1,
            }}
          >
            <span className="drop-shadow-[0_0_8px_rgba(125,249,255,0.8)]">{obj}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  // Animation component for Mystery - magnifying glass scanning
  const MysteryAnimation = () => {
    return (
      <div className="absolute -top-6 -right-6 w-20 h-20">
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7DF9FF"
            strokeWidth="2"
            className="w-full h-full drop-shadow-[0_0_10px_rgba(125,249,255,0.6)]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    );
  };

  // Animation component for Wolf of Dalal Street - stock ticker
  const StockAnimation = () => {
    return (
      <div className="absolute -top-8 -right-8 w-24 h-16 overflow-hidden">
        <motion.div
          className="flex flex-col gap-1"
          animate={{
            y: [-40, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {['↗ +12.5%', '↘ -3.2%', '↗ +8.1%', '↗ +15.3%'].map((ticker, i) => (
            <div
              key={i}
              className={`text-xs font-mono px-2 py-1 rounded ${
                ticker.includes('↗') 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              } border ${
                ticker.includes('↗')
                  ? 'border-green-500/50'
                  : 'border-red-500/50'
              } whitespace-nowrap`}
              style={{
                boxShadow: ticker.includes('↗')
                  ? '0 0 10px rgba(34,197,94,0.3)'
                  : '0 0 10px rgba(239,68,68,0.3)',
              }}
            >
              {ticker}
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  // Animation component for Delivery - flying dragon
  const DragonAnimation = () => {
    return (
      <div className="absolute -top-10 -right-10 w-24 h-24">
        <motion.div
          className="relative w-full h-full"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7DF9FF"
              strokeWidth="1.5"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(125,249,255,0.7)]"
            >
              {/* Dragon body */}
              <path d="M12 3c-4 0-8 2-8 8 0 4 2 6 4 7" strokeLinecap="round" />
              <path d="M12 3c4 0 8 2 8 8 0 4-2 6-4 7" strokeLinecap="round" />
              {/* Wings */}
              <path d="M8 8c-2-3-5-3-6-1" strokeLinecap="round" />
              <path d="M16 8c2-3 5-3 6-1" strokeLinecap="round" />
              {/* Tail */}
              <path d="M12 18c0 2-1 3-2 3s-2-1-1-3" strokeLinecap="round" />
              {/* Head */}
              <circle cx="12" cy="6" r="1.5" fill="#7DF9FF" />
            </svg>
          </motion.div>
          {/* Package */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-4 h-4 border-2 border-cyan-400 bg-cyan-500/20 rounded-sm"
                 style={{ boxShadow: '0 0 8px rgba(125,249,255,0.5)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-0.5 bg-cyan-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const getEventAnimation = (index: number) => {
    switch (index) {
      case 0: return <PaperclipAnimation />;
      case 1: return <MysteryAnimation />;
      case 2: return <StockAnimation />;
      case 3: return <DragonAnimation />;
      default: return null;
    }
  };

  return (
    <section className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Glitch effect title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl" />
              <span className="relative font-mono text-sm text-cyan-400 tracking-[0.3em] px-6 py-3 border border-cyan-500/50 bg-black/50 backdrop-blur-sm inline-block">
                FEATURED EVENTS
              </span>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-mono font-bold text-white mb-4 relative">
            THE{' '}
            <span className="relative inline-block">
              <span className="text-cyan-400 relative z-10">LINEUP</span>
              <motion.span
                className="absolute inset-0 text-cyan-400 blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                LINEUP
              </motion.span>
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="text-lg text-gray-400 font-mono tracking-wider">
              CHOOSE YOUR ADVENTURE
            </p>
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Cyberpunk Event Card */}
              <div className="relative border border-cyan-500/30 bg-black/40 backdrop-blur-md p-8 overflow-hidden
                            hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(125,249,255,0.3)]">
                
                {/* Animated corner brackets */}
                <motion.div
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                />

                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                >
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    animate={{
                      top: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-5"
                     style={{
                       backgroundImage: `
                         linear-gradient(rgba(125, 249, 255, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(125, 249, 255, 0.3) 1px, transparent 1px)
                       `,
                       backgroundSize: '20px 20px',
                     }}
                />

                {/* Event-specific animation */}
                {getEventAnimation(index)}

                {/* Content */}
                <div className="relative z-10">
                  {/* Event number badge */}
                  <div className="absolute -top-12 -left-12 w-16 h-16 border border-cyan-500/30 bg-black/60 
                                flex items-center justify-center font-mono text-cyan-400 text-xl backdrop-blur-sm">
                    0{index + 1}
                  </div>

                  {/* Title with glitch effect */}
                  <div className="relative mb-4">
                    <h3 className="text-2xl md:text-3xl font-mono font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <motion.h3
                      className="absolute inset-0 text-2xl md:text-3xl font-mono font-bold text-cyan-400 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: [0, -2, 2, 0],
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      {event.title}
                    </motion.h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed font-light">
                    {event.description}
                  </p>

                  {/* Event Details with cyber aesthetic */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-2 bg-cyan-500/5 border border-cyan-500/20 p-3 relative overflow-hidden group/detail">
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/detail:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <Calendar className="w-4 h-4 text-cyan-400 mt-0.5 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-[10px] text-cyan-400/70 font-mono tracking-wider">DATE</p>
                        <p className="text-sm font-mono text-white">{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-cyan-500/5 border border-cyan-500/20 p-3 relative overflow-hidden group/detail">
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/detail:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-[10px] text-cyan-400/70 font-mono tracking-wider">VENUE</p>
                        <p className="text-sm font-mono text-white">{event.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-cyan-500/5 border border-cyan-500/20 p-3 relative overflow-hidden group/detail">
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/detail:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <Users className="w-4 h-4 text-cyan-400 mt-0.5 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-[10px] text-cyan-400/70 font-mono tracking-wider">TEAM SIZE</p>
                        <p className="text-sm font-mono text-white">{event.teams}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-cyan-500/5 border border-cyan-500/20 p-3 relative overflow-hidden group/detail">
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/detail:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <Trophy className="w-4 h-4 text-cyan-400 mt-0.5 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-[10px] text-cyan-400/70 font-mono tracking-wider">PRIZE</p>
                        <p className="text-sm font-mono text-white">{event.prize}</p>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={() => handleRegister(event.title)}
                      className="w-full bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black
                               transition-all duration-300 font-mono tracking-[0.2em] text-sm py-6 relative overflow-hidden group/btn"
                    >
                      <motion.div
                        className="absolute inset-0 bg-cyan-400"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                        REGISTER NOW
                      </span>
                      <motion.span
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </motion.div>
                </div>

                {/* Side data strips */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-cyan-500/50 -ml-px" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-cyan-500/50 -mr-px" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.p
            className="text-sm text-gray-500 font-mono tracking-[0.3em] mb-4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            DON'T MISS OUT ON THE ACTION
          </motion.p>
          <div className="inline-flex items-center border border-cyan-500/50 overflow-hidden">
            <motion.div
              className="w-2 h-12 bg-cyan-500"
              animate={{
                scaleY: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            <div className="bg-black/60 backdrop-blur-sm px-8 py-3 border-x border-cyan-500/30">
              <span className="text-cyan-400 text-sm font-mono tracking-[0.25em]">
                LIMITED SLOTS AVAILABLE
              </span>
            </div>
            <motion.div
              className="w-2 h-12 bg-cyan-500"
              animate={{
                scaleY: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsPage;