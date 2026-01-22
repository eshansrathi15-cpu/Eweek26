import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: User | null;
    login: (credential: string) => void;
    loginWithUserData: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'user';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
    }, []);

    const login = (credential: string) => {
        try {
            const decoded: any = jwtDecode(credential);
            const userData: User = {
                name: decoded.name || decoded.given_name || 'User',
                email: decoded.email,
                picture: decoded.picture || '',
            };
            setUser(userData);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Failed to decode credential:', error);
        }
    };

    const loginWithUserData = (userData: User) => {
        setUser(userData);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithUserData, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
