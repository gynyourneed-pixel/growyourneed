import React from 'react';
import { Review } from '../../../app/app-launcher/travel-transport/types';
import { StarIcon } from '../../../icons';

interface ReviewsSectionProps {
    reviews: Review[];
    averageRating: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, averageRating }) => {
    if (!reviews || reviews.length === 0) {
        return <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">No reviews yet.</p>;
    }
    
    const filledStars = Math.round(averageRating);
    const emptyStars = 5 - filledStars;

    return (
        <div className="space-y-6">
             <h3 className="text-xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Guest Reviews</h3>
            <div className="flex items-center gap-2">
                 <div className="text-3xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">{averageRating.toFixed(1)}</div>
                 <div>
                    <div className="flex">
                        {/* FIX: Wrap StarIcon in a span to provide a valid element for the key prop, resolving a TypeScript error. */}
                        {[...Array(filledStars)].map((_, i) => <span key={`filled-${i}`}><StarIcon className="w-5 h-5 text-amber-400 fill-current" /></span>)}
                        {/* FIX: Wrap StarIcon in a span to provide a valid element for the key prop, resolving a TypeScript error. */}
                        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`}><StarIcon className="w-5 h-5 text-gyn-text-primary-light/50 dark:text-gyn-text-primary-dark/50" /></span>)}
                    </div>
                    <p className="text-xs text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Based on {reviews.length} reviews</p>
                 </div>
            </div>

            <div className="space-y-4">
                {reviews.map(review => (
                    <div key={review.id} className="bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark p-4 rounded-lg border border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{review.author}</p>
                                <p className="text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400">
                                <span className="font-bold">{review.rating}</span>
                                <StarIcon className="w-4 h-4 fill-current"/>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSection;