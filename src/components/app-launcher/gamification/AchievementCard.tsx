import React from 'react';
import { Achievement } from '../../../app/app-launcher/gamification/types';
import { LockClosedIcon } from '../../../icons';

interface AchievementCardProps {
    achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
    return (
        <div className={`p-4 rounded-lg shadow-md flex items-center gap-4 transition-all duration-300 ${achievement.unlocked ? 'bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark' : 'bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark'}`}>
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${achievement.unlocked ? 'bg-gyn-accent-light/20 dark:bg-gyn-accent-dark/20' : 'bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark'}`}>
                <achievement.icon className={`w-8 h-8 ${achievement.unlocked ? 'text-gyn-accent-light dark:text-gyn-accent-dark' : 'text-gyn-text-primary-light/50 dark:text-gyn-text-primary-dark/50'}`} />
                {!achievement.unlocked && <LockClosedIcon className="absolute w-5 h-5 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />}
            </div>
            <div className="flex-1">
                <p className={`font-bold ${achievement.unlocked ? 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark' : 'text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70'}`}>{achievement.name}</p>
                <p className={`text-sm ${achievement.unlocked ? 'text-gyn-text-primary-light dark:text-gyn-text-primary-dark' : 'text-gyn-text-primary-light/50 dark:text-gyn-text-primary-dark/50'}`}>{achievement.description}</p>
            </div>
            <div className={`font-bold text-lg text-right ${achievement.unlocked ? 'text-gyn-accent-light dark:text-gyn-accent-dark' : 'text-gyn-text-primary-light/50 dark:text-gyn-text-primary-dark/50'}`}>
                {achievement.points} pts
            </div>
        </div>
    );
};

export default AchievementCard;
