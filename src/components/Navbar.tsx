import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import celLogo from '@/assets/cel-logo.png';
import GoogleLoginBtn from './auth/GoogleLoginBtn';
import { useAuth } from '@/contexts/AuthContext';
import { useEBucks } from '@/hooks/useEBucks';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { balance } = useEBucks();

  // Mapping of Menu Labels to the Section IDs in your Index/App page
  const sectionMapping: Record<string, string> = {
    'SHOWTIME': 'showtime',
    'LEGACY EVENTS': 'dehack', // Assuming DehackSection.tsx has id="dehack"
    'EVENT LIST': 'events',    // Assuming EventsPage.tsx has id="events"
    'CAREER FAIR': 'hits'      // From your FeatureHighlights code: id="hits"
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{
        y: -100,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut'
      }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b border-border"
    >
      {/* Logo with film reel */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={celLogo} alt="CEL Logo" className="w-8 h-8" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-lg font-bold tracking-tighter leading-none">E-WEEK</span>
          <span className="text-[10px] text-muted-foreground tracking-widest">#somethingcrazy</span>
        </div>
      </div>

      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {['SHOWTIME', 'LEGACY EVENTS', 'EVENT LIST', 'CAREER FAIR'].map(item => (
          <button
            key={item}
            onClick={() => scrollToSection(sectionMapping[item])}
            className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <GoogleLoginBtn />
      </div>
    </motion.nav>
  );
};

export default Navbar;