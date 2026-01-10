import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket, Star, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";


const Tickets = () => {
 // UPDATED EVENT ARRAY: Swapping "active ingredients" for the new lineup
 const events = [
   { id: 1, name: "DEHACK", type: "Hackathon", date: "Feb 11-16", prize: "₹1L+" },
   { id: 2, name: "BEDROCK", type: "Market War", date: "Feb 09-15", prize: "₹50K+" },
   { id: 3, name: "WOLF OF DALAL STREET", type: "Trading Sim", date: "Feb 10", prize: "₹25K+" },
   { id: 4, name: "HOW TO TRAIN YOUR DELIVERY TEAM", type: "Ops Challenge", date: "Feb 12", prize: "₹15K+" },
   { id: 5, name: "HANGOVER: THE TREASURE HUNT", type: "Exploration", date: "Feb 13", prize: "₹20K+" },
   { id: 6, name: "ONE RED PAPERCLIP", type: "Logistics Challenge", date: "Feb 14", prize: "Priceless" },
 ];


 return (
   // Clean background without the WaveformBackground component
   <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain font-mono">
    
     <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      
       {/* Navigation - Back to the main cinematic experience */}
       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
         <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest">
           <ArrowLeft className="w-4 h-4" /> Back to Premiere
         </Link>
       </motion.div>


       {/* Header - Box Office Style */}
       <div className="flex items-center gap-4 mb-12">
         <Ticket className="text-primary w-8 h-8" />
         <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">EVENT_TICKETS</h1>
       </div>


       {/* Event List - Optimized for mobile scrollers at ANC */}
       <div className="space-y-4">
         {events.map((event, i) => (
           <motion.div
             key={event.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.1 }}
             className="group border border-primary/20 bg-secondary/5 p-8 hover:bg-primary/10 transition-all flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-transparent hover:border-l-primary"
           >
             <div className="text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-primary tracking-[0.3em] uppercase mb-2 font-bold">
                 <Star className="w-3 h-3" /> {event.type}
               </div>
               <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{event.name}</h3>
               <div className="flex gap-6 text-xs text-muted-foreground">
                 <span className="flex items-center gap-2 uppercase font-semibold"><Zap className="w-3 h-3" /> {event.date}</span>
                 <span className="flex items-center gap-2 uppercase font-semibold"><Trophy className="w-3 h-3 text-yellow-500" /> {event.prize}</span>
               </div>
             </div>
             <Button className="w-full md:w-auto bg-primary text-black font-bold uppercase py-8 px-12 tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(147,245,255,0.2)]">
               REGISTER_NOW
             </Button>
           </motion.div>
         ))}
       </div>
     </div>
   </div>
 );
};


export default Tickets;
