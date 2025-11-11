import React from 'react';
import { mockAchievements } from '../data';
import AchievementCard from '../../../../components/app-launcher/gamification/AchievementCard';

const AchievementsView: React.FC = () => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">All Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
        </div>
    );
};

export default AchievementsView;
