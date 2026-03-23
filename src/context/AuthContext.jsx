import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to parse stored user:', error);
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock authentication - replace with real API call
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1).replace('.', ' '),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            major: 'Computer Science',
            joinedDate: new Date().toISOString(),
            interests: ['Machine Learning', 'Web Development', 'Data Structures']
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const register = (email, password, name, major) => {
        // Mock registration - replace with real API call
        if (!email || !password || !name) {
            throw new Error('Email, password, and name are required');
        }

        const userData = {
            id: Date.now(),
            email,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            major: major || 'Undeclared',
            joinedDate: new Date().toISOString(),
            interests: []
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
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
