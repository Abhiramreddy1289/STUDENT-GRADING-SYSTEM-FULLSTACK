import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useNotification } from '../components';
import { Card } from '../components';
import Button from '../components/Button';
import Input from '../components/Input';
import { IconPersonAdd, IconMail, IconBook, IconMedal, IconPerson, SpinnerIcon } from '../components/Icons';

const AddStudent = () => {
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const validateForm = () => {
        if (rollNo.length !== 10) {
            addNotification('error', 'Roll Number must be exactly 10 characters');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            addNotification('error', 'Please enter a valid email address');
            return false;
        }
        if (marks < 0 || marks > 100) {
            addNotification('error', 'Marks must be between 0 and 100');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await api.post('/students', { id: rollNo, name, email });
            await api.post('/grades', {
                studentId: rollNo,
                subject,
                marks: parseInt(marks)
            });
            addNotification('success', `Student ${name} registered and grade submitted successfully!`);
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            console.error("Error adding student/grade:", error);
            addNotification('error', 'Failed to add student. Roll Number may already exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
                <IconPersonAdd className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Register New Student</h1>
                <p className="text-gray-600">Add student details and initial grade</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Roll Number"
                        type="text"
                        placeholder="e.g. 23EG112E42"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                        error={rollNo.length !== 10 && rollNo.length > 0 ? 'Must be exactly 10 characters' : ''}
                        required
                        iconStart={<IconPerson className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                        label="Student Name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Subject"
                        type="text"
                        placeholder="Mathematics"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        iconStart={<IconBook className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                        label="Marks (0-100)"
                        type="number"
                        placeholder="85"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        min="0"
                        max="100"
                        error={marks && (marks < 0 || marks > 100) ? 'Must be between 0 and 100' : ''}
                        required
                        iconStart={<IconMedal className="w-5 h-5 text-gray-400" />}
                    />
                    <Button type="submit" loading={loading} className="w-full" size="lg">
                        {loading ? <SpinnerIcon size="20px" /> : 'Submit Student & Grade'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};


export default AddStudent;
