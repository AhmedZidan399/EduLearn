import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { CourseRecommendation } from '../types';

interface RecommendationsPanelProps {
    recommendations: CourseRecommendation[];
}

const RecommendationsPanel = ({ recommendations }: RecommendationsPanelProps) => {
    const getDifficultyColor = (difficulty: CourseRecommendation['difficulty']) => {
        const colors = {
            beginner: 'bg-success/10 text-success',
            intermediate: 'bg-warning/10 text-warning',
            advanced: 'bg-destructive/10 text-destructive',
        };
        return colors[difficulty];
    };

    return (
        <div className="bg-card rounded-lg border border-border p-6 elevation-sm">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Sparkles" size={20} className="text-accent" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-card-foreground">Recommended for You</h2>
                        <p className="text-sm text-muted-foreground">Based on your learning history</p>
                    </div>
                </div>
                <Link
                    to="/course-catalog"
                    className="text-sm font-medium text-primary hover:underline transition-smooth"
                >
                    Explore All
                </Link>
            </div>

            <div className="space-y-4">
                {recommendations.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Icon name="BookOpen" size={24} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">No recommendations yet</p>
                        <p className="text-xs text-muted-foreground mt-1">Complete more courses to get personalized suggestions</p>
                    </div>
                ) : (
                    recommendations.map((course) => (
                        <div
                            key={course.id}
                            className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth group"
                        >
                            <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.thumbnailAlt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <Link
                                    to={`/course-details?id=${course.id}`}
                                    className="text-sm font-semibold text-card-foreground hover:text-primary transition-smooth line-clamp-1 mb-1"
                                >
                                    {course.title}
                                </Link>
                                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{course.instructor}</p>

                                <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Icon name="Star" size={12} className="text-warning fill-warning" />
                                        <span>{course.rating.toFixed(1)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon name="Users" size={12} />
                                        <span>{course.totalStudents.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon name="Clock" size={12} />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 mb-2">
                                    <Icon name="Lightbulb" size={14} className="text-accent flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-muted-foreground line-clamp-2">{course.reason}</p>
                                </div>

                                <Link to={`/course-details?id=${course.id}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        iconName="ArrowRight"
                                        iconPosition="right"
                                        iconSize={14}
                                    >
                                        View Course
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecommendationsPanel;