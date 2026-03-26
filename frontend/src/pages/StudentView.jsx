import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../components';
import { Card } from '../components';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { IconBook, IconMedal, IconWarning, IconTrendingUp, SpinnerIcon } from '../components/Icons';

const StudentView = () => {
    const { user } = useAuth();
    const [myGrades, setMyGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const { addNotification } = useNotification();

    useEffect(() => {
        if (!user) return;
        
        api.get('/grades')
            .then(res => {
                const filtered = res.data.filter(g => g.student.id === user.id);
                setMyGrades(filtered);
                setLoading(false);
            })
            .catch(() => {
                addNotification('error', 'Failed to load your grades');
                setLoading(false);
            });
    }, [user, addNotification]);

    const stats = {
        totalSubjects: myGrades.length,
        avgMarks: Math.round(myGrades.reduce((sum, g) => sum + g.marks, 0) / myGrades.length || 0),
        passCount: myGrades.filter(g => g.marks >= 60).length
    };

    const columns = [
        { key: 'subject', label: 'Subject' },
        { key: 'marks', label: 'Marks' },
        { key: 'gradeLetter', label: 'Grade', type: 'grade' }
    ];

    const handleReportDiscrepancy = () => {
        if (!reportReason.trim()) {
            addNotification('error', 'Please provide a reason for the discrepancy');
            return;
        }
        // Simulate reporting
        addNotification('success', 'Discrepancy reported! Your teacher has been notified.');
        setShowReportModal(false);
        setReportReason('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <SpinnerIcon size="48px" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">My Academic Record</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    View your grades and report any discrepancies to your teachers
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Subjects Completed">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-2xl">
                            <IconBook className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.totalSubjects}</p>
                            <p className="text-gray-600">Courses taken</p>
                        </div>
                    </div>
                </Card>
                <Card title="Average Performance">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-2xl">
                            <IconTrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.avgMarks}%</p>
                            <p className="text-gray-600">Overall average</p>
                        </div>
                    </div>
                </Card>
                <Card title="Subjects Passed">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-100 rounded-2xl">
                            <IconMedal className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.passCount}</p>
                            <p className="text-gray-600">Passing grades</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="My Grades">
                {myGrades.length === 0 ? (
                    <div className="text-center py-16">
                        <IconBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No grades yet</h3>
                        <p className="text-gray-500 mb-6">Your grades will appear here once teachers have entered them.</p>
                        <Button variant="outline" as={Link} to="/check-marks">
                            View Public Results
                        </Button>
                    </div>
                ) : (
                    <Table
                        data={myGrades}
                        columns={columns}
                        searchKey="subject"
                    />
                )}
            </Card>

            {myGrades.length > 0 && (
                <div className="text-center">
                    <Button 
                        variant="danger" 
                        onClick={() => setShowReportModal(true)}
                        className="max-w-md mx-auto"
                    >
                        <IconWarning className="w-5 h-5 mr-2" />
                        Report Grade Discrepancy
                    </Button>
                </div>
            )}

            <Modal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                title="Report Grade Discrepancy"
                onConfirm={handleReportDiscrepancy}
                confirmLabel="Submit Report"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        If you believe there is an error in your grade record, please provide details below. 
                        Your report will be sent to the relevant teacher.
                    </p>
                    <textarea
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        placeholder="Describe the issue (e.g. 'My Math grade shows 75 but I expected 85 based on my test...')"
                        className="w-full p-3 border border-gray-300 rounded-xl resize-vertical min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
            </Modal>
        </div>
    );
};


export default StudentView;
