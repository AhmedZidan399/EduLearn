import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Course, SortConfig } from '../types';

interface CourseTableProps {
    courses: Course[];
    selectedCourses: string[];
    onSelectCourse: (courseId: string) => void;
    onSelectAll: () => void;
    onEdit: (course: Course) => void;
    onDuplicate: (course: Course) => void;
    onToggleStatus: (course: Course) => void;
    onDelete: (course: Course) => void;
    sortConfig: SortConfig;
    onSort: (key: keyof Course) => void;
}

const CourseTable = ({
                         courses,
                         selectedCourses,
                         onSelectCourse,
                         onSelectAll,
                         onEdit,
                         onDuplicate,
                         onToggleStatus,
                         onDelete,
                         sortConfig,
                         onSort,
                     }: CourseTableProps) => {
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

    const getStatusColor = (status: Course['status']) => {
        switch (status) {
            case 'published':
                return 'bg-success/10 text-success';
            case 'draft':
                return 'bg-warning/10 text-warning';
            case 'archived':
                return 'bg-secondary/10 text-secondary';
            default:
                return 'bg-muted text-text-secondary';
        }
    };

    const getSortIcon = (key: keyof Course) => {
        if (sortConfig.key !== key) {
            return <Icon name="ArrowUpDown" size={16} className="opacity-50" />;
        }
        return sortConfig.direction === 'asc' ? (
            <Icon name="ArrowUp" size={16} />
        ) : (
            <Icon name="ArrowDown" size={16} />
        );
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const toggleExpand = (courseId: string) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                    <tr>
                        <th className="px-4 py-3 text-left">
                            <input
                                type="checkbox"
                                checked={selectedCourses.length === courses.length && courses.length > 0}
                                onChange={onSelectAll}
                                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                                aria-label="Select all courses"
                            />
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => onSort('title')}
                                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-smooth"
                            >
                                Course Title
                                {getSortIcon('title')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => onSort('instructor')}
                                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-smooth"
                            >
                                Instructor
                                {getSortIcon('instructor')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => onSort('enrollmentCount')}
                                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-smooth"
                            >
                                Enrollments
                                {getSortIcon('enrollmentCount')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => onSort('status')}
                                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-smooth"
                            >
                                Status
                                {getSortIcon('status')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => onSort('createdAt')}
                                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-smooth"
                            >
                                Created
                                {getSortIcon('createdAt')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-right">
                            <span className="text-sm font-semibold text-text-primary">Actions</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                    {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-muted/50 transition-smooth">
                            <td className="px-4 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedCourses.includes(course.id)}
                                    onChange={() => onSelectCourse(course.id)}
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                                    aria-label={`Select ${course.title}`}
                                />
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={course.thumbnail}
                                        alt={course.thumbnailAlt}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-text-primary">{course.title}</p>
                                        <p className="text-xs text-text-secondary">{course.category}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <p className="text-sm text-text-primary">{course.instructor}</p>
                            </td>
                            <td className="px-4 py-4">
                                <p className="text-sm font-medium text-text-primary">{course.enrollmentCount}</p>
                            </td>
                            <td className="px-4 py-4">
                  <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}
                  >
                    {course.status}
                  </span>
                            </td>
                            <td className="px-4 py-4">
                                <p className="text-sm text-text-secondary">{formatDate(course.createdAt)}</p>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(course)}
                                        iconName="Edit"
                                        iconSize={18}
                                        aria-label="Edit course"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDuplicate(course)}
                                        iconName="Copy"
                                        iconSize={18}
                                        aria-label="Duplicate course"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onToggleStatus(course)}
                                        iconName={course.status === 'published' ? 'EyeOff' : 'Eye'}
                                        iconSize={18}
                                        aria-label={course.status === 'published' ? 'Unpublish course' : 'Publish course'}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(course)}
                                        iconName="Trash2"
                                        iconSize={18}
                                        className="text-destructive hover:text-destructive"
                                        aria-label="Delete course"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {courses.map((course) => (
                    <div key={course.id} className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start gap-3 mb-3">
                                <input
                                    type="checkbox"
                                    checked={selectedCourses.includes(course.id)}
                                    onChange={() => onSelectCourse(course.id)}
                                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                                    aria-label={`Select ${course.title}`}
                                />
                                <Image
                                    src={course.thumbnail}
                                    alt={course.thumbnailAlt}
                                    className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-text-primary mb-1 truncate">{course.title}</h3>
                                    <p className="text-xs text-text-secondary mb-2">{course.category}</p>
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}
                                    >
                    {course.status}
                  </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                                <div>
                                    <p className="text-text-secondary text-xs mb-1">Instructor</p>
                                    <p className="text-text-primary font-medium">{course.instructor}</p>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs mb-1">Enrollments</p>
                                    <p className="text-text-primary font-medium">{course.enrollmentCount}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleExpand(course.id)}
                                className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
                            >
                                {expandedCourse === course.id ? 'Hide Details' : 'Show Details'}
                                <Icon
                                    name="ChevronDown"
                                    size={16}
                                    className={`transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {expandedCourse === course.id && (
                                <div className="mb-3 p-3 bg-muted rounded-md space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Created:</span>
                                        <span className="text-text-primary">{formatDate(course.createdAt)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Level:</span>
                                        <span className="text-text-primary capitalize">{course.level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Duration:</span>
                                        <span className="text-text-primary">{course.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Lessons:</span>
                                        <span className="text-text-primary">{course.lessons.length}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(course)}
                                    iconName="Edit"
                                    iconPosition="left"
                                    iconSize={16}
                                    fullWidth
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDuplicate(course)}
                                    iconName="Copy"
                                    iconSize={18}
                                    aria-label="Duplicate course"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onToggleStatus(course)}
                                    iconName={course.status === 'published' ? 'EyeOff' : 'Eye'}
                                    iconSize={18}
                                    aria-label={course.status === 'published' ? 'Unpublish course' : 'Publish course'}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(course)}
                                    iconName="Trash2"
                                    iconSize={18}
                                    className="text-destructive hover:text-destructive"
                                    aria-label="Delete course"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CourseTable;