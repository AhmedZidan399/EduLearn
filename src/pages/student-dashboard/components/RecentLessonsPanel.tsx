import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { RecentLesson } from '../types';

interface RecentLessonsPanelProps {
    lessons: RecentLesson[];
}

const RecentLessonsPanel = ({ lessons }: RecentLessonsPanelProps) => {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays}d ago`;
    };

    return (
        <div className="bg-card rounded-lg border border-border p-6 elevation-sm">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="History" size={20} className="text-accent" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-card-foreground">Recent Lessons</h2>
                        <p className="text-sm text-muted-foreground">Pick up where you left off</p>
                    </div>
                </div>
                <Link
                    to="/course-catalog"
                    className="text-sm font-medium text-primary hover:underline transition-smooth"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-3">
                {lessons.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Icon name="BookOpen" size={24} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">No recent lessons</p>
                        <p className="text-xs text-muted-foreground mt-1">Start learning to see your progress here</p>
                    </div>
                ) : (
                    lessons.map((lesson) => (
                        <Link
                            key={lesson.id}
                            to={`/course-details?id=${lesson.courseId}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-smooth group"
                        >
                            <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                <Image
                                    src={lesson.thumbnail}
                                    alt={lesson.thumbnailAlt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Icon name="Play" size={16} color="white" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-card-foreground line-clamp-1 mb-1">
                                    {lesson.lessonTitle}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                                    {lesson.courseTitle}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Icon name="Clock" size={12} />
                                        <span>{lesson.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon name="Calendar" size={12} />
                                        <span>{formatDate(lesson.lastWatched)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-primary">{lesson.progress}%</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentLessonsPanel;