import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { CourseFilterStatus, CourseSortOption } from '../types';

interface CourseFiltersProps {
    filterStatus: CourseFilterStatus;
    sortOption: CourseSortOption;
    onFilterChange: (status: CourseFilterStatus) => void;
    onSortChange: (option: CourseSortOption) => void;
    totalCourses: number;
    filteredCount: number;
}

const CourseFilters = ({
                           filterStatus,
                           sortOption,
                           onFilterChange,
                           onSortChange,
                           totalCourses,
                           filteredCount,
                       }: CourseFiltersProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const statusOptions = [
        { value: 'all', label: 'All Courses' },
        { value: 'not-started', label: 'Not Started' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
    ];

    const sortOptions = [
        { value: 'enrollment-date', label: 'Enrollment Date' },
        { value: 'progress', label: 'Progress' },
        { value: 'last-accessed', label: 'Last Accessed' },
        { value: 'title', label: 'Title (A-Z)' },
    ];

    return (
        <div className="bg-card rounded-lg border border-border p-4 elevation-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Icon
                            name="Search"
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            type="text"
                            placeholder="Search your courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Select
                        options={statusOptions}
                        value={filterStatus}
                        onChange={(value) => onFilterChange(value as CourseFilterStatus)}
                        placeholder="Filter by status"
                        className="w-full sm:w-48"
                    />

                    <Select
                        options={sortOptions}
                        value={sortOption}
                        onChange={(value) => onSortChange(value as CourseSortOption)}
                        placeholder="Sort by"
                        className="w-full sm:w-48"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-card-foreground">{filteredCount}</span> of{' '}
                    <span className="font-medium text-card-foreground">{totalCourses}</span> courses
                </p>

                {filterStatus !== 'all' && (
                    <button
                        onClick={() => onFilterChange('all')}
                        className="text-sm font-medium text-primary hover:underline transition-smooth flex items-center gap-1.5"
                    >
                        <Icon name="X" size={14} />
                        <span>Clear Filter</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default CourseFilters;