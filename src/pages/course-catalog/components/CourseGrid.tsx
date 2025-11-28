import CourseCard from './CourseCard';
import { Course } from '../types';

interface CourseGridProps {
    courses: Course[];
    onEnroll: (courseId: string) => void;
    isAuthenticated: boolean;
    isLoading?: boolean;
}

const CourseGrid = ({
                        courses,
                        onEnroll,
                        isAuthenticated,
                        isLoading = false,
                    }: CourseGridProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
                    >
                        <div className="h-48 bg-muted" />
                        <div className="p-4 space-y-3">
                            <div className="h-6 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-5/6" />
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted rounded-full" />
                                <div className="h-4 bg-muted rounded w-24" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-4 bg-muted rounded w-20" />
                                <div className="h-4 bg-muted rounded w-20" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="h-4 bg-muted rounded w-16" />
                                <div className="h-4 bg-muted rounded w-16" />
                            </div>
                            <div className="flex items-center justify-between pt-3">
                                <div className="h-8 bg-muted rounded w-20" />
                                <div className="h-10 bg-muted rounded w-32" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg
                        className="w-12 h-12 text-text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                    No courses found
                </h3>
                <p className="text-text-secondary text-center max-w-md">
                    We couldn't find any courses matching your criteria. Try adjusting your
                    filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    onEnroll={onEnroll}
                    isAuthenticated={isAuthenticated}
                />
            ))}
        </div>
    );
};

export default CourseGrid;