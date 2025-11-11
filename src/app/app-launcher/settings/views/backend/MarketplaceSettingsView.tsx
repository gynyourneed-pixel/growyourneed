import React, { useState, useEffect } from 'react';
import SettingsSection from '../../../../../components/app-launcher/settings/SettingsSection';
import Toggle from '../../../../../components/Toggle';
import { ShoppingCartIcon, ChartBarIcon } from '../../../../../icons';
import AppContentHeader from '../../../../../components/app-launcher/shared/AppContentHeader';
import { getMarketplaceSettings, saveMarketplaceSettings, MarketplaceSettings } from '../../../../api/settings/marketplaceApi';

const MarketplaceSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<MarketplaceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('policies');
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getMarketplaceSettings();
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
      await saveMarketplaceSettings(settings);
      alert("Settings saved!");
    }
  };

  const handleToggleChange = (key: keyof MarketplaceSettings, value: boolean) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };

  const handleInputChange = (key: keyof MarketplaceSettings, value: number) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
  };

  const tabs = [
      { id: 'policies', label: 'Policies' },
      { id: 'financials', label: 'Financials & Display' },
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
        <ShoppingCartIcon className="w-8 h-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Marketplace Backend Settings</h2>
      </div>
      
      <AppContentHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'policies' && (
            <SettingsSection
                title="Store Policies"
                description="Configure checkout options and user interaction policies."
            >
                <div className="flex justify-between items-center py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                <div>
                    <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Enable User Reviews</p>
                    <p className="text-sm">Allow authenticated users to leave reviews on products.</p>
                </div>
                <Toggle checked={settings.reviewsEnabled} onChange={(val) => handleToggleChange('reviewsEnabled', val)} />
                </div>
                <div className="flex justify-between items-center py-2">
                <div>
                    <p className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Allow Guest Checkout</p>
                    <p className="text-sm">Permit users to purchase items without creating an account.</p>
                </div>
                <Toggle checked={settings.guestCheckout} onChange={(val) => handleToggleChange('guestCheckout', val)} />
                </div>
            </SettingsSection>
        )}
      
        {activeTab === 'financials' && (
            <SettingsSection
                title="Financials & Display"
                description="Set financial parameters and homepage display options."
            >
                <div className="py-2 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="commission-rate">Platform Commission Rate (%)</label>
                <p className="text-sm mb-2">The percentage of each sale that the platform retains.</p>
                <input
                    id="commission-rate"
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) => handleInputChange('commissionRate', Number(e.target.value))}
                    className="w-full max-w-xs p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark"
                />
                </div>
                <div className="py-2">
                <label className="font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" htmlFor="featured-items">Number of Featured Items</label>
                <p className="text-sm mb-2">The number of products to show in the 'Featured' section on the homepage.</p>
                <input
                    id="featured-items"
                    type="number"
                    value={settings.featuredItems}
                    onChange={(e) => handleInputChange('featuredItems', Number(e.target.value))}
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

export default MarketplaceSettingsView;
