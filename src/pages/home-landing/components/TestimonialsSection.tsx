import { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-16 sm:py-20 bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Student Success Stories
                    </h2>
                    <p className="text-lg text-text-secondary">
                        Hear from our community of learners who have achieved their goals
                    </p>
                </div>

                <div className="relative">
                    <div className="bg-card rounded-2xl p-8 sm:p-12 elevation-md">
                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20">
                                <Image
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.imageAlt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Icon
                                        key={index}
                                        name="Star"
                                        size={20}
                                        className={`${
                                            index < currentTestimonial.rating
                                                ? 'text-accent fill-accent' :'text-border'
                                        }`}
                                    />
                                ))}
                            </div>

                            <blockquote className="text-lg sm:text-xl text-card-foreground leading-relaxed max-w-3xl">
                                "{currentTestimonial.quote}"
                            </blockquote>

                            <div>
                                <p className="text-lg font-semibold text-card-foreground">
                                    {currentTestimonial.name}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    {currentTestimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrevious}
                            className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth"
                            aria-label="Previous testimonial"
                        >
                            <Icon name="ChevronLeft" size={20} />
                        </button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-smooth ${
                                        index === currentIndex
                                            ? 'bg-primary w-8' :'bg-border hover:bg-primary/50'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth"
                            aria-label="Next testimonial"
                        >
                            <Icon name="ChevronRight" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;