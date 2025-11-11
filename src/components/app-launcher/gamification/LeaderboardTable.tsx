import React from 'react';
import { LeaderboardEntry } from '../../../app/app-launcher/gamification/types';

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                <thead className="text-xs text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark uppercase bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark">
                    <tr>
                        <th scope="col" className="px-6 py-3">Rank</th>
                        <th scope="col" className="px-6 py-3">User</th>
                        <th scope="col" className="px-6 py-3 text-right">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.rank} className="border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark hover:bg-gyn-bg-primary-light dark:hover:bg-gyn-bg-primary-dark">
                            <td className="px-6 py-4 font-bold text-lg text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{entry.rank}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={entry.user.avatarUrl} alt={entry.user.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-semibold">{entry.user.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-gyn-accent-light dark:text-gyn-accent-dark">{entry.points.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardTable;
