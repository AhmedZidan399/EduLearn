export interface Course {
    id: string;
    title: string;
    thumbnail: string;
    thumbnailAlt: string;
    instructor: string;
    category: string;
    totalLessons: number;
    completedLessons: number;
    progress: number;
    lastAccessed: Date;
    enrollmentDate: Date;
    status: 'not-started' | 'in-progress' | 'completed';
    certificateUrl?: string;
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: Date;
    category: 'completion' | 'streak' | 'milestone';
}

export interface RecentLesson {
    id: string;
    courseId: string;
    courseTitle: string;
    lessonTitle: string;
    thumbnail: string;
    thumbnailAlt: string;
    lastWatched: Date;
    progress: number;
    duration: string;
}

export interface UpcomingQuiz {
    id: string;
    courseId: string;
    courseTitle: string;
    quizTitle: string;
    dueDate: Date;
    totalQuestions: number;
    duration: string;
    status: 'pending' | 'overdue';
}

export interface LearningGoal {
    id: string;
    title: string;
    targetDate: Date;
    progress: number;
    coursesRequired: number;
    coursesCompleted: number;
}

export interface ProgressStats {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    certificatesEarned: number;
    currentStreak: number;
    totalLearningHours: number;
    averageProgress: number;
}

export interface CourseRecommendation {
    id: string;
    title: string;
    thumbnail: string;
    thumbnailAlt: string;
    instructor: string;
    category: string;
    rating: number;
    totalStudents: number;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    reason: string;
}

export type CourseFilterStatus = 'all' | 'not-started' | 'in-progress' | 'completed';
export type CourseSortOption = 'enrollment-date' | 'progress' | 'last-accessed' | 'title';