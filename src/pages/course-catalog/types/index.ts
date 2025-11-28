export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    instructorImage: string;
    instructorImageAlt: string;
    thumbnail: string;
    thumbnailAlt: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: number;
    rating: number;
    totalRatings: number;
    enrolledStudents: number;
    price: number;
    lessonCount: number;
    objectives: string[];
    testimonials: Testimonial[];
    isNew: boolean;
    isBestseller: boolean;
}

export interface Testimonial {
    id: string;
    studentName: string;
    studentImage: string;
    studentImageAlt: string;
    rating: number;
    comment: string;
    date: string;
}

export interface FilterOptions {
    category: string;
    difficulty: string;
    minDuration: number;
    maxDuration: number;
    searchQuery: string;
    sortBy: 'relevance' | 'popularity' | 'rating' | 'newest';
}

export interface CategoryOption {
    value: string;
    label: string;
    count: number;
}

export interface DifficultyOption {
    value: string;
    label: string;
}