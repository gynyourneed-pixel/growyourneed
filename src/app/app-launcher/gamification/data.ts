import { Achievement, LeaderboardEntry, Challenge, Reward, Kpi } from './types';
import {
    StarIcon, FireIcon, PlusCircleIcon, HeartIcon, TrophyIcon, RocketLaunchIcon,
    GiftIcon
} from '../../../icons';

export const mockKpis: Kpi[] = [
    { title: 'Total Points Awarded', value: '1,250,800', icon: StarIcon },
    { title: 'Achievements Unlocked', value: '32,456', icon: TrophyIcon },
    { title: 'Active Challenges', value: '12', icon: FireIcon },
    { title: 'Rewards Redeemed', value: '4,120', icon: GiftIcon },
];

export const mockAchievements: Achievement[] = [
  { id: 'ach1', name: 'First Steps', description: 'Complete your profile.', points: 50, icon: StarIcon, unlocked: true },
  { id: 'ach2', name: 'Social Butterfly', description: 'Add 10 friends.', points: 100, icon: HeartIcon, unlocked: true },
  { id: 'ach3', name: 'Daily Streak', description: 'Log in 7 days in a row.', points: 200, icon: FireIcon, unlocked: false },
  { id: 'ach4', name: 'Creator', description: 'Post your first piece of content.', points: 150, icon: PlusCircleIcon, unlocked: true },
  { id: 'ach5', name: 'Master Collector', description: 'Unlock 20 achievements.', points: 500, icon: TrophyIcon, unlocked: false },
  { id: 'ach6', name: 'Pioneer', description: 'Join during the beta period.', points: 100, icon: RocketLaunchIcon, unlocked: true },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user: { name: 'Alex Ray', avatarUrl: 'https://i.pravatar.cc/40?u=alex' }, points: 15200 },
  { rank: 2, user: { name: 'Bethany Sia', avatarUrl: 'https://i.pravatar.cc/40?u=beth' }, points: 14850 },
  { rank: 3, user: { name: 'Charlie Day', avatarUrl: 'https://i.pravatar.cc/40?u=charlie' }, points: 13900 },
  { rank: 4, user: { name: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/40?u=diana' }, points: 12500 },
  { rank: 5, user: { name: 'Ethan Hunt', avatarUrl: 'https://i.pravatar.cc/40?u=ethan' }, points: 11800 },
];

export const mockChallenges: Challenge[] = [
    { id: 'ch1', title: 'Daily Login', description: 'Log in to the platform.', type: 'Daily', reward: 25, isComplete: true },
    { id: 'ch2', title: 'Engage!', description: 'Like or comment on 5 posts.', type: 'Daily', reward: 50, isComplete: false },
    { id: 'ch3', title: 'Weekly Contributor', description: 'Post 3 times this week.', type: 'Weekly', reward: 250, isComplete: false },
];

export const mockRewards: Reward[] = [
    { id: 'rew1', name: 'Exclusive Badge', description: 'A shiny badge for your profile.', cost: 500, imageUrl: 'https://picsum.photos/seed/badge/300/200' },
    { id: 'rew2', name: '$5 Gift Card', description: 'A gift card for our partner store.', cost: 2500, imageUrl: 'https://picsum.photos/seed/giftcard/300/200' },
    { id: 'rew3', name: 'Premium Avatar Frame', description: 'Make your avatar stand out.', cost: 1000, imageUrl: 'https://picsum.photos/seed/avatar_frame/300/200' },
    { id: 'rew4', name: '1-Month Subscription', description: 'Get premium access for one month.', cost: 5000, imageUrl: 'https://picsum.photos/seed/subscription/300/200' },
];
