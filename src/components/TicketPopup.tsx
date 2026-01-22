import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { Loader2, Check } from 'lucide-react';

import { EVENT_SHEET_MAP } from '@/lib/constants';

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
        const checkRegistration = async () => {
            if (isOpen && user && event?.name) {
                const sheetName = EVENT_SHEET_MAP[event.name];
                if (!sheetName) return;

                // Check session storage first
                const cached = sessionStorage.getItem(`registration_${user.email}`);
                if (cached) {
                    const registeredEvents = JSON.parse(cached);
                    if (registeredEvents.includes(sheetName)) {
                        setIsRegistered(true);
                        document.body.style.overflow = 'hidden';
                        return;
                    }
                }

                // If not in cache (or we want to double check), fetch from API
                // We can skip this if we trust the cache, but for better UX on first load or cross-device, we might want to fetch.
                // For now, let's fetch if not in cache, or maybe always fetch on first open of the session?
                // Let's implement a "stale-while-revalidate" approach or just fetch if not cached.
                // However, the user request implies they want it to persist "till the session ends", so sessionStorage is key.
                // But if they just reloaded the page, sessionStorage might be empty if they closed the tab.

                try {
                    const response = await fetch(`/api/check-registration?email=${encodeURIComponent(user.email)}`);
                    if (response.ok) {
                        const data = await response.json();
                        const registeredEvents = data.registeredEvents || [];

                        // Update cache
                        sessionStorage.setItem(`registration_${user.email}`, JSON.stringify(registeredEvents));

                        if (registeredEvents.includes(sheetName)) {
                            setIsRegistered(true);
                        } else {
                            setIsRegistered(false);
                        }
                    }
                } catch (error) {
                    console.error("Failed to check registration status", error);
                }
            } else if (isOpen) {
                setIsRegistered(false);
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            checkRegistration();
        } else {
            document.body.style.overflow = 'unset';
            setIsRegistering(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, user, event]);

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
            const sheetName = event?.name ? EVENT_SHEET_MAP[event.name] : null;

            if (!sheetName) {
                console.error("Unknown event:", event?.name);
                toast.error("Configuration error. Please try again later.");
                return;
            }

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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            setIsRegistered(true);
            toast.success(`Successfully registered for ${event?.name}!`);

            // Update session storage
            const cached = sessionStorage.getItem(`registration_${user.email}`);
            let registeredEvents = cached ? JSON.parse(cached) : [];
            if (!registeredEvents.includes(sheetName)) {
                registeredEvents.push(sheetName);
                sessionStorage.setItem(`registration_${user.email}`, JSON.stringify(registeredEvents));
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Registration failed. Please try again.");
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

                    {/* Community link reminder - only show for internal registration events */}
                    {event.name !== "WHAT DA FUKREY" && event.name !== "MISSION: POSSIBLE?" && (
                        <p className="mt-4 text-[10px] md:text-xs font-mono text-cyan-400 opacity-80 uppercase tracking-widest leading-relaxed">
                            {">"} You'll get an email with the community link upon registering!
                        </p>
                    )}

                    <div className="ticket-meta">
                        {/* "NOW PLAYING" tag removed as requested */}
                    </div>
                </div>
                <div className="ticket-rip-line"></div>
                <div className="ticket-stub">

                    {event.name === "WHAT DA FUKREY" || event.name === "MISSION: POSSIBLE?" ? (
                        <a
                            href={event.name === "WHAT DA FUKREY" ? "#" : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="register-btn flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                            LINK
                        </a>
                    ) : (
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
                    )}
                    <span className="mobile-swipe-hint text-xs text-gray-500 mt-2">Cross to close</span>
                </div>
            </div>
        </>
    );
};

export default TicketPopup;
