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
        <div style={{ maxWidth: '400px', margin: '50px auto' }} className="glass-card">
            <h2>Complete Registration</h2>
            <p>Activate your account using the email registered by the Admin.</p>
            <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="New Password" required value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Re-enter Password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Activating...' : 'Activate Account'}
                </button>
            </form>
        </div>
    );
};

export default CompleteRegistration;
