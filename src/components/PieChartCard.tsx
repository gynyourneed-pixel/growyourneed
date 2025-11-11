
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { useTheme } from '../context/ThemeContext';

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  className?: string;
}

const PieChartCard: React.FC<PieChartCardProps> = ({ title, data, className }) => {
  const { theme } = useTheme();
  const titleId = `pie-chart-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  const COLORS = theme === 'dark' 
    ? ['#4b5563', '#6b21a8', '#f5a623', '#374151']
    : ['#1d2a78', '#3041c7', '#f5a623', '#fde8c5'];
    
  const tooltipBg = theme === 'dark' ? 'rgb(31 41 55)' : 'rgb(255 255 255)';
  const tooltipBorder = theme === 'dark' ? 'rgb(55 65 81)' : 'rgb(233 234 255)';
  const textColor = theme === 'dark' ? 'rgb(209 213 219)' : 'rgb(74 74 74)';


  return (
    <Card className={className} ariaLabelledby={titleId}>
      <h3 id={titleId} className="text-sm font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-2 text-center">{title.toUpperCase()}</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                 contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: '0.375rem',
                    color: textColor
                }}
            />
            <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', lineHeight: '1.5', color: textColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PieChartCard;