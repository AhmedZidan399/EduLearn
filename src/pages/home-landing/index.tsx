import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AuthenticationModal from '../../components/AuthenticationModal';
import HeroSection from './components/HeroSection';
import FeaturedCourses from './components/FeaturedCourses';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import TrustSignals from './components/TrustSignals';
import {
    Course,
    Benefit,
    Testimonial,
    PlatformStats,
    HeroContent } from
        './types';

const HomeLanding = () => {
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const authData = localStorage.getItem('edulearn_auth');
        if (authData) {
            try {
                const { isAuthenticated, role, name } = JSON.parse(authData);
                setIsAuthenticated(isAuthenticated);
                setUserRole(role);
                setUserName(name);
            } catch (error) {
                console.error('Error parsing auth data:', error);
            }
        }
    }, []);

    const heroContent: HeroContent = {
        title: "Transform Your Future with Expert-Led Online Learning",
        subtitle: "Professional Development Platform",
        description: "Master new skills, advance your career, and achieve your goals with our comprehensive online courses taught by industry experts. Learn at your own pace with flexible scheduling and lifetime access.",
        primaryCTA: "Get Started Free",
        secondaryCTA: "Browse All Courses"
    };

    const featuredCourses: Course[] = [
        {
            id: "1",
            title: "Complete Web Development Bootcamp",
            description: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your web development career.",
            instructor: "Sarah Johnson",
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
            instructorImageAlt: "Professional woman with brown hair wearing blue blazer smiling at camera",
            thumbnail: "https://images.unsplash.com/photo-1632910605645-7a2e40713db1",
            thumbnailAlt: "Modern laptop displaying colorful code editor on wooden desk with coffee cup",
            rating: 4.8,
            totalRatings: 2847,
            enrolledStudents: 15420,
            duration: "42 hours",
            level: "Beginner",
            price: 89.99,
            category: "Web Development",
            isNew: true,
            isFeatured: true
        },
        {
            id: "2",
            title: "Data Science & Machine Learning Masterclass",
            description: "Learn Python, statistics, data visualization, machine learning algorithms, and deep learning with hands-on projects.",
            instructor: "Dr. Michael Chen",
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
            instructorImageAlt: "Asian man with glasses wearing gray suit smiling professionally",
            thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
            thumbnailAlt: "Data analytics dashboard showing colorful charts and graphs on computer screen",
            rating: 4.9,
            totalRatings: 3521,
            enrolledStudents: 18750,
            duration: "56 hours",
            level: "Intermediate",
            price: 129.99,
            category: "Data Science",
            isNew: false,
            isFeatured: true
        },
        {
            id: "3",
            title: "Digital Marketing Complete Course",
            description: "Master SEO, social media marketing, content marketing, email campaigns, and analytics to grow any business online.",
            instructor: "Emily Rodriguez",
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13b401b81-1763293456584.png",
            instructorImageAlt: "Hispanic woman with long dark hair wearing professional attire smiling warmly",
            thumbnail: "https://images.unsplash.com/photo-1676279167059-22ac09e786ed",
            thumbnailAlt: "Marketing analytics workspace with laptop showing social media metrics and graphs",
            rating: 4.7,
            totalRatings: 1923,
            enrolledStudents: 12340,
            duration: "38 hours",
            level: "Beginner",
            price: 79.99,
            category: "Marketing",
            isNew: true,
            isFeatured: true
        },
        {
            id: "4",
            title: "UI/UX Design Professional Certificate",
            description: "Learn user research, wireframing, prototyping, visual design, and usability testing. Master Figma and Adobe XD.",
            instructor: "David Kim",
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17e6cca9c-1763296759201.png",
            instructorImageAlt: "Young Asian man with short black hair wearing casual shirt smiling confidently",
            thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
            thumbnailAlt: "Designer workspace with tablet showing UI mockups and color swatches",
            rating: 4.9,
            totalRatings: 2156,
            enrolledStudents: 9870,
            duration: "45 hours",
            level: "Intermediate",
            price: 99.99,
            category: "Design",
            isNew: false,
            isFeatured: true
        }];


    const benefits: Benefit[] = [
        {
            id: "1",
            icon: "Award",
            title: "Industry-Recognized Certificates",
            description: "Earn certificates upon course completion that showcase your skills to employers and enhance your professional profile."
        },
        {
            id: "2",
            icon: "TrendingUp",
            title: "Track Your Progress",
            description: "Monitor your learning journey with detailed progress tracking, completion percentages, and personalized learning paths."
        },
        {
            id: "3",
            icon: "Users",
            title: "Learn from Experts",
            description: "Access courses taught by industry professionals with years of real-world experience and proven teaching methods."
        },
        {
            id: "4",
            icon: "Clock",
            title: "Flexible Learning Schedule",
            description: "Study at your own pace with lifetime access to course materials. Learn anytime, anywhere, on any device."
        },
        {
            id: "5",
            icon: "MessageCircle",
            title: "Community Support",
            description: "Join a vibrant community of learners, participate in discussions, and get help from instructors and peers."
        },
        {
            id: "6",
            icon: "Zap",
            title: "Hands-On Projects",
            description: "Apply your knowledge through practical projects and assignments that build your portfolio and real-world skills."
        }];


    const testimonials: Testimonial[] = [
        {
            id: "1",
            name: "Jessica Martinez",
            role: "Software Engineer at Google",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce85da65-1763296193559.png",
            imageAlt: "Professional woman with curly brown hair wearing business casual attire smiling brightly",
            quote: "EduLearn transformed my career completely. The web development course gave me the skills I needed to land my dream job at Google. The instructors are amazing and the content is always up-to-date with industry standards.",
            rating: 5
        },
        {
            id: "2",
            name: "Robert Thompson",
            role: "Data Analyst at Microsoft",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc78c630-1763296946525.png",
            imageAlt: "Middle-aged man with gray hair wearing glasses and blue shirt smiling professionally",
            quote: "The data science course exceeded all my expectations. I went from knowing nothing about machine learning to building my own models in just a few months. The hands-on projects were invaluable for my portfolio.",
            rating: 5
        },
        {
            id: "3",
            name: "Amanda Lee",
            role: "Digital Marketing Manager",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c137629-1763294178391.png",
            imageAlt: "Young Asian woman with long black hair wearing red blazer smiling confidently",
            quote: "I've taken several online courses before, but EduLearn stands out for its quality and support. The marketing course helped me triple my client's social media engagement within three months. Highly recommended!",
            rating: 5
        }];


    const platformStats: PlatformStats = {
        totalStudents: "50,000+",
        totalCourses: "200+",
        completionRate: "94%",
        averageRating: "4.8"
    };

    const handleGetStarted = () => {
        if (isAuthenticated) {
            if (userRole === 'student') {
                navigate('/student-dashboard');
            } else if (userRole === 'admin') {
                navigate('/admin-course-management');
            }
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleLogin = (email: string, password: string, role: 'student' | 'admin') => {
        const mockCredentials = {
            student: { email: "student@edulearn.com", password: "student123" },
            admin: { email: "admin@edulearn.com", password: "admin123" }
        };

        if (
            email === mockCredentials[role].email &&
            password === mockCredentials[role].password)
        {
            const name = role === 'student' ? 'John Doe' : 'Admin User';
            const authData = {
                isAuthenticated: true,
                role,
                name,
                email
            };

            localStorage.setItem('edulearn_auth', JSON.stringify(authData));
            setIsAuthenticated(true);
            setUserRole(role);
            setUserName(name);
            setIsAuthModalOpen(false);

            if (role === 'student') {
                navigate('/student-dashboard');
            } else {
                navigate('/admin-course-management');
            }
        } else {
            alert(`Invalid credentials. Use:\nEmail: ${mockCredentials[role].email}\nPassword: ${mockCredentials[role].password}`);
        }
    };

    const handleRegister = (name: string, email: string, password: string, role: 'student' | 'admin') => {
        const authData = {
            isAuthenticated: true,
            role,
            name,
            email
        };

        localStorage.setItem('edulearn_auth', JSON.stringify(authData));
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(name);
        setIsAuthModalOpen(false);

        if (role === 'student') {
            navigate('/student-dashboard');
        } else {
            navigate('/admin-course-management');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('edulearn_auth');
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName('');
        navigate('/home-landing');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                userName={userName}
                onLoginClick={() => setIsAuthModalOpen(true)}
                onLogoutClick={handleLogout} />


            <main className="pt-16">
                <HeroSection content={heroContent} onGetStarted={handleGetStarted} />
                <TrustSignals />
                <FeaturedCourses courses={featuredCourses} />
                <BenefitsSection benefits={benefits} />
                <StatsSection stats={platformStats} />
                <TestimonialsSection testimonials={testimonials} />
                <CTASection onGetStarted={handleGetStarted} />
            </main>

            <footer className="bg-card border-t border-border py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-text-secondary">
                        <p>&copy; {new Date().getFullYear()} EduLearn Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <AuthenticationModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin}
                onRegister={handleRegister} />

        </div>);

};

export default HomeLanding;