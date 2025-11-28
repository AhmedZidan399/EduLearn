import { AuthMode } from '../types';
import Icon from '../../../components/AppIcon';

interface RoleSelectorProps {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
}

const RoleSelector = ({ mode, onModeChange }: RoleSelectorProps) => {
    const roles = [
        {
            type: 'student' as const,
            label: 'Student',
            icon: 'GraduationCap',
            description: 'Access courses and track progress',
        },
        {
            type: 'admin' as const,
            label: 'Administrator',
            icon: 'Shield',
            description: 'Manage courses and users',
        },
    ];

    return (
        <div className="space-y-3 mb-6">
            <label className="block text-sm font-semibold text-text-primary">
                Select Account Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roles.map((role) => (
                    <button
                        key={role.type}
                        type="button"
                        onClick={() => onModeChange({ ...mode, role: role.type })}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-smooth text-left ${
                            mode.role === role.type
                                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-card'
                        }`}
                    >
                        <div
                            className={`flex items-center justify-center w-10 h-10 rounded-md ${
                                mode.role === role.type
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-text-secondary'
                            }`}
                        >
                            <Icon name={role.icon} size={20} />
                        </div>
                        <div className="flex-1">
                            <p
                                className={`font-semibold text-sm ${
                                    mode.role === role.type ? 'text-primary' : 'text-text-primary'
                                }`}
                            >
                                {role.label}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">{role.description}</p>
                        </div>
                        {mode.role === role.type && (
                            <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoleSelector;