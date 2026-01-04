import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Award, Target, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveformBackground from '@/components/WaveformBackground';

const Bedrock = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
      <WaveformBackground />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-center justify-center py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 bg-primary/5"
            >
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-primary font-mono text-sm tracking-widest">BEDROCK 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-primary mb-6 text-shadow-glow"
            >
              ASSEMBLE TEAM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Build your dream team and compete for the ultimate business glory. 
              Marketing. Strategy. Profit. One champion emerges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button variant="default" size="lg" className="text-lg">
                Register Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Learn More
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-24 bg-secondary/20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-4">
                THE C'NOT TAKEOVER
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bedrock is the ultimate business simulation competition where teams compete 
                to build, market, and scale their ventures to victory.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Strategy',
                  description: 'Craft winning business strategies and outmaneuver your competition.'
                },
                {
                  icon: TrendingUp,
                  title: 'Growth',
                  description: 'Scale your operations and maximize revenue through smart decisions.'
                },
                {
                  icon: Zap,
                  title: 'Execution',
                  description: 'Execute flawlessly under pressure and adapt to market changes.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="p-8 border border-primary/30 bg-background/50 text-center"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-mono font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { icon: Users, label: 'TEAMS', value: '30+' },
                { icon: TrendingUp, label: 'REVENUE TARGET', value: '₹5L+' },
                { icon: Award, label: 'PRIZE POOL', value: '₹50K+' },
                { icon: Crown, label: 'CHAMPION', value: '1' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-6 border border-primary/30 bg-primary/5"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-mono font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Bedrock;
