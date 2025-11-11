import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { SparklesIcon, ChartBarIcon } from '../../../../../icons';
import { getHobbiesSettings, saveHobbiesSettings, HobbiesSettings } from '../../../../api/settings/hobbiesApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const HobbiesSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<HobbiesSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('community');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getHobbiesSettings();
        setSettings(data);
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
      await saveHobbiesSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleToggleChange = (key: 'userGroups', value: boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const handleChange = (key: keyof HobbiesSettings, value: string) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };

  const tabs = [
      { id: 'community', label: 'Community' },
      { id: 'integrations', label: 'Integrations' },
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
        <SparklesIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Hobbies (Activities) Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'community' && (
          <SettingsSection
            title="Community Features"
            description="Control how users can create and manage their own groups and activities."
          >
            <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable User-Created Groups</p>
                <p className="text-sm">Allow users to create and manage their own hobby or activity groups.</p>
              </div>
              <Toggle checked={settings.userGroups} onChange={(val) => handleToggleChange('userGroups', val)} />
            </div>
            <div className="py-2 mt-4">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="moderation-level">Content Moderation</label>
              <p className="text-sm mb-2">Set the strictness of automated moderation for user-generated content.</p>
              <select
                id="moderation-level"
                value={settings.moderationLevel}
                onChange={(e) => handleChange('moderationLevel', e.target.value)}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              >
                <option value="low">Low (Manual Review)</option>
                <option value="auto">Automated (Recommended)</option>
                <option value="high">High (Strict Filtering)</option>
              </select>
            </div>
          </SettingsSection>
        )}
      
        {activeTab === 'integrations' && (
          <SettingsSection
            title="Integrations"
            description="Connect with third-party event platforms."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="eventbrite-api">Eventbrite API Key</label>
              <p className="text-sm mb-2">Enter your Eventbrite API key to pull in local events automatically.</p>
              <input
                id="eventbrite-api"
                type="text"
                placeholder="Enter API Key..."
                value={settings.eventbriteApi}
                onChange={(e) => handleChange('eventbriteApi', e.target.value)}
                className="w-full max-w-sm p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
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

export default HobbiesSettingsView;
