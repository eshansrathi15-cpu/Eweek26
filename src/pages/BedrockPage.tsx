import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, Award, Users, Briefcase, Zap, ShoppingCart, Gavel, Flame, HelpCircle, Film, X, Clock, Brain, Crown, BookOpen, ScrollText, Map } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const BedrockPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { user, isAuthenticated } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showTimeline, setShowTimeline] = useState(false); // State for Timeline 
    const [showRulebook, setShowRulebook] = useState(false); // State for Rulebook
    const [showBrochure, setShowBrochure] = useState(false); // State for Brochure
    const [teamName, setTeamName] = useState("");
    const [captainName, setCaptainName] = useState("");
    const [captainEmail, setCaptainEmail] = useState("");
    const [captainId, setCaptainId] = useState("");
    const [captainPhone, setCaptainPhone] = useState("");
    const [numMembers, setNumMembers] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    const handleOpenModal = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLScad8pchFRBQg5_GLAqTmDOQf-RM3B_PbCCUMkg9a33n1gXRA/viewform', '_blank');
    };

    const handleNumMembersChange = (e) => {
        const num = parseInt(e.target.value) || 0;
        setNumMembers(e.target.value);
        // Create array for additional team members (excluding captain) 
        const additionalMembers = num > 1 ? num - 1 : 0;
        setTeamMembers(Array(additionalMembers).fill(null).map(() => ({ name: "", id: "", phone: "" })));
    };

    const handleMemberChange = (index, field, value) => {
        const updated = [...teamMembers];
        updated[index] = { ...updated[index], [field]: value };
        setTeamMembers(updated);
    };

    const handleSubmit = async () => {
        // FIXED: Removed !captainId from validation because there is no input field for it in the UI
        if (!teamName || !captainPhone) {
            toast.error('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const membersData = teamMembers.map((m: any) => `${m.name} (${m.id}) [${m.phone}]`).join(', ');

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sheet_name: 'BEDROCK',
                    row_data: [
                        new Date().toISOString(),
                        teamName,
                        captainName,
                        captainEmail,
                        captainEmail, // FIXED: Using Email as ID since there is no ID input
                        captainPhone,
                        numMembers,
                        membersData
                    ]
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Registration successful!', {
                    description: 'Your team has been registered for BEDROCK.'
                });
                setShowModal(false);
                setTeamName('');
                setCaptainId('');
                setCaptainPhone('');
                setNumMembers('');
                setTeamMembers([]);
            } else {
                toast.error('Registration failed', { description: data.error });
            }
        } catch (error) {
            toast.error('Registration failed', { description: 'Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Timeline Data - UPDATED WITH SPECIFIC ICONS 
    const bedrockTimeline = [
        { time: "28th Jan Onwards", event: "Team Qualifiers: Test your team's creativity. 30 mins of brainstorming! Registrations close on 1st Feb EOD.", status: "LIVE", icon: <Brain className="w-5 h-5 text-primary" /> },
        { time: "4th Feb", event: "Online Interactions: Tell us more about your ideas, skills and team.", status: "UPCOMING", icon: <Users className="w-5 h-5 text-primary" /> },
        { time: "6th Feb", event: "The Auction: Get ready with your bids and negotiating skills to nab your team the best restaurant!", status: "UPCOMING", icon: <Gavel className="w-5 h-5 text-primary" /> },
        { time: "8th Feb", event: "BEDROCK: C'not is yours for the taking!", status: "FINALE", icon: <Crown className="w-5 h-5 text-primary" /> }
    ];

    const features = [{
        icon: <Gavel className="w-5 h-5" />,
        title: "Timeline",
        desc: "Find how Bedrock fits into E-Week.",
        onClick: () => setShowTimeline(true) // Trigger 
    }, {
        icon: <Zap className="w-5 h-5" />,
        title: "Rulebook",
        desc: "Plus FAQs.",
        onClick: () => setShowRulebook(true) // Added Trigger for Rulebook
    }, {
        icon: <Award className="w-5 h-5" />,
        title: "BEDROCK BROCHURE",
        desc: "Everything you need to know.",
        onClick: () => setShowBrochure(true) // Added Trigger for Brochure
    }];

    const stripboardItems = [{
        scene: "01",
        title: "C'NOT_TAKEOVER",
        label: "Restaurant_View"
    }, {
        scene: "02",
        title: "AUCTION_PIT",
        label: "Market_Open"
    }, {
        scene: "03",
        title: "SQUAD",
        label: "Team_Deployment"
    }, {
        scene: "04",
        title: "NIGHT_SHIFT",
        label: "Operational_Chaos"
    }, {
        scene: "05",
        title: "KAMAL'S_OPS",
        label: "Supply_Chain"
    }, {
        scene: "06",
        title: "FINAL_TALLY",
        label: "Profit_Declaration"
    }];

    const restaurantList = [
        "1 DCC – Amit sharma", "2 Desi Tadka – Vikram Chauhan", "3 Blue mMon – Manoj",
        "4 Sharma – Vijay Sharma", "5 Kanha – Shahshi Kant", "6 Al Chicken – Laxman",
        "7 Al cafe – Same", "8 Kamal – Harivand",
        "9 Vijay – Vijay Saini", "10 Retro 64 – Naman Tyagi",
        "11 The momo place / Raj consultancy – Gautam", "12 Anupurna – Resteruant",
        "13 Nobles – Abhimanyu Gupta", "14 Gullus – Paras"
    ];

    return <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain font-mono">
        <WaveformBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 pb-20 md:pb-40">
            {/* Navigation */}
            <motion.div initial={{
                opacity: 0,
                y: -20
            }} animate={{
                opacity: 1,
                y: 0
            }} className="mb-12">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Exit_Theatre
                </Link>
            </motion.div>

            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-24">
                <motion.div initial={{
                    opacity: 0,
                    x: -50
                }} animate={{
                    opacity: 1,
                    x: 0
                }}>
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs tracking-widest uppercase">
                        <Target className="w-4 h-4" /> Market_Volatility: HIGH
                    </div>
                    <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter uppercase">
                        BED<span className="text-primary">ROCK</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-sans leading-relaxed">
                        The iconic C'Not Takeover. 14 teams. One goal: Absolute Market Dominance.
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary/20 text-center">
                        <div className="border border-primary/20 p-3 md:p-4 bg-secondary/10">
                            <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                            <span className="text-xl md:text-2xl font-bold block text-foreground tracking-tighter">14</span>
                            <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest">Elite_Teams</span>
                        </div>
                        <div className="border border-primary/20 p-3 md:p-4 bg-secondary/10">
                            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                            <span className="text-xl md:text-2xl font-bold block text-foreground tracking-tighter">9+ HOURS</span>
                            <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest">Selling_Ops</span>
                        </div>
                        <div className="border border-primary/20 p-3 md:p-4 bg-primary/10">
                            <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                            <span className="text-xl md:text-2xl font-bold block text-foreground tracking-tighter">8 FEB</span>
                            <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest">Showdown</span>
                        </div>
                    </div>
                </motion.div>

                {/* Auction Terminal Visual */}
                <div className="border-2 border-primary/20 bg-black/60 p-6 md:p-8 rounded-sm backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] text-primary/20 rotate-90 tracking-widest">SECURE_SERVER_v4.2</div>
                    <h3 className="text-primary mb-4 md:mb-6 flex items-center gap-2 uppercase tracking-widest font-bold">
                        <ShoppingCart className="w-5 h-5" /> ACTIVE_AUCTION_LOG
                    </h3>
                    <div className="space-y-4 text-xs opacity-80 border-l-2 border-primary/30 pl-4">
                        <p className="text-green-400 font-bold tracking-tighter">{">"} TEAM_ALPHA bid ₹12,000 on REDI_1</p>
                        <p className="text-muted-foreground">{">"} SYSTEM: New problem statement uploaded for Day 2</p>
                        <p className="text-yellow-400">{">"} WARNING: High traffic detected at ANC Circle</p>
                        <p className="text-primary animate-pulse">{">"} WAITING FOR NEXT BID...</p>
                        <Button
                            onClick={handleOpenModal}
                            className="w-full bg-primary text-black font-bold uppercase py-5 md:py-6 mt-6 tracking-widest hover:bg-primary/80 transition-all">
                            Team Registration
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mechanics Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
                {features.map((f, i) => <motion.div
                    key={i}
                    onClick={f.onClick} // Trigger Modal based on card
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: i * 0.1
                    }}
                    className={`p-6 md:p-8 border border-primary/20 bg-secondary/5 group hover:border-primary/50 transition-all ${f.onClick ? "cursor-pointer" : ""}`}>
                    <div className="text-primary mb-4">{f.icon}</div>
                    <h4 className="text-lg font-bold uppercase mb-2 tracking-tighter">{f.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">{f.desc}</p>
                </motion.div>)}
            </div>

            {/* What Is Bedrock Section */}
            <div className="mb-40">
                <motion.div initial={{
                    opacity: 0,
                    y: 30
                }} whileInView={{
                    opacity: 1,
                    y: 0
                }} className="border-l-4 border-primary/40 pl-8 md:pl-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6 md:mb-8 text-primary">
                        What Is Bedrock?
                    </h2>
                    <div className="space-y-4 md:space-y-6 text-muted-foreground font-sans leading-relaxed max-w-4xl">
                        <p className="text-base md:text-xl">
                            What if you got the chance to run your favorite restaurant at C'not?
                            You've had countless dinners there but it's time we turn the tables around!
                        </p>
                        <p className="text-lg md:text-xl">
                            We bring to you BEDROCK-the flagship event of E-Week 2024.
                            It's your chance to make your own team with creative, street smart and those jugaadu friends
                            to manage a restaurant at C'not. Imagine running Sharma's or Kamal's for a day and going crazy
                            with the marketing just to clock in the maximum revenue.
                        </p>
                        <p className="text-lg md:text-xl">
                            Apart from a tonne of fun, memories and laughter, you stand a chance to win a{" "}
                            <span className="inline-block px-4 py-2 bg-primary text-black font-bold text-2xl md:text-3xl tracking-tight border-2 border-primary animate-pulse">
                                CASH PRIZE!
                            </span>
                            {" "}
                            <span className="text-primary font-bold">You C'not miss this!</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* FILM STRIPBOARD SECTION */}
            <div className="relative -mx-6">
                <div className="flex items-center gap-4 mb-8 px-6">
                    <Film className="text-primary w-5 h-5" />
                    <h2 className="text-4xl font-bold tracking-tighter uppercase">BEDROCK RECAP</h2>
                    <div className="h-px flex-1 bg-primary/20 ml-4" />
                    <span className="text-xs text-muted-foreground tracking-[0.3em]">RECAP_v2025</span>
                </div>
                <div className="flex overflow-x-auto gap-1 px-6 pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory border-t border-b border-primary/10 bg-secondary/5 py-12">
                    {stripboardItems.map((item, i) => <div key={i} className="flex-none w-[300px] md:w-[400px] snap-center group cursor-pointer">
                        <div className="relative aspect-[16/9] border border-primary/20 bg-black overflow-hidden mb-4">
                            <div className="absolute top-2 left-2 text-[10px] text-primary/40 font-mono tracking-widest">SCENE {item.scene}</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] opacity-30 group-hover:opacity-100 transition-opacity">
                                    IMAGE_DATA_PENDING
                                </span>
                            </div>
                            <div className="absolute top-0 left-0 right-0 h-4 flex justify-between px-1 opacity-20">
                                {[...Array(12)].map((_, j) => <div key={j} className="w-2 h-2 bg-primary mt-1" />)}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-between px-1 opacity-20">
                                {[...Array(12)].map((_, j) => <div key={j} className="w-2 h-2 bg-primary mb-1" />)}
                            </div>
                        </div>
                        <div className="px-1 flex justify-between items-start font-mono">
                            <div>
                                <h5 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h5>
                                <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">{item.label}</p>
                            </div>
                            <span className="text-[10px] text-primary italic opacity-0 group-hover:opacity-100 transition-opacity">
                                VIEW_RECAP &gt;&gt;
                            </span>
                        </div>
                    </div>)}
                </div>
            </div>

        </div>

        {/* TIMELINE POP-UP */}
        <AnimatePresence>
            {showTimeline && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                    onClick={() => setShowTimeline(false)}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", damping: 20, stiffness: 300 }
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg bg-background border-2 border-primary/50 p-10 film-grain shadow-2xl"
                    >
                        <button
                            onClick={() => setShowTimeline(false)}
                            className="absolute top-6 right-6 text-primary hover:rotate-90 transition-transform duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-10 text-center">
                            <h2 className="text-4xl font-bold uppercase tracking-tighter text-primary mb-2 flex items-center justify-center gap-3">
                                <Clock className="w-8 h-8" /> TIMELINE
                            </h2>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em]">
                                MISSION_OPERATIONS_HUB
                            </p>
                        </div>

                        <div className="space-y-12">
                            {bedrockTimeline.map((item, idx) => (
                                <div key={idx} className="flex gap-6 border-l border-primary/30 pl-6 relative">
                                    {/* The Visual Hub */}
                                    <div className="absolute -left-[16px] top-0 w-8 h-8 bg-background border border-primary/50 flex items-center justify-center shadow-[0_0_10px_rgba(var(--primary),0.3)]">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="text-primary font-bold text-2xl tracking-tighter uppercase">{item.time}</span>
                                            <span className="text-[8px] border border-primary/20 px-2 py-0.5 text-muted-foreground uppercase tracking-widest">{item.status}</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm font-sans leading-relaxed">{item.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* RULEBOOK POP-UP */}
        <AnimatePresence>
            {showRulebook && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                    onClick={() => setShowRulebook(false)}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", damping: 20, stiffness: 300 }
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-background border-2 border-primary/50 p-12 film-grain shadow-2xl custom-scrollbar"
                    >
                        <button
                            onClick={() => setShowRulebook(false)}
                            className="absolute top-6 right-6 text-primary hover:rotate-90 transition-transform duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-12 text-center">
                            <h2 className="text-5xl font-bold uppercase tracking-tighter text-primary mb-4 flex items-center justify-center gap-4">
                                <BookOpen className="w-10 h-10" /> OFFICIAL RULEBOOK
                            </h2>
                            <p className="text-[12px] text-muted-foreground uppercase tracking-[0.6em] border-y border-primary/20 py-2 inline-block">
                                PROTOCOL_DOCKET_v.2025
                            </p>
                        </div>

                        <div className="space-y-10 font-sans text-lg text-muted-foreground leading-relaxed">
                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">01. GENERAL CONDUCT</span>
                                <p>The rules mentioned in this rulebook apply to all teams without exception. Violating any of these rules or any other misconduct going against the event's spirit may result in penalties, including (but not limited to) point deductions, temporary freeze on sales, and disqualification. The final decision-making power in case of any contentions will be in the hands of the Bedrock Organizing Team.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">02. PRODUCTION PROTOCOL</span>
                                <p>No readymade items can be procured from (and no partnerships can be made with) other restaurants or vendors/services. All the items sold at bedrock must be produced in-house on the day. This rule will apply without exceptions, and anyone violating this rule will face strict penalties, including disqualification.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">03. REVENUE & VERIFICATION</span>
                                <p>All and any bills for any item sold must be verified by the CEL team member allotted to your restaurant to be considered sales on BedRock Day. The revenue generated through all sales of food, packaged products, and other items shall go directly to the restaurant's owner on his UPI ID scanners or through cash without any intermediary involvement. The team shall take no share of the revenue. Any team found violating this will be disqualified from BedRock immediately.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">04. SUBSTANCE POLICY</span>
                                <p>The use and abuse of alcohol, narcotics, and other illegal substances is strictly prohibited. Any team found using, providing, or in possession of substances will be disqualified from Bedrock immediately and is liable to face institute action.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">06. LOGISTICS</span>
                                <p>All sales must be made, paid, and completed at C'Not. Home deliveries are strictly prohibited and will not be considered sales for Bedrock unless done through the facilitation of a PowerUp.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">07. INCENTIVES</span>
                                <p>Any additional goodies or freebies to be given out by a team as rewards must come directly from the team. Teams and restaurant owners are prohibited from using restaurant budgets to procure these items.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">08. SPATIAL LIMITS</span>
                                <p>Teams will only be allowed to use the space generally allocated to their restaurants unless otherwise discussed and approved by the Bedrock Organizing Team. The approvals will be evaluated case by case, and the organising team reserves the right to deny any request for extra space. Teams are free to use the space outside the walls within the boundaries of their restaurants for marketing purposes, but this space strictly cannot be used for extra seating.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">09. PERSONNEL CHANGES</span>
                                <p>Any replacements in team members will be evaluated on a case-by-case basis and must be conveyed to and approved by the Bedrock Organizing Team by 14th February 2025 at 10 PM. The Bedrock Team reserves the right to deny any team changes.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">10. DYNAMIC REPLACEMENT</span>
                                <p>Team members cannot be replaced dynamically during the event. Any shortfall in team members during the day will not be compensated, and teams will have to work with the remaining members.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">11. RETAIL RESTRICTIONS</span>
                                <p>If your restaurant sells retail items (Bottled Beverages and Food items) on a normal day, those retail items will be allowed and considered in your sales at Bedrock. No new types of retail items can be purchased specifically for Bedrock. Furthermore, restaurants that generally do not sell retail items will not be allowed to sell retail items at Bedrock.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">12. PRICING & QUANTITY</span>
                                <p>Any change in prices and quantity of items listed on the restaurant's menu must be with the consent of the restaurant owner and informed to the POR of your team and restaurant.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">13. MENU ADDITIONS</span>
                                <p>Any menu items that need to be added have to be added with the consent of the restaurant owner and the prior approval of the Bedrock Organizing Team. The organising team reserves the right to veto any new menu item planned without exception.</p>
                            </div>

                            <div className="border-l-4 border-primary/40 pl-6 py-2">
                                <span className="text-primary font-bold text-2xl mb-2 block">14. BEVERAGE COMPLIANCE</span>
                                <p>Milkshakes and all other beverages (except bottled ones) must be made in-house to be sold. Prices of all such items introduced outside of regular menus of the restaurants must be priorly approved by the owner and informed to the BedRock Team. The organising team reserves the right to veto any planned price and its changes without exception.</p>
                            </div>
                        </div>

                        <div className="mt-16 p-6 bg-primary/10 border-2 border-primary/30 text-lg text-primary font-bold uppercase tracking-widest text-center">
                            "#somethingcrazy"
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* BROCHURE POP-UP */}
        <AnimatePresence>
            {showBrochure && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                    onClick={() => setShowBrochure(false)}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", damping: 20, stiffness: 300 }
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl bg-background border-2 border-primary/50 p-10 film-grain shadow-2xl"
                    >
                        <button
                            onClick={() => setShowBrochure(false)}
                            className="absolute top-6 right-6 text-primary hover:rotate-90 transition-transform duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-10 text-center">
                            <h2 className="text-4xl font-bold uppercase tracking-tighter text-primary mb-2 flex items-center justify-center gap-3">
                                <ScrollText className="w-8 h-8" /> BEDROCK BROCHURE
                            </h2>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em]">
                                C'NOT_RESTAURANT_DIRECTORY_v1.0
                            </p>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 p-6 font-mono text-sm space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                            <p className="text-primary mb-4 font-bold tracking-widest uppercase border-b border-primary/20 pb-2 flex items-center gap-2">
                                <Map className="w-4 h-4" /> SECURE_DATA_LIST:
                            </p>
                            {restaurantList.map((item, idx) => (
                                <div key={idx} className="flex gap-3 text-muted-foreground hover:text-primary transition-colors py-1">
                                    <span className="text-primary/50 font-bold">{">"}</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Button
                                onClick={() => setShowBrochure(false)}
                                className="bg-primary text-black font-bold uppercase py-4 px-8 tracking-widest hover:bg-primary/80 transition-all">
                                CLOSE_BROCHURE
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Registration Modal (Original) */}
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary/30 p-8 film-grain"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold uppercase tracking-tighter text-primary mb-2">
                                TEAM_REGISTRATION
                            </h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                SECURE_FORM_v2.1 // BROWNIE POINTS FOR COOLEST NAMES!
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                    1. Team Name
                                </label>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                    placeholder="Enter team name..."
                                />
                            </div>

                            <div className="border-l-2 border-primary/30 pl-6 space-y-4">
                                <p className="text-xs text-primary uppercase tracking-widest font-bold">CAPTAIN DETAILS</p>
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                        2. Captain - Name (from Google)
                                    </label>
                                    <input
                                        type="text"
                                        value={captainName}
                                        readOnly
                                        className="w-full bg-black/60 border border-primary/30 px-4 py-3 text-foreground/70 cursor-not-allowed font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                        3. Captain - Email (from Google)
                                    </label>
                                    <input
                                        type="email"
                                        value={captainEmail}
                                        readOnly
                                        className="w-full bg-black/60 border border-primary/30 px-4 py-3 text-foreground/70 cursor-not-allowed font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                        4. Captain - Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={captainPhone}
                                        onChange={(e) => setCaptainPhone(e.target.value)}
                                        className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                        placeholder="Enter phone number..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                    5. Number of Team Members (Including Captain)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={numMembers}
                                    onChange={handleNumMembersChange}
                                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                    placeholder="Enter number (max 8)..."
                                />
                            </div>

                            {teamMembers.map((member, index) => (
                                <div key={index} className="border-l-2 border-primary/30 pl-6 space-y-4">
                                    <p className="text-xs text-primary uppercase tracking-widest font-bold">
                                        MEMBER {index + 2} DETAILS
                                    </p>
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                            {6 + index * 3}. Team Member {index + 2} - Name
                                        </label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                            className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                            placeholder="Enter name..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                            {7 + index * 3}. Team Member {index + 2} - BITS Email
                                        </label>
                                        <input
                                            type="text"
                                            value={member.id}
                                            onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                                            className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                            placeholder="Enter BITS Email..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                            {8 + index * 3}. Team Member {index + 2} - Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={member.phone}
                                            onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                            className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                            placeholder="Enter phone number..."
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-primary text-black font-bold uppercase py-6 mt-8 tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT_REGISTRATION'}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>;
};

export default BedrockPage;