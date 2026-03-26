import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useNotification } from '../components';
import { Card } from '../components';
import Button from '../components/Button';
import Input from '../components/Input';
import { IconMail, IconLock, IconPersonAdd, IconSchool } from '../components/Icons';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const handleQuickLogin = (userType) => {
        if (userType === 'admin') {
            setEmail(import.meta.env.VITE_ADMIN_EMAIL || 'admin@app.com');
            setPassword(import.meta.env.VITE_ADMIN_PASSWORD || 'admin123');
        } else {
            setEmail('');
            setPassword('');
            addNotification('info', `${userType.toUpperCase()} Login: Use your registered credentials below.`);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Check for admin default first
            const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@app.com';
            const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
            
            if (email === adminEmail && password === adminPass) {
                login('ADMIN');
                addNotification('success', 'Admin login successful!');
                navigate('/admin');
                return;
            }
            const res = await api.post('/auth/login', { email, password });
            const userData = res.data;
            const role = userData.id ? 'STUDENT' : 'TEACHER';
            login(role, userData);
            addNotification('success', `Welcome back, ${userData.name}!`);
            navigate(role === 'STUDENT' ? '/my-grades' : '/');
        } catch (error) {
            addNotification('error', 'Login failed. Check credentials or activate account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <IconSchool className="mx-auto h-16 w-16 text-blue-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome back! Please sign in to continue.
                    </p>
                </div>

                <Card>
                    <div className="flex flex-wrap gap-2 justify-center mb-8 p-4 bg-gray-50 rounded-xl">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleQuickLogin('admin')}
                        >
                            Admin Demo
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleQuickLogin('teacher')}
                        >
                            Teacher Login
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleQuickLogin('student')}
                        >
                            Student Login
                        </Button>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            iconStart={<IconMail className="w-5 h-5 text-gray-400" />}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            iconStart={<IconLock className="w-5 h-5 text-gray-400" />}
                        />
                        <Button type="submit" loading={loading} className="w-full" size="lg">
                            <IconPersonAdd className="w-5 h-5" />
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <Link to="/complete-registration" className="text-center hover:text-blue-600 font-medium">
                        First time? Activate Account
                    </Link>
                    <Link to="/register-admin" className="text-center hover:text-blue-600 font-medium md:text-right">
                        New Admin? Create Account
                    </Link>
                </div>

                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                        <IconSchool className="w-8 h-8 text-blue-600" />
                        <div>
                            <h3 className="font-semibold text-gray-900">Quick Results Access</h3>
                            <p className="text-sm text-gray-600">View marks without logging in</p>
                        </div>
                    </div>
                    <Link 
                        to="/check-marks" 
                        className="block mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
                    >
                        Check Marks by Roll No →
                    </Link>
                </Card>
            </div>
        </div>
    );
};



export default Login;
