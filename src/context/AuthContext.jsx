import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize auth state from local storage token
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/users/profile');
                    setUser(response.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const response = await api.post('/auth/login', { email, password });
        const { token, user: userData } = response.data;
        
        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
    };

    const register = async (email, password, name, major) => {
        if (!email || !password || !name) {
            throw new Error('Email, password, and name are required');
        }

        const response = await api.post('/auth/register', { email, password, name, major });
        const { token, user: userData } = response.data;

        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    const updateProfile = async (updates) => {
        // Optional placeholder for profile updates
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        return updatedUser;
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            register,
            logout,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
