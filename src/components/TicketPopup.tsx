import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { Loader2, Check } from 'lucide-react';

interface TicketPopupProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        name: string;
        desc: string;
    } | null;
}

const TicketPopup = ({ isOpen, onClose, event }: TicketPopupProps) => {
    const { user, login: contextLogin } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsRegistered(false); // Reset on open
        } else {
            document.body.style.overflow = 'unset';
            setIsRegistering(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Google Login flow
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                }).then(res => res.json());

                const credential = {
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                };
                
                 localStorage.setItem('user', JSON.stringify(credential));
                 window.location.reload(); 
            } catch (error) {
                console.error("Login Failed", error);
                toast.error("Login failed. Please try again.");
            }
        },
        onError: () => toast.error("Google Login failed."),
    });

    const handleRegister = async () => {
        if (!user) {
            googleLogin();
            return;
        }

        setIsRegistering(true);
        try {
            const sheetName = event?.name.replace(/ /g, '_').toUpperCase() || 'UNKNOWN_EVENT';

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sheet_name: sheetName,
                    row_data: [
                        user.name,
                        user.email,
                        new Date().toISOString(), 
                    ]
                })
            });

            if (!response.ok) throw new Error('Registration failed');

            setIsRegistered(true);
            toast.success(`Successfully registered for ${event?.name}!`);
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    if (!isOpen || !event) return null;

    return (
        <>
            <div id="popup-overlay" onClick={onClose}></div>
            <div id="movie-ticket-popup">
                <div className="ticket-body">
                    <div className="ticket-header">
                        <span className="ticket-admit">ADMIT ONE</span>
                        <button id="ticket-close-btn" onClick={onClose}>×</button>
                    </div>
                    <h2 id="ticket-title">{event.name}</h2>
                    <p id="ticket-desc">{event.desc}</p>
                    
                    {/* Community link reminder remains untouched */}
                    <p className="mt-4 text-[10px] md:text-xs font-mono text-cyan-400 opacity-80 uppercase tracking-widest leading-relaxed">
                        {">"} You'll get an email with the community link upon registering!
                    </p>

                    <div className="ticket-meta">
                        {/* "NOW PLAYING" tag removed as requested */}
                    </div>
                </div>
                <div className="ticket-rip-line"></div>
                <div className="ticket-stub">
                    <button 
                        className={`register-btn flex items-center justify-center gap-2 ${isRegistered ? 'bg-transparent text-cyan-400 border-cyan-400' : ''}`}
                        onClick={handleRegister}
                        disabled={isRegistering || isRegistered}
                    >
                        {isRegistering ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isRegistered ? (
                            <>
                                <span>REGISTERED</span>
                                <Check className="w-4 h-4" />
                            </>
                        ) : (
                            user ? "REGISTER" : "LOGIN TO REGISTER"
                        )}
                    </button>
                    <span className="mobile-swipe-hint text-xs text-gray-500 mt-2">Swipe down to close</span>
                </div>
            </div>
        </>
    );
};

export default TicketPopup;