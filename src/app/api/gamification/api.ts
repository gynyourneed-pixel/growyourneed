// API logic for the Gamification app will be defined here.
import { mockKpis, mockAchievements, mockLeaderboard, mockChallenges, mockRewards } from '../../app-launcher/gamification/data';
import { Kpi } from '../../app-launcher/gamification/types';

const engagementData = [
    { name: 'Mon', engagement: 4000 },
    { name: 'Tue', engagement: 3000 },
    { name: 'Wed', engagement: 5000 },
    { name: 'Thu', engagement: 4500 },
    { name: 'Fri', engagement: 6000 },
    { name: 'Sat', engagement: 5500 },
    { name: 'Sun', engagement: 7000 },
];

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getKpis = async (): Promise<Kpi[]> => {
    await delay(400);
    return mockKpis;
};

export const getEngagementData = async (): Promise<typeof engagementData> => {
    await delay(600);
    return engagementData;
}

export const getAchievements = async () => {
    await delay(300);
    return mockAchievements;
}

export const getLeaderboard = async () => {
    await delay(700);
    return mockLeaderboard;
}

export const getChallenges = async () => {
    await delay(200);
    return mockChallenges;
}

export const getRewards = async () => {
    await delay(500);
    return mockRewards;
}