import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../components';
import { Card } from '../components';
import Button from '../components/Button';
import Input from '../components/Input';
import { IconPeople, IconStatsChart, IconMedal, IconPersonAdd, SpinnerIcon } from '../components/Icons';
// Simple native select used instead of react-select

const AdminView = () => {
    const [stats, setStats] = useState({ totalStudents: 0, avgMarks: 0, passRate: 0 });
    const [loading, setLoading] = useState(true);
    const [regType, setRegType] = useState('STUDENT');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rollNo, setRollNo] = useState('');
    const { addNotification } = useNotification();

    useEffect(() => {
        api.get('/grades').then(res => {
            const grades = res.data;
            setLoading(false);
            if (grades.length > 0) {
                const totalMarks = grades.reduce((acc, g) => acc + g.marks, 0);
                const passed = grades.filter(g => g.marks >= 60).length;
                setStats({
                    totalStudents: new Set(grades.map(g => g.student.id)).size,
                    avgMarks: (totalMarks / grades.length).toFixed(1),
                    passRate: ((passed / grades.length) * 100).toFixed(1),
                    totalGrades: grades.length
                });
            }
        }).catch(() => setLoading(false));
    }, []);

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        if (regType === 'STUDENT' && rollNo.length !== 10) {
            addNotification('error', 'Roll Number must be 10 characters for students');
            return;
        }
        try {
            console.log("Attempting to register:", { email, name, role: regType, rollNo });
            const response = await api.post('/auth/pre-register', { email, name, role: regType, rollNo });
            console.log("Registration Response:", response.data);
            addNotification('success', `${regType} ${name} pre-registered successfully! They can now activate their account.`);
            setName(''); 
            setEmail('');
            setRollNo('');
        } catch (error) {
            console.error("Registration Error Object:", error);
            if (error.response) {
                console.error("Server Error Response:", error.response.data);
                console.error("Server Error Status:", error.response.status);
            } else if (error.request) {
                console.error("No Response Received. Check if backend is running.");
            } else {
                console.error("Error setting up request:", error.message);
            }
            const errorMsg = error.response?.data?.message || error.message || 'Server unreachable or registration failed.';
            addNotification('error', errorMsg);
        }
    };

    const roleOptions = [
        { value: 'TEACHER', label: 'Teacher', icon: '👨‍🏫' },
        { value: 'STUDENT', label: 'Student', icon: '🎓' }
    ];

    if (loading) {
        return <div className="flex items-center justify-center h-64"><SpinnerIcon size="48px" /></div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Administrator Dashboard</h2>
                <p className="text-gray-600">Analytics and user management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Total Students" elevated>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-2xl">
                            <IconPeople className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                            <p className="text-gray-600">Registered students</p>
                        </div>
                    </div>
                </Card>
                <Card title="Total Grades">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-100 rounded-2xl">
                            <IconMedal className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalGrades}</p>
                            <p className="text-gray-600">Assessments given</p>
                        </div>
                    </div>
                </Card>
                <Card title="Average Score">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-indigo-100 rounded-2xl">
                            <IconStatsChart className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.avgMarks}%</p>
                            <p className="text-gray-600">Class average</p>
                        </div>
                    </div>
                </Card>
                <Card title="Pass Rate">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-2xl">
                            <IconMedal className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{stats.passRate}%</p>
                            <p className="text-gray-600">Students passing</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="Create New User Account">
                <form onSubmit={handleRegisterUser} className="max-w-md space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                        <select 
                            value={regType} 
                            onChange={(e) => setRegType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="TEACHER">👨‍🏫 Teacher</option>
                            <option value="STUDENT">🎓 Student</option>
                        </select>
                    </div>
                    <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {regType === 'STUDENT' && (
                        <Input
                            label="Roll Number"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                            placeholder="e.g. 23EG112E42"
                            error={rollNo.length !== 10 ? 'Must be exactly 10 characters' : ''}
                            required
                        />
                    )}
                    <Button type="submit" className="w-full" size="lg">
                        <IconPersonAdd className="w-5 h-5 mr-2" />
                        Create User Account
                    </Button>
                </form>
                <p className="mt-4 text-xs text-gray-500 text-center">
                    Users will receive activation details to complete registration
                </p>
            </Card>
        </div>
    );
};


export default AdminView;
