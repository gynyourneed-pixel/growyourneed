
import React from 'react';
import { REPORTS_DATA } from '../lib/data';
import Card from './Card';
import { Report } from '../types';

interface ReportsViewProps {
    onSelectReport: (report: Report) => void;
}

const ReportCard: React.FC<{ report: Report, onSelect: () => void }> = ({ report, onSelect }) => (
    <Card className="transform transition-transform duration-300 hover:-translate-y-2">
        <div className="flex flex-col items-start gap-2 mb-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark flex-shrink-0">
                <report.icon className="w-7 h-7 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
            </div>
            <h3 className="text-md font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{report.title}</h3>
        </div>
        <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark flex-1 mb-4">
            {report.description}
        </p>
        <button 
            onClick={onSelect}
            className="w-full mt-auto py-2 px-4 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors"
        >
            View Report
        </button>
    </Card>
);

const ReportsView: React.FC<ReportsViewProps> = ({ onSelectReport }) => {
  return (
    <div 
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-full"
        role="region"
        aria-label="Available Reports"
    >
        {REPORTS_DATA.map(report => (
            <ReportCard 
                key={report.id}
                report={report}
                onSelect={() => onSelectReport(report)}
            />
        ))}
    </div>
  );
};

export default ReportsView;