import { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header';
import AuthenticationModal from '../../components/AuthenticationModal';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import CourseTable from './components/CourseTable';
import CourseFormModal from './components/CourseFormModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { Course, CourseFormData, FilterOptions, SortConfig, Lesson } from './types';

const AdminCourseManagement = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userRole, setUserRole] = useState<'student' | 'admin'>('admin');
    const [userName, setUserName] = useState('Admin User');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [filters, setFilters] = useState<FilterOptions>({
        status: 'all',
        category: '',
        searchQuery: ''
    });
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'createdAt',
        direction: 'desc'
    });
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    useEffect(() => {
        const mockCourses: Course[] = [
            {
                id: 'course-1',
                title: 'Complete Web Development Bootcamp',
                instructor: 'Sarah Johnson',
                category: 'programming',
                enrollmentCount: 1247,
                status: 'published',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-03-20'),
                description: 'Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your career as a full-stack developer.',
                thumbnail: "https://images.unsplash.com/photo-1707982022782-a09c01936ca8",
                thumbnailAlt: 'Modern laptop displaying colorful code editor with web development project on wooden desk',
                price: 99.99,
                duration: '12 weeks',
                level: 'beginner',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'Introduction to Web Development',
                        duration: '45 minutes',
                        order: 1,
                        videoUrl: 'https://example.com/video1.mp4',
                        description: 'Learn the fundamentals of web development and set up your development environment.'
                    },
                    {
                        id: 'lesson-2',
                        title: 'HTML Basics',
                        duration: '60 minutes',
                        order: 2,
                        videoUrl: 'https://example.com/video2.mp4',
                        description: 'Master HTML tags, elements, and semantic markup for building web pages.'
                    }]

            },
            {
                id: 'course-2',
                title: 'UI/UX Design Masterclass',
                instructor: 'Michael Chen',
                category: 'design',
                enrollmentCount: 892,
                status: 'published',
                createdAt: new Date('2024-02-10'),
                updatedAt: new Date('2024-03-18'),
                description: 'Learn professional UI/UX design principles, user research, wireframing, prototyping, and design systems using Figma and Adobe XD.',
                thumbnail: "https://images.unsplash.com/photo-1710787554730-1b416f226a21",
                thumbnailAlt: 'Designer working on UI mockups with color palette and wireframes spread across desk',
                price: 89.99,
                duration: '8 weeks',
                level: 'intermediate',
                lessons: [
                    {
                        id: 'lesson-3',
                        title: 'Design Thinking Process',
                        duration: '50 minutes',
                        order: 1,
                        videoUrl: 'https://example.com/video3.mp4',
                        description: 'Understand the design thinking methodology and user-centered design approach.'
                    }]

            },
            {
                id: 'course-3',
                title: 'Digital Marketing Strategy',
                instructor: 'Emily Rodriguez',
                category: 'marketing',
                enrollmentCount: 654,
                status: 'draft',
                createdAt: new Date('2024-03-05'),
                updatedAt: new Date('2024-03-22'),
                description: 'Comprehensive digital marketing course covering SEO, social media marketing, content strategy, email campaigns, and analytics.',
                thumbnail: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d",
                thumbnailAlt: 'Marketing analytics dashboard showing graphs and charts on computer screen with coffee cup',
                price: 79.99,
                duration: '10 weeks',
                level: 'beginner',
                lessons: []
            },
            {
                id: 'course-4',
                title: 'Data Science with Python',
                instructor: 'David Kumar',
                category: 'data-science',
                enrollmentCount: 1089,
                status: 'published',
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-03-15'),
                description: 'Learn data analysis, visualization, machine learning, and statistical modeling using Python, pandas, NumPy, and scikit-learn.',
                thumbnail: "https://images.unsplash.com/photo-1672479818475-209e6c879d9c",
                thumbnailAlt: 'Data visualization charts and Python code displayed on dual monitor setup',
                price: 109.99,
                duration: '14 weeks',
                level: 'advanced',
                lessons: [
                    {
                        id: 'lesson-4',
                        title: 'Python Fundamentals',
                        duration: '55 minutes',
                        order: 1,
                        videoUrl: 'https://example.com/video4.mp4',
                        description: 'Master Python basics including data types, control structures, and functions.'
                    },
                    {
                        id: 'lesson-5',
                        title: 'Data Analysis with Pandas',
                        duration: '70 minutes',
                        order: 2,
                        videoUrl: 'https://example.com/video5.mp4',
                        description: 'Learn to manipulate and analyze data using the pandas library.'
                    }]

            },
            {
                id: 'course-5',
                title: 'Business Analytics Fundamentals',
                instructor: 'Jennifer Lee',
                category: 'business',
                enrollmentCount: 423,
                status: 'archived',
                createdAt: new Date('2023-11-10'),
                updatedAt: new Date('2024-01-05'),
                description: 'Introduction to business analytics, data-driven decision making, KPIs, and business intelligence tools.',
                thumbnail: "https://images.unsplash.com/photo-1735469157670-1212e570eadc",
                thumbnailAlt: 'Business professional analyzing financial charts and reports on tablet device',
                price: 69.99,
                duration: '6 weeks',
                level: 'beginner',
                lessons: [
                    {
                        id: 'lesson-6',
                        title: 'Introduction to Analytics',
                        duration: '40 minutes',
                        order: 1,
                        videoUrl: 'https://example.com/video6.mp4',
                        description: 'Understand the role of analytics in modern business decision-making.'
                    }]

            }];


        setCourses(mockCourses);
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
    };

    const handleLogin = (email: string, password: string, role: 'student' | 'admin') => {
        const mockCredentials = {
            admin: { email: 'admin@edulearn.com', password: 'admin123' },
            student: { email: 'student@edulearn.com', password: 'student123' }
        };

        if (
            email === mockCredentials[role].email &&
            password === mockCredentials[role].password)
        {
            setIsAuthenticated(true);
            setUserRole(role);
            setUserName(role === 'admin' ? 'Admin User' : 'Student User');
            setIsAuthModalOpen(false);
            showNotification('Login successful!', 'success');
        } else {
            showNotification('Invalid credentials. Use admin@edulearn.com / admin123', 'error');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole('student');
        setUserName('');
        showNotification('Logged out successfully', 'success');
    };

    const handleCreateNew = () => {
        setFormMode('create');
        setSelectedCourse(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (course: Course) => {
        setFormMode('edit');
        setSelectedCourse(course);
        setIsFormModalOpen(true);
    };

    const handleDuplicate = (course: Course) => {
        const duplicatedCourse: Course = {
            ...course,
            id: `course-${Date.now()}`,
            title: `${course.title} (Copy)`,
            status: 'draft',
            enrollmentCount: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        setCourses((prev) => [duplicatedCourse, ...prev]);
        showNotification('Course duplicated successfully', 'success');
    };

    const handleToggleStatus = (course: Course) => {
        const newStatus = course.status === 'published' ? 'draft' : 'published';
        setCourses((prev) =>
            prev.map((c) =>
                c.id === course.id ? { ...c, status: newStatus, updatedAt: new Date() } : c
            )
        );
        showNotification(
            `Course ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
            'success'
        );
    };

    const handleDelete = (course: Course) => {
        setSelectedCourse(course);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedCourse) {
            setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
            setIsDeleteModalOpen(false);
            setSelectedCourse(null);
            showNotification('Course deleted successfully', 'success');
        }
    };

    const handleFormSubmit = (data: CourseFormData, lessons: Lesson[]) => {
        if (formMode === 'create') {
            const newCourse: Course = {
                id: `course-${Date.now()}`,
                ...data,
                enrollmentCount: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                lessons
            };
            setCourses((prev) => [newCourse, ...prev]);
            showNotification('Course created successfully', 'success');
        } else if (selectedCourse) {
            setCourses((prev) =>
                prev.map((c) =>
                    c.id === selectedCourse.id ?
                        { ...c, ...data, lessons, updatedAt: new Date() } :
                        c
                )
            );
            showNotification('Course updated successfully', 'success');
        }
        setIsFormModalOpen(false);
        setSelectedCourse(null);
    };

    const handleSelectCourse = (courseId: string) => {
        setSelectedCourses((prev) =>
            prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
        );
    };

    const handleSelectAll = () => {
        if (selectedCourses.length === filteredAndSortedCourses.length) {
            setSelectedCourses([]);
        } else {
            setSelectedCourses(filteredAndSortedCourses.map((c) => c.id));
        }
    };

    const handleBulkAction = (action: string) => {
        if (selectedCourses.length === 0) return;

        switch (action) {
            case 'publish':
                setCourses((prev) =>
                    prev.map((c) =>
                        selectedCourses.includes(c.id) ? { ...c, status: 'published' as const } : c
                    )
                );
                showNotification(`${selectedCourses.length} courses published`, 'success');
                break;
            case 'unpublish':
                setCourses((prev) =>
                    prev.map((c) =>
                        selectedCourses.includes(c.id) ? { ...c, status: 'draft' as const } : c
                    )
                );
                showNotification(`${selectedCourses.length} courses unpublished`, 'success');
                break;
            case 'archive':
                setCourses((prev) =>
                    prev.map((c) =>
                        selectedCourses.includes(c.id) ? { ...c, status: 'archived' as const } : c
                    )
                );
                showNotification(`${selectedCourses.length} courses archived`, 'success');
                break;
            case 'delete':
                setCourses((prev) => prev.filter((c) => !selectedCourses.includes(c.id)));
                showNotification(`${selectedCourses.length} courses deleted`, 'success');
                break;
        }
        setSelectedCourses([]);
    };

    const handleSort = (key: keyof Course) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredAndSortedCourses = useMemo(() => {
        let filtered = [...courses];

        if (filters.status !== 'all') {
            filtered = filtered.filter((c) => c.status === filters.status);
        }

        if (filters.category) {
            filtered = filtered.filter((c) => c.category === filters.category);
        }

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (c) =>
                    c.title.toLowerCase().includes(query) ||
                    c.instructor.toLowerCase().includes(query) ||
                    c.category.toLowerCase().includes(query)
            );
        }

        filtered.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [courses, filters, sortConfig]);

    return (
        <div className="min-h-screen bg-background">
            <Header
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                userName={userName}
                onLoginClick={() => setIsAuthModalOpen(true)}
                onLogoutClick={handleLogout} />


            <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-text-primary mb-2">Course Management</h1>
                            <p className="text-text-secondary">
                                Create, edit, and manage your educational courses
                            </p>
                        </div>
                    </div>

                    <StatsCards courses={courses} />

                    <FilterBar
                        filters={filters}
                        onFilterChange={setFilters}
                        onCreateNew={handleCreateNew}
                        selectedCount={selectedCourses.length}
                        onBulkAction={handleBulkAction} />


                    {filteredAndSortedCourses.length === 0 ?
                        <div className="bg-card border border-border rounded-lg p-12 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-text-secondary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />

                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                                        No courses found
                                    </h3>
                                    <p className="text-sm text-text-secondary">
                                        {filters.searchQuery || filters.status !== 'all' || filters.category ? 'Try adjusting your filters' : 'Get started by creating your first course'}
                                    </p>
                                </div>
                            </div>
                        </div> :

                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <CourseTable
                                courses={filteredAndSortedCourses}
                                selectedCourses={selectedCourses}
                                onSelectCourse={handleSelectCourse}
                                onSelectAll={handleSelectAll}
                                onEdit={handleEdit}
                                onDuplicate={handleDuplicate}
                                onToggleStatus={handleToggleStatus}
                                onDelete={handleDelete}
                                sortConfig={sortConfig}
                                onSort={handleSort} />

                        </div>
                    }
                </div>
            </main>

            <AuthenticationModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin} />


            <CourseFormModal
                isOpen={isFormModalOpen}
                onClose={() => {
                    setIsFormModalOpen(false);
                    setSelectedCourse(null);
                }}
                onSubmit={handleFormSubmit}
                course={selectedCourse}
                mode={formMode} />


            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedCourse(null);
                }}
                onConfirm={handleConfirmDelete}
                course={selectedCourse} />


            {notification &&
                <div className="fixed bottom-6 right-6 z-[1040] animate-slide-in-right">
                    <div
                        className={`px-6 py-4 rounded-lg elevation-lg flex items-center gap-3 ${
                            notification.type === 'success' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`
                        }>

                        <svg
                            className="w-5 h-5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">

                            {notification.type === 'success' ?
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7" /> :


                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />

                            }
                        </svg>
                        <p className="font-medium">{notification.message}</p>
                    </div>
                </div>
            }
        </div>);

};

export default AdminCourseManagement;