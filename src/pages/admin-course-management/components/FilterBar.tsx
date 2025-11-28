import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { FilterOptions } from '../types';

interface FilterBarProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    onCreateNew: () => void;
    selectedCount: number;
    onBulkAction: (action: string) => void;
}

const FilterBar = ({
                       filters,
                       onFilterChange,
                       onCreateNew,
                       selectedCount,
                       onBulkAction,
                   }: FilterBarProps) => {
    const [showFilters, setShowFilters] = useState(false);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' },
    ];

    const categoryOptions = [
        { value: '', label: 'All Categories' },
        { value: 'programming', label: 'Programming' },
        { value: 'design', label: 'Design' },
        { value: 'business', label: 'Business' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'data-science', label: 'Data Science' },
    ];

    const bulkActionOptions = [
        { value: '', label: 'Bulk Actions' },
        { value: 'publish', label: 'Publish Selected' },
        { value: 'unpublish', label: 'Unpublish Selected' },
        { value: 'archive', label: 'Archive Selected' },
        { value: 'delete', label: 'Delete Selected' },
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, searchQuery: e.target.value });
    };

    const handleStatusChange = (value: string) => {
        onFilterChange({ ...filters, status: value as FilterOptions['status'] });
    };

    const handleCategoryChange = (value: string) => {
        onFilterChange({ ...filters, category: value });
    };

    const handleBulkActionChange = (value: string) => {
        if (value && selectedCount > 0) {
            onBulkAction(value);
        }
    };

    const handleClearFilters = () => {
        onFilterChange({
            status: 'all',
            category: '',
            searchQuery: '',
        });
    };

    const hasActiveFilters = filters.status !== 'all' || filters.category !== '' || filters.searchQuery !== '';

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        variant="default"
                        onClick={onCreateNew}
                        iconName="Plus"
                        iconPosition="left"
                        iconSize={18}
                    >
                        Create Course
                    </Button>

                    {selectedCount > 0 && (
                        <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {selectedCount} selected
              </span>
                            <Select
                                options={bulkActionOptions}
                                value=""
                                onChange={handleBulkActionChange}
                                className="w-40"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial sm:w-64">
                        <Icon
                            name="Search"
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                        />
                        <Input
                            type="search"
                            placeholder="Search courses..."
                            value={filters.searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10"
                        />
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowFilters(!showFilters)}
                        iconName="Filter"
                        iconSize={18}
                        aria-label="Toggle filters"
                        className={showFilters ? 'bg-primary text-primary-foreground' : ''}
                    />
                </div>
            </div>

            {showFilters && (
                <div className="p-4 bg-muted rounded-lg space-y-4 animate-scale-in">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary">Filters</h3>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearFilters}
                                iconName="X"
                                iconPosition="left"
                                iconSize={16}
                            >
                                Clear All
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            label="Status"
                            options={statusOptions}
                            value={filters.status}
                            onChange={handleStatusChange}
                        />

                        <Select
                            label="Category"
                            options={categoryOptions}
                            value={filters.category}
                            onChange={handleCategoryChange}
                        />
                    </div>

                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2">
                            {filters.status !== 'all' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Status: {filters.status}
                                    <button
                                        onClick={() => handleStatusChange('all')}
                                        className="hover:bg-primary/20 rounded-full p-0.5"
                                        aria-label="Remove status filter"
                                    >
                    <Icon name="X" size={14} />
                  </button>
                </span>
                            )}
                            {filters.category && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Category: {categoryOptions.find((c) => c.value === filters.category)?.label}
                                    <button
                                        onClick={() => handleCategoryChange('')}
                                        className="hover:bg-primary/20 rounded-full p-0.5"
                                        aria-label="Remove category filter"
                                    >
                    <Icon name="X" size={14} />
                  </button>
                </span>
                            )}
                            {filters.searchQuery && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Search: "{filters.searchQuery}"
                  <button
                      onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                      aria-label="Remove search filter"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterBar;