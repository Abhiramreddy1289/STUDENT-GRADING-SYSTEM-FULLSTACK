import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CompleteRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleActivate = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        try {
            await api.post('/auth/activate', { email, password });
            alert("Account activated successfully! You can now login.");
            navigate('/login');
        } catch (error) {
            alert("Error: Ensure your email was pre-registered by the Admin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 glass-card">
            <h2>Complete Registration</h2>
            <p className="mb-6 text-gray-600">Activate your account using the email registered by the Admin.</p>
            <form onSubmit={handleActivate} className="space-y-4">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="New Password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Re-enter Password" 
                    required 
                    value={confirm} 
                    onChange={e => setConfirm(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={loading} className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50">
                    {loading ? 'Activating...' : 'Activate Account'}
                </button>
            </form>
        </div>
    );
};

export default CompleteRegistration;
