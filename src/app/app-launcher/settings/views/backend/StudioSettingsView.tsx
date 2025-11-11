import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { SparklesIcon, ChartBarIcon } from '../../../../../icons';
import { getStudioSettings, saveStudioSettings, StudioSettings } from '../../../../api/settings/studioApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const StudioSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getStudioSettings();
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
      await saveStudioSettings(settings);
      alert("Settings saved!");
    }
  };
  
  const handleToggleChange = (key: keyof StudioSettings, value: boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const handleSelectChange = (key: keyof StudioSettings, value: string) => {
    setSettings(prev => prev ? { ...prev, [key]: value } as StudioSettings : null);
  };

  const tabs = [
      { id: 'features', label: 'Features' },
      { id: 'defaults', label: 'Defaults' },
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
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Creator Studio Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'features' && (
          <SettingsSection
            title="AI & Cloud Services"
            description="Enable or disable intelligent features and cloud integrations."
          >
            <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable AI Assistant Tools</p>
                <p className="text-sm">Provides AI-powered code generation, bug detection, and design suggestions.</p>
              </div>
              <Toggle checked={settings.aiFeatures} onChange={(val) => handleToggleChange('aiFeatures', val)} />
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable Cloud Project Sync</p>
                <p className="text-sm">Allow users to save and sync their projects to the cloud.</p>
              </div>
              <Toggle checked={settings.cloudStorage} onChange={(val) => handleToggleChange('cloudStorage', val)} />
            </div>
          </SettingsSection>
        )}

        {activeTab === 'defaults' && (
          <SettingsSection
            title="Defaults"
            description="Configure default settings for new projects."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="export-format">Default Image Export Format</label>
              <p className="text-sm mb-2">The standard format for exporting images from the Designer.</p>
              <select
                id="export-format"
                value={settings.defaultExport}
                onChange={(e) => handleSelectChange('defaultExport', e.target.value)}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG</option>
                <option value="webp">WebP</option>
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

export default StudioSettingsView;
