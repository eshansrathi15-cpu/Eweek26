import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
const sponsors = [{
  name: 'TECHCORP',
  tier: 'PLATINUM'
}, {
  name: 'INNOVATE',
  tier: 'PLATINUM'
}, {
  name: 'BUILDFAST',
  tier: 'GOLD'
}, {
  name: 'CODEBASE',
  tier: 'GOLD'
}, {
  name: 'DEVTOOLS',
  tier: 'SILVER'
}, {
  name: 'CLOUDIFY',
  tier: 'SILVER'
}];
const SponsorsSection = () => {
  return <section className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Subtle marquee lights at top */}
      <div className="absolute top-0 left-0 right-0 h-1 marquee-border opacity-50" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Youtube className="w-6 h-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-center">
              BROUGHT TO YOU BY
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-16 font-mono text-sm tracking-wider">
            — OUR EXECUTIVE PRODUCERS —
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.8
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          scale: 1.1
        }} className="group">
              <div className="aspect-square border border-border flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5 relative">
                {/* Credits style presentation */}
                <span className="font-mono text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors text-center">
                  {sponsor.name}
                </span>
                <span className="text-[10px] mt-2 text-muted-foreground/50 group-hover:text-primary/70 transition-colors tracking-widest">
                  {sponsor.tier}
                </span>

                {/* Corner accent on hover */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-primary transition-all duration-300 group-hover:w-4 group-hover:h-4" />
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-primary transition-all duration-300 group-hover:w-4 group-hover:h-4" />
              </div>
            </motion.div>)}
        </div>

        <motion.p initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="text-center mt-12 text-muted-foreground font-mono text-sm">
          Interested in co-producing?{' '}
          <a href="#" className="text-primary hover:underline">
            Contact us →
          </a>
        </motion.p>
      </div>

      {/* Subtle marquee lights at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 marquee-border opacity-50" />
    </section>;
};
export default SponsorsSection;