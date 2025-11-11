// API logic for the Activities app will be defined here.
import React from 'react';
import { CalendarDaysIcon, UserGroupIcon, TreePineIcon } from '../../../icons';

export interface Activity {
    id: string;
    title: string;
    date: string;
    location: string;
    icon: React.FC<{className?: string}>;
}

const mockActivities: {[key: string]: Activity[]} = {
    community: [
        { id: 'act1', title: 'Community Farmers Market', date: '2024-08-10', location: 'Central Park', icon: CalendarDaysIcon },
        { id: 'act2', title: 'Neighborhood Watch Meeting', date: '2024-08-12', location: 'Community Hall', icon: UserGroupIcon },
    ],
    outdoor: [
        { id: 'act3', title: 'Group Hike', date: '2024-08-11', location: 'Mountain Trail', icon: TreePineIcon },
    ]
};

export const getActivities = async (category: string): Promise<Activity[]> => {
    console.log(`Fetching activities for category: ${category}`);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));
    return mockActivities[category] || [];
};