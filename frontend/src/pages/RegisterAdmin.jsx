import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration and auto-login
        login('ADMIN');
        navigate('/admin');
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 glass-card">
            <h2>Register Administrator</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="email" 
                    placeholder="Admin Email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full btn-primary py-3 rounded-lg font-semibold">
                    Create Admin Account
                </button>
            </form>
        </div>
    );
};

export default RegisterAdmin;
