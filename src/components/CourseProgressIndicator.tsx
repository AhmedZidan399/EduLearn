import { useMemo } from 'react';
import Icon from './AppIcon';

interface CourseProgressIndicatorProps {
    progress: number;
    totalLessons?: number;
    completedLessons?: number;
    size?: 'sm' | 'md' | 'lg';
    showPercentage?: boolean;
    showLessonCount?: boolean;
    variant?: 'circular' | 'linear';
    className?: string;
}

const CourseProgressIndicator = ({
                                     progress,
                                     totalLessons,
                                     completedLessons,
                                     size = 'md',
                                     showPercentage = true,
                                     showLessonCount = false,
                                     variant = 'circular',
                                     className = '',
                                 }: CourseProgressIndicatorProps) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    const sizeClasses = {
        sm: {
            container: 'w-12 h-12',
            text: 'text-xs',
            strokeWidth: 3,
        },
        md: {
            container: 'w-16 h-16',
            text: 'text-sm',
            strokeWidth: 4,
        },
        lg: {
            container: 'w-20 h-20',
            text: 'text-base',
            strokeWidth: 5,
        },
    };

    const currentSize = sizeClasses[size];

    const circleConfig = useMemo(() => {
        const radius = 50 - currentSize.strokeWidth / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (clampedProgress / 100) * circumference;

        return {
            radius,
            circumference,
            offset,
        };
    }, [clampedProgress, currentSize.strokeWidth]);

    const getProgressColor = (progress: number): string => {
        if (progress === 100) return 'text-success';
        if (progress >= 75) return 'text-primary';
        if (progress >= 50) return 'text-accent';
        if (progress >= 25) return 'text-warning';
        return 'text-secondary';
    };

    const progressColor = getProgressColor(clampedProgress);

    if (variant === 'linear') {
        return (
            <div className={`space-y-2 ${className}`}>
                <div className="flex items-center justify-between">
                    {showPercentage && (
                        <span className={`font-mono font-medium ${progressColor}`}>
              {Math.round(clampedProgress)}%
            </span>
                    )}
                    {showLessonCount && totalLessons && completedLessons !== undefined && (
                        <span className="text-sm text-text-secondary">
              {completedLessons} / {totalLessons} lessons
            </span>
                    )}
                </div>
                <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`absolute top-0 left-0 h-full ${progressColor.replace('text-', 'bg-')} transition-all duration-300 ease-out rounded-full`}
                        style={{ width: `${clampedProgress}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
            <div className={`relative ${currentSize.container}`}>
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r={circleConfig.radius}
                        stroke="currentColor"
                        strokeWidth={currentSize.strokeWidth}
                        fill="none"
                        className="text-muted"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r={circleConfig.radius}
                        stroke="currentColor"
                        strokeWidth={currentSize.strokeWidth}
                        fill="none"
                        strokeDasharray={circleConfig.circumference}
                        strokeDashoffset={circleConfig.offset}
                        strokeLinecap="round"
                        className={`${progressColor} transition-all duration-300 ease-out`}
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    {clampedProgress === 100 ? (
                        <Icon name="Check" size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className={progressColor} />
                    ) : (
                        showPercentage && (
                            <span className={`font-mono font-semibold ${currentSize.text} ${progressColor}`}>
                {Math.round(clampedProgress)}%
              </span>
                        )
                    )}
                </div>
            </div>

            {showLessonCount && totalLessons && completedLessons !== undefined && (
                <p className="text-xs text-text-secondary font-medium">
                    {completedLessons} / {totalLessons} lessons
                </p>
            )}
        </div>
    );
};

export default CourseProgressIndicator;