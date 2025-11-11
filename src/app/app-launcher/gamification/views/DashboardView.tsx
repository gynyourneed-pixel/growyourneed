import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getKpis, getEngagementData } from '../../../api/gamification/api';
import { Kpi } from '../types';
import { useTheme } from '../../../../context/ThemeContext';
import { ChartBarIcon } from '../../../../icons';

interface EngagementData {
    name: string;
    engagement: number;
}

const DashboardView: React.FC = () => {
    const { theme } = useTheme();
    const [kpis, setKpis] = useState<Kpi[]>([]);
    const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [kpiData, engagementChartData] = await Promise.all([
                    getKpis(),
                    getEngagementData(),
                ]);
                setKpis(kpiData);
                setEngagementData(engagementChartData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const tickColor = theme === 'dark' ? 'rgb(209 213 219)' : 'rgb(74 74 74)';
    const gridColor = theme === 'dark' ? 'rgb(55 65 81)' : 'rgb(233 234 255)';
    const chartBarFill = theme === 'dark' ? 'rgb(245 166 35)' : 'rgb(48 65 199)';

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <ChartBarIcon className="w-12 h-12 text-gyn-text-primary-light dark:text-gyn-text-primary-dark animate-pulse" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-center text-gyn-text-error-light dark:text-gyn-text-error-dark">{error}</div>;
    }

    return (
        <div className="p-4 md:p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(kpi => (
                    <div key={kpi.title} className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md flex items-center gap-4">
                        <div className="p-3 bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark rounded-full">
                             <kpi.icon className="w-6 h-6 text-gyn-accent-light dark:text-gyn-accent-dark" />
                        </div>
                        <div>
                            <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{kpi.title}</p>
                            <p className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md h-96">
                <h3 className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-4">Weekly User Engagement</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
                        <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
                        <Tooltip 
                             contentStyle={{
                                backgroundColor: theme === 'dark' ? 'rgb(31 41 55)' : 'rgb(255 255 255)',
                                border: `1px solid ${gridColor}`,
                                borderRadius: '0.375rem',
                            }}
                        />
                        <Bar dataKey="engagement" fill={chartBarFill} name="Engagement" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardView;
