
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { useTheme } from '../context/ThemeContext';

interface ChartCardProps {
  title: string;
  data: any[];
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data, className }) => {
  const { theme } = useTheme();
  const titleId = `chart-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  const tickColor = theme === 'dark' ? 'rgb(209 213 219)' : 'rgb(74 74 74)';
  const gridColor = theme === 'dark' ? 'rgb(55 65 81)' : 'rgb(233 234 255)';
  const tooltipBg = theme === 'dark' ? 'rgb(31 41 55)' : 'rgb(255 255 255)';

  return (
    <Card padding="p-4 pr-8" className={className} ariaLabelledby={titleId}>
      <h3 id={titleId} className="text-sm font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-4 pl-8">{title.toUpperCase()}</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
            <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${gridColor}`,
                borderRadius: '0.375rem',
                color: tickColor
              }}
            />
            <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
            <Bar dataKey="revenue" fill="rgb(48 65 199)" name="Revenue" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ChartCard;
