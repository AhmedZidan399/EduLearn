export interface Instructor {
    id: string;
    name: string;
    avatar: string;
    avatarAlt: string;
    title: string;
    bio: string;
    rating: number;
    totalStudents: number;
    totalCourses: number;
}

export interface Lesson {
    id: string;
    title: string;
    duration: number;
    type: 'video' | 'quiz' | 'reading';
    isCompleted: boolean;
    isFree: boolean;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
    isExpanded: boolean;
}

export interface Review {
    id: string;
    userName: string;
    userAvatar: string;
    userAvatarAlt: string;
    rating: number;
    date: string;
    comment: string;
    helpfulCount: number;
    isHelpful: boolean;
}

export interface Course {
    id: string;
    title: string;
    thumbnail: string;
    thumbnailAlt: string;
    description: string;
    instructor: Instructor;
    rating: number;
    totalRatings: number;
    totalStudents: number;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: number;
    originalPrice: number;
    language: string;
    lastUpdated: string;
    category: string;
    prerequisites: string[];
    learningOutcomes: string[];
    modules: Module[];
    reviews: Review[];
    isEnrolled: boolean;
    progress: number;
}

export interface RelatedCourse {
    id: string;
    title: string;
    thumbnail: string;
    thumbnailAlt: string;
    instructor: string;
    rating: number;
    price: number;
    totalStudents: number;
}

export type TabType = 'overview' | 'curriculum' | 'instructor' | 'reviews';