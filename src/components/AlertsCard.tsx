
import React from 'react';
import Card from './Card';
import { useTheme } from '../context/ThemeContext';

const alerts = [
  { type: 'error', text: 'High API Error Rate Detected (5.2%)', emoji: '🔴' },
  { type: 'warning', text: 'Payment Gateway Connection Issue', emoji: '🟡' },
  { type: 'info', text: '3 High-Priority Support Escalations', emoji: '🔵' },
  { type: 'info', text: 'New platform update available', emoji: '🔵' },
];

const AlertItem: React.FC<{ alert: typeof alerts[0] }> = ({ alert }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const styles = {
        error: { 
            bg: `bg-gyn-bg-error-light dark:bg-gyn-bg-error-dark ${isDark ? 'bg-opacity-30' : ''}`, 
            border: 'border-gyn-border-error-light dark:border-gyn-border-error-dark', 
            text: 'text-gyn-text-error-light dark:text-gyn-text-error-dark'
        },
        warning: { 
            bg: `bg-gyn-bg-warning-light dark:bg-gyn-bg-warning-dark ${isDark ? 'bg-opacity-30' : ''}`, 
            border: 'border-gyn-border-warning-light dark:border-gyn-border-warning-dark', 
            text: 'text-gyn-text-warning-light dark:text-gyn-text-warning-dark'
        },
        info: { 
            bg: 'bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark', 
            border: 'border-gyn-border-primary-light dark:border-gyn-border-primary-dark', 
            text: 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark'
        },
    }[alert.type];

    return (
        <div className={`p-2 rounded-md ${styles.bg} border-l-4 ${styles.border} flex items-start gap-3`}>
            <span className="text-md flex-shrink-0 pt-0.5">{alert.emoji}</span>
            <p className={`text-sm ${styles.text} font-semibold flex-1`}>{alert.text}</p>
        </div>
    );
}

const AlertsCard: React.FC<{className?: string}> = ({className}) => {
  return (
    <Card className={className}>
      <h3 className="text-sm font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-3 flex-shrink-0">ACTIONABLE ALERTS</h3>
      <div className="space-y-2 overflow-y-auto flex-1 min-h-0 pr-2">
        {alerts.map((alert, index) => (
            <AlertItem key={index} alert={alert}/>
        ))}
      </div>
    </Card>
  );
};

export default AlertsCard;
