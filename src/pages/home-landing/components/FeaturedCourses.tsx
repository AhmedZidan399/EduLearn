import { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import CourseCard from './CourseCard';
import { Course } from '../types';

interface FeaturedCoursesProps {
    courses: Course[];
}

const FeaturedCourses = ({ courses }: FeaturedCoursesProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const coursesPerView = {
        mobile: 1,
        tablet: 2,
        desktop: 3,
    };

    const [itemsPerView, setItemsPerView] = useState(coursesPerView.desktop);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(coursesPerView.mobile);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(coursesPerView.tablet);
            } else {
                setItemsPerView(coursesPerView.desktop);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, courses.length - itemsPerView);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, maxIndex]);

    const handlePrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handleDotClick = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    return (
        <section className="py-16 sm:py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Featured Courses
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Explore our most popular courses designed by industry experts to help you achieve your learning goals
                    </p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={scrollContainerRef}>
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                            }}
                        >
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex-shrink-0 px-2 sm:px-3"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {courses.length > itemsPerView && (
                        <>
                            <button
                                onClick={handlePrevious}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center elevation-md hover:elevation-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentIndex === 0}
                                aria-label="Previous courses"
                            >
                                <Icon name="ChevronLeft" size={24} />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center elevation-md hover:elevation-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentIndex >= maxIndex}
                                aria-label="Next courses"
                            >
                                <Icon name="ChevronRight" size={24} />
                            </button>
                        </>
                    )}
                </div>

                {courses.length > itemsPerView && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-2 h-2 rounded-full transition-smooth ${
                                    index === currentIndex
                                        ? 'bg-primary w-8' :'bg-border hover:bg-primary/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedCourses;