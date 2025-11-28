import Icon from '../../../components/AppIcon';
import { Course } from '../types';

interface StatsCardsProps {
    courses: Course[];
}

const StatsCards = ({ courses }: StatsCardsProps) => {
    const totalCourses = courses.length;
    const publishedCourses = courses.filter((c) => c.status === 'published').length;
    const draftCourses = courses.filter((c) => c.status === 'draft').length;
    const totalEnrollments = courses.reduce((sum, c) => sum + c.enrollmentCount, 0);

    const stats = [
        {
            label: 'Total Courses',
            value: totalCourses,
            icon: 'BookOpen',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            label: 'Published',
            value: publishedCourses,
            icon: 'CheckCircle2',
            color: 'text-success',
            bgColor: 'bg-success/10',
        },
        {
            label: 'Draft',
            value: draftCourses,
            icon: 'FileEdit',
            color: 'text-warning',
            bgColor: 'bg-warning/10',
        },
        {
            label: 'Total Enrollments',
            value: totalEnrollments,
            icon: 'Users',
            color: 'text-accent',
            bgColor: 'bg-accent/10',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:elevation-md transition-smooth"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-lg`}>
                            <Icon name={stat.icon} size={24} className={stat.color} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;