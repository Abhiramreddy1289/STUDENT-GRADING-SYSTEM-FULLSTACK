import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
import './App.css';

const Navigation = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav>
      <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
        <h1>Grading System</h1>
        {user && (
          <span style={{fontSize:'0.9rem', background:'#34495e', padding:'4px 8px', borderRadius:'4px'}}>
            {user.name} ({user.role})
          </span>
        )}
      </div>
      <ul>
        {!user && <li><Link to="/check-marks">Check Marks</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        
        {user && user.role === 'TEACHER' && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/manage-marks">Manage Marks</Link></li>
            <li><Link to="/add-student">Register Student</Link></li>
          </>
        )}
        {user && user.role === 'STUDENT' && <li><Link to="/my-grades">Report Discrepancy</Link></li>}
        {user && user.role === 'ADMIN' && <li><Link to="/admin">Analytics & Admin</Link></li>}
        {user && <li><button onClick={logout} style={{padding:'4px 8px', background:'#e74c3c', marginLeft:'10px'}}>Logout</button></li>}
      </ul>
    </nav>
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function AppContent() {
  const { user } = useAuth();
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/check-marks" element={<PublicStudentView />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'STUDENT' ? '/my-grades' : user.role === 'ADMIN' ? '/admin' : '/'} />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/complete-registration" element={<CompleteRegistration />} />
          
          <Route path="/" element={<ProtectedRoute allowedRoles={['TEACHER']}><Dashboard /></ProtectedRoute>} />
          <Route path="/manage-marks" element={<ProtectedRoute allowedRoles={['TEACHER']}><ManageGrades /></ProtectedRoute>} />
          <Route path="/add-student" element={<ProtectedRoute allowedRoles={['TEACHER']}><AddStudent /></ProtectedRoute>} />
          
          <Route path="/my-grades" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentView /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminView /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/check-marks" />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
