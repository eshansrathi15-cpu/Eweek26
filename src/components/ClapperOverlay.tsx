import { motion, AnimatePresence } from 'framer-motion';

interface ClapperOverlayProps {
  isVisible: boolean;
  text: string; // Added this line to accept the word from HeroSection
}

const ClapperOverlay = ({ isVisible, text }: ClapperOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md md:backdrop-blur-xl pointer-events-none"
        >
          <div className="relative transform scale-125">
            {/* Clapper Top Part (Moving Arm) */}
            <motion.div
              initial={{ rotate: -45, originX: 0, originY: 1 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.25, type: "spring", stiffness: 400, damping: 25 }}
              className="absolute -top-12 left-0 w-80 h-12 bg-black border-4 border-white flex overflow-hidden z-20 shadow-2xl"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-12 h-full bg-white -skew-x-[45deg] ml-4" />
              ))}
            </motion.div>

            {/* Clapper Bottom Part (Static) */}
            <div className="w-80 h-56 bg-black border-4 border-white p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(147,245,255,0.3)]">
              <div className="flex justify-between font-mono text-white text-[10px] uppercase tracking-widest opacity-80">
                <span>PROD. E-WEEK</span>
                <span>SCENE 01</span>
              </div>
              <div className="text-center font-mono">
                {/* MODIFIED: It now displays the 'text' prop instead of hardcoded 'TICKETS' */}
                <span className="text-[#93f5ff] font-black text-4xl tracking-tighter block mb-1 uppercase">
                  {text}
                </span>
              </div>
              <div className="flex justify-between font-mono text-white text-[10px] uppercase tracking-widest opacity-80">
                <span>DIR: E-WEEK</span>
                <span>TAKE 01</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClapperOverlay;