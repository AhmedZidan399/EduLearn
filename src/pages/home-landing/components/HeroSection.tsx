import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { HeroContent } from '../types';

interface HeroSectionProps {
    content: HeroContent;
    onGetStarted: () => void;
}

const HeroSection = ({ content, onGetStarted }: HeroSectionProps) => {
    return (
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                            <Icon name="Award" size={18} className="text-primary" />
                            <span className="text-sm font-medium text-primary">
                {content.subtitle}
              </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                            {content.title}
                        </h1>

                        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl">
                            {content.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="default"
                                size="lg"
                                onClick={onGetStarted}
                                iconName="ArrowRight"
                                iconPosition="right"
                                className="w-full sm:w-auto"
                            >
                                {content.primaryCTA}
                            </Button>

                            <Link to="/course-catalog" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    iconName="BookOpen"
                                    iconPosition="left"
                                    fullWidth
                                >
                                    {content.secondaryCTA}
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <Icon name="Users" size={20} className="text-primary" />
                                <span className="text-sm text-text-secondary">
                  50,000+ Active Students
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Icon name="Star" size={20} className="text-accent" />
                                <span className="text-sm text-text-secondary">
                  4.8 Average Rating
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden elevation-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-4 p-8">
                                    {[
                                        { icon: 'GraduationCap', label: 'Expert Instructors', color: 'text-primary' },
                                        { icon: 'Award', label: 'Certificates', color: 'text-accent' },
                                        { icon: 'TrendingUp', label: 'Progress Tracking', color: 'text-success' },
                                        { icon: 'Clock', label: 'Flexible Learning', color: 'text-secondary' },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-card rounded-xl p-6 elevation-md hover:elevation-lg transition-smooth"
                                        >
                                            <Icon name={item.icon} size={32} className={item.color} />
                                            <p className="mt-3 text-sm font-medium text-card-foreground">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;