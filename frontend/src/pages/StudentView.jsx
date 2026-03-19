import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentView = () => {
    const { user } = useAuth();
    const [myGrades, setMyGrades] = useState([]);

    useEffect(() => {
        api.get('/grades')
            .then(res => {
                // Filter for current student (simulated)
                const filtered = res.data.filter(g => g.student.id === user.id);
                setMyGrades(filtered);
            });
    }, [user.id]);

    return (
        <div>
            <h2>My Academic Record</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Subjects</h3>
                    <p>{myGrades.length}</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {myGrades.map(g => (
                        <tr key={g.id}>
                            <td>{g.subject}</td>
                            <td>{g.marks}</td>
                            <td><span className={`grade-badge grade-${g.gradeLetter}`}>{g.gradeLetter}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentView;
