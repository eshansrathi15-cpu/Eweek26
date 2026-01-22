import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar } from 'lucide-react';
import celLogo from '@/assets/cel-logo.png';

const AboutEWeek = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Rocket & Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Star Field - More visible */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              top: `${Math.random() * 50}%`,
              left: '-5%',
              opacity: 0
            }}
            animate={{
              top: `${Math.random() * 50 + 50}%`,
              left: '105%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 4,
              repeatDelay: 8
            }}
            style={{
              boxShadow: '0 0 20px 2px currentColor'
            }}
          />
        ))}

        {/* Floating Rocket Silhouettes - More visible and animated */}
        {[
          { top: '10%', right: '10%', rotate: 0, size: 'w-32 h-32', delay: 0 },
          { bottom: '20%', left: '15%', rotate: 45, size: 'w-24 h-24', delay: 2 },
          { top: '40%', left: '5%', rotate: -12, size: 'w-20 h-20', delay: 4 },
          { bottom: '15%', right: '20%', rotate: 90, size: 'w-28 h-28', delay: 1 }
        ].map((rocket, index) => (
          <motion.svg
            key={index}
            className={`absolute ${rocket.size} text-primary/15`}
            viewBox="0 0 40 60"
            fill="currentColor"
            initial={{ y: 0, rotate: rocket.rotate }}
            animate={{
              y: [-30, 30, -30],
              rotate: [rocket.rotate - 8, rocket.rotate + 8, rocket.rotate - 8]
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: rocket.delay
            }}
            style={{
              top: rocket.top,
              right: rocket.right,
              left: rocket.left,
              bottom: rocket.bottom,
              filter: 'drop-shadow(0 0 10px currentColor)'
            }}
          >
            <path d="M20 5 L30 25 L30 45 L25 50 L25 40 L20 45 L15 40 L15 50 L10 45 L10 25 Z" />
            <circle cx="20" cy="20" r="3" fill="white" opacity="0.3" />
          </motion.svg>
        ))}

        {/* Orbiting Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [0, Math.cos(i * Math.PI / 4) * 100, 0],
              y: [0, Math.sin(i * Math.PI / 4) * 100, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
            style={{
              left: '50%',
              top: '30%'
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="border-b border-border relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-all group"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="font-mono text-sm font-bold tracking-widest uppercase">BACK TO HOME</span>
          </a>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={celLogo} alt="CEL Logo" className="w-6 h-6" />
            <span className="font-mono text-lg font-bold">E-WEEK 2026</span>
          </motion.div>

          <div className="w-32"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.p
              className="text-xs font-mono text-muted-foreground tracking-widest mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              — PRODUCTION NOTES —
            </motion.p>
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight"
              animate={{
                textShadow: [
                  '0 0 20px rgba(0, 255, 255, 0)',
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                  '0 0 20px rgba(0, 255, 255, 0)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              About E-Week
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
              A CEL Production • February 02-08, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12 md:mb-20"
          >
            <p className="text-base md:text-xl leading-relaxed text-muted-foreground font-sans">
              A legacy initiative to cultivate an entrepreneurial spirit through fun events across the campus. Students learn skills including pitching, negotiating, and generally, just have a lot of fun. We’re bringing you high-stakes games where you get to be an entrepreneur, a stock market trader, a restaurateur, or exactly who you want to be. Cash prizes await the winners!
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Attendees */}
            <motion.div
              className="text-center p-6 md:p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="w-12 h-12 mx-auto mb-4 text-primary relative z-10" />
              </motion.div>
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2 font-mono relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                5000+
              </motion.div>
              <p className="text-muted-foreground font-mono text-sm tracking-wider relative z-10">ATTENDEES</p>
            </motion.div>

            {/* Days */}
            <motion.div
              className="text-center p-6 md:p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  background: [
                    'radial-gradient(circle at 100% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 100%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary relative z-10" />
              </motion.div>
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2 font-mono relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                7
              </motion.div>
              <p className="text-muted-foreground font-mono text-sm tracking-wider relative z-10">DAYS</p>
            </motion.div>

            {/* Events */}
            <motion.div
              className="text-center p-6 md:p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  background: [
                    'radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 100%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-12 h-12 mx-auto mb-4 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </motion.div>
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2 font-mono relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                10+
              </motion.div>
              <p className="text-muted-foreground font-mono text-sm tracking-wider relative z-10">EVENTS</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.p
              className="text-xs font-mono text-muted-foreground tracking-widest mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              — JOIN US —
            </motion.p>
            <p className="text-muted-foreground mb-8 font-sans">
              Be part of the legacy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Credits */}
      <footer className="py-8 border-t border-border/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">
            DIRECTED & PRODUCED BY CEL • SCREENPLAY BY THE E-WEEK TEAM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutEWeek;