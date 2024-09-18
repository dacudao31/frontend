import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
    user: null,
    setUser: () => {},
    removeUser: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialize the user state from localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Store the user in localStorage whenever it changes
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('access');
            localStorage.removeItem('key');
        }
    }, []);

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access');
    };

    return (
        <UserContext.Provider value={{ user, setUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
