import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useNotification } from '../components';
import { Card } from '../components';
import Button from '../components/Button';
import Input from '../components/Input';
import { IconSchool, IconSearch, IconPerson, SpinnerIcon } from '../components/Icons';

const PublicStudentView = () => {
    const [rollNo, setRollNo] = useState('');
    const [grades, setGrades] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addNotification } = useNotification();

    const fetchGrades = async (e) => {
        e.preventDefault();
        if (rollNo.length !== 10) {
            addNotification('error', 'Roll Number must be exactly 10 characters');
            return;
        }
        setLoading(true);
        try {
            const res = await api.get('/grades');
            const studentGrades = res.data.filter(g => g.student.id.toUpperCase() === rollNo.toUpperCase());
            setGrades(studentGrades);
            if (studentGrades.length === 0) {
                addNotification('info', `No records found for Roll Number ${rollNo}`);
            } else {
                addNotification('success', `Found ${studentGrades.length} subject${studentGrades.length > 1 ? 's' : ''} for ${rollNo}`);
            }
        } catch (error) {
            console.error("Error fetching grades:", error);
            addNotification('error', 'Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { key: 'subject', label: 'Course / Subject' },
        { key: 'marks', label: 'Marks Obtained' },
        { key: 'gradeLetter', label: 'Letter Grade', type: 'grade' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-12">
            <div className="text-center">
                <IconSchool className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Examination Results Portal
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Enter your 10-digit roll number to view your marksheet and grade report
                </p>
            </div>

            <Card>
                <form onSubmit={fetchGrades} className="max-w-md mx-auto">
                    <Input
                        label="Student Roll Number"
                        type="text"
                        placeholder="e.g. 23EG112E42"
                        maxLength={10}
                        minLength={10}
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                        required
                        error={rollNo.length !== 10 && rollNo.length > 0 ? 'Must be exactly 10 characters' : ''}
                    />
                    <Button type="submit" loading={loading} className="w-full mt-4" size="lg">
                        {loading ? <SpinnerIcon size="20px" /> : <IconSearch className="w-5 h-5" />}
                        {loading ? 'Searching...' : 'View Results'}
                    </Button>
                </form>
            </Card>

            {grades && grades.length > 0 && (
                <Card>
                    <div className="student-info-grid">
                        <div className="info-item flex items-center gap-2">
                            <IconPerson className="w-5 h-5 text-gray-500" />
                            <label>Full Name</label>
                            <span>{grades[0].student.name}</span>
                        </div>
                        <div className="info-item">
                            <label>Roll Number</label>
                            <span className="font-mono">{grades[0].student.id}</span>
                        </div>
                        <div className="info-item">
                            <label>Email ID</label>
                            <span>{grades[0].student.email}</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-8">
                        <table className="marksheet-table w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-4">Course / Subject</th>
                                    <th className="text-left py-4">Marks Obtained</th>
                                    <th className="text-left py-4">Letter Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map(g => (
                                    <tr key={g.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 font-medium" data-label="Course / Subject">{g.subject}</td>
                                        <td className="py-4 font-bold text-2xl text-gray-900" data-label="Marks Obtained">{g.marks}</td>
                                        <td className="py-4" data-label="Letter Grade">
                                            <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                                                g.gradeLetter === 'F' 
                                                    ? 'bg-red-100 text-red-800 border border-red-200' 
                                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                            }`}>
                                                {g.gradeLetter}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-4">
                            Need to report a discrepancy? Log in to contact your teacher.
                        </p>
                        <Link 
                            to="/login" 
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                        >
                            <IconPerson className="w-5 h-5" />
                            Login to Report Issue
                        </Link>
                    </div>
                </Card>
            )}
        </div>
    );
};



export default PublicStudentView;
