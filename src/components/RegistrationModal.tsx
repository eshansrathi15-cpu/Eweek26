import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    isTeamEvent?: boolean;
    title?: string;
    subtitle?: string;
}

const RegistrationModal = ({
    isOpen,
    onClose,
    eventName,
    isTeamEvent = false,
    title = "EVENT REGISTRATION",
    subtitle = "SECURE_FORM_v2.1"
}: RegistrationModalProps) => {
    const { user, login } = useAuth();
    const [teamName, setTeamName] = useState("");
    const [captainName, setCaptainName] = useState("");
    const [captainId, setCaptainId] = useState("");
    const [captainPhone, setCaptainPhone] = useState("");
    const [numMembers, setNumMembers] = useState("");
    const [teamMembers, setTeamMembers] = useState<{ name: string, id: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setCaptainName(user.name);
        }
    }, [user]);

    const handleNumMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNumMembers(val);
        const num = parseInt(val);
        if (!isNaN(num) && num > 0) {
            // If number of members (including captain) is X, we need X-1 extra fields
            const additionalMembers = Math.max(0, num - 1);
            // Preserve existing data if increasing, cut off if decreasing
            setTeamMembers(prev => {
                const newArr = [...prev];
                if (additionalMembers > prev.length) {
                    for (let i = prev.length; i < additionalMembers; i++) {
                        newArr.push({ name: "", id: "" });
                    }
                } else {
                    newArr.splice(additionalMembers);
                }
                return newArr;
            });
        } else {
            setTeamMembers([]);
        }
    };

    const handleMemberChange = (index: number, field: 'name' | 'id', value: string) => {
        const updated = [...teamMembers];
        updated[index] = { ...updated[index], [field]: value };
        setTeamMembers(updated);
    };

    const handleSubmit = async () => {
        if (!user) {
            login();
            return;
        }
        setIsSubmitting(true);

        const registrationData = isTeamEvent ? {
            teamName,
            captain: { name: captainName, id: captainId, phone: captainPhone },
            numMembers,
            members: teamMembers
        } : {
            interested: true,
            timestamp: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventName: eventName.replace(/\s+/g, '_').toUpperCase(),
                    user: { name: user.name, email: user.email },
                    registrationData
                })
            });
            if (res.ok) {
                alert('Registration Successful!');
                onClose();
            } else {
                const d = await res.json();
                alert(`Failed: ${d.message}`);
            }
        } catch (e) {
            console.error(e);
            alert('Error submitting registration.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary/30 p-8 film-grain"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold uppercase tracking-tighter text-primary mb-2">
                                {title}
                            </h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                {subtitle}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {isTeamEvent ? (
                                <>
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
                                                2. Captain - Name
                                            </label>
                                            <input
                                                type="text"
                                                value={captainName}
                                                onChange={(e) => setCaptainName(e.target.value)}
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                                placeholder="Enter captain name..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                3. Captain - BITS ID
                                            </label>
                                            <input
                                                type="text"
                                                value={captainId}
                                                onChange={(e) => setCaptainId(e.target.value)}
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                                placeholder="Enter BITS ID..."
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
                                            placeholder="Enter number..."
                                        />
                                    </div>

                                    {teamMembers.map((member, index) => (
                                        <div key={index} className="border-l-2 border-primary/30 pl-6 space-y-4">
                                            <p className="text-xs text-primary uppercase tracking-widest font-bold">
                                                MEMBER {index + 2} DETAILS
                                            </p>
                                            <div>
                                                <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                    {6 + index * 2}. Team Member {index + 2} - Name
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
                                                    {7 + index * 2}. Team Member {index + 2} - BITS ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={member.id}
                                                    onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                                                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                                    placeholder="Enter BITS ID..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="mb-4 text-xl text-foreground">Click below to confirm your registration for {eventName}.</p>
                                    {!user && (
                                        <p className="text-sm text-muted-foreground mb-4">You will be asked to login first.</p>
                                    )}
                                </div>
                            )}

                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-primary text-black font-bold uppercase py-6 mt-8 tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? "PROCESSING..." : "CONFIRM_REGISTRATION"}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
