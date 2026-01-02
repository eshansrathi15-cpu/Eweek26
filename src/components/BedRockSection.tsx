import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Award } from 'lucide-react';

const BedRockSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20">
      {/* Award show style lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Award Trophy Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Gold Frame - Award Plaque Style */}
              <div className="aspect-square border-4 border-primary p-1 relative">
                {/* Inner glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-transparent" />
                
                <div className="w-full h-full bg-background border-2 border-primary/50 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Award Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <Crown className="w-32 h-32 text-primary relative z-10" strokeWidth={1} />
                  </motion.div>

                  {/* Award Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-xs font-mono text-muted-foreground tracking-widest">AWARD FOR</p>
                    <p className="text-lg font-mono font-bold text-primary mt-1">BEST BUSINESS</p>
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 right-4 h-px bg-primary/30" />
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-primary/30" />
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-primary/30" />
                  <div className="absolute right-4 top-4 bottom-4 w-px bg-primary/30" />
                </div>

                {/* Corner laurels (simplified) */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
              </div>

              {/* Floating Stats - Award Envelope Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 font-mono"
              >
                <Award className="w-6 h-6 mb-1" />
                <span className="text-3xl font-bold">₹50K+</span>
                <br />
                <span className="text-sm">PRIZE POOL</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-primary/30 bg-primary/5">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-xs tracking-widest">BEST PICTURE NOMINEE</span>
            </div>

            <h2 className="text-6xl md:text-8xl font-mono font-bold text-primary mb-6 text-shadow-glow">
              BEDROCK
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-sans">
              The Campus Takeover. Marketing. Profit. Glory.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Users, label: 'TEAMS', value: '30+' },
                { icon: TrendingUp, label: 'REVENUE', value: '₹5L+' },
                { icon: Crown, label: 'CHAMPION', value: '1' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 border border-primary/30 bg-primary/5"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-mono font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <Button variant="default" size="lg" className="text-lg">
              ASSEMBLE TEAM
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BedRockSection;
