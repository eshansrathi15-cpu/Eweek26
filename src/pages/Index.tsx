import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WaveformBackground from '@/components/WaveformBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import EventsPage from '@/components/EventsPage';
import DeHackSection from '@/components/DeHackSection';
import BedRockSection from '@/components/BedRockSection';
import FeatureHighlights from '@/components/FeatureHighlights';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';
import TicketPopup from '@/components/TicketPopup';

// Local events data for popup state management
const events = [
  { slug: "one-red-paperclip", name: "One Red Paperclip", desc: "Trade your way to the top in this legendary bartering challenge." },
  { slug: "misirlou", name: "Misirlou: A Mystery", desc: "Step into a world of intrigue. Solve the ultimate murder mystery." },
  { slug: "wolf-of-dalal-street", name: "Wolf of Dalal Street", desc: "Enter the high-stakes world of stock trading." },
  { slug: "delivery-team", name: "Train Your Delivery Team", desc: "Master the art of logistics and team coordination." }
];

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; desc: string; slug?: string } | null>(null);

  // Sync state with URL on mount and update
  useEffect(() => {
    const eventSlug = searchParams.get('event');
    if (eventSlug) {
      const event = events.find((e) => e.slug === eventSlug);
      if (event) {
        setSelectedEvent(event);
      }
    } else {
      setSelectedEvent(null);
    }
  }, [searchParams]);

  const handleClose = () => {
    setSearchParams({}); // Clear query params
    setSelectedEvent(null);
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
      {/* Interactive Scanline Background */}
      <WaveformBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TimelineSection />
        
        {/* EventsPage is now positioned above DeHackSection */}
        <EventsPage />
        <DeHackSection />
        
        <BedRockSection />
        <FeatureHighlights />
        <SponsorsSection />
        <Footer />
      </div>

      <TicketPopup
        isOpen={!!selectedEvent}
        onClose={handleClose}
        event={selectedEvent}
      />
    </div>
  );
};

export default Index;