import { useState, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import Input from './ui/Input';

interface AuthenticationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin?: (email: string, password: string, role: 'student' | 'admin') => void;
    onRegister?: (name: string, email: string, password: string, role: 'student' | 'admin') => void;
}

const AuthenticationModal = ({
                                 isOpen,
                                 onClose,
                                 onLogin,
                                 onRegister,
                             }: AuthenticationModalProps) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [role, setRole] = useState<'student' | 'admin'>('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setMode('login');
            setRole('student');
        }
    }, [isOpen]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (mode === 'register' && !formData.name.trim()) {
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

        if (mode === 'register') {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            if (mode === 'login') {
                onLogin?.(formData.email, formData.password, role);
            } else {
                onRegister?.(formData.name, formData.email, formData.password, role);
            }
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    const handleModeSwitch = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-[1020] flex items-center justify-center p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div className="bg-card rounded-lg w-full max-w-md elevation-lg animate-scale-in max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-2xl font-bold text-card-foreground">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-muted transition-smooth"
                        aria-label="Close modal"
                    >
                        <Icon name="X" size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="flex gap-2 p-1 bg-muted rounded-md">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                                role === 'student' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                            }`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                                role === 'admin' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                            }`}
                        >
                            Admin
                        </button>
                    </div>

                    {mode === 'register' && (
                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={errors.name}
                            required
                        />
                    )}

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        required
                    />

                    {mode === 'register' && (
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            error={errors.confirmPassword}
                            required
                        />
                    )}

                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
                        iconPosition="left"
                    >
                        {mode === 'login' ? 'Login' : 'Create Account'}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleModeSwitch}
                            className="text-sm text-primary hover:underline transition-smooth"
                        >
                            {mode === 'login' ? "Don't have an account? Register"
                                : 'Already have an account? Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthenticationModal;