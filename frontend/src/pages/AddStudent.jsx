import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddStudent = () => {
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rollNo.length !== 10) {
            alert("Roll Number must be exactly 10 characters.");
            return;
        }
        setLoading(true);
        try {
            await api.post('/students', { id: rollNo, name, email });
            await api.post('/grades', {
                studentId: rollNo,
                subject,
                marks: parseInt(marks)
            });
            navigate('/');
        } catch (error) {
            console.error("Error adding student/grade:", error);
            alert("Failed to add student. Ensure Roll Number is unique.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register Student and Enter Marks</h2>
            <form onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <label>Roll Number (10 characters)</label>
                    <input type="text" placeholder="e.g. 23EG112E42" maxLength="10" minLength="10" value={rollNo} onChange={e => setRollNo(e.target.value.toUpperCase())} required />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <label>Student Name</label>
                    <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <label>Subject</label>
                    <input type="text" placeholder="Mathematics" value={subject} onChange={e => setSubject(e.target.value)} required />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <label>Marks</label>
                    <input type="number" placeholder="0-100" min="0" max="100" value={marks} onChange={e => setMarks(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Grade'}
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
