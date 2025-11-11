
import React from 'react';
import Card from './Card';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  subValue?: string;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, subValue, className }) => {
  const changeColor = {
    positive: 'text-gyn-text-positive-light dark:text-gyn-text-positive-dark',
    negative: 'text-gyn-text-negative-light dark:text-gyn-text-negative-dark',
  }[changeType || 'positive'];

  return (
    <Card className={className} padding="p-4">
      <div>
        <h3 className="text-sm text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark font-bold truncate">{title.toUpperCase()}</h3>
      </div>
      <div className="flex-1 flex flex-col justify-center my-2">
        <p className="text-4xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark leading-tight">{value}</p>
        {subValue && (
            <p className="text-xs text-gyn-text-primary-light dark:text-gyn-text-primary-dark mt-1">{subValue}</p>
        )}
      </div>
      {change && (
        <div className="mt-auto">
            <p className={`text-sm font-bold ${changeColor}`}>
                {changeType === 'positive' ? '▲' : '▼'} {change}
            </p>
        </div>
      )}
    </Card>
  );
};

export default KpiCard;