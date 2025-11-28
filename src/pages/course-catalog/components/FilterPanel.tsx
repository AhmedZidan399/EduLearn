import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { FilterOptions, CategoryOption, DifficultyOption } from '../types';

interface FilterPanelProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    categories: CategoryOption[];
    difficulties: DifficultyOption[];
    totalResults: number;
    isMobile?: boolean;
    onClose?: () => void;
}

const FilterPanel = ({
                         filters,
                         onFilterChange,
                         categories,
                         difficulties,
                         totalResults,
                         isMobile = false,
                         onClose,
                     }: FilterPanelProps) => {
    const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...localFilters, searchQuery: e.target.value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleCategoryChange = (value: string) => {
        const newFilters = { ...localFilters, category: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleDifficultyChange = (value: string) => {
        const newFilters = { ...localFilters, difficulty: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleSortChange = (value: string) => {
        const newFilters = {
            ...localFilters,
            sortBy: value as FilterOptions['sortBy'],
        };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleDurationChange = (min: number, max: number) => {
        const newFilters = {
            ...localFilters,
            minDuration: min,
            maxDuration: max,
        };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters: FilterOptions = {
            category: 'all',
            difficulty: 'all',
            minDuration: 0,
            maxDuration: 100,
            searchQuery: '',
            sortBy: 'relevance',
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const sortOptions = [
        { value: 'relevance', label: 'Most Relevant' },
        { value: 'popularity', label: 'Most Popular' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'newest', label: 'Newest First' },
    ];

    const durationRanges = [
        { min: 0, max: 2, label: 'Under 2 hours' },
        { min: 2, max: 5, label: '2-5 hours' },
        { min: 5, max: 10, label: '5-10 hours' },
        { min: 10, max: 100, label: '10+ hours' },
    ];

    return (
        <div className={`bg-card ${isMobile ? 'h-full overflow-y-auto' : ''}`}>
            {isMobile && (
                <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
                    <h2 className="text-lg font-bold text-card-foreground">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-muted transition-smooth"
                        aria-label="Close filters"
                    >
                        <Icon name="X" size={20} />
                    </button>
                </div>
            )}

            <div className={`space-y-6 ${isMobile ? 'p-4' : ''}`}>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">
                        {totalResults.toLocaleString()} courses found
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        iconName="RotateCcw"
                        iconPosition="left"
                        iconSize={14}
                    >
                        Reset
                    </Button>
                </div>

                <div className="space-y-4">
                    <Input
                        type="search"
                        placeholder="Search courses..."
                        value={localFilters.searchQuery}
                        onChange={handleSearchChange}
                        className="w-full"
                    />

                    <Select
                        label="Category"
                        options={categories.map((cat) => ({
                            value: cat.value,
                            label: `${cat.label} (${cat.count})`,
                        }))}
                        value={localFilters.category}
                        onChange={handleCategoryChange}
                    />

                    <Select
                        label="Difficulty Level"
                        options={difficulties.map((diff) => ({
                            value: diff.value,
                            label: diff.label,
                        }))}
                        value={localFilters.difficulty}
                        onChange={handleDifficultyChange}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                            Duration
                        </label>
                        <div className="space-y-2">
                            {durationRanges.map((range) => (
                                <button
                                    key={range.label}
                                    onClick={() => handleDurationChange(range.min, range.max)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth ${
                                        localFilters.minDuration === range.min &&
                                        localFilters.maxDuration === range.max
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-text-primary hover:bg-muted/80'
                                    }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Select
                        label="Sort By"
                        options={sortOptions}
                        value={localFilters.sortBy}
                        onChange={handleSortChange}
                    />
                </div>

                {isMobile && (
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        onClick={onClose}
                        iconName="Check"
                        iconPosition="left"
                    >
                        Apply Filters
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FilterPanel;