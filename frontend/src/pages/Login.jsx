import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Check for admin default first
            if (email === 'admin@app.com' && password === 'admin123') {
                login('ADMIN', { name: 'System Admin' });
                navigate('/admin');
                return;
            }
            const res = await api.post('/auth/login', { email, password });
            const userData = res.data;
            const role = userData.id ? 'STUDENT' : 'TEACHER';
            login(role, userData);
            navigate(role === 'STUDENT' ? '/my-grades' : '/');
        } catch (error) {
            alert("Login failed. Please check credentials or activate your account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Portal Login</h2>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
                    <button onClick={() => { setEmail('admin@app.com'); setPassword('admin123'); }} style={roleBtnStyle}>Admin Login</button>
                    <button onClick={() => { setEmail(''); setPassword(''); alert("Please enter your registered Teacher credentials below."); }} style={roleBtnStyle}>Teacher Login</button>
                    <button onClick={() => { setEmail(''); setPassword(''); alert("Please enter your registered Student credentials below."); }} style={roleBtnStyle}>Student Login</button>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.8rem', color: '#666' }}>Email Address</label>
                        <input type="email" placeholder="email@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.8rem', color: '#666' }}>Password</label>
                        <input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '25px', fontSize: '0.9rem', color: '#666' }}>
                    <p>First time here? <Link to="/complete-registration" style={{ color: '#3b82f6', fontWeight: '600' }}>Activate Account</Link></p>
                    <p>New Admin? <Link to="/register-admin" style={{ color: '#3b82f6', fontWeight: '600' }}>Create Admin Account</Link></p>
                </div>
            </div>
            
            <div style={{ background: '#e1f5fe', padding: '1.5rem', borderRadius: '12px', maxWidth: '500px', margin: '2rem auto', border: '1px solid #b3e5fc' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#01579b' }}>Quick Results Access</h3>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Students can view marks directly without logging in.</p>
                <Link to="/check-marks" style={{ display: 'inline-block', padding: '10px 20px', background: '#0288d1', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                    Check Marks by Roll No
                </Link>
            </div>
        </div>
    );
};

const roleBtnStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#f8fafc',
    color: '#475569',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'all 0.2s'
};

const btnStyle = {
    padding: '12px 24px',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
};

export default Login;
