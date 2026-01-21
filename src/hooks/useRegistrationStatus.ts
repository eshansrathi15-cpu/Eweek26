import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useRegistrationStatus = () => {
    const { user, isAuthenticated } = useAuth();
    const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize from session storage
    useEffect(() => {
        if (user?.email) {
            const cached = sessionStorage.getItem(`registration_${user.email}`);
            if (cached) {
                setRegisteredEvents(JSON.parse(cached));
            }
        }
    }, [user?.email]);

    const checkStatus = async () => {
        if (!isAuthenticated || !user?.email) {
            setRegisteredEvents([]);
            return;
        }

        // Don't set loading if we already have cached data, to avoid flickering
        // But we might want to know if it's validating in background
        // For now, let's keep it simple: if no cache, show loading.
        const cached = sessionStorage.getItem(`registration_${user.email}`);
        if (!cached) {
            setIsLoading(true);
        }

        try {
            const response = await fetch(`/api/check-registration?email=${encodeURIComponent(user.email)}`);
            const data = await response.json();

            if (data.success) {
                setRegisteredEvents(data.registeredEvents);
                sessionStorage.setItem(`registration_${user.email}`, JSON.stringify(data.registeredEvents));
            } else {
                console.error('Failed to check registration status:', data.error);
            }
        } catch (error) {
            console.error('Error checking registration status:', error);
            // Don't show toast on error to avoid spamming the user on every page load
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, [isAuthenticated, user?.email]);

    // Function to manually add an event to the local state (optimistic update)
    const addRegisteredEvent = (sheetName: string) => {
        setRegisteredEvents(prev => {
            const updated = [...prev, sheetName];
            if (user?.email) {
                sessionStorage.setItem(`registration_${user.email}`, JSON.stringify(updated));
            }
            return updated;
        });
    };

    return {
        registeredEvents,
        isLoading,
        checkStatus,
        addRegisteredEvent
    };
};
