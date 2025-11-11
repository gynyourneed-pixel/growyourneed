import React from 'react';

interface AppContentProps {
  title: string;
  description?: string;
  icon?: React.FC<{className?: string}>;
}

const AppContent: React.FC<AppContentProps> = ({ title, description, icon: Icon }) => {
  return (
    <main className="flex-1 bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark flex items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        {Icon && <Icon className="w-16 h-16 text-gyn-text-secondary-light/30 dark:text-gyn-text-secondary-dark/30" />}
        <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{title}</h2>
        {description && (
          <p className="mt-2 text-lg text-gyn-text-primary-light dark:text-gyn-text-primary-dark max-w-md">{description || `Full functionality for ${title} will be implemented here.`}</p>
        )}
      </div>
    </main>
  );
};

export default AppContent;
