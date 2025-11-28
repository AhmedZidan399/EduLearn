import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            onSubmit(email);
            setIsSuccess(true);
            setIsLoading(false);
            setTimeout(() => {
                handleClose();
            }, 2000);
        }, 1000);
    };

    const handleClose = () => {
        setEmail('');
        setError('');
        setIsSuccess(false);
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-[1030] flex items-center justify-center p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div className="bg-card rounded-lg w-full max-w-md elevation-lg animate-scale-in">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-card-foreground">Reset Password</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-md hover:bg-muted transition-smooth"
                        aria-label="Close modal"
                    >
                        <Icon name="X" size={20} />
                    </button>
                </div>

                {isSuccess ? (
                    <div className="p-6 text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                                <Icon name="CheckCircle2" size={32} className="text-success" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-card-foreground mb-2">Email Sent!</h3>
                            <p className="text-sm text-text-secondary">
                                Check your inbox for password reset instructions.
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div className="space-y-2">
                            <p className="text-sm text-text-secondary">
                                Enter your email address and we'll send you instructions to reset your password.
                            </p>
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            error={error}
                            required
                            disabled={isLoading}
                        />

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="default"
                                loading={isLoading}
                                iconName="Send"
                                iconPosition="left"
                                className="flex-1"
                            >
                                Send Reset Link
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal;