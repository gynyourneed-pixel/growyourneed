import React from 'react';
import { mockRewards } from '../data';
import RewardCard from '../../../../components/app-launcher/gamification/RewardCard';

const RewardStoreView: React.FC = () => {
    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Reward Store</h2>
                <div className="text-right">
                    <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Your Points</p>
                    <p className="text-2xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">15,200</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockRewards.map(reward => (
                    <RewardCard key={reward.id} reward={reward} />
                ))}
            </div>
        </div>
    );
};

export default RewardStoreView;
