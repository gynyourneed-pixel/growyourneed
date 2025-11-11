import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { CalendarDaysIcon, ChartBarIcon } from '../../../../../icons';
import { getCalendarSettings, saveCalendarSettings, CalendarSettings } from '../../../../api/settings/calendarApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const CalendarSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<CalendarSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getCalendarSettings();
        setSettings(data);
        setError(null);
      } catch (err) {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (settings) {
      await saveCalendarSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleToggleChange = (key: keyof CalendarSettings, value: boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };

  const handleInputChange = (key: keyof CalendarSettings, value: number) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const tabs = [
      { id: 'general', label: 'General Settings' },
      { id: 'defaults', label: 'Event Defaults' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-full"><ChartBarIcon className="w-12 h-12 text-gyn-text-primary-light dark:text-gyn-text-primary-dark animate-pulse" /></div>;
  }
  
  if (error || !settings) {
    return <div className="p-8 text-center text-gyn-text-error-light dark:text-gyn-text-error-dark">{error || 'Settings could not be loaded.'}</div>;
  }

  return (
    <div className="p-4 md:p-8 text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDaysIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Calendar Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'general' && (
            <SettingsSection
                title="General Settings"
                description="Manage global calendar features."
            >
                <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                <div>
                    <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Show Public Holidays</p>
                    <p className="text-sm">Automatically display national public holidays on all calendars.</p>
                </div>
                <Toggle checked={settings.publicHolidays} onChange={(val) => handleToggleChange('publicHolidays', val)} />
                </div>
                <div className="flex justify-between items-center py-2">
                <div>
                    <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Allow User-Created Public Events</p>
                    <p className="text-sm">Let users create events that are visible to everyone on the platform.</p>
                </div>
                <Toggle checked={settings.allowPublicEvents} onChange={(val) => handleToggleChange('allowPublicEvents', val)} />
                </div>
            </SettingsSection>
        )}

        {activeTab === 'defaults' && (
            <SettingsSection
                title="Event Defaults"
                description="Set default values for new events."
            >
                <div className="py-2">
                <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="default-duration">Default Event Duration (minutes)</label>
                <p className="text-sm mb-2">The default length of a newly created calendar event.</p>
                <input
                    id="default-duration"
                    type="number"
                    value={settings.defaultDuration}
                    onChange={(e) => handleInputChange('defaultDuration', Number(e.target.value))}
                    className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
                    step="15"
                />
                </div>
            </SettingsSection>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={handleSave} className="px-6 py-2 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors">
            Save Changes
        </button>
      </div>
    </div>
  );
};

export default CalendarSettingsView;
