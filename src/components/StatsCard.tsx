
import React from 'react';
import Card from './Card';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  iconBgColor?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, iconBgColor = 'bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark', className }) => {
  const titleId = `stats-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <Card className={className} ariaLabelledby={titleId}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}>
            <Icon className="w-6 h-6 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        </div>
        <div className="flex flex-col">
          <h3 id={titleId} className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark font-semibold whitespace-nowrap">{title}</h3>
          <p className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
