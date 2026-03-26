import React, { createContext, useState, useContext } from 'react';

import { useNotification } from '../components';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (role, userData = {}) => {
        if (role === 'STUDENT') setUser({ role: 'STUDENT', name: 'Alex (Student)', id: '2024STU001', ...userData });
        else if (role === 'ADMIN') setUser({ role: 'ADMIN', name: 'System Admin', ...userData });
        else setUser({ role: 'TEACHER', name: 'Dr. Smith (Teacher)', ...userData });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
