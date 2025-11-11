export interface MarketplaceSettings {
    reviewsEnabled: boolean;
    guestCheckout: boolean;
    commissionRate: number;
    featuredItems: number;
}

let mockSettings: MarketplaceSettings = {
    reviewsEnabled: true,
    guestCheckout: false,
    commissionRate: 15,
    featuredItems: 8,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getMarketplaceSettings = async (): Promise<MarketplaceSettings> => {
    await delay(500);
    console.log("Fetched Marketplace Settings:", mockSettings);
    return { ...mockSettings };
};

export const saveMarketplaceSettings = async (settings: MarketplaceSettings): Promise<void> => {
    await delay(500);
    mockSettings = { ...settings };
    console.log("Saved Marketplace Settings:", mockSettings);
};
