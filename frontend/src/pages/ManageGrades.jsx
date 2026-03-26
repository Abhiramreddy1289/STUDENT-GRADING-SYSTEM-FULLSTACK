import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useNotification } from '../components';
import { Card } from '../components';
import Button from '../components/Button';
import Input from '../components/Input';
import { IconCreate, IconBook, IconMedal, SpinnerIcon } from '../components/Icons';

const ManageGrades = () => {
    const [rollNo, setRollNo] = useState('');
    const [course, setCourse] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const validateForm = () => {
        if (rollNo.length !== 10) {
            addNotification('error', 'Roll Number must be exactly 10 characters');
            return false;
        }
        if (marks < 0 || marks > 100) {
            addNotification('error', 'Marks must be between 0 and 100');
            return false;
        }
        return true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await api.post('/grades', {
                studentId: rollNo,
                subject: course,
                marks: parseInt(marks)
            });
            addNotification('success', 'Marks saved/updated successfully!');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            console.error("Error updating marks:", error);
            addNotification('error', 'Error: Student may not exist. Check Roll Number.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
                <IconCreate className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Manage Student Marks</h1>
                <p className="text-gray-600">Add or update grades for existing students</p>
            </div>

            <Card>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <Input
                        label="Student Roll Number"
                        type="text"
                        placeholder="e.g. 23EG112E42"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                        error={rollNo.length !== 10 && rollNo.length > 0 ? 'Must be exactly 10 characters' : ''}
                        required
                        iconStart={<IconCreate className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                        label="Course / Subject"
                        type="text"
                        placeholder="Mathematics"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
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
                        {loading ? <SpinnerIcon size="20px" /> : 'Save / Update Marks'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};



export default ManageGrades;
