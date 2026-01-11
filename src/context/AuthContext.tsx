import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

interface User {
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginFlow = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                }).then(res => res.json());

                const userData: User = {
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (error) {
                console.error("Login Failed", error);
            }
        },
        onError: () => console.log('Login Failed'),
    });

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login: loginFlow, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
