import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const PublicStudentView = () => {
    const [rollNo, setRollNo] = useState('');
    const [grades, setGrades] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchGrades = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.get('/grades');
            const studentGrades = res.data.filter(g => g.student.id.toUpperCase() === rollNo.toUpperCase());
            setGrades(studentGrades);
            if (studentGrades.length === 0) alert("No records found for this Roll Number.");
        } catch (error) {
            console.error("Error fetching grades:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-section">
            <div className="results-card">
                <h2>Examination Results</h2>
                
                <form onSubmit={fetchGrades}>
                    <div className="form-group">
                        <label>Student Roll Number</label>
                        <input 
                            type="text" 
                            placeholder="e.g. 23EG112E42" 
                            maxLength="10"
                            minLength="10"
                            value={rollNo} 
                            onChange={e => setRollNo(e.target.value.toUpperCase())} 
                            required 
                        />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
                        {loading ? 'Processing...' : 'Get Results'}
                    </button>
                </form>
            </div>

            {grades && grades.length > 0 && (
                <div className="results-card">
                    <div className="student-info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            <span>{grades[0].student.name}</span>
                        </div>
                        <div className="info-item">
                            <label>Roll Number</label>
                            <span>{grades[0].student.id}</span>
                        </div>
                        <div className="info-item">
                            <label>Email ID</label>
                            <span>{grades[0].student.email}</span>
                        </div>
                    </div>

                    <table className="marksheet-table">
                        <thead>
                            <tr>
                                <th>Course / Subject</th>
                                <th>Marks Obtained</th>
                                <th>Letter Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map(g => (
                                <tr key={g.id}>
                                    <td>{g.subject}</td>
                                    <td>{g.marks}</td>
                                    <td>
                                        <span className={`grade-pill grade-${g.gradeLetter}`} style={{
                                            background: g.gradeLetter === 'F' ? '#fee2e2' : '#dcfce7',
                                            color: g.gradeLetter === 'F' ? '#991b1b' : '#166534',
                                            border: `1px solid ${g.gradeLetter === 'F' ? '#fecaca' : '#bbf7d0'}`
                                        }}>
                                            {g.gradeLetter}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            Report errors or discrepancies by logging in below.
                        </p>
                        <Link to="/login" style={{ color: '#5469d4', fontWeight: '600', textDecoration: 'none' }}>
                            Login to Report Discrepancy →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicStudentView;
