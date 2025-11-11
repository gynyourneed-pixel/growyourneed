import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { FilmIcon, ChartBarIcon } from '../../../../../icons';
import { getMediaSettings, saveMediaSettings, MediaSettings } from '../../../../api/settings/mediaApi';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';

const MediaSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<MediaSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('playback');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getMediaSettings();
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
      await saveMediaSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleToggleChange = (key: keyof MediaSettings, value: boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };
  
  const handleSelectChange = (key: keyof MediaSettings, value: string) => {
    setSettings(prev => prev ? { ...prev, [key]: value } as MediaSettings : null);
  };

  const tabs = [
      { id: 'playback', label: 'Playback & Streaming' },
      { id: 'cdn', label: 'Content Delivery' },
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
        <FilmIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Media Backend Settings</h2>
      </div>

      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'playback' && (
          <SettingsSection
            title="Streaming & Playback"
            description="Configure how video content is delivered and played for users."
          >
            <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
              <div>
                <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Allow Offline Downloads</p>
                <p className="text-sm">Permit users to download media for offline viewing on their devices.</p>
              </div>
              <Toggle checked={settings.allowDownloads} onChange={(val) => handleToggleChange('allowDownloads', val)} />
            </div>
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="default-quality">Default Streaming Quality</label>
              <p className="text-sm mb-2">The default video quality for users who have not set a preference.</p>
              <select
                id="default-quality"
                value={settings.defaultQuality}
                onChange={(e) => handleSelectChange('defaultQuality', e.target.value)}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              >
                <option value="480p">480p (Standard Definition)</option>
                <option value="720p">720p (HD)</option>
                <option value="1080p">1080p (Full HD)</option>
                <option value="4k">4K (Ultra HD)</option>
              </select>
            </div>
          </SettingsSection>
        )}
        
        {activeTab === 'cdn' && (
          <SettingsSection
            title="Content Delivery Network (CDN)"
            description="Manage how and where your media files are served from."
          >
            <div className="py-2">
              <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="cdn-provider">CDN Provider</label>
              <p className="text-sm mb-2">Select the primary CDN for media delivery. 'Auto' will select the best option based on user location.</p>
              <select
                id="cdn-provider"
                value={settings.cdnProvider}
                onChange={(e) => handleSelectChange('cdnProvider', e.target.value)}
                className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
              >
                <option value="auto">Auto-Select</option>
                <option value="cloudflare">Cloudflare</option>
                <option value="fastly">Fastly</option>
                <option value="aws_cloudfront">AWS CloudFront</option>
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

export default MediaSettingsView;
