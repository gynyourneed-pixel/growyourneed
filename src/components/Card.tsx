
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  ariaLabelledby?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-4', ariaLabelledby }) => {
  return (
    <div 
      className={`bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-md shadow-sm border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark flex flex-col h-full ${padding} ${className}`}
      role="region"
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
};

export default Card;
