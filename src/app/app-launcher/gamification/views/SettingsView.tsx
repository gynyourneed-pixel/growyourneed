import React from 'react';
import Toggle from '../../../../components/Toggle';

const SettingsView: React.FC = () => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">Gamification Settings</h2>
            
            <div className="max-w-2xl space-y-6">
                <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg mb-2">Notifications</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label htmlFor="notif-achievement">Achievement Unlocked</label>
                            <Toggle checked={true} onChange={() => {}} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="notif-challenge">New Challenge Available</label>
                            <Toggle checked={true} onChange={() => {}} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="notif-leaderboard">Leaderboard Updates</label>
                            <Toggle checked={false} onChange={() => {}} />
                        </div>
                    </div>
                </div>

                 <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg mb-2">Rules Engine</h3>
                    <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                        Configure point values and triggers for user actions. (This area is for admin configuration and is currently a placeholder).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
