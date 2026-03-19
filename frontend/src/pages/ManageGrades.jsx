import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ManageGrades = () => {
    const [rollNo, setRollNo] = useState('');
    const [course, setCourse] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/grades', {
                studentId: rollNo,
                subject: course,
                marks: parseInt(marks)
            });
            alert('Marks updated successfully!');
            navigate('/');
        } catch (error) {
            console.error("Error updating marks:", error);
            alert("Error: Ensure student exists with this Roll Number.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2>Teacher Panel - Manage Marks</h2>
            <p>Add or Update student marks by Roll No & Course</p>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label>Student Roll Number (10 Chars)</label>
                    <input type="text" placeholder="e.g. 23EG112E42" maxLength="10" minLength="10" required value={rollNo} onChange={e => setRollNo(e.target.value.toUpperCase())} />
                </div>
                <div>
                    <label>Course (Subject)</label>
                    <input type="text" placeholder="Enter Course Name" required value={course} onChange={e => setCourse(e.target.value)} />
                </div>
                <div>
                    <label>Marks</label>
                    <input type="number" placeholder="0-100" min="0" max="100" required value={marks} onChange={e => setMarks(e.target.value)} />
                </div>
                <button type="submit" disabled={loading} style={{ background: '#27ae60', color: 'white', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}>
                    {loading ? 'Processing...' : 'Save/Update Marks'}
                </button>
            </form>
        </div>
    );
};

export default ManageGrades;
