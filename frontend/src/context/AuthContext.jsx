import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (role) => {
        if (role === 'STUDENT') setUser({ role: 'STUDENT', name: 'Alex (Student)', id: '2024STU001' });
        else if (role === 'ADMIN') setUser({ role: 'ADMIN', name: 'System Admin' });
        else setUser({ role: 'TEACHER', name: 'Dr. Smith (Teacher)' });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
