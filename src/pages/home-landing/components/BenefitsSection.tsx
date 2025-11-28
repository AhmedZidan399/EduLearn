import Icon from '../../../components/AppIcon';
import { Benefit } from '../types';

interface BenefitsSectionProps {
    benefits: Benefit[];
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
    return (
        <section className="py-16 sm:py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Why Choose EduLearn?
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Join thousands of learners who have transformed their careers with our comprehensive learning platform
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.id}
                            className="bg-card rounded-xl p-6 sm:p-8 elevation-sm hover:elevation-md transition-smooth group"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-smooth">
                                <Icon name={benefit.icon} size={28} className="text-primary" />
                            </div>

                            <h3 className="text-xl font-semibold text-card-foreground mb-3">
                                {benefit.title}
                            </h3>

                            <p className="text-text-secondary leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;