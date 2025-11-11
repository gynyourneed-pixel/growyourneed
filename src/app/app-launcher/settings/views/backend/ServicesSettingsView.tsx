import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { WrenchScrewdriverIcon, ChartBarIcon } from '../../../../../icons';
import { getServicesSettings, saveServicesSettings, ServicesSettings } from '../../../../api/settings/servicesApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const ServicesSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<ServicesSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('verification');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getServicesSettings();
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
      await saveServicesSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleChange = (key: keyof ServicesSettings, value: number | boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const tabs = [
      { id: 'verification', label: 'Verification' },
      { id: 'financials', label: 'Financials' },
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
        <WrenchScrewdriverIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Services Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'verification' && (
          <SettingsSection
            title="Provider Verification"
            description="Manage how service providers are verified on the platform."
          >
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Require Background Checks</p>
                <p className="text-sm">Mandate background checks for providers in sensitive categories.</p>
              </div>
              <Toggle checked={settings.backgroundChecks} onChange={(val) => handleChange('backgroundChecks', val)} />
            </div>
          </SettingsSection>
        )}
      
        {activeTab === 'financials' && (
          <SettingsSection
            title="Financials"
            description="Set booking fees and other financial rules for the service marketplace."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="commission-fee">Booking Commission Fee (%)</label>
              <p className="text-sm mb-2">The percentage of each completed booking that the platform retains.</p>
              <input
                id="commission-fee"
                type="number"
                value={settings.commissionFee}
                onChange={(e) => handleChange('commissionFee', Number(e.target.value))}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
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

export default ServicesSettingsView;
