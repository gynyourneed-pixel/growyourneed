
import React from 'react';
import Card from './Card';

interface ActivityItem {
  icon: React.FC<{ className?: string }>;
  text: string;
  time: string;
}

interface RecentActivityCardProps {
  title: string;
  items: ActivityItem[];
  className?: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ title, items, className }) => {
  const titleId = `activity-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <Card className={className} ariaLabelledby={titleId}>
      <h3 id={titleId} className="text-sm font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-3 flex-shrink-0">{title.toUpperCase()}</h3>
      <div className="space-y-3 overflow-y-auto flex-1 min-h-0 pr-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark flex-shrink-0 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark font-medium">{item.text}</p>
              <p className="text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivityCard;
