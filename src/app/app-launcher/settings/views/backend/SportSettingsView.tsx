import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { TrophyIcon, ChartBarIcon } from '../../../../../icons';
import { getSportSettings, saveSportSettings, SportSettings } from '../../../../api/settings/sportApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const SportSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<SportSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('integrations');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getSportSettings();
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
      await saveSportSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleChange = (key: keyof SportSettings, value: string | boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const tabs = [
      { id: 'integrations', label: 'Integrations' },
      { id: 'units', label: 'Units' },
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
        <TrophyIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Sport Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'integrations' && (
          <SettingsSection
            title="Fitness Integrations"
            description="Connect with third-party fitness tracking platforms."
          >
            <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable Strava Integration</p>
                <p className="text-sm">Allow users to connect their Strava accounts to sync activities.</p>
              </div>
              <Toggle checked={settings.stravaIntegration} onChange={(val) => handleChange('stravaIntegration', val)} />
            </div>
            {settings.stravaIntegration && (
                <div className="py-2 mt-4">
                <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="strava-client-id">Strava Client ID</label>
                <p className="text-sm mb-2">Enter your Strava application Client ID to enable the OAuth flow.</p>
                <input
                    id="strava-client-id"
                    type="text"
                    placeholder="Enter Client ID..."
                    value={settings.stravaClientId}
                    onChange={(e) => handleChange('stravaClientId', e.target.value)}
                    className="w-full max-w-sm p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
                />
                </div>
            )}
          </SettingsSection>
        )}
      
        {activeTab === 'units' && (
          <SettingsSection
            title="Units of Measurement"
            description="Set the default measurement system for distances, speed, and elevation."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Default Unit System</label>
              <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="units" value="imperial" checked={settings.defaultUnits === 'imperial'} onChange={(e) => handleChange('defaultUnits', e.target.value)} />
                        Imperial (Miles, Feet)
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="units" value="metric" checked={settings.defaultUnits === 'metric'} onChange={(e) => handleChange('defaultUnits', e.target.value)} />
                        Metric (Kilometers, Meters)
                    </label>
              </div>
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

export default SportSettingsView;
