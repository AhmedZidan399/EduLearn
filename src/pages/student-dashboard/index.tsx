import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import AuthenticationModal from '../../components/AuthenticationModal';
import ProgressStatsCard from './components/ProgressStatsCard';
import CourseCard from './components/CourseCard';
import RecentLessonsPanel from './components/RecentLessonsPanel';
import UpcomingQuizzesPanel from './components/UpcomingQuizzesPanel';
import AchievementsBanner from './components/AchievementsBanner';
import LearningGoalsPanel from './components/LearningGoalsPanel';
import RecommendationsPanel from './components/RecommendationsPanel';
import CourseFilters from './components/CourseFilters';
import Icon from '../../components/AppIcon';
import {
    Course,
    Achievement,
    RecentLesson,
    UpcomingQuiz,
    LearningGoal,
    ProgressStats,
    CourseRecommendation,
    CourseFilterStatus,
    CourseSortOption } from
        './types';

const StudentDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [userName] = useState('Sarah Johnson');
    const [filterStatus, setFilterStatus] = useState<CourseFilterStatus>('all');
    const [sortOption, setSortOption] = useState<CourseSortOption>('last-accessed');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mockCourses: Course[] = [
        {
            id: '1',
            title: 'Complete Web Development Bootcamp 2024',
            thumbnail: "https://images.unsplash.com/photo-1720980757337-707998aa438b",
            thumbnailAlt: 'Modern laptop displaying colorful code editor with HTML and CSS on dark desk',
            instructor: 'Dr. Angela Yu',
            category: 'Web Development',
            totalLessons: 45,
            completedLessons: 32,
            progress: 71,
            lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000),
            enrollmentDate: new Date('2024-01-15'),
            status: 'in-progress',
            estimatedTime: '52h',
            difficulty: 'intermediate'
        },
        {
            id: '2',
            title: 'Python for Data Science and Machine Learning',
            thumbnail: "https://images.unsplash.com/photo-1721525746389-fac9b1f423c5",
            thumbnailAlt: 'Python programming code on computer screen with data visualization graphs',
            instructor: 'Jose Portilla',
            category: 'Data Science',
            totalLessons: 60,
            completedLessons: 60,
            progress: 100,
            lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            enrollmentDate: new Date('2023-11-20'),
            status: 'completed',
            certificateUrl: 'https://example.com/certificate/python-ds-ml',
            estimatedTime: '68h',
            difficulty: 'advanced'
        },
        {
            id: '3',
            title: 'UI/UX Design Fundamentals',
            thumbnail: "https://images.unsplash.com/photo-1710787554730-1b416f226a21",
            thumbnailAlt: 'Designer working on user interface mockups with color palette and wireframes',
            instructor: 'Daniel Walter Scott',
            category: 'Design',
            totalLessons: 38,
            completedLessons: 15,
            progress: 39,
            lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000),
            enrollmentDate: new Date('2024-02-10'),
            status: 'in-progress',
            estimatedTime: '42h',
            difficulty: 'beginner'
        },
        {
            id: '4',
            title: 'React - The Complete Guide 2024',
            thumbnail: "https://images.unsplash.com/photo-1670057037226-b3d65909424f",
            thumbnailAlt: 'React JavaScript library code on monitor with component structure diagram',
            instructor: 'Maximilian Schwarzmüller',
            category: 'Frontend Development',
            totalLessons: 52,
            completedLessons: 0,
            progress: 0,
            lastAccessed: new Date('2024-03-01'),
            enrollmentDate: new Date('2024-03-01'),
            status: 'not-started',
            estimatedTime: '58h',
            difficulty: 'intermediate'
        },
        {
            id: '5',
            title: 'Digital Marketing Masterclass',
            thumbnail: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
            thumbnailAlt: 'Marketing analytics dashboard showing social media metrics and engagement graphs',
            instructor: 'Phil Ebiner',
            category: 'Marketing',
            totalLessons: 42,
            completedLessons: 42,
            progress: 100,
            lastAccessed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            enrollmentDate: new Date('2023-12-05'),
            status: 'completed',
            certificateUrl: 'https://example.com/certificate/digital-marketing',
            estimatedTime: '48h',
            difficulty: 'beginner'
        },
        {
            id: '6',
            title: 'AWS Certified Solutions Architect',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15be13559-1764283639105.png",
            thumbnailAlt: 'Cloud computing infrastructure diagram with AWS services and network architecture',
            instructor: 'Stephane Maarek',
            category: 'Cloud Computing',
            totalLessons: 55,
            completedLessons: 28,
            progress: 51,
            lastAccessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            enrollmentDate: new Date('2024-01-25'),
            status: 'in-progress',
            estimatedTime: '62h',
            difficulty: 'advanced'
        }];


    const mockAchievements: Achievement[] = [
        {
            id: '1',
            title: 'First Course Completed',
            description: 'Completed your first course and earned a certificate',
            icon: 'Award',
            earnedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            category: 'completion'
        },
        {
            id: '2',
            title: '7-Day Learning Streak',
            description: 'Maintained a 7-day consecutive learning streak',
            icon: 'Flame',
            earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            category: 'streak'
        },
        {
            id: '3',
            title: 'Fast Learner',
            description: 'Completed 5 lessons in a single day',
            icon: 'Zap',
            earnedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            category: 'milestone'
        }];


    const mockRecentLessons: RecentLesson[] = [
        {
            id: '1',
            courseId: '1',
            courseTitle: 'Complete Web Development Bootcamp 2024',
            lessonTitle: 'Advanced JavaScript ES6+ Features',
            thumbnail: "https://images.unsplash.com/photo-1724166551426-77aa7328d053",
            thumbnailAlt: 'JavaScript code editor showing ES6 arrow functions and destructuring syntax',
            lastWatched: new Date(Date.now() - 2 * 60 * 60 * 1000),
            progress: 65,
            duration: '18:45'
        },
        {
            id: '2',
            courseId: '3',
            courseTitle: 'UI/UX Design Fundamentals',
            lessonTitle: 'Creating User Personas and Journey Maps',
            thumbnail: "https://images.unsplash.com/photo-1572982408141-5444f29ca3ca",
            thumbnailAlt: 'UX designer sketching user journey map with sticky notes and personas',
            lastWatched: new Date(Date.now() - 24 * 60 * 60 * 1000),
            progress: 42,
            duration: '22:30'
        },
        {
            id: '3',
            courseId: '6',
            courseTitle: 'AWS Certified Solutions Architect',
            lessonTitle: 'EC2 Instance Types and Pricing Models',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_11e15f9f4-1764283638838.png",
            thumbnailAlt: 'AWS EC2 dashboard showing instance types and pricing comparison charts',
            lastWatched: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            progress: 78,
            duration: '25:15'
        }];


    const mockUpcomingQuizzes: UpcomingQuiz[] = [
        {
            id: '1',
            courseId: '1',
            courseTitle: 'Complete Web Development Bootcamp 2024',
            quizTitle: 'JavaScript Fundamentals Assessment',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            totalQuestions: 25,
            duration: '30 min',
            status: 'pending'
        },
        {
            id: '2',
            courseId: '6',
            courseTitle: 'AWS Certified Solutions Architect',
            quizTitle: 'EC2 and VPC Configuration Quiz',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            totalQuestions: 20,
            duration: '25 min',
            status: 'pending'
        }];


    const mockLearningGoals: LearningGoal[] = [
        {
            id: '1',
            title: 'Complete Web Development Path',
            targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            progress: 65,
            coursesRequired: 5,
            coursesCompleted: 3
        },
        {
            id: '2',
            title: 'Master Cloud Computing',
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            progress: 40,
            coursesRequired: 3,
            coursesCompleted: 1
        }];


    const mockRecommendations: CourseRecommendation[] = [
        {
            id: '7',
            title: 'Node.js - The Complete Guide',
            thumbnail: "https://images.unsplash.com/photo-1650234083211-f1feaf324d4c",
            thumbnailAlt: 'Node.js backend code on screen with API endpoints and server configuration',
            instructor: 'Maximilian Schwarzmüller',
            category: 'Backend Development',
            rating: 4.8,
            totalStudents: 45230,
            duration: '42h',
            difficulty: 'intermediate',
            reason: 'Complements your web development skills'
        },
        {
            id: '8',
            title: 'Advanced CSS and Sass',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_14d880079-1764283638543.png",
            thumbnailAlt: 'CSS code editor showing Sass variables and responsive design media queries',
            instructor: 'Jonas Schmedtmann',
            category: 'Frontend Development',
            rating: 4.9,
            totalStudents: 38450,
            duration: '28h',
            difficulty: 'advanced',
            reason: 'Build on your UI/UX design knowledge'
        }];


    const mockProgressStats: ProgressStats = {
        totalCourses: 6,
        completedCourses: 2,
        inProgressCourses: 3,
        certificatesEarned: 2,
        currentStreak: 7,
        totalLearningHours: 124,
        averageProgress: 52
    };

    const filteredAndSortedCourses = useMemo(() => {
        let filtered = mockCourses;

        if (filterStatus !== 'all') {
            filtered = filtered.filter((course) => course.status === filterStatus);
        }

        const sorted = [...filtered].sort((a, b) => {
            switch (sortOption) {
                case 'enrollment-date':
                    return b.enrollmentDate.getTime() - a.enrollmentDate.getTime();
                case 'progress':
                    return b.progress - a.progress;
                case 'last-accessed':
                    return b.lastAccessed.getTime() - a.lastAccessed.getTime();
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return sorted;
    }, [filterStatus, sortOption]);

    const handleLogin = (email: string, password: string, role: 'student' | 'admin') => {
        console.log('Login:', { email, password, role });
        setIsAuthenticated(true);
        setShowAuthModal(false);
    };

    const handleRegister = (email: string, password: string, name: string, role: 'student' | 'admin') => {
        console.log('Register:', { email, password, name, role });
        setIsAuthenticated(true);
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <>
            <Helmet>
                <title>Student Dashboard - EduLearn Platform</title>
                <meta
                    name="description"
                    content="Manage your learning journey with personalized course tracking, progress monitoring, and achievement celebrations on EduLearn Platform." />

            </Helmet>

            <div className="min-h-screen bg-background">
                <Header
                    isAuthenticated={isAuthenticated}
                    userRole="student"
                    userName={userName}
                    onLoginClick={() => setShowAuthModal(true)}
                    onLogoutClick={handleLogout} />


                <main className="pt-20 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <Icon name="Sparkles" size={28} className="text-primary" />
                                <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
                            </div>
                            <p className="text-muted-foreground">
                                Continue your learning journey and achieve your goals
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ProgressStatsCard stats={mockProgressStats} />

                            <AchievementsBanner achievements={mockAchievements} />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <RecentLessonsPanel lessons={mockRecentLessons} />
                                    <UpcomingQuizzesPanel quizzes={mockUpcomingQuizzes} />
                                </div>

                                <div className="space-y-6">
                                    <LearningGoalsPanel goals={mockLearningGoals} />
                                    <RecommendationsPanel recommendations={mockRecommendations} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Icon name="BookOpen" size={24} className="text-primary" />
                                    <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
                                </div>

                                <div className="space-y-6">
                                    <CourseFilters
                                        filterStatus={filterStatus}
                                        sortOption={sortOption}
                                        onFilterChange={setFilterStatus}
                                        onSortChange={setSortOption}
                                        totalCourses={mockCourses.length}
                                        filteredCount={filteredAndSortedCourses.length} />


                                    {filteredAndSortedCourses.length === 0 ?
                                        <div className="bg-card rounded-lg border border-border p-12 text-center">
                                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Icon name="BookOpen" size={32} className="text-muted-foreground" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-card-foreground mb-2">
                                                No courses found
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-6">
                                                Try adjusting your filters or explore new courses
                                            </p>
                                            <button
                                                onClick={() => setFilterStatus('all')}
                                                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth">

                                                Clear Filters
                                            </button>
                                        </div> :

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredAndSortedCourses.map((course) =>
                                                <CourseCard key={course.id} course={course} />
                                            )}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <AuthenticationModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    onLogin={handleLogin}
                    onRegister={handleRegister} />

            </div>
        </>);

};

export default StudentDashboard;