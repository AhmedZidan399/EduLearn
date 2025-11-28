export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    instructorImage: string;
    instructorImageAlt: string;
    thumbnail: string;
    thumbnailAlt: string;
    rating: number;
    totalRatings: number;
    enrolledStudents: number;
    duration: string;
    level: string;
    price: number;
    category: string;
    isNew: boolean;
    isFeatured: boolean;
}

export interface Benefit {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    image: string;
    imageAlt: string;
    quote: string;
    rating: number;
}

export interface PlatformStats {
    totalStudents: string;
    totalCourses: string;
    completionRate: string;
    averageRating: string;
}

export interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: string;
    secondaryCTA: string;
}