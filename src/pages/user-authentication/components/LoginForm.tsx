import { useState } from 'react';
import { AuthFormData, AuthFormErrors, AuthMode } from '../types';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

interface LoginFormProps {
    mode: AuthMode;
    formData: AuthFormData;
    errors: AuthFormErrors;
    isLoading: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (field: keyof AuthFormData, checked: boolean) => void;
    onSubmit: (e: React.FormEvent) => void;
    onForgotPassword: () => void;
}

const LoginForm = ({
                       mode,
                       formData,
                       errors,
                       isLoading,
                       onInputChange,
                       onCheckboxChange,
                       onSubmit,
                       onForgotPassword,
                   }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder={`Enter your ${mode.role} email`}
                value={formData.email}
                onChange={onInputChange}
                error={errors.email}
                required
                disabled={isLoading}
            />

            <div className="space-y-2">
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={onInputChange}
                    error={errors.password}
                    required
                    disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-2 text-sm text-primary hover:underline transition-smooth"
                >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                    <span>{showPassword ? 'Hide' : 'Show'} password</span>
                </button>
            </div>

            <div className="flex items-center justify-between">
                <Checkbox
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={(e) => onCheckboxChange('rememberMe', e.target.checked)}
                    disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-primary hover:underline transition-smooth"
                    disabled={isLoading}
                >
                    Forgot password?
                </button>
            </div>

            {errors.general && (
                <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <Icon name="AlertCircle" size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{errors.general}</p>
                </div>
            )}

            <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                iconName="LogIn"
                iconPosition="left"
            >
                Login to {mode.role === 'student' ? 'Student' : 'Admin'} Account
            </Button>
        </form>
    );
};

export default LoginForm;