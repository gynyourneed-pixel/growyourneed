import React, { useState } from 'react';
import { ChevronRightIcon } from '../icons';
import Card from './Card';
import Toggle from './Toggle';

const PlatformControlsCard: React.FC<{ className?: string }> = ({ className }) => {
  const titleId = "platform-controls-card";
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  return (
    <Card className={className} ariaLabelledby={titleId}>
      <h3 id={titleId} className="text-sm font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-3 flex-shrink-0">PLATFORM CONTROLS</h3>
      <div className="flex-1 flex flex-col justify-center space-y-2">
        <button className="w-full flex justify-between items-center text-left p-3 rounded-lg bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark hover:bg-gyn-tan dark:hover:bg-gyn-bg-tertiary-light/10 transition-colors">
            <span className="font-semibold text-sm text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Manage Plans</span>
            <ChevronRightIcon className="w-5 h-5 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark"/>
        </button>
        <div 
            onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
            className="w-full flex justify-between items-center text-left p-3 rounded-lg bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark cursor-pointer transition-colors hover:bg-gyn-tan dark:hover:bg-gyn-bg-tertiary-light/10"
        >
             <span className="font-semibold text-sm text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Maintenance Mode</span>
             <Toggle checked={isMaintenanceMode} onChange={setIsMaintenanceMode} />
        </div>
        <button className="w-full flex justify-between items-center text-left p-3 rounded-lg bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark transition-colors">
            <span className="font-semibold text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Go to Settings</span>
            <ChevronRightIcon className="w-5 h-5 text-gyn-text-primary-light dark:text-gyn-text-primary-dark"/>
        </button>
      </div>
    </Card>
  );
};

export default PlatformControlsCard;