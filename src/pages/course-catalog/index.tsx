import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import AuthenticationModal from '../../components/AuthenticationModal';

import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import CourseGrid from './components/CourseGrid';
import Pagination from './components/Pagination';
import { Course, FilterOptions, CategoryOption, DifficultyOption } from './types';

const CourseCatalog = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
    const [userName, setUserName] = useState('');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 9;

    const [filters, setFilters] = useState<FilterOptions>({
        category: 'all',
        difficulty: 'all',
        minDuration: 0,
        maxDuration: 100,
        searchQuery: '',
        sortBy: 'relevance'
    });

    const mockCourses: Course[] = [
        {
            id: '1',
            title: 'Complete Web Development Bootcamp',
            description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack web developer.',
            instructor: 'Sarah Johnson',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
            instructorImageAlt: 'Professional woman with brown hair wearing blue blazer smiling at camera',
            thumbnail: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085",
            thumbnailAlt: 'Modern laptop displaying colorful code editor with multiple programming languages on dark desk',
            category: 'Web Development',
            difficulty: 'Beginner',
            duration: 54,
            rating: 4.8,
            totalRatings: 12450,
            enrolledStudents: 45230,
            price: 89.99,
            lessonCount: 320,
            objectives: [
                'Build responsive websites using HTML5 and CSS3',
                'Master JavaScript ES6+ and modern frameworks',
                'Create full-stack applications with MERN stack',
                'Deploy applications to production servers'],

            testimonials: [
                {
                    id: 't1',
                    studentName: 'Michael Chen',
                    studentImage: "https://images.unsplash.com/photo-1665111912062-87bde7daedc7",
                    studentImageAlt: 'Young Asian man with glasses wearing casual shirt smiling outdoors',
                    rating: 5,
                    comment: 'This course transformed my career! The instructor explains complex concepts in a simple way.',
                    date: '2024-01-15'
                }],

            isNew: true,
            isBestseller: true
        },
        {
            id: '2',
            title: 'Data Science and Machine Learning Masterclass',
            description: 'Learn Python, data analysis, visualization, machine learning algorithms, and deep learning with TensorFlow.',
            instructor: 'Dr. James Wilson',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18e17be5d-1763296456983.png",
            instructorImageAlt: 'Middle-aged man with beard wearing professional attire in office setting',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_13a604e2d-1764283639214.png",
            thumbnailAlt: 'Digital brain illustration with neural network connections and data visualization graphs',
            category: 'Data Science',
            difficulty: 'Intermediate',
            duration: 42,
            rating: 4.9,
            totalRatings: 8920,
            enrolledStudents: 32100,
            price: 94.99,
            lessonCount: 285,
            objectives: [
                'Master Python for data analysis and visualization',
                'Understand machine learning algorithms and applications',
                'Build predictive models using scikit-learn',
                'Implement deep learning with TensorFlow and Keras'],

            testimonials: [
                {
                    id: 't2',
                    studentName: 'Emily Rodriguez',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0f48e8d-1763295027844.png",
                    studentImageAlt: 'Young Hispanic woman with long dark hair wearing professional attire smiling',
                    rating: 5,
                    comment: 'The best data science course I have taken. Practical projects helped me land my dream job!',
                    date: '2024-01-20'
                }],

            isNew: false,
            isBestseller: true
        },
        {
            id: '3',
            title: 'Mobile App Development with React Native',
            description: 'Build cross-platform mobile applications for iOS and Android using React Native and JavaScript.',
            instructor: 'Alex Martinez',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_126567a18-1763294036454.png",
            instructorImageAlt: 'Young man with short hair wearing casual t-shirt in modern workspace',
            thumbnail: "https://images.unsplash.com/photo-1549715725-93da522b0361",
            thumbnailAlt: 'Smartphone displaying mobile app interface with colorful design elements on wooden desk',
            category: 'Mobile Development',
            difficulty: 'Intermediate',
            duration: 36,
            rating: 4.7,
            totalRatings: 6540,
            enrolledStudents: 23450,
            price: 79.99,
            lessonCount: 240,
            objectives: [
                'Build native mobile apps for iOS and Android',
                'Master React Native components and navigation',
                'Integrate APIs and handle data persistence',
                'Publish apps to App Store and Google Play'],

            testimonials: [
                {
                    id: 't3',
                    studentName: 'David Kim',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1314e883f-1763294266160.png",
                    studentImageAlt: 'Asian man with glasses wearing business casual attire in office environment',
                    rating: 5,
                    comment: 'Excellent course structure! I built three apps while learning and got hired as a mobile developer.',
                    date: '2024-02-01'
                }],

            isNew: true,
            isBestseller: false
        },
        {
            id: '4',
            title: 'Digital Marketing Complete Course',
            description: 'Master SEO, social media marketing, content marketing, email campaigns, and analytics to grow your business.',
            instructor: 'Jennifer Lee',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0007e95-1763295050768.png",
            instructorImageAlt: 'Professional woman with blonde hair wearing business suit smiling confidently',
            thumbnail: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d",
            thumbnailAlt: 'Marketing analytics dashboard showing graphs and charts on computer screen with coffee cup',
            category: 'Marketing',
            difficulty: 'Beginner',
            duration: 28,
            rating: 4.6,
            totalRatings: 9870,
            enrolledStudents: 38900,
            price: 69.99,
            lessonCount: 195,
            objectives: [
                'Develop comprehensive digital marketing strategies',
                'Master SEO and content marketing techniques',
                'Create effective social media campaigns',
                'Analyze marketing data and optimize ROI'],

            testimonials: [
                {
                    id: 't4',
                    studentName: 'Lisa Thompson',
                    studentImage: "https://images.unsplash.com/photo-1731745078231-be5624671bab",
                    studentImageAlt: 'Young woman with curly hair wearing casual attire smiling outdoors',
                    rating: 4,
                    comment: 'Great introduction to digital marketing. The practical examples were very helpful.',
                    date: '2024-02-10'
                }],

            isNew: false,
            isBestseller: true
        },
        {
            id: '5',
            title: 'Cloud Computing with AWS',
            description: 'Learn Amazon Web Services from basics to advanced, including EC2, S3, Lambda, and cloud architecture.',
            instructor: 'Robert Anderson',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cdaf3571-1763292525335.png",
            instructorImageAlt: 'Senior professional man with gray hair wearing formal business attire',
            thumbnail: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d",
            thumbnailAlt: 'Cloud computing concept with digital network connections and server infrastructure visualization',
            category: 'Cloud Computing',
            difficulty: 'Advanced',
            duration: 48,
            rating: 4.8,
            totalRatings: 5430,
            enrolledStudents: 18760,
            price: 99.99,
            lessonCount: 310,
            objectives: [
                'Design and deploy scalable cloud architectures',
                'Master AWS core services and best practices',
                'Implement security and compliance measures',
                'Optimize cloud costs and performance'],

            testimonials: [
                {
                    id: 't5',
                    studentName: 'Mark Stevens',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_175ea645a-1763293958593.png",
                    studentImageAlt: 'Man with short brown hair wearing polo shirt in professional setting',
                    rating: 5,
                    comment: 'Comprehensive AWS course! Helped me pass my Solutions Architect certification on first attempt.',
                    date: '2024-02-15'
                }],

            isNew: true,
            isBestseller: false
        },
        {
            id: '6',
            title: 'UI/UX Design Fundamentals',
            description: 'Master user interface and user experience design principles, wireframing, prototyping, and design tools.',
            instructor: 'Emma Davis',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_198bd0bfa-1763298528140.png",
            instructorImageAlt: 'Creative woman with red hair wearing artistic clothing in design studio',
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
            thumbnailAlt: 'Designer workspace with sketches, color swatches, and digital tablet showing UI mockups',
            category: 'Design',
            difficulty: 'Beginner',
            duration: 32,
            rating: 4.7,
            totalRatings: 7650,
            enrolledStudents: 29340,
            price: 74.99,
            lessonCount: 220,
            objectives: [
                'Understand core UI/UX design principles',
                'Create wireframes and interactive prototypes',
                'Master design tools like Figma and Adobe XD',
                'Conduct user research and usability testing'],

            testimonials: [
                {
                    id: 't6',
                    studentName: 'Sophie Martin',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12033a8b7-1763300650349.png",
                    studentImageAlt: 'Young woman with short hair wearing trendy glasses and casual attire',
                    rating: 5,
                    comment: 'Perfect for beginners! The instructor makes design concepts easy to understand and apply.',
                    date: '2024-02-20'
                }],

            isNew: false,
            isBestseller: true
        },
        {
            id: '7',
            title: 'Cybersecurity Essentials',
            description: 'Learn network security, ethical hacking, penetration testing, and how to protect systems from cyber threats.',
            instructor: 'Thomas Brown',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_132169cd2-1763301939844.png",
            instructorImageAlt: 'Serious man with dark hair wearing security professional attire in tech environment',
            thumbnail: "https://images.unsplash.com/photo-1654588827084-b6f27735ba7d",
            thumbnailAlt: 'Digital security concept with padlock icon and binary code on dark background',
            category: 'Cybersecurity',
            difficulty: 'Intermediate',
            duration: 40,
            rating: 4.9,
            totalRatings: 4320,
            enrolledStudents: 15670,
            price: 89.99,
            lessonCount: 265,
            objectives: [
                'Understand common cyber threats and vulnerabilities',
                'Perform ethical hacking and penetration testing',
                'Implement security measures and best practices',
                'Respond to security incidents effectively'],

            testimonials: [
                {
                    id: 't7',
                    studentName: 'Chris Walker',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15ae6dffe-1763295514145.png",
                    studentImageAlt: 'Young man with beard wearing tech company t-shirt in modern office',
                    rating: 5,
                    comment: 'Excellent hands-on labs! This course prepared me well for my security analyst role.',
                    date: '2024-02-25'
                }],

            isNew: true,
            isBestseller: false
        },
        {
            id: '8',
            title: 'Python Programming for Beginners',
            description: 'Start your programming journey with Python. Learn syntax, data structures, OOP, and build real projects.',
            instructor: 'Maria Garcia',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1993c0ddc-1763301484246.png",
            instructorImageAlt: 'Friendly woman with dark hair wearing casual sweater smiling warmly',
            thumbnail: "https://images.unsplash.com/photo-1479838376502-4b3c533c4bb5",
            thumbnailAlt: 'Python code displayed on computer screen with colorful syntax highlighting',
            category: 'Programming',
            difficulty: 'Beginner',
            duration: 24,
            rating: 4.8,
            totalRatings: 15670,
            enrolledStudents: 52340,
            price: 59.99,
            lessonCount: 180,
            objectives: [
                'Master Python fundamentals and syntax',
                'Work with data structures and algorithms',
                'Understand object-oriented programming',
                'Build practical Python applications'],

            testimonials: [
                {
                    id: 't8',
                    studentName: 'John Parker',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0d40564-1763293591452.png",
                    studentImageAlt: 'Young man with friendly smile wearing casual shirt in bright setting',
                    rating: 5,
                    comment: 'Best Python course for beginners! Clear explanations and great practice exercises.',
                    date: '2024-03-01'
                }],

            isNew: false,
            isBestseller: true
        },
        {
            id: '9',
            title: 'Blockchain and Cryptocurrency Development',
            description: 'Learn blockchain technology, smart contracts, DApps development, and cryptocurrency fundamentals.',
            instructor: 'Kevin Zhang',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b12cece8-1763296037808.png",
            instructorImageAlt: 'Tech entrepreneur with modern hairstyle wearing startup company hoodie',
            thumbnail: "https://images.unsplash.com/photo-1642356692954-3fbb84baf1a6",
            thumbnailAlt: 'Blockchain network visualization with connected nodes and cryptocurrency symbols',
            category: 'Blockchain',
            difficulty: 'Advanced',
            duration: 38,
            rating: 4.6,
            totalRatings: 3210,
            enrolledStudents: 11230,
            price: 94.99,
            lessonCount: 245,
            objectives: [
                'Understand blockchain architecture and consensus',
                'Develop smart contracts with Solidity',
                'Build decentralized applications (DApps)',
                'Implement cryptocurrency wallets and exchanges'],

            testimonials: [
                {
                    id: 't9',
                    studentName: 'Alex Turner',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1beff80eb-1763297561640.png",
                    studentImageAlt: 'Young developer with glasses wearing tech conference t-shirt',
                    rating: 4,
                    comment: 'Comprehensive blockchain course. The smart contract section was particularly valuable.',
                    date: '2024-03-05'
                }],

            isNew: true,
            isBestseller: false
        },
        {
            id: '10',
            title: 'Business Analytics and Intelligence',
            description: 'Master data analysis, visualization, SQL, Excel, Tableau, and Power BI for business decision-making.',
            instructor: 'Rachel Green',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dccfd667-1763301236994.png",
            instructorImageAlt: 'Professional business analyst wearing formal attire in corporate office',
            thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
            thumbnailAlt: 'Business analytics dashboard with charts, graphs, and data visualization on multiple screens',
            category: 'Business',
            difficulty: 'Intermediate',
            duration: 30,
            rating: 4.7,
            totalRatings: 6890,
            enrolledStudents: 25670,
            price: 79.99,
            lessonCount: 210,
            objectives: [
                'Analyze business data using SQL and Excel',
                'Create interactive dashboards with Tableau',
                'Generate insights for strategic decisions',
                'Present data findings effectively'],

            testimonials: [
                {
                    id: 't10',
                    studentName: 'Daniel White',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2f8299f-1763293873173.png",
                    studentImageAlt: 'Business professional with neat appearance wearing suit in office environment',
                    rating: 5,
                    comment: 'Practical and relevant! Applied these skills immediately in my business analyst role.',
                    date: '2024-03-10'
                }],

            isNew: false,
            isBestseller: true
        },
        {
            id: '11',
            title: 'Game Development with Unity',
            description: 'Create 2D and 3D games using Unity engine and C#. Learn game design, physics, and monetization.',
            instructor: 'Ryan Cooper',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf1a8166-1763298224243.png",
            instructorImageAlt: 'Game developer with creative style wearing gaming company merchandise',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_10ec569ee-1764283638586.png",
            thumbnailAlt: 'Unity game engine interface showing 3D game development environment with character models',
            category: 'Game Development',
            difficulty: 'Intermediate',
            duration: 44,
            rating: 4.8,
            totalRatings: 5670,
            enrolledStudents: 19450,
            price: 84.99,
            lessonCount: 290,
            objectives: [
                'Build 2D and 3D games with Unity',
                'Master C# programming for game development',
                'Implement game physics and animations',
                'Publish games to multiple platforms'],

            testimonials: [
                {
                    id: 't11',
                    studentName: 'Jake Morrison',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_116446248-1763295310012.png",
                    studentImageAlt: 'Young gamer with enthusiastic expression wearing casual gaming attire',
                    rating: 5,
                    comment: 'Amazing course! I published my first game to Steam after completing this.',
                    date: '2024-03-15'
                }],

            isNew: true,
            isBestseller: false
        },
        {
            id: '12',
            title: 'DevOps Engineering Complete Guide',
            description: 'Master CI/CD, Docker, Kubernetes, Jenkins, Git, and cloud deployment for modern software delivery.',
            instructor: 'Michael Scott',
            instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11dca459a-1763293763866.png",
            instructorImageAlt: 'Senior DevOps engineer with professional demeanor in tech company setting',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12049cc37-1764283638114.png",
            thumbnailAlt: 'DevOps workflow diagram showing continuous integration and deployment pipeline',
            category: 'DevOps',
            difficulty: 'Advanced',
            duration: 46,
            rating: 4.9,
            totalRatings: 4560,
            enrolledStudents: 16890,
            price: 99.99,
            lessonCount: 305,
            objectives: [
                'Implement CI/CD pipelines with Jenkins',
                'Master containerization with Docker',
                'Orchestrate containers using Kubernetes',
                'Automate infrastructure with Terraform'],

            testimonials: [
                {
                    id: 't12',
                    studentName: 'Tom Harris',
                    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19d89590b-1763301926342.png",
                    studentImageAlt: 'DevOps professional with confident expression wearing tech industry casual',
                    rating: 5,
                    comment: 'The most comprehensive DevOps course available. Landed a senior DevOps role after this!',
                    date: '2024-03-20'
                }],

            isNew: false,
            isBestseller: true
        }];


    const categories: CategoryOption[] = [
        { value: 'all', label: 'All Categories', count: mockCourses.length },
        {
            value: 'Web Development',
            label: 'Web Development',
            count: mockCourses.filter((c) => c.category === 'Web Development').length
        },
        {
            value: 'Data Science',
            label: 'Data Science',
            count: mockCourses.filter((c) => c.category === 'Data Science').length
        },
        {
            value: 'Mobile Development',
            label: 'Mobile Development',
            count: mockCourses.filter((c) => c.category === 'Mobile Development').length
        },
        {
            value: 'Marketing',
            label: 'Marketing',
            count: mockCourses.filter((c) => c.category === 'Marketing').length
        },
        {
            value: 'Cloud Computing',
            label: 'Cloud Computing',
            count: mockCourses.filter((c) => c.category === 'Cloud Computing').length
        },
        {
            value: 'Design',
            label: 'Design',
            count: mockCourses.filter((c) => c.category === 'Design').length
        },
        {
            value: 'Cybersecurity',
            label: 'Cybersecurity',
            count: mockCourses.filter((c) => c.category === 'Cybersecurity').length
        },
        {
            value: 'Programming',
            label: 'Programming',
            count: mockCourses.filter((c) => c.category === 'Programming').length
        },
        {
            value: 'Blockchain',
            label: 'Blockchain',
            count: mockCourses.filter((c) => c.category === 'Blockchain').length
        },
        {
            value: 'Business',
            label: 'Business',
            count: mockCourses.filter((c) => c.category === 'Business').length
        },
        {
            value: 'Game Development',
            label: 'Game Development',
            count: mockCourses.filter((c) => c.category === 'Game Development').length
        },
        {
            value: 'DevOps',
            label: 'DevOps',
            count: mockCourses.filter((c) => c.category === 'DevOps').length
        }];


    const difficulties: DifficultyOption[] = [
        { value: 'all', label: 'All Levels' },
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' }];


    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        const role = localStorage.getItem('userRole') as 'student' | 'admin' | null;
        const name = localStorage.getItem('userName');

        if (authStatus === 'true' && role && name) {
            setIsAuthenticated(true);
            setUserRole(role);
            setUserName(name);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredAndSortedCourses = useMemo(() => {
        let result = [...mockCourses];

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(
                (course) =>
                    course.title.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query) ||
                    course.instructor.toLowerCase().includes(query) ||
                    course.category.toLowerCase().includes(query)
            );
        }

        if (filters.category !== 'all') {
            result = result.filter((course) => course.category === filters.category);
        }

        if (filters.difficulty !== 'all') {
            result = result.filter((course) => course.difficulty === filters.difficulty);
        }

        result = result.filter(
            (course) =>
                course.duration >= filters.minDuration &&
                course.duration <= filters.maxDuration
        );

        switch (filters.sortBy) {
            case 'popularity':
                result.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            default:
                break;
        }

        return result;
    }, [filters, mockCourses]);

    const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
    const paginatedCourses = filteredAndSortedCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEnroll = (courseId: string) => {
        const course = mockCourses.find((c) => c.id === courseId);
        if (course) {
            alert(`Successfully enrolled in "${course.title}"!`);
        }
    };

    const handleLogin = (email: string, password: string, role: 'student' | 'admin') => {
        const mockCredentials = {
            student: { email: 'student@edulearn.com', password: 'student123' },
            admin: { email: 'admin@edulearn.com', password: 'admin123' }
        };

        if (
            email === mockCredentials[role].email &&
            password === mockCredentials[role].password)
        {
            const name = role === 'student' ? 'John Doe' : 'Admin User';
            setIsAuthenticated(true);
            setUserRole(role);
            setUserName(name);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', name);
            setIsAuthModalOpen(false);
        } else {
            alert('Invalid credentials. Please use:\nStudent: student@edulearn.com / student123\nAdmin: admin@edulearn.com / admin123');
        }
    };

    const handleRegister = (
        name: string,
        email: string,
        password: string,
        role: 'student' | 'admin') =>
    {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(name);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName('');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
    };

    return (
        <>
            <Helmet>
                <title>Course Catalog - EduLearn Platform</title>
                <meta
                    name="description"
                    content="Browse our comprehensive catalog of online courses. Find the perfect course to advance your skills in web development, data science, design, and more." />

            </Helmet>

            <div className="min-h-screen bg-background">
                <Header
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    userName={userName}
                    onLoginClick={() => setIsAuthModalOpen(true)}
                    onLogoutClick={handleLogout} />


                <main className="pt-16">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Explore Our Courses
                                </h1>
                                <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                                    Discover world-class courses taught by industry experts. Start learning
                                    today and advance your career.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex gap-8">
                            <aside className="hidden lg:block w-80 flex-shrink-0">
                                <div className="sticky top-24">
                                    <FilterPanel
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        categories={categories}
                                        difficulties={difficulties}
                                        totalResults={filteredAndSortedCourses.length} />

                                </div>
                            </aside>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-card-foreground">
                                        Available Courses
                                    </h2>
                                    <Button
                                        variant="outline"
                                        size="default"
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        iconName="SlidersHorizontal"
                                        iconPosition="left"
                                        iconSize={18}
                                        className="lg:hidden">

                                        Filters
                                    </Button>
                                </div>

                                <CourseGrid
                                    courses={paginatedCourses}
                                    onEnroll={handleEnroll}
                                    isAuthenticated={isAuthenticated}
                                    isLoading={isLoading} />


                                {!isLoading && filteredAndSortedCourses.length > 0 &&
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredAndSortedCourses.length} />

                                }
                            </div>
                        </div>
                    </div>
                </main>

                {isMobileFilterOpen &&
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-[1015] animate-fade-in lg:hidden"
                            onClick={() => setIsMobileFilterOpen(false)} />

                        <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-card z-[1020] animate-slide-in-right lg:hidden">
                            <FilterPanel
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                categories={categories}
                                difficulties={difficulties}
                                totalResults={filteredAndSortedCourses.length}
                                isMobile
                                onClose={() => setIsMobileFilterOpen(false)} />

                        </div>
                    </>
                }

                <AuthenticationModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    onLogin={handleLogin}
                    onRegister={handleRegister} />

            </div>
        </>);

};

export default CourseCatalog;