import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormData, AuthFormErrors, AuthMode } from './types';
import Header from '../../components/Header';
import AuthTabs from './components/AuthTabs';
import RoleSelector from './components/RoleSelector';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import SecurityBadges from './components/SecurityBadges';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Icon from '../../components/AppIcon';

interface MockCredentials {
    email: string;
    password: string;
    name: string;
    role: 'student' | 'admin';
}

const UserAuthentication = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>({ type: 'login', role: 'student' });
    const [formData, setFormData] = useState<AuthFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<AuthFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const mockCredentials: MockCredentials[] = [
        {
            email: 'student@edulearn.com',
            password: 'Student@123',
            name: 'John Student',
            role: 'student',
        },
        {
            email: 'admin@edulearn.com',
            password: 'Admin@123',
            name: 'Sarah Admin',
            role: 'admin',
        },
    ];

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            const userRole = localStorage.getItem('userRole');
            if (userRole === 'admin') {
                navigate('/admin-course-management');
            } else {
                navigate('/student-dashboard');
            }
        }
    }, [navigate]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: AuthFormErrors = {};

        if (mode.type === 'register' && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (mode.type === 'register') {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            if (!formData.agreeToTerms) {
                newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
            general: undefined,
        }));
    };

    const handleCheckboxChange = (field: keyof AuthFormData, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: checked,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    const handleModeChange = (newMode: AuthMode) => {
        setMode(newMode);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false,
            agreeToTerms: false,
        });
        setErrors({});
    };

    const handleLogin = () => {
        const matchedCredential = mockCredentials.find(
            (cred) =>
                cred.email === formData.email &&
                cred.password === formData.password &&
                cred.role === mode.role
        );

        if (matchedCredential) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', matchedCredential.role);
            localStorage.setItem('userName', matchedCredential.name);
            localStorage.setItem('userEmail', matchedCredential.email);

            if (formData.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            setTimeout(() => {
                setIsLoading(false);
                if (matchedCredential.role === 'admin') {
                    navigate('/admin-course-management');
                } else {
                    navigate('/student-dashboard');
                }
            }, 1000);
        } else {
            setIsLoading(false);
            setErrors({
                general: `Invalid credentials for ${mode.role} account. Please check your email and password.`,
            });
        }
    };

    const handleRegister = () => {
        const existingUser = mockCredentials.find(
            (cred) => cred.email === formData.email && cred.role === mode.role
        );

        if (existingUser) {
            setIsLoading(false);
            setErrors({
                general: 'An account with this email already exists. Please login instead.',
            });
            return;
        }

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', mode.role);
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userEmail', formData.email);

        setTimeout(() => {
            setIsLoading(false);
            if (mode.role === 'admin') {
                navigate('/admin-course-management');
            } else {
                navigate('/student-dashboard');
            }
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        if (mode.type === 'login') {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const handleSocialAuth = (provider: string) => {
        console.log(`Social authentication with ${provider}`);
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleForgotPasswordSubmit = (email: string) => {
        console.log(`Password reset requested for: ${email}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                isAuthenticated={false}
                onLoginClick={() => {}}
                onLogoutClick={() => {}}
            />

            <main className="pt-16 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <div className="bg-card rounded-lg elevation-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    <Icon name="GraduationCap" size={32} className="text-primary" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome to EduLearn</h1>
                            <p className="text-white/90">
                                {mode.type === 'login' ?'Sign in to continue your learning journey' :'Create an account to start learning today'}
                            </p>
                        </div>

                        <div className="p-6 sm:p-8">
                            <AuthTabs mode={mode} onModeChange={handleModeChange} />

                            <RoleSelector mode={mode} onModeChange={handleModeChange} />

                            {mode.type === 'login' ? (
                                <LoginForm
                                    mode={mode}
                                    formData={formData}
                                    errors={errors}
                                    isLoading={isLoading}
                                    onInputChange={handleInputChange}
                                    onCheckboxChange={handleCheckboxChange}
                                    onSubmit={handleSubmit}
                                    onForgotPassword={handleForgotPassword}
                                />
                            ) : (
                                <RegisterForm
                                    mode={mode}
                                    formData={formData}
                                    errors={errors}
                                    isLoading={isLoading}
                                    onInputChange={handleInputChange}
                                    onCheckboxChange={handleCheckboxChange}
                                    onSubmit={handleSubmit}
                                />
                            )}

                            <div className="mt-6">
                                <SocialAuthButtons onSocialAuth={handleSocialAuth} disabled={isLoading} />
                            </div>

                            <SecurityBadges />
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-text-secondary">
                            By continuing, you agree to our{' '}
                            <button className="text-primary hover:underline">Terms of Service</button> and{' '}
                            <button className="text-primary hover:underline">Privacy Policy</button>
                        </p>
                    </div>
                </div>
            </main>

            <ForgotPasswordModal
                isOpen={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
                onSubmit={handleForgotPasswordSubmit}
            />
        </div>
    );
};

export default UserAuthentication;