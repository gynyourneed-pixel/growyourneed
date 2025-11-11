import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { ChatBubbleLeftRightIcon, ChartBarIcon } from '../../../../../icons';
import { getMessagingSettings, saveMessagingSettings, MessagingSettings } from '../../../../api/settings/messagingApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const MessagingSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<MessagingSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getMessagingSettings();
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
      await saveMessagingSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleToggleChange = (key: keyof MessagingSettings, value: boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const handleInputChange = (key: keyof MessagingSettings, value: number) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };

  const tabs = [
      { id: 'features', label: 'Features' },
      { id: 'data', label: 'Data Retention' },
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
        <ChatBubbleLeftRightIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Messaging Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'features' && (
          <SettingsSection
            title="Real-time Features"
            description="Control features that provide real-time feedback to users."
          >
            <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable Read Receipts</p>
                <p className="text-sm">Allow users to see when their messages have been read.</p>
              </div>
              <Toggle checked={settings.readReceipts} onChange={(val) => handleToggleChange('readReceipts', val)} />
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable Typing Indicators</p>
                <p className="text-sm">Show when another user is typing a message in a conversation.</p>
              </div>
              <Toggle checked={settings.typingIndicators} onChange={(val) => handleToggleChange('typingIndicators', val)} />
            </div>
          </SettingsSection>
        )}

        {activeTab === 'data' && (
          <SettingsSection
            title="Data Retention"
            description="Configure how long messages are stored on the server."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="retention-days">Message Retention Period (days)</label>
              <p className="text-sm mb-2">Messages older than this will be automatically deleted. Set to 0 for indefinite retention.</p>
              <input
                id="retention-days"
                type="number"
                value={settings.retentionDays}
                onChange={(e) => handleInputChange('retentionDays', Number(e.target.value))}
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

export default MessagingSettingsView;
