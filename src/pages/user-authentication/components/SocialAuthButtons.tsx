import { SocialAuthProvider } from '../types';

import Button from '../../../components/ui/Button';

interface SocialAuthButtonsProps {
    onSocialAuth: (provider: string) => void;
    disabled?: boolean;
}

const SocialAuthButtons = ({ onSocialAuth, disabled = false }: SocialAuthButtonsProps) => {
    const providers: SocialAuthProvider[] = [
        {
            id: 'google',
            name: 'Google',
            icon: 'Chrome',
            color: 'hover:bg-red-50 hover:border-red-500',
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: 'Github',
            color: 'hover:bg-gray-50 hover:border-gray-700',
        },
    ];

    return (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-text-secondary font-medium">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {providers.map((provider) => (
                    <Button
                        key={provider.id}
                        type="button"
                        variant="outline"
                        onClick={() => onSocialAuth(provider.id)}
                        disabled={disabled}
                        className={`${provider.color} transition-smooth`}
                        iconName={provider.icon}
                        iconPosition="left"
                        iconSize={18}
                    >
                        {provider.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default SocialAuthButtons;