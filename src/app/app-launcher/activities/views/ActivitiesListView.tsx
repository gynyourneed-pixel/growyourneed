import React, { useState, useEffect } from 'react';
import { Activity, getActivities } from '../../../api/activities/api';
import { CalendarDaysIcon, ChartBarIcon } from '../../../../icons';

interface ActivitiesListViewProps {
    category: string;
    categoryLabel: string;
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark flex-shrink-0">
            <activity.icon className="w-6 h-6 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        </div>
        <div>
            <p className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{activity.title}</p>
            <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{activity.location}</p>
            <p className="text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70 mt-1">
                {new Date(activity.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>
    </div>
);

const ActivitiesListView: React.FC<ActivitiesListViewProps> = ({ category, categoryLabel }) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!category) return;

        const loadActivities = async () => {
            try {
                setLoading(true);
                const data = await getActivities(category);
                setActivities(data);
                setError(null);
            } catch (err) {
                setError('Failed to load activities.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadActivities();
    }, [category]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <ChartBarIcon className="w-12 h-12 text-gyn-text-primary-light dark:text-gyn-text-primary-dark animate-pulse" />
            </div>
        );
    }
    
    if (error) {
        return <div className="flex-1 p-8 text-center text-gyn-text-error-light dark:text-gyn-text-error-dark">{error}</div>;
    }

    return (
        <main className="flex-1 bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark p-4 md:p-8 overflow-y-auto">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">{categoryLabel}</h2>
            
            {activities.length > 0 ? (
                <div className="space-y-4">
                    {activities.map(activity => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg">
                    <CalendarDaysIcon className="w-16 h-16 mx-auto text-gyn-text-primary-light/30 dark:text-gyn-text-primary-dark/30 mb-4" />
                    <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">No activities found</p>
                    <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark mt-1">There are currently no activities scheduled in this category.</p>
                </div>
            )}
        </main>
    );
};

export default ActivitiesListView;
