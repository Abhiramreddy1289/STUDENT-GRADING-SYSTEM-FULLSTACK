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
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Register Administrator</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} /><br/><br/>
                <input type="email" placeholder="Admin Email" required value={email} onChange={e => setEmail(e.target.value)} /><br/><br/>
                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
                <button type="submit">Create Admin Account</button>
            </form>
        </div>
    );
};

export default RegisterAdmin;
