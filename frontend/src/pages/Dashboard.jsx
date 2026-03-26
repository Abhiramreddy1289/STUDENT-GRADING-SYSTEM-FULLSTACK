import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../components';
import Table from '../components/Table';
import Card from '../components/Card';
import { IconPeople, IconBook, IconTrendingUp, SpinnerIcon } from '../components/Icons';

const Dashboard = () => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addNotification } = useNotification();

    useEffect(() => {
        api.get('/grades')
            .then(response => {
                setGrades(response.data);
                if (response.data.length === 0) {
                    addNotification('info', 'No grades yet. Add students to see dashboard data.');
                }
            })
            .catch(error => {
                console.error("Error fetching grades:", error);
                addNotification('error', 'Failed to load grades. Please try again.');
            })
            .finally(() => setLoading(false));
    }, [addNotification]);

    const stats = {
        totalStudents: new Set(grades.map(g => g.student.id)).size,
        totalSubjects: grades.length,
        avgMarks: Math.round(grades.reduce((sum, g) => sum + g.marks, 0) / grades.length || 0)
    };

    const columns = [
        { key: 'student.id', label: 'Roll No' },
        { key: 'student.name', label: 'Student', searchKey: 'student.name' },
        { key: 'student.email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'marks', label: 'Marks' },
        { key: 'gradeLetter', label: 'Grade', type: 'grade' }
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <SpinnerIcon size="48px" />
                <p className="mt-4 text-gray-500">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="mb-2">Student Grading Dashboard</h2>
                <p className="text-gray-600">Manage and review all student grades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card title="Total Students">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <IconPeople className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                            <p className="text-sm text-gray-500">Active students</p>
                        </div>
                    </div>
                </Card>
                <Card title="Subjects Graded">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <IconBook className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalSubjects}</p>
                            <p className="text-sm text-gray-500">Courses assessed</p>
                        </div>
                    </div>
                </Card>
                <Card title="Average Marks">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <IconTrendingUp className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.avgMarks}%</p>
                            <p className="text-sm text-gray-500">Class average</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="All Grades">
                <Table
                    data={grades.map(g => ({ ...g, ...g.student }))}
                    columns={columns}
                    searchKey="student.name"
                />
            </Card>
        </div>
    );
};


export default Dashboard;
