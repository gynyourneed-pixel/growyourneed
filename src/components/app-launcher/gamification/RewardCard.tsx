import React from 'react';
import { Reward } from '../../../app/app-launcher/gamification/types';

interface RewardCardProps {
    reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
    return (
        <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={reward.imageUrl} alt={reward.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{reward.name}</h4>
                <p className="text-xs text-gyn-text-primary-light dark:text-gyn-text-primary-dark mt-1 flex-1">{reward.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-gyn-accent-light dark:text-gyn-accent-dark">{reward.cost.toLocaleString()} pts</span>
                    <button className="px-4 py-1 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark text-sm font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors">
                        Redeem
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RewardCard;
