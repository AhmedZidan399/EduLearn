import { RelatedCourse } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

interface RelatedCoursesProps {
    courses: RelatedCourse[];
}

const RelatedCourses = ({ courses }: RelatedCoursesProps) => {
    const navigate = useNavigate();

    const handleCourseClick = (courseId: string) => {
        navigate('/course-details', { state: { courseId } });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-card-foreground">Related Courses</h3>

            <div className="space-y-4">
                {courses.map((course) => (
                    <button
                        key={course.id}
                        onClick={() => handleCourseClick(course.id)}
                        className="w-full bg-background border border-border rounded-lg overflow-hidden hover:elevation-md transition-smooth text-left"
                    >
                        <div className="flex gap-4 p-4">
                            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.thumbnailAlt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <h4 className="font-semibold text-card-foreground line-clamp-2">
                                    {course.title}
                                </h4>

                                <p className="text-sm text-text-secondary">{course.instructor}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Icon name="Star" size={14} className="text-accent fill-accent" />
                                            <span className="text-sm font-semibold text-card-foreground">
                        {course.rating}
                      </span>
                                        </div>
                                        <span className="text-xs text-text-secondary">
                      ({course.totalStudents.toLocaleString()})
                    </span>
                                    </div>

                                    <span className="text-lg font-bold text-primary">${course.price}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RelatedCourses;