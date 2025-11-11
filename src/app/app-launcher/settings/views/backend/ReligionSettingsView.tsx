import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import { MoonIcon, ChartBarIcon } from '../../../../../icons';
import { getReligionSettings, saveReligionSettings, ReligionSettings } from '../../../../api/settings/religionApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const ReligionSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<ReligionSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('quran');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getReligionSettings();
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
      await saveReligionSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleSelectChange = (key: keyof ReligionSettings, value: string) => {
    setSettings(prev => prev ? { ...prev, [key]: value } as ReligionSettings : null);
  };

  const tabs = [
      { id: 'quran', label: 'Quran' },
      { id: 'prayer', label: 'Prayer Times' },
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
        <MoonIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Religion Backend Settings</h2>
      </div>
      
      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'quran' && (
          <SettingsSection
            title="Quran Resources"
            description="Configure the default resources for the Quran section."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="default-translation">Default Quran Translation</label>
              <p className="text-sm mb-2">Select the default English translation for the Quran.</p>
              <select
                id="default-translation"
                value={settings.defaultTranslation}
                onChange={(e) => handleSelectChange('defaultTranslation', e.target.value)}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              >
                <option value="sahih_international">Sahih International</option>
                <option value="yusuf_ali">Yusuf Ali</option>
                <option value="pickthall">Pickthall</option>
                <option value="shakir">Shakir</option>
              </select>
            </div>
          </SettingsSection>
        )}
      
        {activeTab === 'prayer' && (
          <SettingsSection
            title="Prayer Time Calculations"
            description="Set the calculation method used to determine daily prayer times."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="prayer-method">Calculation Method</label>
              <p className="text-sm mb-2">Different methods are used for calculating Fajr and Isha times.</p>
              <select
                id="prayer-method"
                value={settings.prayerMethod}
                onChange={(e) => handleSelectChange('prayerMethod', e.target.value)}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              >
                <option value="mwl">Muslim World League</option>
                <option value="isna">Islamic Society of North America (ISNA)</option>
                <option value="egyptian">Egyptian General Authority of Survey</option>
                <option value="karachi">University of Islamic Sciences, Karachi</option>
              </select>
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

export default ReligionSettingsView;
