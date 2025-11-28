import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { UpcomingQuiz } from '../types';

interface UpcomingQuizzesPanelProps {
    quizzes: UpcomingQuiz[];
}

const UpcomingQuizzesPanel = ({ quizzes }: UpcomingQuizzesPanelProps) => {
    const formatDueDate = (date: Date) => {
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due Today';
        if (diffDays === 1) return 'Due Tomorrow';
        if (diffDays < 7) return `Due in ${diffDays} days`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getStatusColor = (status: 'pending' | 'overdue') => {
        return status === 'overdue' ? 'text-destructive' : 'text-warning';
    };

    return (
        <div className="bg-card rounded-lg border border-border p-6 elevation-sm">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileQuestion" size={20} className="text-warning" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-card-foreground">Upcoming Quizzes</h2>
                        <p className="text-sm text-muted-foreground">Test your knowledge</p>
                    </div>
                </div>
                {quizzes.length > 0 && (
                    <span className="px-2.5 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
            {quizzes.length} pending
          </span>
                )}
            </div>

            <div className="space-y-3">
                {quizzes.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Icon name="CheckCircle" size={24} className="text-success" />
                        </div>
                        <p className="text-sm text-muted-foreground">All caught up!</p>
                        <p className="text-xs text-muted-foreground mt-1">No upcoming quizzes at the moment</p>
                    </div>
                ) : (
                    quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth"
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-card-foreground line-clamp-1 mb-1">
                                        {quiz.quizTitle}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{quiz.courseTitle}</p>
                                </div>
                                <span className={`text-xs font-medium ${getStatusColor(quiz.status)}`}>
                  {formatDueDate(quiz.dueDate)}
                </span>
                            </div>

                            <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Icon name="HelpCircle" size={14} />
                                    <span>{quiz.totalQuestions} questions</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Icon name="Clock" size={14} />
                                    <span>{quiz.duration}</span>
                                </div>
                            </div>

                            <Link to={`/course-details?id=${quiz.courseId}`}>
                                <Button
                                    variant={quiz.status === 'overdue' ? 'destructive' : 'default'}
                                    size="sm"
                                    fullWidth
                                    iconName="ArrowRight"
                                    iconPosition="right"
                                    iconSize={14}
                                >
                                    {quiz.status === 'overdue' ? 'Take Quiz Now' : 'Start Quiz'}
                                </Button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingQuizzesPanel;