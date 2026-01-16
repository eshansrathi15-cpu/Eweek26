import { useState } from 'react';
import WaveformBackground from '@/components/WaveformBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import DeHackSection from '@/components/DeHackSection';
import BedRockSection from '@/components/BedRockSection';
import EventsGrid from '@/components/EventsGrid';
import BitscoinSection from '@/components/BitscoinSection';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';
import TicketPopup from '@/components/TicketPopup';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; desc: string } | null>(null);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
      {/* Interactive Scanline Background */}
      <WaveformBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TimelineSection />
        <DeHackSection />
        <BedRockSection />
        <EventsGrid onEventClick={setSelectedEvent} />
        <BitscoinSection />
        <SponsorsSection />
        <Footer />
      </div>

      <TicketPopup
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Index;