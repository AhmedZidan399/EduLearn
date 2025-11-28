import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Course } from '../types';

interface CourseCardProps {
    course: Course;
    onEnroll: (courseId: string) => void;
    isAuthenticated: boolean;
}

const CourseCard = ({ course, onEnroll, isAuthenticated }: CourseCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleEnrollClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate('/user-authentication');
            return;
        }
        onEnroll(course.id);
    };

    const handleCardClick = () => {
        navigate('/course-details', { state: { courseId: course.id } });
    };

    const formatDuration = (hours: number): string => {
        if (hours < 1) return `${Math.round(hours * 60)} mins`;
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    };

    const getDifficultyColor = (difficulty: string): string => {
        switch (difficulty) {
            case 'Beginner':
                return 'text-success bg-success/10';
            case 'Intermediate':
                return 'text-warning bg-warning/10';
            case 'Advanced':
                return 'text-destructive bg-destructive/10';
            default:
                return 'text-secondary bg-secondary/10';
        }
    };

    return (
        <div
            className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:elevation-md cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={course.thumbnail}
                    alt={course.thumbnailAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    {course.isNew && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
              NEW
            </span>
                    )}
                    {course.isBestseller && (
                        <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
              BESTSELLER
            </span>
                    )}
                </div>
                <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                </div>

                <p className="text-sm text-text-secondary line-clamp-2">
                    {course.description}
                </p>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={course.instructorImage}
                            alt={course.instructorImageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-text-primary">
            {course.instructor}
          </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Icon name="BookOpen" size={16} />
                        <span>{course.lessonCount} lessons</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="text-accent fill-accent" />
                            <span className="font-semibold text-text-primary">
                {course.rating.toFixed(1)}
              </span>
                        </div>
                        <span className="text-xs text-text-secondary">
              ({course.totalRatings.toLocaleString()})
            </span>
                    </div>
                    <div className="text-sm text-text-secondary">
                        {course.enrolledStudents.toLocaleString()} students
                    </div>
                </div>

                {isHovered && (
                    <div className="space-y-3 animate-scale-in">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-text-primary">
                                What you'll learn:
                            </p>
                            <ul className="space-y-1">
                                {course.objectives.slice(0, 3).map((objective, index) => (
                                    <li key={index} className="flex items-start gap-2 text-xs text-text-secondary">
                                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-1">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {course.testimonials.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-text-primary">
                                    Student feedback:
                                </p>
                                <div className="bg-muted p-2 rounded text-xs text-text-secondary line-clamp-2">
                                    "{course.testimonials[0].comment}"
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between pt-3">
                    <div className="text-2xl font-bold text-primary">
                        ${course.price.toFixed(2)}
                    </div>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleEnrollClick}
                        iconName="ShoppingCart"
                        iconPosition="left"
                        iconSize={16}
                    >
                        Enroll Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;