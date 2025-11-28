import { useState } from 'react';
import { Module } from '../types';
import Icon from '../../../components/AppIcon';

interface CourseCurriculumProps {
    modules: Module[];
    isEnrolled: boolean;
}

const CourseCurriculum = ({ modules, isEnrolled }: CourseCurriculumProps) => {
    const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || '']);

    const toggleModule = (moduleId: string) => {
        setExpandedModules((prev) =>
            prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
        );
    };

    const formatDuration = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    const getTotalDuration = (module: Module): number => {
        return module.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    };

    const getCompletedCount = (module: Module): number => {
        return module.lessons.filter((lesson) => lesson.isCompleted).length;
    };

    const getLessonIcon = (type: string): string => {
        switch (type) {
            case 'video':
                return 'Play';
            case 'quiz':
                return 'FileQuestion';
            case 'reading':
                return 'BookOpen';
            default:
                return 'File';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-card-foreground">Course Curriculum</h2>
                <p className="text-sm text-text-secondary">
                    {modules.length} modules • {modules.reduce((total, m) => total + m.lessons.length, 0)}{' '}
                    lessons
                </p>
            </div>

            <div className="space-y-3">
                {modules.map((module, moduleIndex) => {
                    const isExpanded = expandedModules.includes(module.id);
                    const totalDuration = getTotalDuration(module);
                    const completedCount = getCompletedCount(module);

                    return (
                        <div key={module.id} className="bg-background border border-border rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {String(moduleIndex + 1).padStart(2, '0')}
                    </span>
                                    </div>

                                    <div className="flex-1 text-left">
                                        <h3 className="font-semibold text-card-foreground">{module.title}</h3>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                                            <span>{module.lessons.length} lessons</span>
                                            <span>•</span>
                                            <span>{formatDuration(totalDuration)}</span>
                                            {isEnrolled && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-primary">
                            {completedCount}/{module.lessons.length} completed
                          </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Icon
                                    name="ChevronDown"
                                    size={20}
                                    className={`transition-transform duration-200 ${
                                        isExpanded ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {isExpanded && (
                                <div className="border-t border-border">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center gap-4 p-4 hover:bg-muted transition-smooth border-b border-border last:border-b-0"
                                        >
                                            <div className="flex-shrink-0">
                                                {lesson.isCompleted ? (
                                                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                                                        <Icon name="Check" size={14} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                                                        <Icon
                                                            name={getLessonIcon(lesson.type)}
                                                            size={14}
                                                            className="text-text-secondary"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-card-foreground">{lesson.title}</p>
                                                    {lesson.isFree && (
                                                        <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded">
                              Free Preview
                            </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
                                                    <Icon name={getLessonIcon(lesson.type)} size={14} />
                                                    <span className="capitalize">{lesson.type}</span>
                                                    <span>•</span>
                                                    <span>{formatDuration(lesson.duration)}</span>
                                                </div>
                                            </div>

                                            {(lesson.isFree || isEnrolled) && (
                                                <button className="flex-shrink-0 p-2 hover:bg-background rounded-md transition-smooth">
                                                    <Icon name="Play" size={18} className="text-primary" />
                                                </button>
                                            )}

                                            {!lesson.isFree && !isEnrolled && (
                                                <div className="flex-shrink-0">
                                                    <Icon name="Lock" size={18} className="text-text-secondary" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseCurriculum;