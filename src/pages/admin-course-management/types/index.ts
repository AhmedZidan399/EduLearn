export interface Course {
    id: string;
    title: string;
    instructor: string;
    category: string;
    enrollmentCount: number;
    status: 'published' | 'draft' | 'archived';
    createdAt: Date;
    updatedAt: Date;
    description: string;
    thumbnail: string;
    thumbnailAlt: string;
    price: number;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    order: number;
    videoUrl: string;
    description: string;
}

export interface CourseFormData {
    title: string;
    instructor: string;
    category: string;
    description: string;
    thumbnail: string;
    thumbnailAlt: string;
    price: number;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    status: 'published' | 'draft' | 'archived';
}

export interface LessonFormData {
    title: string;
    duration: string;
    videoUrl: string;
    description: string;
}

export interface FilterOptions {
    status: 'all' | 'published' | 'draft' | 'archived';
    category: string;
    searchQuery: string;
}

export interface SortConfig {
    key: keyof Course;
    direction: 'asc' | 'desc';
}

export interface BulkAction {
    type: 'publish' | 'unpublish' | 'archive' | 'delete';
    courseIds: string[];
}