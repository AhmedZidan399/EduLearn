import { AuthMode } from '../types';
import Icon from '../../../components/AppIcon';

interface AuthTabsProps {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
}

const AuthTabs = ({ mode, onModeChange }: AuthTabsProps) => {
    const tabs = [
        { type: 'login' as const, label: 'Login', icon: 'LogIn' },
        { type: 'register' as const, label: 'Register', icon: 'UserPlus' },
    ];

    return (
        <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.type}
                    type="button"
                    onClick={() => onModeChange({ ...mode, type: tab.type })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-semibold transition-smooth ${
                        mode.type === tab.type
                            ? 'bg-primary text-primary-foreground elevation-sm'
                            : 'text-text-secondary hover:text-text-primary hover:bg-background'
                    }`}
                >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default AuthTabs;