import React from 'react';
import { StarIcon, GiftIcon } from '../../../../icons';

const LoyaltyView: React.FC = () => {
    const rewards = [
        { id: 1, title: 'Free Hotel Night', points: 5000 },
        { id: 2, title: '$50 Flight Voucher', points: 2500 },
        { id: 3, title: 'Free Car Rental Upgrade', points: 1500 },
        { id: 4, title: 'Complimentary Breakfast', points: 1000 },
    ];

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">Loyalty Program</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Your Status</h3>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gyn-accent-light/20 dark:bg-gyn-accent-dark/20 rounded-full">
                            <StarIcon className="w-8 h-8 text-gyn-accent-light dark:text-gyn-accent-dark"/>
                        </div>
                        <div>
                             <p className="text-2xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">Gold Member</p>
                             <p className="text-sm">2,350 Points</p>
                        </div>
                    </div>
                </div>

                 <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Next Reward</h3>
                    <p>You are <span className="font-bold text-gyn-accent-light dark:text-gyn-accent-dark">150 points</span> away from a $50 Flight Voucher!</p>
                     <div className="w-full bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark rounded-full h-2.5 mt-2">
                        <div className="bg-gyn-accent-light dark:bg-gyn-accent-dark h-2.5 rounded-full" style={{width: `${(2350/2500)*100}%`}}></div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                 <h3 className="text-xl font-bold mb-4">Available Rewards</h3>
                 <div className="space-y-3">
                    {rewards.map(reward => (
                        <div key={reward.id} className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <GiftIcon className="w-6 h-6 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
                                <span className="font-semibold">{reward.title}</span>
                            </div>
                            <span className="font-bold text-gyn-accent-light dark:text-gyn-accent-dark">{reward.points.toLocaleString()} pts</span>
                        </div>
                    ))}
                 </div>
            </div>

        </div>
    );
};

export default LoyaltyView;