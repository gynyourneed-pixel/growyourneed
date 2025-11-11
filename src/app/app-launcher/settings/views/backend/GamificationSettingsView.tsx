import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { PuzzlePieceIcon, ChartBarIcon } from '../../../../../icons';
import { getGamificationSettings, saveGamificationSettings, GamificationSettings } from '../../../../api/settings/gamificationApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const GamificationSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<GamificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('core');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getGamificationSettings();
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
      await saveGamificationSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleChange = (key: keyof GamificationSettings, value: number | boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const tabs = [
      { id: 'core', label: 'Core Engine' },
      { id: 'economy', label: 'Reward Economy' },
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
        <PuzzlePieceIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Gamification Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'core' && (
          <SettingsSection
            title="Core Engine"
            description="Manage the main gamification system and its core rules."
          >
            <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable Gamification System</p>
                <p className="text-sm">Turn the points, badges, and leaderboard system on or off globally.</p>
              </div>
              <Toggle checked={settings.gamificationEnabled} onChange={(val) => handleChange('gamificationEnabled', val)} />
            </div>
            <div className="py-2 mt-4">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="daily-cap">Daily Point Cap per User</label>
              <p className="text-sm mb-2">The maximum number of points a single user can earn in a 24-hour period.</p>
              <input
                id="daily-cap"
                type="number"
                value={settings.dailyPointCap}
                onChange={(e) => handleChange('dailyPointCap', Number(e.target.value))}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              />
            </div>
          </SettingsSection>
        )}
      
        {activeTab === 'economy' && (
          <SettingsSection
            title="Reward Economy"
            description="Configure the value of points when redeeming rewards."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="point-value">Point to Currency Value (e.g., USD)</label>
              <p className="text-sm mb-2">The cash value of a single point. E.g., 0.01 means 100 points = $1.</p>
              <input
                id="point-value"
                type="number"
                value={settings.pointValue}
                onChange={(e) => handleChange('pointValue', Number(e.target.value))}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
                step="0.001"
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

export default GamificationSettingsView;
