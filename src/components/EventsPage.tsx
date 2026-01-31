import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  date: string;
  venue: string;
  teams: string;
  prize: string;
}

const EventsPage = () => {
  const events: Event[] = [
    {
      title: "One Red Paperclip",
      description: "Trade your way to the top in this legendary bartering challenge across campus. Starting with just one paperclip, negotiate to climb the value chain!",
      date: "Feb 03, 2026",
      venue: "SAC HALL",
      teams: "Individual",
      prize: "PRIZE POOL OF ₹10,000",
    },
    {
      title: "Misirlou: A Knives Out Mystery",
      description: "Step into a world of intrigue. Solve the ultimate murder mystery using deductive skills and teamwork. Every clue matters.",
      date: "Feb 07, 2026",
      venue: "TBA",
      teams: "4-6 Members",
      prize: "PRIZE POOL OF ₹10,000",
    },
    {
      title: "Wolf of Dalal Street",
      description: "Colgate selling candy? Market your weird product to launch your IPO! Buy, sell, and dominate the market in this intense trading simulation.",
      date: "Feb 05, 2026",
      venue: "Trading Floor",
      teams: "2-5 Members",
      prize: "PRIZE POOL OF ₹10,000",
    },
    {
      title: "Train Your Delivery Team",
      description: "Take over ANC and Looters for a day. Optimize routes and manage resources under pressure to maximise sales and win a huge cash prize!",
      date: "Feb 06, 2026",
      venue: "ANC & LOOTERS",
      teams: "4-6 Members",
      prize: "PRIZE POOL OF ₹30,000",
    }
  ];

  const handleRegister = (eventTitle: string) => {
    console.log(`Registering for: ${eventTitle}`);
  };

  return (
    <section id="events" className="min-h-screen py-20 px-6 relative font-mono text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header matching your screenshot's "EVENT LINEUP" style */}
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyan-400 text-[10px] tracking-[0.6em] uppercase mb-4"
          >
            MISSION_CONTROL // SELECT_EVENT
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            THE <span className="text-cyan-400">LINEUP</span>
          </h2>
        </header>

        {/* Individual Event Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 p-8 flex flex-col justify-between"
            >
              {/* Subtle accent lines for that tech feel */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />

              <div>
                <span className="text-cyan-500/40 text-[10px] mb-2 block">ID: 0{index + 1}</span>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-white">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {event.description}
                </p>

                {/* Event Metadata */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <DetailItem icon={<Calendar className="w-3 h-3"/>} label="DATE" value={event.date} />
                  <DetailItem icon={<MapPin className="w-3 h-3"/>} label="VENUE" value={event.venue} />
                  <DetailItem icon={<Users className="w-3 h-3"/>} label="SIZE" value={event.teams} />
                  
                  {/* Enhanced Prize Box with Pulse Animation */}
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col gap-1 bg-cyan-400/20 p-3 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Trophy className="w-3 h-3 animate-bounce"/>
                      <span className="text-[10px] tracking-[0.2em] font-black">REWARD</span>
                    </div>
                    <span className="text-lg text-white font-black uppercase tracking-tighter drop-shadow-sm">
                      {event.prize}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Action Button - Matches PLOT REVEAL style */}
              <Button 
                onClick={() => handleRegister(event.title)}
                className="w-full bg-[#7DF9FF] hover:bg-[#5ce6ee] text-black rounded-none 
                           font-bold tracking-[0.2em] text-xs py-7 transition-all
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                REGISTER HERE
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-cyan-400/60">
      {icon}
      <span className="text-[9px] tracking-[0.2em] font-bold">{label}</span>
    </div>
    <span className="text-xs text-gray-200 uppercase">{value}</span>
  </div>
);

export default EventsPage;