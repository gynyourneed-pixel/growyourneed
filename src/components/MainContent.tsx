
import React, { useState } from 'react';
import { RightNavItemId, Report } from '../types';
import ChartCard from './ChartCard';
import PieChartCard from './PieChartCard';
import StatsCard from './StatsCard';
import RecentActivityCard from './RecentActivityCard';
import ReportsView from './ReportsView';
import ReportModal from './ReportModal';
import { UserIcon, BanknotesIcon, UserGroupIcon, CubeIcon } from '../icons';


const barChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const pieChartData = [
  { name: 'Grade 9', value: 400 },
  { name: 'Grade 10', value: 300 },
  { name: 'Grade 11', value: 300 },
  { name: 'Grade 12', value: 200 },
];

const activityItems = [
    { icon: UserIcon, text: 'New student "Alex Doe" was registered.', time: '2 min ago' },
    { icon: BanknotesIcon, text: 'Invoice #1234 was paid successfully.', time: '1 hour ago' },
    { icon: UserGroupIcon, text: 'Staff meeting scheduled for tomorrow.', time: '3 hours ago' },
    { icon: CubeIcon, text: 'Science curriculum was updated.', time: '1 day ago' },
    { icon: UserIcon, text: 'Admission application received from "Jane Smith".', time: '1 day ago' },
];

// --- Page Level Views ---

const DashboardView: React.FC = () => {
    return (
        <div 
            className="grid h-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:grid-rows-6 gap-4"
            role="region"
            aria-label="Owner Dashboard"
        >
            {/* Stat Cards */}
            <StatsCard className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-1" title="Total Students" value="1,200" icon={UserGroupIcon} iconBgColor="bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark" />
            <StatsCard className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-1" title="New Admissions" value="52" icon={UserIcon} iconBgColor="bg-gyn-bg-stat-green-light dark:bg-gyn-bg-stat-green-dark" />
            <StatsCard className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-1" title="Total Staff" value="85" icon={UserGroupIcon} iconBgColor="bg-gyn-bg-stat-purple-light dark:bg-gyn-bg-stat-purple-dark" />
            <StatsCard className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-1" title="Courses" value="32" icon={CubeIcon} iconBgColor="bg-gyn-bg-stat-tan-light dark:bg-gyn-bg-stat-tan-dark" />
            
            {/* Main Chart */}
            <ChartCard className="col-span-4 md:col-span-8 lg:col-span-8 lg:row-span-3" title="Monthly Revenue" data={barChartData} />

            {/* Pie Chart */}
            <PieChartCard className="col-span-4 md:col-span-4 lg:col-span-4 lg:row-span-3" title="Student Distribution" data={pieChartData} />

            {/* Recent Activity */}
            <RecentActivityCard className="col-span-4 md:col-span-4 lg:col-span-12 lg:row-span-2" title="Recent Activity" items={activityItems} />
        </div>
    )
}

const PlaceholderView: React.FC<{navId: string}> = ({ navId }) => (
    <div>
        <h1 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">
            {navId.charAt(0).toUpperCase() + navId.slice(1).replace(/_/g, ' ')}
        </h1>
        <p className="mt-2 text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Content for {navId} will be displayed here.</p>
    </div>
);


interface MainContentProps {
    activeRightNav: RightNavItemId;
    activeHeaderNav: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeRightNav, activeHeaderNav }) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const renderContent = () => {
    switch (activeRightNav) {
      case 'dashboard':
        switch (activeHeaderNav) {
          case 'reports':
            return <ReportsView onSelectReport={setSelectedReport} />;
          case 'overview':
          default:
            return <DashboardView />;
        }
      case 'students':
        return <PlaceholderView navId={activeHeaderNav} />;
      case 'staff':
        return <PlaceholderView navId={activeHeaderNav} />;
      case 'academics':
        return <PlaceholderView navId={activeHeaderNav} />;
      case 'finance':
        return <PlaceholderView navId={activeHeaderNav} />;
      default:
        return <PlaceholderView navId={activeRightNav} />;
    }
  };

  return (
    <>
      <main className="flex-1 md:my-4 ml-0 mr-0 md:mr-4 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-br-md md:rounded-md border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark shadow-inner overflow-y-auto p-4">
        {renderContent()}
      </main>
      {selectedReport && (
        <ReportModal 
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

export default MainContent;