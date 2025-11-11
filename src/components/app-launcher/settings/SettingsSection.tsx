import React from 'react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 sm:p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{title}</h3>
      {description && <p className="text-sm text-gyn-text-primary-light/80 dark:text-gyn-text-primary-dark/80 mt-1 mb-4">{description}</p>}
      <div className="mt-4 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
