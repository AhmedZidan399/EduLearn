import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import CourseProgressIndicator from '../../../components/CourseProgressIndicator';
import { Course } from '../types';

interface CourseCardProps {
    course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
    const getStatusBadge = () => {
        const statusConfig = {
            'not-started': {
                label: 'Not Started',
                color: 'bg-secondary/10 text-secondary',
                icon: 'Circle',
            },
            'in-progress': {
                label: 'In Progress',
                color: 'bg-accent/10 text-accent',
                icon: 'PlayCircle',
            },
            completed: {
                label: 'Completed',
                color: 'bg-success/10 text-success',
                icon: 'CheckCircle',
            },
        };

        const config = statusConfig[course.status];
        return (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <Icon name={config.icon} size={14} />
                <span>{config.label}</span>
            </div>
        );
    };

    const getDifficultyBadge = () => {
        const difficultyConfig = {
            beginner: { label: 'Beginner', color: 'bg-success/10 text-success' },
            intermediate: { label: 'Intermediate', color: 'bg-warning/10 text-warning' },
            advanced: { label: 'Advanced', color: 'bg-destructive/10 text-destructive' },
        };

        const config = difficultyConfig[course.difficulty];
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
        );
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden hover:elevation-md transition-smooth group">
            <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                    src={course.thumbnail}
                    alt={course.thumbnailAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    {getStatusBadge()}
                    {getDifficultyBadge()}
                </div>
                {course.status === 'completed' && course.certificateUrl && (
                    <div className="absolute top-3 right-3">
                        <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center elevation-sm">
                            <Icon name="Award" size={20} color="white" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                        <Link
                            to={`/course-details?id=${course.id}`}
                            className="text-lg font-semibold text-card-foreground hover:text-primary transition-smooth line-clamp-2 mb-1"
                        >
                            {course.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <CourseProgressIndicator
                        progress={course.progress}
                        totalLessons={course.totalLessons}
                        completedLessons={course.completedLessons}
                        size="sm"
                        showPercentage
                        variant="circular"
                    />
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Icon name="BookOpen" size={16} />
                        <span>{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Icon name="Clock" size={16} />
                        <span>{course.estimatedTime}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>Last accessed: {formatDate(course.lastAccessed)}</span>
                </div>

                <div className="space-y-2">
                    <CourseProgressIndicator
                        progress={course.progress}
                        totalLessons={course.totalLessons}
                        completedLessons={course.completedLessons}
                        showLessonCount
                        variant="linear"
                    />

                    <div className="flex items-center gap-2">
                        {course.status === 'completed' && course.certificateUrl ? (
                            <Button
                                variant="success"
                                size="sm"
                                fullWidth
                                iconName="Download"
                                iconPosition="left"
                                iconSize={16}
                                onClick={() => window.open(course.certificateUrl, '_blank')}
                            >
                                Download Certificate
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                size="sm"
                                fullWidth
                                iconName={course.status === 'not-started' ? 'Play' : 'ArrowRight'}
                                iconPosition="right"
                                iconSize={16}
                                onClick={() => (window.location.href = `/course-details?id=${course.id}`)}
                            >
                                {course.status === 'not-started' ? 'Start Learning' : 'Continue Learning'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;