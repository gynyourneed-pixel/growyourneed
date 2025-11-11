import React from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.FC<{ className?: string }>;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatarUrl: string;
  };
  points: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'Daily' | 'Weekly' | 'Special';
  reward: number; // Points
  isComplete: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number; // Points
  imageUrl: string;
}

export interface Kpi {
    title: string;
    value: string;
    icon: React.FC<{ className?: string }>;
}
