import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminView = () => {
    const [stats, setStats] = useState({ totalStudents: 0, avgMarks: 0, passRate: 0 });
    const [regType, setRegType] = useState('STUDENT');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        api.get('/grades').then(res => {
            const grades = res.data;
            if (grades.length > 0) {
                const total = grades.reduce((acc, g) => acc + g.marks, 0);
                const passed = grades.filter(g => g.marks >= 60).length;
                setStats({
                    totalStudents: new Set(grades.map(g => g.student.id)).size,
                    avgMarks: (total / grades.length).toFixed(2),
                    passRate: ((passed / grades.length) * 100).toFixed(2)
                });
            }
        });
    }, []);

    const [rollNo, setRollNo] = useState('');

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/pre-register', { email, name, role: regType, rollNo });
            alert(`Pre-registered ${regType} successfully! They can now activate their account.`);
            setName(''); setEmail(''); setRollNo('');
        } catch (error) {
            alert("Registration failed.");
        }
    };

    return (
        <div>
            <h2>Administrator Dashboard - Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div className="stat-card" style={{ background: '#ecf0f1', padding: '1rem', borderRadius: '8px' }}>
                    <h4>Total Students</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalStudents}</p>
                </div>
                <div className="stat-card" style={{ background: '#ecf0f1', padding: '1rem', borderRadius: '8px' }}>
                    <h4>Average Marks</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.avgMarks}%</p>
                </div>
                <div className="stat-card" style={{ background: '#ecf0f1', padding: '1rem', borderRadius: '8px' }}>
                    <h4>Pass Rate</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.passRate}%</p>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #ddd', padding: '2rem', borderRadius: '8px' }}>
                <h3>Register New Teacher / Student</h3>
                <p>As Admin, you are responsible for assigning credentials.</p>
                <form onSubmit={handleRegisterUser} style={{ maxWidth: '400px' }}>
                    <select value={regType} onChange={e => setRegType(e.target.value)} style={{ padding: '8px', marginBottom: '10px' }}>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: '10px' }} />
                    <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
                    {regType === 'STUDENT' && (
                        <input type="text" placeholder="Roll No (e.g. 23EG112E42)" required value={rollNo} onChange={e => setRollNo(e.target.value.toUpperCase())} style={{ marginBottom: '10px' }} />
                    )}
                    <button type="submit" style={{ backgroundColor: '#27ae60' }}>Create User Account</button>
                </form>
            </div>
        </div>
    );
};

export default AdminView;
