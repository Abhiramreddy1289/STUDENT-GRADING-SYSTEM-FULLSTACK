import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import ManageGrades from './pages/ManageGrades';
import StudentView from './pages/StudentView';
import AdminView from './pages/AdminView';
import Login from './pages/Login';
import RegisterAdmin from './pages/RegisterAdmin';
import CompleteRegistration from './pages/CompleteRegistration';
import PublicStudentView from './pages/PublicStudentView';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './components';
import Header from './components/Header';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function AppContent() {
  return (
    <Router>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/check-marks" element={<PublicStudentView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/complete-registration" element={<CompleteRegistration />} />
          
          <Route path="/" element={<ProtectedRoute allowedRoles={['TEACHER']}><Dashboard /></ProtectedRoute>} />
          <Route path="/manage-marks" element={<ProtectedRoute allowedRoles={['TEACHER']}><ManageGrades /></ProtectedRoute>} />
          <Route path="/add-student" element={<ProtectedRoute allowedRoles={['TEACHER']}><AddStudent /></ProtectedRoute>} />
          
          <Route path="/my-grades" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentView /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminView /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/check-marks" />} />
        </Routes>
      </main>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
