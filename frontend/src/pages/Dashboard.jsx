import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        api.get('/grades')
            .then(response => setGrades(response.data))
            .catch(error => console.error("Error fetching grades:", error));
    }, []);

    return (
        <div>
            <h2>Student Grading Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map(grade => (
                        <tr key={grade.id}>
                            <td>{grade.student.id}</td>
                            <td>{grade.student.name}</td>
                            <td>{grade.student.email}</td>
                            <td>{grade.subject}</td>
                            <td>{grade.marks}</td>
                            <td>
                                <span className={`grade-badge grade-${grade.gradeLetter}`}>
                                    {grade.gradeLetter}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {grades.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{textAlign: 'center'}}>No data available. Add students to see results.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
