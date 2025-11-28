import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Course, TabType } from './types';
import Header from '../../components/Header';
import AuthenticationModal from '../../components/AuthenticationModal';
import CourseHeader from './components/CourseHeader';
import CourseOverview from './components/CourseOverview';
import CourseCurriculum from './components/CourseCurriculum';
import InstructorProfile from './components/InstructorProfile';
import CourseReviews from './components/CourseReviews';
import RelatedCourses from './components/RelatedCourses';
import Icon from '../../components/AppIcon';

const CourseDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const authData = localStorage.getItem('edulearn_auth');
        if (authData) {
            const { isAuthenticated, role, name } = JSON.parse(authData);
            setIsAuthenticated(isAuthenticated);
            setUserRole(role);
            setUserName(name);
        }
    }, []);

    const mockCourse: Course = {
        id: 'course-1',
        title: 'Complete Web Development Bootcamp 2024',
        thumbnail: "https://images.unsplash.com/photo-1635114332743-719b5e0702b9",
        thumbnailAlt: 'Modern workspace with laptop displaying code editor and web development tools on desk',
        description: `Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a full-stack developer. This course covers everything from basic HTML to advanced React patterns, backend development with Node.js, database management, and deployment strategies.`,
        instructor: {
            id: 'instructor-1',
            name: 'Sarah Johnson',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
            avatarAlt: 'Professional woman with brown hair wearing blue blazer smiling at camera',
            title: 'Senior Full-Stack Developer & Instructor',
            bio: `Sarah is a seasoned full-stack developer with over 10 years of experience in web development. She has worked with Fortune 500 companies and startups, building scalable web applications. Sarah is passionate about teaching and has helped thousands of students launch their careers in tech. Her teaching style focuses on practical, hands-on learning with real-world projects.`,
            rating: 4.8,
            totalStudents: 125000,
            totalCourses: 12
        },
        rating: 4.7,
        totalRatings: 15420,
        totalStudents: 89500,
        duration: '42 hours',
        level: 'Beginner',
        price: 49.99,
        originalPrice: 199.99,
        language: 'English',
        lastUpdated: 'Dec 2024',
        category: 'Web Development',
        prerequisites: [
            'Basic computer skills and internet navigation',
            'No prior programming experience required',
            'A computer with internet connection',
            'Willingness to learn and practice coding'],

        learningOutcomes: [
            'Build responsive websites using HTML5, CSS3, and modern JavaScript',
            'Create dynamic web applications with React and Redux',
            'Develop RESTful APIs using Node.js and Express',
            'Work with databases including MongoDB and PostgreSQL',
            'Implement user authentication and authorization',
            'Deploy applications to cloud platforms like Heroku and Netlify',
            'Use Git and GitHub for version control',
            'Apply best practices for code organization and testing'],

        modules: [
            {
                id: 'module-1',
                title: 'Introduction to Web Development',
                isExpanded: true,
                lessons: [
                    {
                        id: 'lesson-1-1',
                        title: 'Welcome to the Course',
                        duration: 8,
                        type: 'video',
                        isCompleted: false,
                        isFree: true
                    },
                    {
                        id: 'lesson-1-2',
                        title: 'Setting Up Your Development Environment',
                        duration: 15,
                        type: 'video',
                        isCompleted: false,
                        isFree: true
                    },
                    {
                        id: 'lesson-1-3',
                        title: 'How the Web Works',
                        duration: 20,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-1-4',
                        title: 'Module 1 Quiz',
                        duration: 10,
                        type: 'quiz',
                        isCompleted: false,
                        isFree: false
                    }]

            },
            {
                id: 'module-2',
                title: 'HTML5 Fundamentals',
                isExpanded: false,
                lessons: [
                    {
                        id: 'lesson-2-1',
                        title: 'HTML Basics and Structure',
                        duration: 25,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-2-2',
                        title: 'Semantic HTML Elements',
                        duration: 18,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-2-3',
                        title: 'Forms and Input Elements',
                        duration: 22,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-2-4',
                        title: 'HTML Best Practices',
                        duration: 15,
                        type: 'reading',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-2-5',
                        title: 'HTML Quiz',
                        duration: 15,
                        type: 'quiz',
                        isCompleted: false,
                        isFree: false
                    }]

            },
            {
                id: 'module-3',
                title: 'CSS3 and Responsive Design',
                isExpanded: false,
                lessons: [
                    {
                        id: 'lesson-3-1',
                        title: 'CSS Fundamentals',
                        duration: 30,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-3-2',
                        title: 'Flexbox Layout',
                        duration: 28,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-3-3',
                        title: 'CSS Grid System',
                        duration: 32,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-3-4',
                        title: 'Responsive Design Principles',
                        duration: 25,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-3-5',
                        title: 'CSS Animations and Transitions',
                        duration: 20,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    }]

            },
            {
                id: 'module-4',
                title: 'JavaScript Essentials',
                isExpanded: false,
                lessons: [
                    {
                        id: 'lesson-4-1',
                        title: 'JavaScript Basics',
                        duration: 35,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-4-2',
                        title: 'DOM Manipulation',
                        duration: 30,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-4-3',
                        title: 'ES6+ Features',
                        duration: 28,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-4-4',
                        title: 'Asynchronous JavaScript',
                        duration: 32,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    }]

            },
            {
                id: 'module-5',
                title: 'React Development',
                isExpanded: false,
                lessons: [
                    {
                        id: 'lesson-5-1',
                        title: 'Introduction to React',
                        duration: 25,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-5-2',
                        title: 'Components and Props',
                        duration: 30,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-5-3',
                        title: 'State and Lifecycle',
                        duration: 28,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-5-4',
                        title: 'React Hooks',
                        duration: 35,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    },
                    {
                        id: 'lesson-5-5',
                        title: 'React Router',
                        duration: 22,
                        type: 'video',
                        isCompleted: false,
                        isFree: false
                    }]

            }],

        reviews: [
            {
                id: 'review-1',
                userName: 'Michael Chen',
                userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_122c30919-1763293878826.png",
                userAvatarAlt: 'Asian man with glasses wearing casual shirt smiling',
                rating: 5,
                date: '2024-01-15',
                comment: `This course exceeded my expectations! Sarah's teaching style is clear and engaging. The projects are practical and helped me build a strong portfolio. I landed my first developer job within 3 months of completing this course. Highly recommended for anyone serious about web development.`,
                helpfulCount: 124,
                isHelpful: false
            },
            {
                id: 'review-2',
                userName: 'Emily Rodriguez',
                userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc372df-1763294269106.png",
                userAvatarAlt: 'Hispanic woman with long dark hair wearing professional attire',
                rating: 5,
                date: '2024-01-10',
                comment: `Best investment I've made in my career! The course content is comprehensive and up-to-date. I particularly loved the React section and the real-world projects. Sarah explains complex concepts in a way that's easy to understand. The community support is also excellent.`,
                helpfulCount: 98,
                isHelpful: false
            },
            {
                id: 'review-3',
                userName: 'David Thompson',
                userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15753ec4f-1763295707622.png",
                userAvatarAlt: 'Caucasian man with short brown hair in business casual attire',
                rating: 4,
                date: '2024-01-05',
                comment: `Great course overall! The content is well-structured and covers all the essential topics. My only suggestion would be to include more advanced deployment scenarios. But for beginners to intermediate developers, this is perfect. The instructor is knowledgeable and responsive to questions.`,
                helpfulCount: 67,
                isHelpful: false
            },
            {
                id: 'review-4',
                userName: 'Priya Patel',
                userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f39fbe75-1763300601912.png",
                userAvatarAlt: 'Indian woman with black hair wearing traditional and modern fusion outfit',
                rating: 5,
                date: '2023-12-28',
                comment: `I came from a non-technical background and this course made web development accessible to me. The pace is perfect, and the exercises reinforce the concepts well. I'm now confident in building full-stack applications. Thank you, Sarah!`,
                helpfulCount: 89,
                isHelpful: false
            }],

        isEnrolled: false,
        progress: 0
    };

    const relatedCourses = [
        {
            id: 'related-1',
            title: 'Advanced React Patterns and Best Practices',
            thumbnail: "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66",
            thumbnailAlt: 'Computer screen showing React code with colorful syntax highlighting',
            instructor: 'John Smith',
            rating: 4.8,
            price: 59.99,
            totalStudents: 45000
        },
        {
            id: 'related-2',
            title: 'Node.js and Express Backend Development',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_171a64757-1764283642279.png",
            thumbnailAlt: 'Developer working on backend code with Node.js documentation visible',
            instructor: 'Maria Garcia',
            rating: 4.7,
            price: 54.99,
            totalStudents: 38000
        },
        {
            id: 'related-3',
            title: 'Full-Stack JavaScript with MERN Stack',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1eba77069-1764283639362.png",
            thumbnailAlt: 'Multiple monitors displaying full-stack application architecture diagram',
            instructor: 'Alex Johnson',
            rating: 4.9,
            price: 64.99,
            totalStudents: 52000
        }];


    const tabs = [
        { id: 'overview' as TabType, label: 'Overview', icon: 'Info' },
        { id: 'curriculum' as TabType, label: 'Curriculum', icon: 'BookOpen' },
        { id: 'instructor' as TabType, label: 'Instructor', icon: 'User' },
        { id: 'reviews' as TabType, label: 'Reviews', icon: 'Star' }];


    const handleEnroll = () => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
            return;
        }

        console.log('Enrolling in course...');
    };

    const handleContinueLearning = () => {
        console.log('Continuing to lessons...');
    };

    const handleLogin = (email: string, password: string, role: 'student' | 'admin') => {
        const authData = {
            isAuthenticated: true,
            role,
            name: email.split('@')[0],
            email
        };
        localStorage.setItem('edulearn_auth', JSON.stringify(authData));
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(authData.name);
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
                <CourseHeader
                    course={mockCourse}
                    onEnroll={handleEnroll}
                    onContinueLearning={handleContinueLearning} />


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-card border border-border rounded-lg overflow-hidden">
                                <div className="border-b border-border">
                                    <div className="flex overflow-x-auto">
                                        {tabs.map((tab) =>
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-smooth whitespace-nowrap ${
                                                    activeTab === tab.id ?
                                                        'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`
                                                }>

                                                <Icon name={tab.icon} size={18} />
                                                <span>{tab.label}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    {activeTab === 'overview' && <CourseOverview course={mockCourse} />}
                                    {activeTab === 'curriculum' &&
                                        <CourseCurriculum modules={mockCourse.modules} isEnrolled={mockCourse.isEnrolled} />
                                    }
                                    {activeTab === 'instructor' && <InstructorProfile instructor={mockCourse.instructor} />}
                                    {activeTab === 'reviews' &&
                                        <CourseReviews
                                            reviews={mockCourse.reviews}
                                            averageRating={mockCourse.rating}
                                            totalRatings={mockCourse.totalRatings} />

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-20 space-y-6">
                                <div className="bg-card border border-border rounded-lg p-6">
                                    <RelatedCourses courses={relatedCourses} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AuthenticationModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin}
                onRegister={handleRegister} />

        </div>);

};

export default CourseDetails;