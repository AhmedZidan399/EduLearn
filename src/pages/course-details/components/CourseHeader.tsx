import { Course } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface CourseHeaderProps {
    course: Course;
    onEnroll: () => void;
    onContinueLearning: () => void;
}

const CourseHeader = ({ course, onEnroll, onContinueLearning }: CourseHeaderProps) => {
    return (
        <div className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {course.category}
                </span>
                                <span className="px-3 py-1 bg-muted text-text-secondary rounded-full font-medium">
                  {course.level}
                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
                                {course.title}
                            </h1>

                            <p className="text-lg text-text-secondary leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Icon name="Star" size={18} className="text-accent fill-accent" />
                                    <span className="font-semibold text-card-foreground">{course.rating}</span>
                                    <span className="text-text-secondary">
                    ({course.totalRatings.toLocaleString()} ratings)
                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Icon name="Users" size={18} />
                                    <span>{course.totalStudents.toLocaleString()} students</span>
                                </div>

                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Icon name="Clock" size={18} />
                                    <span>{course.duration}</span>
                                </div>

                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Icon name="Globe" size={18} />
                                    <span>{course.language}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={course.instructor.avatar}
                                        alt={course.instructor.avatarAlt}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-card-foreground">
                                            {course.instructor.name}
                                        </p>
                                        <p className="text-xs text-text-secondary">{course.instructor.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-background border border-border rounded-lg p-6 space-y-6 sticky top-20">
                            <div className="aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.thumbnailAlt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {course.isEnrolled ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-secondary">Course Progress</span>
                                            <span className="font-semibold text-card-foreground">
                        {Math.round(course.progress)}%
                      </span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        variant="default"
                                        size="lg"
                                        fullWidth
                                        onClick={onContinueLearning}
                                        iconName="Play"
                                        iconPosition="left"
                                    >
                                        Continue Learning
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-card-foreground">
                        ${course.price}
                      </span>
                                            {course.originalPrice > course.price && (
                                                <span className="text-lg text-text-secondary line-through">
                          ${course.originalPrice}
                        </span>
                                            )}
                                        </div>
                                        {course.originalPrice > course.price && (
                                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded text-sm font-medium">
                                                <Icon name="Tag" size={14} />
                                                <span>
                          {Math.round(
                              ((course.originalPrice - course.price) / course.originalPrice) * 100
                          )}
                                                    % OFF
                        </span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        variant="default"
                                        size="lg"
                                        fullWidth
                                        onClick={onEnroll}
                                        iconName="ShoppingCart"
                                        iconPosition="left"
                                    >
                                        Enroll Now
                                    </Button>

                                    <p className="text-xs text-center text-text-secondary">
                                        30-Day Money-Back Guarantee
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-border space-y-3">
                                <h3 className="font-semibold text-card-foreground">This course includes:</h3>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li className="flex items-center gap-2">
                                        <Icon name="Video" size={16} className="text-primary" />
                                        <span>{course.duration} on-demand video</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon name="FileText" size={16} className="text-primary" />
                                        <span>Downloadable resources</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon name="Award" size={16} className="text-primary" />
                                        <span>Certificate of completion</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon name="Smartphone" size={16} className="text-primary" />
                                        <span>Access on mobile and desktop</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon name="Infinity" size={16} className="text-primary" />
                                        <span>Full lifetime access</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;