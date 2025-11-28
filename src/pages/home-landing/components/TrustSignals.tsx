import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
    const trustBadges = [
        {
            icon: 'Shield',
            text: 'SSL Secured',
        },
        {
            icon: 'Lock',
            text: 'Data Protected',
        },
        {
            icon: 'Award',
            text: 'Certified Courses',
        },
        {
            icon: 'CheckCircle',
            text: 'Money-Back Guarantee',
        },
    ];

    return (
        <section className="py-12 bg-muted/30 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                    {trustBadges?.map((badge, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-smooth"
                        >
                            <Icon name={badge?.icon} size={20} />
                            <span className="text-sm font-medium">{badge?.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSignals;