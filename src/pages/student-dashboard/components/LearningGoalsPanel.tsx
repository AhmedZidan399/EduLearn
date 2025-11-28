import Icon from '../../../components/AppIcon';
import CourseProgressIndicator from '../../../components/CourseProgressIndicator';
import { LearningGoal } from '../types';

interface LearningGoalsPanelProps {
    goals: LearningGoal[];
}

const LearningGoalsPanel = ({ goals }: LearningGoalsPanelProps) => {
    const formatTargetDate = (date: Date) => {
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 7) return `${diffDays} days left`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks left`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-card rounded-lg border border-border p-6 elevation-sm">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Target" size={20} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-card-foreground">Learning Goals</h2>
                        <p className="text-sm text-muted-foreground">Track your objectives</p>
                    </div>
                </div>
                <button className="text-sm font-medium text-primary hover:underline transition-smooth">
                    Add Goal
                </button>
            </div>

            <div className="space-y-4">
                {goals.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Icon name="Target" size={24} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">No learning goals set</p>
                        <p className="text-xs text-muted-foreground mt-1">Create goals to stay motivated</p>
                    </div>
                ) : (
                    goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth"
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <h3 className="text-sm font-semibold text-card-foreground flex-1">{goal.title}</h3>
                                <span className="text-xs font-medium text-primary">{formatTargetDate(goal.targetDate)}</span>
                            </div>

                            <div className="mb-3">
                                <CourseProgressIndicator
                                    progress={goal.progress}
                                    totalLessons={goal.coursesRequired}
                                    completedLessons={goal.coursesCompleted}
                                    variant="linear"
                                    showPercentage
                                />
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Icon name="BookOpen" size={14} />
                                    <span>
                    {goal.coursesCompleted} / {goal.coursesRequired} courses
                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Icon name="Calendar" size={14} />
                                    <span>{goal.targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LearningGoalsPanel;