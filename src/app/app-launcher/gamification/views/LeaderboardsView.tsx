import React from 'react';
import { mockLeaderboard } from '../data';
import LeaderboardTable from '../../../../components/app-launcher/gamification/LeaderboardTable';

const LeaderboardsView: React.FC = () => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">Global Leaderboard</h2>
            <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md">
                <LeaderboardTable entries={mockLeaderboard} />
            </div>
        </div>
    );
};

export default LeaderboardsView;
