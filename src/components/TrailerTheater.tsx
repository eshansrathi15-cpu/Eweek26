import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Film } from 'lucide-react';
const TrailerTheater = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 spotlight vignette relative overflow-hidden">
      {/* Decorative Film Strips (Top) */}
      <div className="absolute top-0 left-0 w-full h-8 bg-primary/10 border-b border-primary/20 flex gap-4 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => <div key={i} className="w-8 h-6 border-r border-primary/30 flex-shrink-0" />)}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl relative z-10"
      >
        {/* Navigation Back */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 font-mono text-primary hover:text-primary hover:bg-primary/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          EXIT THEATER
        </Button>
        {/* Cinematic Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm tracking-[0.3em] text-primary uppercase">Now Screening</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter uppercase">
            E-WEEK <span className="text-primary text-shadow-glow">Trailer</span>
          </h2>
        </div>
        {/* Video Player Frame */}
        <div className="relative w-full h-[75vh] border-4 border-primary/20 bg-black rounded-lg overflow-hidden shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] flex items-center justify-center">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            <source src="/Trailer (1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Tech Specs Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-50">
          <p className="font-mono text-xs tracking-widest uppercase">
            E-Week • Director's Cut
          </p>
          <div className="flex gap-4">
            <div className="px-3 py-1 border border-muted-foreground/30 font-mono text-[10px]">4K UHD</div>
            <div className="px-3 py-1 border border-muted-foreground/30 font-mono text-[10px]">STEREO</div>
          </div>
        </div>
      </motion.div>
      {/* Decorative Film Strips (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-primary/10 border-t border-primary/20 flex gap-4 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => <div key={i} className="w-8 h-6 border-r border-primary/30 flex-shrink-0" />)}
      </div>
    </div>
  );
};
export default TrailerTheater;
