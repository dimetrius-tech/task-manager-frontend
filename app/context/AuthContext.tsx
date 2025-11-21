"use client";

import {createContext, useContext, useEffect, useState} from 'react';
import api from "@/lib/api";
import Cookies from 'js-cookie';
import { attachTokenInterceptor } from '@/lib/api';

interface User {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: () => {},
    refreshUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    const refreshUser = async() => {
        const token = Cookies.get("token");
        attachTokenInterceptor(token);
        try {
            const { data } = await api.get('/auth/me', {requiresAuth: true});
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) refreshUser();
        else setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}