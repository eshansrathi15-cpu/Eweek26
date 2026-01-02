import { motion } from 'framer-motion';

const sponsors = [
  { name: 'TECHCORP', tier: 'PLATINUM' },
  { name: 'INNOVATE', tier: 'PLATINUM' },
  { name: 'BUILDFAST', tier: 'GOLD' },
  { name: 'CODEBASE', tier: 'GOLD' },
  { name: 'DEVTOOLS', tier: 'SILVER' },
  { name: 'CLOUDIFY', tier: 'SILVER' },
];

const SponsorsSection = () => {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
            OUR <span className="text-primary">SPONSORS</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16">
            Powered by industry leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="group"
            >
              <div className="aspect-square border border-border flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:border-primary">
                <span className="font-mono text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors text-center">
                  {sponsor.name}
                </span>
                <span className="text-xs mt-2 text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                  {sponsor.tier}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-muted-foreground"
        >
          Interested in sponsoring?{' '}
          <a href="#" className="text-primary hover:underline">
            Contact us →
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default SponsorsSection;
