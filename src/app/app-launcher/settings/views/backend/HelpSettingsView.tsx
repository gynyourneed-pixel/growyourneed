import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { QuestionMarkCircleIcon, ChartBarIcon } from '../../../../../icons';
import { getHelpSettings, saveHelpSettings, HelpSettings } from '../../../../api/settings/helpApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const HelpSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<HelpSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('channels');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getHelpSettings();
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
      await saveHelpSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleChange = (key: keyof HelpSettings, value: number | boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };

  const tabs = [
      { id: 'channels', label: 'Support Channels' },
      { id: 'tickets', label: 'Tickets' },
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
        <QuestionMarkCircleIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Help Center Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'channels' && (
          <SettingsSection
            title="Support Channels"
            description="Manage the channels through which users can receive support."
          >
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable Live Chat Support</p>
                <p className="text-sm">Allow users to initiate a live chat session with support agents.</p>
              </div>
              <Toggle checked={settings.liveChat} onChange={(val) => handleChange('liveChat', val)} />
            </div>
          </SettingsSection>
        )}
      
        {activeTab === 'tickets' && (
          <SettingsSection
            title="Support Tickets"
            description="Configure policies for the ticket-based support system."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="response-sla">Ticket Response SLA (hours)</label>
              <p className="text-sm mb-2">The target time within which support agents should respond to new tickets.</p>
              <input
                id="response-sla"
                type="number"
                value={settings.responseSla}
                onChange={(e) => handleChange('responseSla', Number(e.target.value))}
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

export default HelpSettingsView;
