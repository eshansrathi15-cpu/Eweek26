import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b border-border"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center">
          <span className="font-mono text-sm font-bold">E</span>
        </div>
        <span className="font-mono text-lg font-bold tracking-tighter">E-WEEK</span>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <button className="text-foreground hover:text-primary transition-colors font-medium">
          Login
        </button>
        <Button variant="default" size="default">
          REGISTER
        </Button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
