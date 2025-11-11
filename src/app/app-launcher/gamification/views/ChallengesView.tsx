import React from 'react';
import { mockChallenges } from '../data';
import { Challenge } from '../types';
import { FireIcon, CheckCircleIcon } from '../../../../icons';

const ChallengeItem: React.FC<{ challenge: Challenge }> = ({ challenge }) => (
    <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${challenge.isComplete ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark'}`}>
                {challenge.isComplete ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <FireIcon className="w-6 h-6 text-gyn-accent-light dark:text-gyn-accent-dark"/>}
            </div>
            <div>
                <p className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{challenge.title}</p>
                <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{challenge.description}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-gyn-accent-light dark:text-gyn-accent-dark">+{challenge.reward} pts</p>
        </div>
    </div>
);


const ChallengesView: React.FC = () => {
    const dailyChallenges = mockChallenges.filter(c => c.type === 'Daily');
    const weeklyChallenges = mockChallenges.filter(c => c.type === 'Weekly');

    return (
        <div className="p-4 md:p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Active Challenges</h2>

            <div>
                <h3 className="text-xl font-semibold mb-4 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Daily</h3>
                <div className="space-y-4">
                    {dailyChallenges.map(challenge => <ChallengeItem key={challenge.id} challenge={challenge} />)}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Weekly</h3>
                <div className="space-y-4">
                     {weeklyChallenges.map(challenge => <ChallengeItem key={challenge.id} challenge={challenge} />)}
                </div>
            </div>
        </div>
    );
};

export default ChallengesView;
