import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import { Event } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveformBackground from '@/components/WaveformBackground';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Trophy, Clock, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const EventDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!slug) return;
            setLoading(true);
            const data = await api.getEventBySlug(slug);
            setEvent(data || null);
            setLoading(false);
        };
        fetchEvent();
    }, [slug]);

    const handleRegister = async () => {
        if (!slug) return;
        toast.info('Processing registration...');
        const res = await api.registerForEvent(slug, { timestamp: new Date() });
        if (res.success) {
            toast.success(res.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono">
                LOADING...
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-mono gap-4">
                <h1 className="text-4xl text-primary">EVENT NOT FOUND</h1>
                <Link to="/">
                    <Button variant="outline">RETURN HOME</Button>
                </Link>
            </div>
        );
    }

    const renderTitle = (title: string) => {
        if (title.toUpperCase() === 'DEHACK') {
            return (
                <>
                    DE<span className="text-primary text-shadow-glow">HACK</span>
                </>
            );
        }
        if (title.toUpperCase() === 'BEDROCK') {
            return (
                <>
                    BED<span className="text-primary text-shadow-glow">ROCK</span>
                </>
            );
        }
        return title;
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
            <WaveformBackground />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 py-32">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors font-mono text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        BACK TO LIST
                    </Link>

                    {/* Hero Section: Title, Info, Actions */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-mono tracking-widest">
                                    {event.category}
                                </span>
                                <span className="border border-foreground px-2 py-0.5 text-xs font-bold">
                                    {event.rating}
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-mono font-bold text-foreground mb-6 uppercase tracking-tighter">
                                {renderTitle(event.title)}
                            </h1>
                            <p className="text-xl text-muted-foreground font-sans max-w-xl mb-8 leading-relaxed">
                                {event.fullDescription}
                            </p>

                            {/* Key Info: Date & Venue (if available, otherwise placeholders/derived) */}
                            <div className="flex flex-wrap gap-6 mb-8 text-sm font-mono text-muted-foreground">
                                {event.timeline.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span>{new Date(event.timeline[0].datetime).toLocaleDateString()}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span>BITS PILANI</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Column: Prize & Registration */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-6 justify-center lg:items-end"
                        >
                            {/* Prize Money - High Contrast */}
                            <div className="bg-card w-full lg:w-auto p-8 border-2 border-primary/50 text-center lg:text-right relative overflow-hidden group hover:border-primary transition-colors">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                <div className="relative z-10">
                                    <div className="text-sm font-mono text-muted-foreground mb-1 tracking-widest">TOTAL PRIZE POOL</div>
                                    <div className="text-5xl md:text-6xl font-bold text-primary drop-shadow-lg font-mono">
                                        {event.prizes.total}
                                    </div>
                                </div>
                            </div>

                            {/* Registration Box */}
                            <div className="w-full lg:w-96 p-6 border border-border bg-background/50 backdrop-blur-sm">
                                <h3 className="font-mono font-bold text-lg mb-4 flex items-center gap-2">
                                    <TicketIcon className="w-5 h-5 text-primary" />
                                    REGISTRATION
                                </h3>

                                {event.registration.type === 'link' ? (
                                    <Button className="w-full text-xl h-14 font-bold tracking-wide" asChild>
                                        <a href={event.registration.url} target="_blank" rel="noreferrer">
                                            REGISTER NOW
                                        </a>
                                    </Button>
                                ) : (
                                    <Button className="w-full text-xl h-14 font-bold tracking-wide" onClick={handleRegister}>
                                        APPLY NOW
                                    </Button>
                                )}

                                <div className="mt-4 text-center">
                                    {event.registration.deadline && (
                                        <p className="text-xs font-mono text-destructive">
                                            DEADLINE: {new Date(event.registration.deadline).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="h-px w-full bg-border mb-16" />

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Highlights */}
                            <section>
                                <h2 className="text-2xl font-mono font-bold text-foreground mb-6 flex items-center gap-2 border-l-4 border-primary pl-4">
                                    HIGHLIGHTS
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {event.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 border border-border bg-secondary/5 hover:bg-secondary/10 transition-colors">
                                            <div className="w-2 h-2 bg-primary transform rotate-45" />
                                            <span className="font-mono text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Rules */}
                            <section>
                                <h2 className="text-2xl font-mono font-bold text-foreground mb-6 flex items-center gap-2 border-l-4 border-primary pl-4">
                                    RULES & REGULATIONS
                                </h2>
                                <ul className="space-y-4">
                                    {event.rules.map((rule, i) => (
                                        <li key={i} className="flex gap-4 text-muted-foreground p-3 hover:bg-muted/50 rounded-lg transition-colors">
                                            <span className="font-mono text-primary font-bold">0{i + 1}.</span>
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Timeline */}
                            {event.timeline.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-mono font-bold text-foreground mb-6 flex items-center gap-2 border-l-4 border-primary pl-4">
                                        EVENT TIMELINE
                                    </h2>
                                    <div className="relative ml-3 pl-8 py-2 border-l border-dashed border-border">
                                        {event.timeline.map((item, i) => (
                                            <div key={i} className="relative mb-8 last:mb-0">
                                                <div className="absolute -left-[37px] top-1 w-4 h-4 bg-background border-2 border-primary rounded-full z-10" />
                                                <div className="font-mono text-sm text-primary mb-1">
                                                    {new Date(item.datetime).toLocaleString()}
                                                </div>
                                                <div className="text-lg font-bold">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar: Details & Contact */}
                        <div className="space-y-8">
                            <div className="p-6 border border-border bg-card/50">
                                <h3 className="font-mono font-bold mb-6 text-xl">PRIZE BREAKDOWN</h3>
                                <div className="space-y-4">
                                    {event.prizes.breakdown.map((prize, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0">
                                            <span className="text-muted-foreground">{prize.position}</span>
                                            <span className="font-mono font-bold text-primary">{prize.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border border-border bg-card/50">
                                <h3 className="font-mono font-bold mb-6 text-xl">CONTACT</h3>
                                <div className="space-y-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center text-primary">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <a href={`mailto:${event.contact.email}`} className="hover:text-primary transition-colors">
                                            {event.contact.email}
                                        </a>
                                    </div>
                                    {event.contact.phone && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center text-primary">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span>{event.contact.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

const TicketIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h.01M18 12h.01" />
    </svg>
);

// Helper icon
const FileTextIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

export default EventDetail;
