import { useState } from 'react';
import { Review } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface CourseReviewsProps {
    reviews: Review[];
    averageRating: number;
    totalRatings: number;
}

const CourseReviews = ({ reviews, averageRating, totalRatings }: CourseReviewsProps) => {
    const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

    const toggleHelpful = (reviewId: string) => {
        setHelpfulReviews((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(reviewId)) {
                newSet.delete(reviewId);
            } else {
                newSet.add(reviewId);
            }
            return newSet;
        });
    };

    const getRatingDistribution = () => {
        const distribution = [0, 0, 0, 0, 0];
        reviews.forEach((review) => {
            distribution[5 - review.rating]++;
        });
        return distribution.map((count) => ({
            count,
            percentage: (count / reviews.length) * 100,
        }));
    };

    const ratingDistribution = getRatingDistribution();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 60) return '1 month ago';
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-card-foreground">Student Reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background border border-border rounded-lg p-6 text-center">
                    <div className="space-y-2">
                        <div className="text-5xl font-bold text-card-foreground">{averageRating}</div>
                        <div className="flex items-center justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon
                                    key={star}
                                    name="Star"
                                    size={20}
                                    className={`${
                                        star <= Math.round(averageRating)
                                            ? 'text-accent fill-accent' :'text-muted-foreground'
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-text-secondary">{totalRatings.toLocaleString()} ratings</p>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                    {ratingDistribution.map((dist, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-20">
                                <span className="text-sm font-medium text-card-foreground">{5 - index}</span>
                                <Icon name="Star" size={14} className="text-accent fill-accent" />
                            </div>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-300"
                                    style={{ width: `${dist.percentage}%` }}
                                />
                            </div>
                            <span className="text-sm text-text-secondary w-12 text-right">{dist.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-background border border-border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <Image
                                src={review.userAvatar}
                                alt={review.userAvatarAlt}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />

                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h4 className="font-semibold text-card-foreground">{review.userName}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Icon
                                                        key={star}
                                                        name="Star"
                                                        size={14}
                                                        className={`${
                                                            star <= review.rating
                                                                ? 'text-accent fill-accent' :'text-muted-foreground'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-text-secondary">
                        {formatDate(review.date)}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-text-secondary leading-relaxed">{review.comment}</p>

                                <div className="flex items-center gap-4 pt-2">
                                    <button
                                        onClick={() => toggleHelpful(review.id)}
                                        className={`flex items-center gap-2 text-sm transition-smooth ${
                                            helpfulReviews.has(review.id)
                                                ? 'text-primary' :'text-text-secondary hover:text-primary'
                                        }`}
                                    >
                                        <Icon
                                            name="ThumbsUp"
                                            size={16}
                                            className={helpfulReviews.has(review.id) ? 'fill-primary' : ''}
                                        />
                                        <span>
                      Helpful ({review.helpfulCount + (helpfulReviews.has(review.id) ? 1 : 0)})
                    </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Button variant="outline" size="default" iconName="ChevronDown" iconPosition="right">
                    Load More Reviews
                </Button>
            </div>
        </div>
    );
};

export default CourseReviews;