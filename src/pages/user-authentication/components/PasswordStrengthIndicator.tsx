import { PasswordStrength } from '../types';

interface PasswordStrengthIndicatorProps {
    password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
    const calculateStrength = (pwd: string): PasswordStrength => {
        if (!pwd) return { score: 0, label: '', color: '' };

        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;

        const strengthMap: Record<number, PasswordStrength> = {
            0: { score: 0, label: '', color: '' },
            1: { score: 1, label: 'Weak', color: 'bg-destructive' },
            2: { score: 2, label: 'Fair', color: 'bg-warning' },
            3: { score: 3, label: 'Good', color: 'bg-accent' },
            4: { score: 4, label: 'Strong', color: 'bg-success' },
            5: { score: 5, label: 'Very Strong', color: 'bg-success' },
        };

        return strengthMap[score];
    };

    const strength = calculateStrength(password);

    if (!password) return null;

    return (
        <div className="space-y-2 mt-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-smooth ${
                            level <= strength.score ? strength.color : 'bg-muted'
                        }`}
                    />
                ))}
            </div>
            {strength.label && (
                <p className="text-xs font-medium text-text-secondary">
                    Password strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                </p>
            )}
        </div>
    );
};

export default PasswordStrengthIndicator;