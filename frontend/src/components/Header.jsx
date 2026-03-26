import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { IconMenu, IconClose, IconPerson, IconLogOut } from './Icons';
import Button from './Button';

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = {
    public: [
      { to: '/check-marks', label: 'Check Marks' },
      { to: '/login', label: 'Login' }
    ],
    teacher: [
      { to: '/', label: 'Dashboard', icon: '📊' },
      { to: '/manage-marks', label: 'Manage Marks', icon: '✏️' },
      { to: '/add-student', label: 'Add Student', icon: '➕' }
    ],
    student: [
      { to: '/my-grades', label: 'My Grades', icon: '📈' }
    ],
    admin: [
      { to: '/admin', label: 'Analytics', icon: '📈' }
    ]
  };

  const roleItems = user?.role === 'ADMIN' ? navItems.admin :
                    user?.role === 'TEACHER' ? navItems.teacher :
                    user?.role === 'STUDENT' ? navItems.student : [];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <IconMenu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grading Portal
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <IconPerson className="w-4 h-4" />
                <span>{user.name} ({user.role})</span>
              </div>
            )}
            {!user ? (
              <>
                <Link to="/check-marks"><Button size="sm">Check Marks</Button></Link>
                <Link to="/login"><Button>Sign In</Button></Link>
              </>
            ) : (
              <Button variant="danger" size="sm" onClick={logout}>
                <IconLogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-xl absolute top-full left-0 right-0 z-50">
          <div className="px-4 pt-4 pb-6 space-y-2 animate-fadeIn">
            {[...navItems.public, ...roleItems].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-900 hover:bg-gray-100 font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-xl">{item.icon || ''}</span>
                {item.label}
              </Link>
            ))}
            {user && (
              <Button
                variant="danger"
                className="w-full mt-4 py-3"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                Logout
              </Button>
            )}
            <button
              className="w-full flex items-center justify-center gap-2 mt-4 p-3 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <IconClose className="w-5 h-5" />
              Close Menu
            </button>
          </div>
        </div>
      )}
    </header>

  );
};

export default Header;
