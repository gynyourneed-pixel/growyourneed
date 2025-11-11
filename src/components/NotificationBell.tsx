
import React from 'react';
import { BellIcon } from '../icons';

interface NotificationBellProps {
  onClick?: () => void;
  size?: 'small' | 'medium';
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick, size = 'medium' }) => {
  const sizeClasses = {
    small: {
      button: 'w-9 h-9',
      icon: 'w-5 h-5',
    },
    medium: {
      button: 'w-10 h-10',
      icon: 'w-6 h-6',
    },
  }[size];
  
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center rounded-md border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark ${sizeClasses.button}`}
    >
      <BellIcon className={sizeClasses.icon} />
    </button>
  );
};

export default NotificationBell;
