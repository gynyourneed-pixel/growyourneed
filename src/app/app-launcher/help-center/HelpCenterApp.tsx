import React from 'react';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { HelpIcon } from '../../../icons';

const HelpCenterApp: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex items-center justify-center">
          <AppContent 
            title="Help Center"
            description="Comprehensive access to documentation, support tickets, FAQs, and user assistance."
            icon={HelpIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default HelpCenterApp;
