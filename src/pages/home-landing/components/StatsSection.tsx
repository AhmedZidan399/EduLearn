import Icon from '../../../components/AppIcon';
import { PlatformStats } from '../types';

interface StatsSectionProps {
    stats: PlatformStats;
}

const StatsSection = ({ stats }: StatsSectionProps) => {
    const statsData = [
        {
            icon: 'Users',
            value: stats.totalStudents,
            label: 'Active Students',
            color: 'text-primary',
        },
        {
            icon: 'BookOpen',
            value: stats.totalCourses,
            label: 'Quality Courses',
            color: 'text-accent',
        },
        {
            icon: 'Award',
            value: stats.completionRate,
            label: 'Completion Rate',
            color: 'text-success',
        },
        {
            icon: 'Star',
            value: stats.averageRating,
            label: 'Average Rating',
            color: 'text-warning',
        },
    ];

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl p-6 text-center elevation-sm hover:elevation-md transition-smooth"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                                    <Icon name={stat.icon} size={24} className={stat.color} />
                                </div>
                            </div>
                            <p className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-text-secondary">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;