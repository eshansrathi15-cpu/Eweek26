import WaveformBackground from '@/components/WaveformBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import DeHackSection from '@/components/DeHackSection';
import BedRockSection from '@/components/BedRockSection';
import EventsGrid from '@/components/EventsGrid';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Interactive Scanline Background */}
      <WaveformBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TimelineSection />
        <DeHackSection />
        <BedRockSection />
        <EventsGrid />
        <SponsorsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
