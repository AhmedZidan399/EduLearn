import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
    const badges = [
        {
            icon: 'Shield',
            text: 'SSL Secured',
            color: 'text-success',
        },
        {
            icon: 'Lock',
            text: 'Encrypted',
            color: 'text-primary',
        },
        {
            icon: 'CheckCircle2',
            text: 'Verified',
            color: 'text-accent',
        },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-t border-border">
            {badges?.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                    <Icon name={badge?.icon} size={16} className={badge?.color} />
                    <span className="text-xs font-medium text-text-secondary">{badge?.text}</span>
                </div>
            ))}
        </div>
    );
};

export default SecurityBadges;