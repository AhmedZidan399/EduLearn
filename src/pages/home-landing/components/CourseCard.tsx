import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Course } from '../types';

interface CourseCardProps {
    course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div className="bg-card rounded-xl overflow-hidden elevation-md hover:elevation-lg transition-smooth group">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={course.thumbnail}
                    alt={course.thumbnailAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.isNew && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                        NEW
                    </div>
                )}
                <div className="absolute top-3 right-3 px-3 py-1 bg-card/90 backdrop-blur-sm text-card-foreground text-xs font-semibold rounded-full">
                    {course.level}
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
            {course.category}
          </span>
                    <span className="text-xs text-text-secondary">{course.duration}</span>
                </div>

                <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                    {course.title}
                </h3>

                <p className="text-sm text-text-secondary line-clamp-2">
                    {course.description}
                </p>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={course.instructorImage}
                            alt={course.instructorImageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
            {course.instructor}
          </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="text-accent fill-accent" />
                            <span className="text-sm font-semibold text-card-foreground">
                {course.rating.toFixed(1)}
              </span>
                            <span className="text-xs text-text-secondary">
                ({course.totalRatings})
              </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} className="text-text-secondary" />
                            <span className="text-xs text-text-secondary">
                {course.enrolledStudents.toLocaleString()}
              </span>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                            ${course.price.toFixed(2)}
                        </p>
                    </div>
                </div>

                <Link to={`/course-details?id=${course.id}`} className="block">
                    <Button
                        variant="default"
                        size="default"
                        fullWidth
                        iconName="ArrowRight"
                        iconPosition="right"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;