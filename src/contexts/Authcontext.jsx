import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setAuthState(prevState => ({
            ...prevState,
                isAuthenticated: true,
                user: JSON.parse(user),
            }));
        } else {
            setAuthState({
                isAuthenticated: false,
                user: null,
            });
        }
    }, []);

    const login = (user) => {
        console.log("login function called with user:", user);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState(prevState => ({
         ...prevState,
            isAuthenticated: true,
            user: user,
        }));
    };
    
    const logout = () => {
        localStorage.removeItem('user');
        setAuthState({
            isAuthenticated: false,
            user: null,
        });
    };

    // Listen for changes in authState
    useEffect(() => {
        console.log("Authentication state changed:", authState);
    }, [authState]);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

