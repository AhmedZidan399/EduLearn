import { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Course, CourseFormData, Lesson, LessonFormData } from '../types';

interface CourseFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CourseFormData, lessons: Lesson[]) => void;
    course?: Course | null;
    mode: 'create' | 'edit';
}

const CourseFormModal = ({ isOpen, onClose, onSubmit, course, mode }: CourseFormModalProps) => {
    const [activeTab, setActiveTab] = useState<'basic' | 'lessons' | 'settings'>('basic');
    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        instructor: '',
        category: '',
        description: '',
        thumbnail: '',
        thumbnailAlt: '',
        price: 0,
        duration: '',
        level: 'beginner',
        status: 'draft',
    });
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [lessonFormData, setLessonFormData] = useState<LessonFormData>({
        title: '',
        duration: '',
        videoUrl: '',
        description: '',
    });
    const [errors, setErrors] = useState<Partial<CourseFormData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const categoryOptions = [
        { value: 'programming', label: 'Programming' },
        { value: 'design', label: 'Design' },
        { value: 'business', label: 'Business' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'data-science', label: 'Data Science' },
    ];

    const levelOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
    ];

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' },
    ];

    useEffect(() => {
        if (isOpen && course && mode === 'edit') {
            setFormData({
                title: course.title,
                instructor: course.instructor,
                category: course.category,
                description: course.description,
                thumbnail: course.thumbnail,
                thumbnailAlt: course.thumbnailAlt,
                price: course.price,
                duration: course.duration,
                level: course.level,
                status: course.status,
            });
            setLessons(course.lessons);
        } else if (isOpen && mode === 'create') {
            setFormData({
                title: '',
                instructor: '',
                category: '',
                description: '',
                thumbnail: '',
                thumbnailAlt: '',
                price: 0,
                duration: '',
                level: 'beginner',
                status: 'draft',
            });
            setLessons([]);
        }
        setActiveTab('basic');
    }, [isOpen, course, mode]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const validateForm = (): boolean => {
        const newErrors: Partial<CourseFormData> = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.instructor.trim()) newErrors.instructor = 'Instructor is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
        if (!formData.thumbnailAlt.trim()) newErrors.thumbnailAlt = 'Thumbnail alt text is required';
        if (formData.price < 0) newErrors.price = 'Price must be positive';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSelectChange = (name: keyof CourseFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleAddLesson = () => {
        if (!lessonFormData.title.trim() || !lessonFormData.videoUrl.trim()) {
            return;
        }

        const newLesson: Lesson = {
            id: editingLesson?.id || `lesson-${Date.now()}`,
            title: lessonFormData.title,
            duration: lessonFormData.duration,
            videoUrl: lessonFormData.videoUrl,
            description: lessonFormData.description,
            order: editingLesson ? editingLesson.order : lessons.length + 1,
        };

        if (editingLesson) {
            setLessons((prev) => prev.map((l) => (l.id === editingLesson.id ? newLesson : l)));
        } else {
            setLessons((prev) => [...prev, newLesson]);
        }

        setLessonFormData({ title: '', duration: '', videoUrl: '', description: '' });
        setEditingLesson(null);
    };

    const handleEditLesson = (lesson: Lesson) => {
        setEditingLesson(lesson);
        setLessonFormData({
            title: lesson.title,
            duration: lesson.duration,
            videoUrl: lesson.videoUrl,
            description: lesson.description,
        });
    };

    const handleDeleteLesson = (lessonId: string) => {
        setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setActiveTab('basic');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            onSubmit(formData, lessons);
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-[1020] flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="bg-card rounded-lg w-full max-w-4xl elevation-lg animate-scale-in my-8">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-2xl font-bold text-card-foreground">
                        {mode === 'create' ? 'Create New Course' : 'Edit Course'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-muted transition-smooth"
                        aria-label="Close modal"
                    >
                        <Icon name="X" size={20} />
                    </button>
                </div>

                <div className="border-b border-border">
                    <div className="flex gap-1 px-6">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`px-4 py-3 text-sm font-medium transition-smooth border-b-2 ${
                                activeTab === 'basic' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                            }`}
                        >
                            Basic Information
                        </button>
                        <button
                            onClick={() => setActiveTab('lessons')}
                            className={`px-4 py-3 text-sm font-medium transition-smooth border-b-2 ${
                                activeTab === 'lessons' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                            }`}
                        >
                            Lessons ({lessons.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-4 py-3 text-sm font-medium transition-smooth border-b-2 ${
                                activeTab === 'settings' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                            }`}
                        >
                            Settings
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto">
                    {activeTab === 'basic' && (
                        <div className="space-y-4">
                            <Input
                                label="Course Title"
                                type="text"
                                name="title"
                                placeholder="Enter course title"
                                value={formData.title}
                                onChange={handleInputChange}
                                error={errors.title}
                                required
                            />

                            <Input
                                label="Instructor Name"
                                type="text"
                                name="instructor"
                                placeholder="Enter instructor name"
                                value={formData.instructor}
                                onChange={handleInputChange}
                                error={errors.instructor}
                                required
                            />

                            <Select
                                label="Category"
                                options={categoryOptions}
                                value={formData.category}
                                onChange={(value) => handleSelectChange('category', value as string)}
                                error={errors.category}
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Description <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Enter course description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text-primary"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <Input
                                label="Thumbnail URL"
                                type="url"
                                name="thumbnail"
                                placeholder="https://example.com/image.jpg"
                                value={formData.thumbnail}
                                onChange={handleInputChange}
                                error={errors.thumbnail}
                                required
                            />

                            <Input
                                label="Thumbnail Alt Text"
                                type="text"
                                name="thumbnailAlt"
                                placeholder="Describe the thumbnail image"
                                value={formData.thumbnailAlt}
                                onChange={handleInputChange}
                                error={errors.thumbnailAlt}
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Price (USD)"
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    error={errors.price}
                                    required
                                />

                                <Input
                                    label="Duration"
                                    type="text"
                                    name="duration"
                                    placeholder="e.g., 8 weeks"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    error={errors.duration}
                                    required
                                />
                            </div>

                            <Select
                                label="Level"
                                options={levelOptions}
                                value={formData.level}
                                onChange={(value) => handleSelectChange('level', value as string)}
                                required
                            />
                        </div>
                    )}

                    {activeTab === 'lessons' && (
                        <div className="space-y-6">
                            <div className="bg-muted p-4 rounded-lg space-y-4">
                                <h3 className="font-semibold text-text-primary">
                                    {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
                                </h3>

                                <Input
                                    label="Lesson Title"
                                    type="text"
                                    placeholder="Enter lesson title"
                                    value={lessonFormData.title}
                                    onChange={(e) =>
                                        setLessonFormData((prev) => ({ ...prev, title: e.target.value }))
                                    }
                                    required
                                />

                                <Input
                                    label="Duration"
                                    type="text"
                                    placeholder="e.g., 15 minutes"
                                    value={lessonFormData.duration}
                                    onChange={(e) =>
                                        setLessonFormData((prev) => ({ ...prev, duration: e.target.value }))
                                    }
                                />

                                <Input
                                    label="Video URL"
                                    type="url"
                                    placeholder="https://example.com/video.mp4"
                                    value={lessonFormData.videoUrl}
                                    onChange={(e) =>
                                        setLessonFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
                                    }
                                    required
                                />

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Enter lesson description"
                                        value={lessonFormData.description}
                                        onChange={(e) =>
                                            setLessonFormData((prev) => ({ ...prev, description: e.target.value }))
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text-primary"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="default"
                                        onClick={handleAddLesson}
                                        iconName={editingLesson ? 'Save' : 'Plus'}
                                        iconPosition="left"
                                    >
                                        {editingLesson ? 'Update Lesson' : 'Add Lesson'}
                                    </Button>
                                    {editingLesson && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setEditingLesson(null);
                                                setLessonFormData({ title: '', duration: '', videoUrl: '', description: '' });
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-semibold text-text-primary">Course Lessons</h3>
                                {lessons.length === 0 ? (
                                    <p className="text-sm text-text-secondary text-center py-8">
                                        No lessons added yet. Add your first lesson above.
                                    </p>
                                ) : (
                                    lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-semibold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-text-primary truncate">{lesson.title}</p>
                                                <p className="text-xs text-text-secondary">{lesson.duration}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditLesson(lesson)}
                                                    iconName="Edit"
                                                    iconSize={16}
                                                    aria-label="Edit lesson"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteLesson(lesson.id)}
                                                    iconName="Trash2"
                                                    iconSize={16}
                                                    className="text-destructive hover:text-destructive"
                                                    aria-label="Delete lesson"
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-4">
                            <Select
                                label="Course Status"
                                options={statusOptions}
                                value={formData.status}
                                onChange={(value) => handleSelectChange('status', value as string)}
                                description="Published courses are visible to students"
                                required
                            />

                            <div className="p-4 bg-muted rounded-lg space-y-3">
                                <h3 className="font-semibold text-text-primary">Publishing Guidelines</h3>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <Icon name="CheckCircle2" size={16} className="mt-0.5 text-success" />
                                        <span>Ensure all course information is complete and accurate</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Icon name="CheckCircle2" size={16} className="mt-0.5 text-success" />
                                        <span>Add at least 3 lessons before publishing</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Icon name="CheckCircle2" size={16} className="mt-0.5 text-success" />
                                        <span>Verify all video URLs are accessible</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Icon name="CheckCircle2" size={16} className="mt-0.5 text-success" />
                                        <span>Review course description for clarity</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </form>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="default"
                        loading={isLoading}
                        onClick={handleSubmit}
                        iconName="Save"
                        iconPosition="left"
                    >
                        {mode === 'create' ? 'Create Course' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CourseFormModal;