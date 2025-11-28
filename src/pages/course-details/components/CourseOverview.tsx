import { Course } from '../types';
import Icon from '../../../components/AppIcon';

interface CourseOverviewProps {
    course: Course;
}

const CourseOverview = ({ course }: CourseOverviewProps) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-card-foreground">About This Course</h2>
                <p className="text-text-secondary leading-relaxed">{course.description}</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-card-foreground">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                                <Icon name="Check" size={14} className="text-success" />
                            </div>
                            <p className="text-text-secondary">{outcome}</p>
                        </div>
                    ))}
                </div>
            </div>

            {course.prerequisites.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-card-foreground">Prerequisites</h3>
                    <ul className="space-y-2">
                        {course.prerequisites.map((prerequisite, index) => (
                            <li key={index} className="flex items-start gap-3 text-text-secondary">
                                <Icon name="Circle" size={8} className="mt-2 flex-shrink-0" />
                                <span>{prerequisite}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-card-foreground">
                        {course.totalStudents.toLocaleString()}
                    </p>
                    <p className="text-sm text-text-secondary">Students Enrolled</p>
                </div>

                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-card-foreground">{course.duration}</p>
                    <p className="text-sm text-text-secondary">Total Duration</p>
                </div>

                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <Icon name="BarChart" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-card-foreground">{course.level}</p>
                    <p className="text-sm text-text-secondary">Skill Level</p>
                </div>

                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <Icon name="Calendar" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-card-foreground">{course.lastUpdated}</p>
                    <p className="text-sm text-text-secondary">Last Updated</p>
                </div>
            </div>
        </div>
    );
};

export default CourseOverview;