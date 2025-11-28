import { useState } from 'react';
import { AuthFormData, AuthFormErrors, AuthMode } from '../types';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

interface RegisterFormProps {
    mode: AuthMode;
    formData: AuthFormData;
    errors: AuthFormErrors;
    isLoading: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (field: keyof AuthFormData, checked: boolean) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = ({
                          mode,
                          formData,
                          errors,
                          isLoading,
                          onInputChange,
                          onCheckboxChange,
                          onSubmit,
                      }: RegisterFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={onInputChange}
                error={errors.name}
                required
                disabled={isLoading}
            />

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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={onInputChange}
                    error={errors.password}
                    required
                    disabled={isLoading}
                    description="Must be at least 8 characters with uppercase, lowercase, and numbers"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-2 text-sm text-primary hover:underline transition-smooth"
                >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                    <span>{showPassword ? 'Hide' : 'Show'} password</span>
                </button>
                <PasswordStrengthIndicator password={formData.password} />
            </div>

            <div className="space-y-2">
                <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={onInputChange}
                    error={errors.confirmPassword}
                    required
                    disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex items-center gap-2 text-sm text-primary hover:underline transition-smooth"
                >
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
                    <span>{showConfirmPassword ? 'Hide' : 'Show'} password</span>
                </button>
            </div>

            <Checkbox
                label={
                    <span className="text-sm">
            I agree to the{' '}
                        <button type="button" className="text-primary hover:underline">
              Terms of Service
            </button>{' '}
                        and{' '}
                        <button type="button" className="text-primary hover:underline">
              Privacy Policy
            </button>
          </span>
                }
                checked={formData.agreeToTerms}
                onChange={(e) => onCheckboxChange('agreeToTerms', e.target.checked)}
                error={errors.agreeToTerms}
                required
                disabled={isLoading}
            />

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
                iconName="UserPlus"
                iconPosition="left"
            >
                Create {mode.role === 'student' ? 'Student' : 'Admin'} Account
            </Button>
        </form>
    );
};

export default RegisterForm;