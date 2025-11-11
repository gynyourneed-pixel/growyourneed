export interface StudioSettings {
    aiFeatures: boolean;
    cloudStorage: boolean;
    defaultExport: 'png' | 'jpg' | 'svg' | 'webp';
}

let mockSettings: StudioSettings = {
    aiFeatures: true,
    cloudStorage: true,
    defaultExport: 'png',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getStudioSettings = async (): Promise<StudioSettings> => {
    await delay(550);
    return { ...mockSettings };
};

export const saveStudioSettings = async (settings: StudioSettings): Promise<void> => {
    await delay(550);
    mockSettings = { ...settings };
};
