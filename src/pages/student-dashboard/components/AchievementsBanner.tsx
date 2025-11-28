import Icon from '../../../components/AppIcon';
import { Achievement } from '../types';

interface AchievementsBannerProps {
    achievements: Achievement[];
}

const AchievementsBanner = ({ achievements }: AchievementsBannerProps) => {
    const recentAchievements = achievements.slice(0, 3);

    const getCategoryColor = (category: Achievement['category']) => {
        const colors = {
            completion: 'bg-success/10 text-success',
            streak: 'bg-destructive/10 text-destructive',
            milestone: 'bg-primary/10 text-primary',
        };
        return colors[category];
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (achievements.length === 0) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 rounded-lg border border-border p-6 elevation-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                    <Icon name="Trophy" size={20} color="white" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-card-foreground">Recent Achievements</h2>
                    <p className="text-sm text-muted-foreground">Celebrate your learning milestones</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentAchievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className="bg-card rounded-lg p-4 border border-border hover:elevation-sm transition-smooth"
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 ${getCategoryColor(achievement.category)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <Icon name={achievement.icon} size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-card-foreground mb-1 line-clamp-1">
                                    {achievement.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {achievement.description}
                                </p>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Icon name="Calendar" size={12} />
                                    <span>{formatDate(achievement.earnedDate)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {achievements.length > 3 && (
                <div className="mt-4 text-center">
                    <button className="text-sm font-medium text-primary hover:underline transition-smooth">
                        View All Achievements ({achievements.length})
                    </button>
                </div>
            )}
        </div>
    );
};

export default AchievementsBanner;