import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface CTASectionProps {
    onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
    return (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
                        Ready to Start Your Learning Journey?
                    </h2>

                    <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                        Join thousands of students already learning on EduLearn. Get access to expert-led courses and start building your future today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={onGetStarted}
                            iconName="Rocket"
                            iconPosition="left"
                            className="w-full sm:w-auto"
                        >
                            Get Started Free
                        </Button>

                        <Link to="/course-catalog" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="Search"
                                iconPosition="left"
                                fullWidth
                                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                            >
                                Explore Courses
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                        <div className="flex items-center gap-2 text-primary-foreground/90">
                            <Icon name="Check" size={20} />
                            <span className="text-sm">No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-foreground/90">
                            <Icon name="Check" size={20} />
                            <span className="text-sm">Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-foreground/90">
                            <Icon name="Check" size={20} />
                            <span className="text-sm">30-day money-back guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;