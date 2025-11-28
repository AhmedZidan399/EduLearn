import Icon from '../../../components/AppIcon';
import { ProgressStats } from '../types';

interface ProgressStatsCardProps {
    stats: ProgressStats;
}

const ProgressStatsCard = ({ stats }: ProgressStatsCardProps) => {
    const statItems = [
        {
            icon: 'BookOpen',
            label: 'Total Courses',
            value: stats.totalCourses,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            icon: 'CheckCircle',
            label: 'Completed',
            value: stats.completedCourses,
            color: 'text-success',
            bgColor: 'bg-success/10',
        },
        {
            icon: 'Clock',
            label: 'In Progress',
            value: stats.inProgressCourses,
            color: 'text-accent',
            bgColor: 'bg-accent/10',
        },
        {
            icon: 'Award',
            label: 'Certificates',
            value: stats.certificatesEarned,
            color: 'text-warning',
            bgColor: 'bg-warning/10',
        },
        {
            icon: 'Flame',
            label: 'Day Streak',
            value: stats.currentStreak,
            color: 'text-destructive',
            bgColor: 'bg-destructive/10',
        },
        {
            icon: 'TrendingUp',
            label: 'Avg Progress',
            value: `${stats.averageProgress}%`,
            color: 'text-secondary',
            bgColor: 'bg-secondary/10',
        },
    ];

    return (
        <div className="bg-card rounded-lg border border-border p-6 elevation-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={20} className="text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-card-foreground">Learning Progress</h2>
                    <p className="text-sm text-muted-foreground">Your overall statistics</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
                    >
                        <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mb-3`}>
                            <Icon name={item.icon} size={20} className={item.color} />
                        </div>
                        <p className="text-2xl font-bold text-card-foreground mb-1">{item.value}</p>
                        <p className="text-xs text-muted-foreground text-center">{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icon name="Target" size={20} className="text-primary" />
                        <div>
                            <p className="text-sm font-medium text-card-foreground">Total Learning Time</p>
                            <p className="text-xs text-muted-foreground">Across all courses</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-primary">{stats.totalLearningHours}h</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressStatsCard;