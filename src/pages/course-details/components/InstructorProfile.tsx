import { Instructor } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

interface InstructorProfileProps {
    instructor: Instructor;
}

const InstructorProfile = ({ instructor }: InstructorProfileProps) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-card-foreground">About the Instructor</h2>

            <div className="bg-background border border-border rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <Image
                            src={instructor.avatar}
                            alt={instructor.avatarAlt}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-xl font-bold text-card-foreground">{instructor.name}</h3>
                            <p className="text-text-secondary">{instructor.title}</p>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <Icon name="Star" size={18} className="text-accent fill-accent" />
                                <span className="font-semibold text-card-foreground">{instructor.rating}</span>
                                <span className="text-text-secondary">Instructor Rating</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Icon name="Users" size={18} className="text-primary" />
                                <span className="font-semibold text-card-foreground">
                  {instructor.totalStudents.toLocaleString()}
                </span>
                                <span className="text-text-secondary">Students</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Icon name="BookOpen" size={18} className="text-primary" />
                                <span className="font-semibold text-card-foreground">{instructor.totalCourses}</span>
                                <span className="text-text-secondary">Courses</span>
                            </div>
                        </div>

                        <p className="text-text-secondary leading-relaxed">{instructor.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;