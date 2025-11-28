import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Course } from '../types';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    course: Course | null;
    isLoading?: boolean;
}

const DeleteConfirmationModal = ({
                                     isOpen,
                                     onClose,
                                     onConfirm,
                                     course,
                                     isLoading = false,
                                 }: DeleteConfirmationModalProps) => {
    if (!isOpen || !course) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-[1030] flex items-center justify-center p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div className="bg-card rounded-lg w-full max-w-md elevation-lg animate-scale-in">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full">
                            <Icon name="AlertTriangle" size={24} className="text-destructive" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-card-foreground">Delete Course</h2>
                            <p className="text-sm text-text-secondary">This action cannot be undone</p>
                        </div>
                    </div>

                    <div className="mb-6 p-4 bg-muted rounded-lg">
                        <p className="text-sm text-text-primary mb-2">
                            Are you sure you want to delete this course?
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                                <Icon name="BookOpen" size={20} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-text-primary truncate">{course.title}</p>
                                <p className="text-xs text-text-secondary">
                                    {course.enrollmentCount} students enrolled
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-2">
                            <Icon name="AlertCircle" size={18} className="text-destructive mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-destructive">
                                <p className="font-semibold mb-1">Warning</p>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>All course content will be permanently deleted</li>
                                    <li>Student enrollments will be removed</li>
                                    <li>Course progress data will be lost</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                            loading={isLoading}
                            iconName="Trash2"
                            iconPosition="left"
                            iconSize={18}
                            fullWidth
                        >
                            Delete Course
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;