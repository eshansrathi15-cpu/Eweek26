import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WaveformBackground from '@/components/WaveformBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import DeHackSection from '@/components/DeHackSection';
import BedRockSection from '@/components/BedRockSection';
import EventsPage from '@/components/EventsPage';
import FeatureHighlights from '@/components/FeatureHighlights';
import EventsGrid, { events } from '@/components/EventsGrid';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';
import TicketPopup from '@/components/TicketPopup';

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

  const handleEventClick = (event: typeof events[0]) => {
    // Determine the slug (fallback to existing logic if needed, but we added slugs)
    if (event.slug) {
      setSearchParams({ event: event.slug });
    } else {
      // Fallback or just set state if no slug
      setSelectedEvent(event);
    }
  };

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
        <DeHackSection />
        <BedRockSection />
        <EventsPage />
        <FeatureHighlights />
        <EventsGrid onEventClick={handleEventClick} />
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